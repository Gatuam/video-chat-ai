import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import {
  CallEndedEvent,
  MessageNewEvent,
  CallTranscriptionReadyEvent,
  CallSessionParticipantLeftEvent,
  CallRecordingReadyEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";
import { error } from "console";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");
  if (!signature || !apiKey) {
    return NextResponse.json(
      {
        error: "Missing signature or API key",
      },
      { status: 400 }
    );
  }
  const body = await req.text();
  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid json" },
      {
        status: 400,
      }
    );
  }

  const eventType = (payload as Record<string, unknown>)?.type;
  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;
    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meetingId" },
        {
          status: 400,
        }
      );
    }
    const [ExistingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "cancled")),
          not(eq(meetings.status, "processing"))
        )
      );
    if (!ExistingMeeting) {
      return NextResponse.json(
        { error: "Meeting not found" },
        {
          status: 400,
        }
      );
    }
    await db
      .update(meetings)
      .set({
        status: "active",
        startedAt: new Date(),
      })
      .where(eq(meetings.id, ExistingMeeting.id));
    const [ExistingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, ExistingMeeting.agentsId));

    if (!ExistingAgent) {
      return NextResponse.json({ error: "Agent not exist" }, { status: 400 });
    }
    const call = streamVideo.video.call("default", meetingId);
    const realtimeClient = await streamVideo.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      agentUserId: ExistingAgent.id,
    });

    realtimeClient.updateSession({
      instructions: ExistingAgent.instructions,
    });
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];
    if (!meetingId) {
      return NextResponse.json(
        {
          error: "Missing meeting id ",
        },
        { status: 401 }
      );
    }
    const call = streamVideo.video.call("default", meetingId);
    await call.end();
  } else if (eventType === "call.session_end") {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId;
    if (!meetingId) {
      return NextResponse.json(
        {
          error: "Missing meeting id ",
        },
        { status: 401 }
      );
    }
    await db
      .update(meetings)
      .set({
        status: "processing",
        endedAt: new Date(),
      })
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));
  } else if (eventType === "call.transcription_ready") {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];
    const [UpadtedMetting] = await db
      .update(meetings)
      .set({
        transcriptUrl: event.call_transcription.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();

    if (!UpadtedMetting) {
      return NextResponse.json(
        {
          error: "Meeting not found",
        },
        { status: 404 }
      );
    }

    //innges background job
  } else if (eventType === "call.recording_ready") {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];
    await db
      .update(meetings)
      .set({
        recodingUrl: event.call_recording.url,
      })
      .where(eq(meetings.id, meetingId));
  }

  return NextResponse.json({ status: "ok" });
}

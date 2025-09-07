import z from "zod";

export const meetingSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  agentId: z.string().min(1, { message: "Agent is required" }),
});

export const meetingUpadteSchema = meetingSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});

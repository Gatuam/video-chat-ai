import z from "zod";

export const agentSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  instructions: z.string().min(3, { message: "Instructions are required" }),
});

import { z } from "zod";

const DOMAINS = ["SE", "ML", "AI"] as const;

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  selectedDomain: z.enum(DOMAINS, {
    errorMap: () => ({ message: "Select your primary domain (SE, ML, or AI)" }),
  }),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

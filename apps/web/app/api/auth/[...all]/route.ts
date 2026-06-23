
import { auth } from "@repo/services/auth/src"; 
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
import { router } from "./trpc";

import { healthRouter } from "./routes/health/route";
import { featureRequestRouter } from "./routes/feature-requests/route";


export const serverRouter = router({
  health: healthRouter,
  featureRequest: featureRequestRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;

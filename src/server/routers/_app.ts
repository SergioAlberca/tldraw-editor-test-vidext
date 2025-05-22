import { router } from "../trcp";
import { ShapeRouter } from "./document";
import { GenerateImageRouter } from "./generateImage";

export const appRouter = router({
  shape: ShapeRouter,
  generateImage: GenerateImageRouter,
});

export type AppRouter = typeof appRouter;

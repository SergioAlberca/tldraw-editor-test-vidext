import { publicProcedure, router } from "../trcp";
import { prisma } from "@/server/db";
import { z } from "zod";

export const ShapeRouter = router({
  getDocument: publicProcedure.query(async () => {
    const doc = await prisma.document.findUnique({
      where: { id: "default" },
    });
    return doc?.data ?? null;
  }),

  saveDocument: publicProcedure.input(z.any()).mutation(async ({ input }) => {
    await prisma.document.upsert({
      where: { id: "default" },
      update: { data: input },
      create: { id: "default", data: input },
    });
    return { success: true };
  }),

  generateImage: publicProcedure.input(z.any()).mutation(async () => {
    const prompt = "un cuadrado con bordes negros y fondo transparente";

    const response = await fetch(process.env.DEEPAI_URL ?? "", {
      method: "POST",
      headers: {
        "Api-Key": process.env.DEEPAI_API_KEY ?? "",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `text=${encodeURIComponent(prompt)}`,
    });

    const data = await response.json();

    if (!data.output_url) {
      console.error("No se pudo generar la imagen", data);
      return;
    }

    const imageUrl = data.output_url;

    return { imageUrl };
  }),
});

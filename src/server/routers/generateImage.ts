import { publicProcedure, router } from "../trcp";
import { z } from "zod";

export const GenerateImageRouter = router({
  generateImage: publicProcedure.input(z.any()).mutation(async (input) => {
    const response = await fetch(process.env.DEEPAI_URL ?? "", {
      method: "POST",
      headers: {
        "Api-Key": process.env.DEEPAI_API_KEY ?? "",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `text=${input}`,
    });

    const data = await response.json();

    if (!data.output_url) {
      console.error("No se pudo generar la imagen", data);
      throw Error("No se pudo generar la imagen");
    }

    const imageUrl = data.output_url;

    return { imageUrl };
  }),
});

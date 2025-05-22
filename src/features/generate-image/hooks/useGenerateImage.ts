import { trpc } from "@/lib/trcp/client";
import { AssetRecordType, Editor } from "@tldraw/tldraw";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useGenerateImage() {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { mutateAsync: generateImage, isError } =
    trpc.generateImage.generateImage.useMutation();

  const hideError = useCallback(() => setShowError(false), []);

  const handleInsert = useCallback((editor: Editor, imageUrl: string) => {
    const allShapeIds = [...editor.getCurrentPageShapeIds()];
    editor.deleteShapes(allShapeIds);

    const assetId = AssetRecordType.createId();
    const imageWidth = 600;
    const imageHeight = 600;

    editor.createAssets([
      {
        id: assetId,
        type: "image",
        typeName: "asset",
        props: {
          name: "tldraw.png",
          src: imageUrl,
          w: imageWidth,
          h: imageHeight,
          mimeType: "image/png",
          isAnimated: false,
        },
        meta: {},
      },
    ]);

    editor.createShape({
      type: "image",
      x: (window.innerWidth - imageWidth) / 2,
      y: (window.innerHeight - imageHeight) / 2,
      props: {
        assetId,
        w: imageWidth,
        h: imageHeight,
      },
    });
  }, []);

  const handleGenerateImage = useCallback(async () => {
    if (!editor) return;
    setIsLoading(true);
    const generatedImage = await generateImage(prompt);
    handleInsert(editor, generatedImage?.imageUrl);
    setIsLoading(false);
  }, [editor, generateImage, prompt, handleInsert]);

  useEffect(() => {
    if (isError) setShowError(true);
  }, [isError]);

  useEffect(() => {
    if (!showError) return;

    const timer = setTimeout(hideError, 3000);
    return () => clearTimeout(timer);
  }, [showError, hideError]);

  return useMemo(
    () => ({
      handleGenerateImage,
      prompt,
      setPrompt,
      setEditor,
      isLoading,
      showError,
      hideError,
    }),
    [
      handleGenerateImage,
      prompt,
      setPrompt,
      setEditor,
      isLoading,
      showError,
      hideError,
    ]
  );
}

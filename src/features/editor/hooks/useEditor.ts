import { randomProps } from "@/lib/tldraw";
import { trpc } from "@/lib/trcp/client";
import { Editor } from "@tldraw/tldraw";
import { useCallback, useEffect, useState, useMemo } from "react";

export default function useEditor() {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isShowingWarning, setIsShowingWarning] = useState(false);
  const { data, isLoading } = trpc.shape.getDocument.useQuery();
  const { mutate: saveDocument } = trpc.shape.saveDocument.useMutation();

  const hideWarning = useCallback(() => setIsShowingWarning(false), []);

  const createInitialShape = useCallback(() => {
    editor?.createShape({
      type: "geo",
      x: 100,
      y: 100,
      props: { geo: "rectangle", w: 150, h: 150 },
    });
  }, [editor]);

  const randomizeShape = useCallback(() => {
    if (!editor) return;

    const selectedIds = editor.getSelectedShapeIds();
    const shouldShowWarning = selectedIds.length === 0;
    setIsShowingWarning(shouldShowWarning);

    if (shouldShowWarning) return;

    const shape = editor.getShape(selectedIds[0]);
    shape &&
      editor.updateShape({
        ...shape,
        props: { ...shape.props, ...randomProps() },
      });

    saveDocument(editor.getSnapshot());
  }, [editor, saveDocument]);

  const resetBoard = useCallback(() => {
    if (!editor) return;

    const allShapeIds = [...editor.getCurrentPageShapeIds()];
    editor.deleteShapes(allShapeIds);
    createInitialShape();
    saveDocument(editor.getSnapshot());
  }, [editor, createInitialShape, saveDocument]);

  useEffect(() => {
    if (!isShowingWarning) return;

    const timer = setTimeout(hideWarning, 3000);
    return () => clearTimeout(timer);
  }, [isShowingWarning, hideWarning]);

  useEffect(() => {
    if (!editor || isLoading) return;
    data ? editor.loadSnapshot(data) : createInitialShape();
  }, [data, editor, isLoading, createInitialShape]);

  return useMemo(
    () => ({
      createInitialShape,
      setEditor,
      randomizeShape,
      resetBoard,
      isShowingWarning,
      hideWarning,
    }),
    [
      randomizeShape,
      resetBoard,
      isShowingWarning,
      hideWarning,
      createInitialShape,
    ]
  );
}

"use client";

import { Tldraw } from "@tldraw/tldraw";
import useEditor from "@/features/editor/hooks/useEditor";

import EditorActions from "./editorActions";

import "@tldraw/tldraw/tldraw.css";
import { InfoDialog } from "@/components/dialog/infoDialog";

export default function TldrawEditor() {
  const {
    setEditor,
    randomizeShape,
    resetBoard,
    isShowingWarning,
    hideWarning,
  } = useEditor();

  return (
    <section className="flex flex-col h-screen bg-muted items-center justify-center gap-4 p-4">
      <InfoDialog isOpen={isShowingWarning} onCloseModal={hideWarning} />
      <div className="w-full max-w-4xl h-[600px] border rounded-2xl overflow-hidden shadow-md">
        <div className="relative w-full h-screen overflow-hidden">
          <EditorActions
            randomizeShape={randomizeShape}
            resetBoard={resetBoard}
          />
          <div className="w-full h-full">
            <Tldraw onMount={setEditor} />
          </div>
        </div>
      </div>
    </section>
  );
}

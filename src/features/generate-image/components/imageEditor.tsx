"use client";

import { Tldraw } from "@tldraw/tldraw";
import GenerateAction from "./generateAction";
import useGenerateImage from "../hooks/useGenerateImage";

import "@tldraw/tldraw/tldraw.css";
import { InfoDialog } from "@/components/dialog/infoDialog";

export default function ImageEditor() {
  const {
    prompt,
    setPrompt,
    handleGenerateImage,
    setEditor,
    isLoading,
    showError,
    hideError,
  } = useGenerateImage();

  return (
    <section className="flex flex-col h-screen">
      <InfoDialog variant="error" isOpen={showError} onCloseModal={hideError} />
      <GenerateAction
        prompt={prompt}
        onChangeAction={setPrompt}
        onGenerate={handleGenerateImage}
        isLoading={isLoading}
      />
      <div className="flex-1">
        <Tldraw onMount={setEditor} />
      </div>
    </section>
  );
}

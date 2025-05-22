import { Button } from "@/components/buttons/button";

type Props = {
  randomizeShape: () => void;
  resetBoard: () => void;
};

export default function EditorActions({ randomizeShape, resetBoard }: Props) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-zinc-900 shadow-lg rounded-xl px-4 py-2 flex gap-4">
      <Button onClick={randomizeShape}>🎲 Cambiar forma</Button>
      <Button onClick={resetBoard} variant="destructive">
        ♻️ Reiniciar
      </Button>
    </div>
  );
}

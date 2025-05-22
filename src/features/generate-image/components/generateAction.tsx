import { LoadingButton } from "@/components/buttons/loadingButton";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  onChangeAction: (input: string) => void;
  onGenerate: () => void;
  prompt: string;
  isLoading: boolean;
};
export default function GenerateAction({
  prompt,
  onChangeAction,
  onGenerate,
  isLoading,
}: Props) {
  return (
    <div className="p-4 bg-white border-b flex gap-4 items-end">
      <Textarea
        placeholder="Describe una figura: 'Un círculo azul grande...'"
        className="w-full max-w-xl"
        onChange={(e) => onChangeAction(e.target.value)}
        value={prompt}
      />
      <LoadingButton
        onClick={onGenerate}
        disabled={!prompt || isLoading}
        isLoading={isLoading}
      >
        Generar forma
      </LoadingButton>
    </div>
  );
}

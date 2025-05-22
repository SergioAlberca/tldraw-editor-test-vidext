import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { Button } from "@/components/buttons/button";
import { DialogConfig } from "./config";

type Props = {
  isOpen: boolean;
  onCloseModal?: () => void;
  variant?: Variant;
};

const variantStyles: Record<Variant, string> = {
  info: "border-grey-500 text-grey-700",
  error: "border-red-500 text-red-700",
};

type Variant = "info" | "error";

export const InfoDialog = ({
  isOpen,
  onCloseModal,
  variant = "info",
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent className={cn("border-l-4", variantStyles[variant])}>
        <DialogHeader>
          <DialogTitle>{DialogConfig[variant].title}</DialogTitle>
          <DialogDescription>
            {DialogConfig[variant].description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onCloseModal}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

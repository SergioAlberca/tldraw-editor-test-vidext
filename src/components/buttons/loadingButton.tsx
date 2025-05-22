import { Button } from "@/components/buttons/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const LoadingButton = ({
  children,
  isLoading = false,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
      {isLoading ? "Cargando..." : children}
    </Button>
  );
};

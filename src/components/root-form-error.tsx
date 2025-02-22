import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type RootFormErrorProps = {
  message?: string;
};

export function RootFormError({ message }: RootFormErrorProps) {
  if (!message) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <div className="flex items-center">
        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
}

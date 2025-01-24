import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error() {
  return (
    <Card className="w-full max-w-md border-muted">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Oops! Something went wrong
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert
          variant="destructive"
          className="border-destructive/50 bg-destructive/20"
        >
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          <AlertDescription className="text-foreground">
            We encountered an unexpected issue. Our team has been notified and
            is working on a solution.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/">Go back to home page</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

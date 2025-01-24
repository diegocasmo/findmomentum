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
import { Mail } from "lucide-react";

export default function VerifyRequest() {
  return (
    <Card className="w-full max-w-md border-muted">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Check your email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="default" className="border-muted bg-muted/50">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <AlertDescription className="text-foreground">
            We&apos;ve sent a sign-in link to your email address. Please check
            your inbox and click the link to continue.
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

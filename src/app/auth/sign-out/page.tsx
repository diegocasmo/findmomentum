import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail } from "lucide-react";
import { SignOutForm } from "@/components/sign-out-form";

export default function SignOut() {
  return (
    <Card className="w-full max-w-md border-muted">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Sign out
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="default" className="border-muted bg-muted/50">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <AlertDescription className="text-foreground">
              Are you sure you want to sign out?
            </AlertDescription>
          </div>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-center">
        <SignOutForm />
      </CardFooter>
    </Card>
  );
}

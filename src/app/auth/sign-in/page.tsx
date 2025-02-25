import Link from "next/link";
import { SignInForm } from "@/components/sign-in-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function SignIn() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          <Link href="/">Momentum</Link>
        </CardTitle>
        <CardDescription className="text-center">
          Small wins. Big progress.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}

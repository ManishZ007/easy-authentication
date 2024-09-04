"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, TSignInSchema } from "@/lib/schemas/signInSchema";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Circle } from "lucide-react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const onSubmit = async (data: TSignInSchema) => {
    await signIn("credentials", {
      identifier: data.identifier,
    });

    router.push("/");
  };

  return (
    <section className="container">
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="py-3 px-5 flex flex-col justify-center items-center w-[360px]">
          <div className=" w-full flex flex-col gap-1 items-center justify-center">
            <Circle className="h-5 w-5 mb-4 " />
            {/*Add you'r logo here  */}
            <p className="font-bold text-xl">Sign in</p>
            <p className="text-muted-foreground text-sm">
              Welcome back! Please sign in to continue
            </p>
            <div className="mt-4 w-full flex gap-2 justify-center">
              <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                  await signIn("google");
                  router.push("/");
                }}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                  await signIn("github");
                  router.push("/");
                }}
              >
                GitHub
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full flex flex-col items-center justify-center gap-5">
              <div className="flex flex-col items-start w-full gap-1">
                <Label className="text-[13px]">Email address or username</Label>
                <Input {...register("identifier")} type="text" />
              </div>
              <Button className="w-full" type="submit">
                Continue
              </Button>
            </div>
          </form>
          <Separator className="my-6" />

          <div className="w-full text-center flex gap-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?
            </p>
            <Link href={`/sign-up`} className="text-sm">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

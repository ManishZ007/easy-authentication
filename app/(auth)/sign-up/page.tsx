"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TSignUpSchema } from "@/lib/schemas/signUpSchema";
import { Circle, Loader2 } from "lucide-react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounce";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [usernameMessage, setUsernameMessage] = useState<string | null>(null);
  const debouncedInput = useDebounce(username);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameAvailable = async () => {
      if (username) {
        setIsCheckingUsername(true);

        setUsernameMessage("");
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-available?username=${debouncedInput}`
          );
          setUsernameMessage(response.data.message!);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsernameAvailable();
  }, [debouncedInput]);

  const onSubmit = async (data: TSignUpSchema) => {
    const res = await axios.post<ApiResponse>("/api/sign-up", {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (!res.data.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.data.message,
      });
    }

    toast({
      description: res.data.message,
    });

    router.push("/sign-in");
  };

  return (
    <section className="container">
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="py-3 px-5 flex flex-col justify-center items-center w-[360px]">
          <div className="w-full flex flex-col gap-1 items-center justify-center">
            <Circle className="h-5 w-5 mb-4 " />
            {/*Add you'r logo here  */}
            <p className="font-bold text-xl">Create your account</p>
            <p className="text-muted-foreground text-sm">
              Welcome! Please fill in the details to get started.
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
              <div className="grid grid-cols-2 items-start w-full gap-2">
                <div>
                  <Label className="text-[13px]">First name</Label>
                  <Input {...register("firstName")} type="text" className="" />
                  {errors?.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-[13px]">Last name</Label>
                  <Input {...register("lastName")} type="text" />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start w-full gap-1">
                <Label className="text-[13px]">Username</Label>
                <Input
                  className="mb-1"
                  {...register("username")}
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                {isCheckingUsername && (
                  <Loader2 className="animate-spin h-3 w-3" />
                )}
                <p
                  className={`text-sm ${
                    usernameMessage == "username is available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {usernameMessage}
                </p>
              </div>
              <div className="flex flex-col items-start w-full gap-1">
                <Label className="text-[13px]">Email address</Label>
                <Input {...register("email")} type="email" />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col items-start w-full gap-1">
                <Label className="text-[13px]">Password</Label>
                <Input {...register("password")} type="password"></Input>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button className="w-full" type="submit">
                Continue
              </Button>
            </div>
          </form>
          <Separator className="my-6" />

          <div className="w-full text-center flex gap-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?
            </p>
            <Link href={`/sign-in`} className="text-sm">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TUpdateSchema, updateSchema } from "@/lib/schemas/updateSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounce";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

type UpdateUserDialogProps = {
  open?: boolean;
  handleOpenUpdateDialog?: () => void;
};

export function UpdateUserDialog({
  open,
  handleOpenUpdateDialog,
}: UpdateUserDialogProps) {
  const { data: session, update } = useSession();
  const [emailAddress, setEmailAddress] = useState<string>(
    session?.user.email!
  );
  const [username, setUsername] = useState<string>(session?.user.username!);
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [usernameMessage, setUsernameMessage] = useState<string>("");
  const debouncedInput = useDebounce(username);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TUpdateSchema>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      email: session?.user.email,
      username: session?.user.username,
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

  const onSubmit = async ({ username, email }: TUpdateSchema) => {
    const resposne = await axios.post<ApiResponse>("/api/update-user", {
      email,
      username,
      id: session?.user._id,
    });

    if (resposne.data.success) {
      const newUpdateObject = {
        _id: resposne.data.user._id,
        username: resposne.data.user.username,
        email: resposne.data.user.email,
        firstName: resposne.data.user.firstName,
        lastName: resposne.data.user.lastName,
      };

      console.log(newUpdateObject);
      await update(newUpdateObject);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenUpdateDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-start w-full gap-2">
              <Label className="text-[13px]">Email</Label>
              <Input
                {...register("email")}
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <Label className="text-[13px]">Username</Label>
              <Input
                {...register("username")}
                value={username}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
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
          </div>

          <Button type="submit" className="mt-3">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

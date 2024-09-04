"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

type DeleteDialogProps = {
  open?: boolean;
  handleOpenDeleteDialog?: () => void;
};

const DelectAccountConstant = "Delete Account";

export function DeleteUserDialog({
  open,
  handleOpenDeleteDialog,
}: DeleteDialogProps) {
  const { data: session } = useSession();
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteSubmit = async () => {
    if (DelectAccountConstant === userInput) {
      setLoading(true);
      const response = await axios.post<ApiResponse>("/api/delete-user", {
        identifier: session?.user._id,
      });
    } else {
      console.log("enter the valid input");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDeleteDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Delete your account and all its associated data, for deleting
            account type Delete Account
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input onChange={(e) => setUserInput(e.target.value)} />
        </div>
        <DialogFooter className="sm:justify-start ">
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-600"
            size={`sm`}
            onClick={() => {
              handleDeleteSubmit();
              signOut();
            }}
          >
            DELETE ACCOUNT
          </Button>
        </DialogFooter>
        {loading && (
          <p className="flex gap-2 items-center text-muted-foreground text-sm">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Deleting account please wait
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

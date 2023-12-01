"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/rtk/hooks";
import { SignedIn, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { VscSignOut } from "react-icons/vsc";
type propsTypes = {
  isMobile: boolean;
};

export default function SignOutButton({ isMobile }: propsTypes) {
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const isAsideOpen = useAppSelector((state) => state.aside);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <Button variant={"secondary"} onClick={() => setIsOpen(true)}>
        {isMobile ? (
          "Sign Out"
        ) : isAsideOpen ? (
          "Sign Out"
        ) : (
          <VscSignOut size={20} />
          
        )}
      </Button>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you wanna sign out?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-gray-100 w-full">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction className="w-full" asChild>
            <div onClick={handleSignOut}>Sign Out</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

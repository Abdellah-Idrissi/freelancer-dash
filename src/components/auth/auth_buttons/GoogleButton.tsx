"use client";
import { ImGoogle } from "react-icons/im";
import { Button } from "../../ui/button";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function GoogleButton({ styles }: { styles?: string }) {
  const { isLoaded, signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");

  const handleGoogleAuth = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: redirectUrl !== null ? redirectUrl : "/",
    });
    

    setIsLoading(false);
  };


  

  return (
    <button
      disabled={isLoading}
      onClick={handleGoogleAuth}
      className={"flex items-center gap-x-[10px] justify-center px-4 py-2 text-sm border border-neutral-800 rounded-md bg-neutral-950 text-white hover:bg-neutral-800 hover:text-neutral-50 w-full"}
    >
      {isLoading ? (
        <AiOutlineReload className={"text-[14px] animate-spin"} />
      ) : (
        <ImGoogle className={"text-[14px]"} />
      )}
      Google
    </button>
  );
}

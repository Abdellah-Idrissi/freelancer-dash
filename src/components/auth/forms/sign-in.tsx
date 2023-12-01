"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import GoogleButton from "../auth_buttons/GoogleButton";
import Link from "next/link";
import { Button } from "../../ui/button";

export default function SignInForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [signInLoading, setsignInLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");

  const handlesignIn = async (e: FormEvent) => {
    e.preventDefault();
    setsignInLoading(true);
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: emailRef.current?.value as string,
        password: passRef.current?.value as string,
      });

      if (result.status === "complete") {
        toast.success("You signed in successfully");
        await setActive({ session: result.createdSessionId });
        router.push(redirectUrl !== null ? redirectUrl : "/");
      } else {
        toast.error("Something wrong occured");
        console.log(result);
      }

      setsignInLoading(false);
    } catch (error: any) {
      toast.error(error.errors[0].longMessage);
      setsignInLoading(false);
    }
  };

  const handleGuestUser = async (e: FormEvent) => {
    e.preventDefault();
    setGuestLoading(true);
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: "kagefox506@cabose.com",
        password: "kagefox506@cabose.com",
      });

      if (result.status === "complete") {
        toast.success("You signed in successfully");
        await setActive({ session: result.createdSessionId });
        router.push(redirectUrl !== null ? redirectUrl : "/");
      } else {
        toast.error("Something wrong occured");
        console.log(result);
      }

      setGuestLoading(false);
    } catch (error: any) {
      toast.error(error.errors[0].longMessage);
      setGuestLoading(false);
    }
  };

  return (
    <div className="authFormStyle">
      <div className="text-center mb-5">
        <h3 className="text-[35px] text-white tracking-tight uppercase leading-none mb-[6px]">
          Sign In
        </h3>
        <p className="font-light text-neutral-400 ">
          Choose your preferred sign in method
        </p>
      </div>

      <form className="flex flex-col gap-y-2">
        <div>
          <input
            id="email"
            type="email"
            placeholder="enter your email"
            ref={emailRef}
            className="inputStyle"
          />
        </div>
        <div>
          <input
            id="pass"
            type="password"
            placeholder="enter your password"
            ref={passRef}
            className="inputStyle"
          />
        </div>

        <button
          onClick={handlesignIn}
          className={`mt-2 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 ",
          `}
          disabled={signInLoading}
        >
          {signInLoading ? "Signin In..." : "Sign In"}
        </button>
      </form>

      <div className="relative flex items-center justify-center my-6 ">
        <span className="absolute inset-x-0 h-px bg-neutral-800 "></span>
        <span className="relative text-neutral-400 px-4 text-sm tracking-tight bg-neutral-950 font-light uppercase">
          OR CONTINUE WITH
        </span>
      </div>

      <GoogleButton styles="mt-3 w-full" />

      <p className="text-[#78787f] mt-[18px] text-[14px] font-light">
        Don&apos;t have an Account{" "}
        <span className="font-sans text-[12px] font-semibold">?</span>
        <Link
          href={`sign-up${
            redirectUrl !== null ? `?redirectUrl=${redirectUrl}` : ""
          }`}
          className="text-white font-medium pl-1 hover:underline underline-offset-2"
        >
          Sign Up
        </Link>
      </p>


      {guestLoading ?
        <p className="text-white mt-[10px] text-[14px] font-light ">Joining...</p> :
        <p className="text-[#78787f] mt-[10px] text-[14px] font-light">
          Or Just Join as a
          <button
            disabled={guestLoading}
            onClick={handleGuestUser}
            className="text-white font-medium pl-1 tracking-wide  cursor-pointer hover:underline underline-offset-2"
          >
            Test User
          </button>
        </p>
      }


    </div>
  );
}
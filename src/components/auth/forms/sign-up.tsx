"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import GoogleButton from "../auth_buttons/GoogleButton";
import Link from "next/link";
import { Button } from "../../ui/button";

export default function SignUpForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setSignUpLoading(true);
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: emailRef.current?.value,
        password: passRef.current?.value,
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      toast(
        "A verification code has been sent to your email to verify your account"
      );
      router.push(
        `/sign-up/verify-email${
          redirectUrl !== null ? `?redirectUrl=${redirectUrl}` : ""
        }`
      );

      setSignUpLoading(false);
    } catch (error: any) {
      setSignUpLoading(false);
      toast.error(error.errors[0].longMessage);
    }
  };

  return (
    <div className="authFormStyle">
      <div className="text-center mb-5">
        <h3 className="text-[35px] uppercase leading-none mb-[6px] text-white">
          Sign Up
        </h3>
        <p className="font-light text-neutral-400 ">
          Choose your preferred sign up method
        </p>
      </div>

      <form className="flex flex-col gap-y-2">
        <div>
          <input
            id="firstname"
            type="text"
            placeholder="enter your first name"
            ref={firstNameRef}
            className="inputStyle"
          />
        </div>

        <div>
          <input
            id="lastname"
            type="text"
            placeholder="enter your last name"
            ref={lastNameRef}
            className="inputStyle"
          />
        </div>

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
          onClick={handleSignUp}
          className="px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 mt-2"
          disabled={signUpLoading}
        >
          {signUpLoading ? "Signin Up..." : "Sign Up"}
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
        Already have an Account{" "}
        <span className="font-sans text-[12px] font-semibold">?</span>
        <Link
          href={`/sign-in${
            redirectUrl !== null ? `?redirectUrl=${redirectUrl}` : ""
          }`}
          className="text-white font-medium pl-1 hover:underline underline-offset-2"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}

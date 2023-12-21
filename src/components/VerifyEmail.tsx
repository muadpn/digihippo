"use client";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-9 w-9 text-red-600" />
        <h1 className="font-semibold text-xl">There was a problem</h1>
        <p className="text-muted-foreground text-sm">
          This Token is not valid might be Expired. Please try again
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" fill alt="Email was sent" />
        </div>
        <h3 className="font-semibold text-2xl  ">You&apos;re all set!</h3>
        <p>Thank you for verifying your email.</p>
        <Link className={buttonVariants({ className: "mt-4" })} href="/sign-in">
          Sign In
        </Link>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-9 w-9 animate-spin text-zinc-300" />
        <h1 className="font-semibold text-xl">Verifying....</h1>
        <p className="text-muted-foreground text-sm">
          This won&apos;t take long
        </p>
      </div>
    );
  }
};

export default VerifyEmail;

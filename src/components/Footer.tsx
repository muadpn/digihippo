"use client";
import React from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  const pathToMinimize = ["/verify-email", "/sign-up", "/sign-in"];

  return (
    <footer className="bg-white flex-grow-0">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200">
          {pathToMinimize.includes(pathname) ? null : (
            <div className="pb-8 pt-16">
              <div className="flex justify-center">
                <Icons.logo className="h-12 w-auto" />
              </div>
            </div>
          )}
          {pathToMinimize.includes(pathname) ? null : (
            <div>
              <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div
                    aria-hidden="true"
                    className="absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90"
                  />
                  <div className="text-center relative mx-auto max-w-sm">
                    <h1 className="font-semibold text-gray-900">
                      Become a seller
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                      If you&apos;d like to sell high-quality digital products,
                      you can do so in minutes.{` `}
                      <Link
                        className="whitespace-nowrap font-medium text-black hover:text-zinc-900"
                        href="/signin?as=seller"
                      >
                        Get started &rarr;
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="py-10 md:flex md:items-center md:justify-center">
          <div className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              <Link
                className="text-sm text-muted-foreground hover:text-gray-600"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-sm text-muted-foreground hover:text-gray-600"
                href="#"
              >
                Terms
              </Link>
              <Link
                className="text-sm text-muted-foreground hover:text-gray-600"
                href="#"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;

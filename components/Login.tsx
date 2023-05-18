/***
 *
 * Login Component
 *
 * This component displays a login screen with a logo and a sign-in button.
 * It utilizes Next.js Image component to render the logo image.
 * When the sign-in button is clicked, it triggers the signIn function with Google provider.
 * The component also includes animation and styling using Tailwind CSS classes.
 *
 ***/

"use client";

import DanGPT_logo from "@/public/ClosedAI_logo.png";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
    signIn("google");
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-clip bg-danviolet-950 p-10">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative flex h-[500px] w-[500px] -skew-x-12 -skew-y-12 animate-tilty flex-col items-center justify-center overflow-visible bg-gradient-radial from-danviolet-300 from-30% via-dangreen-300 via-50% to-transparent to-70% opacity-20 blur-sm">
          <div className="relative h-[42.8%] w-[42.8%] bg-gradient-radial from-danblue-300 from-30% via-danviolet-300 via-65% to-transparent to-70%"></div>
        </div>
      </div>

      <Image
        className={`relative mb-14 transition duration-1000 ${
          isClicked && "animate-roundhouse_slow opacity-0"
        }`}
        src={DanGPT_logo}
        width={300}
        height={300}
        alt="logo"
        priority
      />
      <div className="group relative flex w-[300px] justify-center  bg-white/0 shadow shadow-white/50 ring-0 ring-white/0 transition duration-1000 ease-savage_sig hover:bg-white/100 hover:shadow-none hover:shadow-white/100 hover:ring-8 hover:ring-white/100">
        <button
          onClick={() => handleButtonClick()}
          className="p-2 text-2xl font-bold"
        >
          <div className="relative">
            <span
              style={{
                textShadow: `
                0 0 4px rgba(0,0,0,0.2), 
                0 0 2px rgba(0,0,0,0.5), 
                0 0 1px rgba(0,0,0,1)
                `,
              }}
              //className="absolute left-0 top-0 text-black"
              className="relative animate-pulse text-white opacity-100 transition duration-1000 ease-savage_sig group-hover:animate-none group-hover:text-black"
            >
              Sign in to Chat with GPT
            </span>
            {/* <span
              style={{
                textShadow:
                  "0 0 4px rgba(0,0,0,0.2), 0 0 2px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,1)",
              }}
              className="absolute left-0 top-0 text-transparent"
            >
              Sign in to Chat with GPT
            </span> */}
            {/* <span className="relative text-white opacity-100 transition duration-1000 ease-savage_sig group-hover:text-transparent">
              Sign in to Chat with GPT
            </span> */}
          </div>
        </button>
      </div>
    </div>
  );
}

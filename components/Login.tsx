/**
 * Login Component
 *
 * This component represents the login screen for the ChatGPT clone.
 * It displays a logo image, a sign-in button, and some visual effects.
 */

"use client";

// Import necessary dependencies
import DanGPT_logo from "@/public/ClosedAI_logo.png";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

// Define and export the Login component
export default function Login() {
  // State to track whether the button is clicked or not
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle button click
  const handleButtonClick = () => {
    setIsClicked(true);
    signIn("google");
  };

  // Render the Login component
  return (
    <div className="relative flex h-[100dvh] flex-col items-center justify-center overflow-clip bg-danviolet-950 p-10">
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
              className="relative animate-pulse text-white opacity-100 transition duration-1000 ease-savage_sig group-hover:animate-none group-hover:text-black"
            >
              Sign in to Chat with GPT
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

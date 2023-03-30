"use client";

import DanGPT_logo from "@/public/ClosedAI_logo.png";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-danblue-500 via-danviolet-500 to-dangreen-500">
            <Image
                className="mb-14"
                src={DanGPT_logo}
                width={150}
                height={150}
                alt="logo"
            />
            <div className="rounded-lg ring ring-white/50 transition duration-500 ease-savage-sig-2 hover:ring-4">
                <button
                    onClick={() => signIn("google")}
                    className=" animate-pulse p-3 text-3xl font-bold text-white  drop-shadow-lg"
                >
                    Sign in to use ChatGPT
                </button>
            </div>
        </div>
    );
}

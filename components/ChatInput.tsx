"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import useSWR from "swr";

export default function ChatInput({ chatId }: { chatId: string }) {
    const [prompt, setPrompt] = useState("");

    const { data: session } = useSession();

    const { data: model } = useSWR("model", {
        fallbackData: "text-davinci-003",
    });

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email || "",
                name: session?.user?.name || "",
                avatar: session?.user?.image || "",
            },
        };

        await addDoc(
            collection(
                db,
                "users",
                session?.user?.email || "",
                "chats",
                chatId,
                "messages"
            ),
            message
        );

        const notification = toast.loading("ChatGPT is thinking...");

        await fetch("/api/askQuestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model,
                session,
            }),
        }).then(() => {
            toast.success("ChatGPT has responded!", { id: notification });
        });
    };

    return (
        <div className="outline outline-danviolet-700/50">
            <div className="mx-auto w-full max-w-2xl rounded-lg bg-danviolet-700/50 text-sm text-danviolet-50">
                <form onSubmit={sendMessage} className="flex space-x-5 p-5">
                    <input
                        value={prompt}
                        className="flex-1 bg-transparent placeholder:text-danviolet-100 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400"
                        disabled={!session}
                        onChange={(e) => setPrompt(e.target.value)}
                        type="text"
                        placeholder="Type your message here..."
                    />

                    <button
                        disabled={!session || !prompt}
                        className="text-dangreen-500 transition duration-1000 ease-savage_sig disabled:text-danviolet-400"
                    >
                        <PaperAirplaneIcon className="h-5 w-5 -rotate-45 " />
                    </button>
                </form>
            </div>
        </div>
    );
}

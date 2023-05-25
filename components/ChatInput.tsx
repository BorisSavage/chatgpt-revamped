"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import createNewChat from "@/utils/createNewChat";

import { useRouter } from "next/navigation";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import CustomToast from "./CustomToast";

export default function ChatInput({ chatId }: { chatId?: string }) {
  const [prompt, setPrompt] = useState("");

  const [isWorking, setIsWorking] = useState(false);

  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo",
  });

  const router = useRouter();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;

    setIsWorking(true);

    if (!chatId) {
      chatId = await createNewChat(session, router);
    }

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

    const notification = toast.custom(
      (t) => (
        <CustomToast t={t}>
          <div className="">
            <Cog6ToothIcon className="relative h-6 w-6 animate-roundhouse text-danblue-300 md:h-7 md:w-7" />
          </div>
          <p>ChatGPT is thinking...</p>
        </CustomToast>
      ),
      { duration: Infinity }
    );

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
      toast.custom(
        (t) => (
          <CustomToast t={t} success={true}>
            <p>ChatGPT has responded!</p>
          </CustomToast>
        ),
        { id: notification, duration: 2000 }
      );
      setIsWorking(false);
    });
  };

  return (
    <div className="absolute inset-x-0 bottom-0 flex flex-col">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[200%] bg-gradient-to-t from-danviolet-700 to-transparent" />
      <div className="pointer-events-none relative flex h-20 flex-col items-center justify-start bg-transparent px-4 pb-4">
        <div className="pointer-events-auto flex h-16 w-full max-w-2xl flex-col justify-center rounded-lg bg-danviolet-600 p-5 text-sm text-danviolet-50">
          <form onSubmit={sendMessage} className="flex space-x-5">
            <input
              value={prompt}
              className="flex-1 bg-transparent placeholder:text-danviolet-100 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400"
              disabled={!session}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              placeholder="Type your message here..."
            />

            <button
              disabled={!session || !prompt || isWorking}
              className="text-dangreen-500 transition duration-1000 ease-savage_sig disabled:text-danviolet-400"
            >
              <PaperAirplaneIcon className="h-5 w-5 -rotate-45 " />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

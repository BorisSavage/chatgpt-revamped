"use client";

import { db } from "@/firebase";
import createNewChat from "@/utils/createNewChat";
import {
  ChevronDoubleRightIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import CustomToast from "./CustomToast";
import { useState } from "react";

export default function ExamplePrompt({ prompt }: { prompt: string }) {
  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo",
  });

  const router = useRouter();

  const [isWorking, setIsWorking] = useState(false);

  const sendMessage = async () => {
    setIsWorking(true);

    const chatId = await createNewChat(session, router);

    const input = prompt.trim();

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
    <div
      className="group relative max-w-[300px] cursor-pointer rounded-lg bg-danviolet-700/80 px-6 py-4 shadow-none shadow-danblue-300/50 transition duration-200 ease-in hover:bg-danviolet-500/80 hover:text-white hover:shadow-md hover:shadow-danblue-300/80"
      onClick={sendMessage}
    >
      <ChevronDoubleRightIcon className="absolute bottom-1.5 right-1.5 h-4 w-4 animate-pulse text-danviolet-300 transition-all duration-500 ease-savage_sig group-hover:h-5 group-hover:w-5 group-hover:animate-none group-hover:text-dangreen-500" />
      <p className="relative">&quot;{prompt}&quot;</p>
    </div>
  );
}

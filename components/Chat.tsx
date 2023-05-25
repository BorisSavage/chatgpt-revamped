"use client";

import { db } from "@/firebase";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useRef, useEffect } from "react";
0;
export default function Chat({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);

  const [messages, loading, error] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email || "",
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto overflow-x-hidden pb-40 pt-4 scrollbar-thin scrollbar-thumb-danviolet-600 scrollbar-thumb-rounded-full"
    >
      {messages?.empty && (
        <div className="relative left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2">
          <p className="mt-10 text-center font-bold text-danblue-300/80">
            Submit your prompt below to get started!
          </p>
          <ArrowDownCircleIcon className="mx-auto mt-5 h-10 w-10 animate-bounce text-danblue-300/80" />
        </div>
      )}
      {error && (
        <div className="text-center text-xl font-bold text-red-500">
          Error: {JSON.stringify(error)}
        </div>
      )}
      {loading && (
        <div className="animate-pulse text-center text-xl text-danblue-300">
          Loading Messages...
        </div>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()}></Message>
      ))}
    </div>
  );
}

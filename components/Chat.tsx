"use client";

import { db } from "@/firebase";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

export default function Chat({ chatId }: { chatId: string }) {
    const { data: session } = useSession();

    const [messages] = useCollection(
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

    return (
        <div className="flex-1  overflow-y-auto overflow-x-hidden">
            {messages?.empty && (
                <div className="relative top-1/2 left-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2">
                    <p className="mt-10 text-center font-bold text-danblue-500">
                        Submit your prompt below to get started!
                    </p>
                    <ArrowDownCircleIcon className=" mx-auto mt-5 h-10 w-10 animate-bounce text-danblue-500" />
                </div>
            )}

            {messages?.docs.map((message) => (
                <Message key={message.id} message={message.data()}></Message>
            ))}
        </div>
    );
}

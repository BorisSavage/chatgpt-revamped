"use client";

import { db } from "@/firebase";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewChatButton() {
    const router = useRouter();
    const { data: session } = useSession();

    const createNewChat = async () => {
        const doc = await addDoc(
            collection(
                db,
                "users",
                session?.user?.email || "NO EMAIL LOL",
                "chats"
            ),
            {
                userId: session?.user?.email || "NO EMAIL LOL",
                createdAt: serverTimestamp(),
            }
        );

        router.push(`/chat/${doc.id}`);
    };

    return (
        <div onClick={createNewChat} className="chatRow">
            <PlusIcon className="h-5 w-5 text-dangreen-500" />
            <p className="flex-1 truncate">New Chat</p>
        </div>
    );
}

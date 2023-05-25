import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Session } from "next-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const createNewChat = async (
  session: Session | null,
  router: AppRouterInstance
) => {
  const doc = await addDoc(
    collection(db, "users", session?.user?.email || "no user email", "chats"),
    {
      userId: session?.user?.email || "no user email",
      createdAt: serverTimestamp(),
    }
  );

  router.push(`/chat/${doc.id}`);

  return doc.id;
};

export default createNewChat;

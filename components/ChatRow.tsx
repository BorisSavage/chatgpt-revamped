import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export default function ChatRow({ id }: { id: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isActive, setIsActive] = useState(false);

  const [messages] = useCollection(
    query(
      collection(
        db,
        "users",
        session?.user?.email || "",
        "chats",
        id,
        "messages"
      ),
      orderBy("createdAt", "asc")
    )
  );

  useEffect(() => {
    if (!pathname) return;
    setIsActive(pathname.includes(id));
  }, [pathname, id]);

  const removeChat = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await deleteDoc(doc(db, "users", session?.user?.email || "", "chats", id));
    isActive && router.replace("/");
  };

  return (
    <div
      className={`group relative flex cursor-pointer items-center justify-center rounded-lg border border-danviolet-700 px-4 py-3 text-sm text-danviolet-200 transition duration-100 ease-savage_sig hover:bg-danviolet-800 ${
        isActive && "border-danviolet-400 bg-danviolet-800"
      }`}
      onClick={() => router.push(`/chat/${id}`)}
    >
      <ChatBubbleLeftIcon
        className={`mr-2 h-5 w-5 ${
          isActive
            ? "text-dangreen-500"
            : "text-dangreen-500/80 group-hover:text-dangreen-500/100"
        }`}
      />
      <div className="relative h-5 flex-1 overflow-hidden">
        <p
          className={`transition duration-100 ${
            isActive
              ? "text-danviolet-100 group-hover:text-danviolet-50/80"
              : "group-hover:text-danviolet-100"
          }`}
        >
          {/* debug - uncomment the below line to display chat ID: */}
          {/* {`Chat ID: ${id} `} */}
          {messages?.docs[messages.docs.length - 1]?.data()?.text || ""}
        </p>
        <div
          className={`absolute inset-y-0 right-0 w-14 bg-gradient-to-l to-transparent transition duration-100 ease-savage_sig xs:w-20 ${
            isActive
              ? "from-danviolet-800"
              : "from-danviolet-900 group-hover:opacity-0"
          }`}
        ></div>
        <div
          className={`absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-danviolet-800 to-transparent opacity-0 transition duration-100 ease-savage_sig xs:w-20 ${
            isActive ? "" : "group-hover:opacity-100"
          }`}
        ></div>
      </div>
      <div className="relative">
        <TrashIcon
          className={`h-5 w-5 ${
            isActive
              ? "text-danblue-300/80"
              : "text-danblue-300/50 group-hover:text-danblue-300/80"
          }`}
        />
        <TrashIcon
          onClick={(event) => removeChat(event)}
          className="absolute inset-0 text-red-500 opacity-0 transition duration-100 ease-savage_sig hover:opacity-100"
        />
      </div>
    </div>
  );
}

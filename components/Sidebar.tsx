"use client";

import { db } from "@/firebase";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChatButton from "./NewChatButton";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  const { data: session } = useSession();

  const [show, setShow] = useState(false);

  const handleNav = () => {
    setShow(!show);
  };

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email || "NO EMAIL", "chats"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <>
      <div
        onClick={() => handleNav()}
        className={`group fixed bottom-24 left-6 z-10 h-8 w-8 rounded-sm md:hidden ${
          show ? "" : ""
        }`}
      >
        <div
          className={`absolute inset-0 rounded-sm bg-white/10 backdrop-blur-sm transition duration-500 ease-savage_sig ${
            show ? "opacity-0" : ""
          }`}
        />
        <div
          className={`absolute inset-0 animate-shadow_alternate rounded-sm shadow shadow-danblue-300/80 transition duration-[3000ms] ease-savage_sig group-hover:duration-[1000ms] ${
            show ? "opacity-0" : ""
          }`}
        />

        <AdjustmentsHorizontalIcon
          className={`relative h-full w-full text-dangreen-500 transition duration-500 ease-savage_sig ${
            show ? "opacity-0" : ""
          }`}
        />
      </div>
      <div
        onClick={() => handleNav()}
        className={`fixed z-20 h-full w-full transition-all duration-500 ease-savage_sig md:hidden ${
          show
            ? "bg-white/10 backdrop-blur-sm"
            : "pointer-events-none opacity-0"
        } `}
      ></div>

      <div
        className={`fixed -left-3/4 top-0 z-50 flex h-[100dvh] w-3/4 flex-col justify-between bg-danviolet-900 transition duration-500 ease-savage_sig md:static md:left-0 md:w-[20rem] ${
          show ? "max-md:translate-x-full" : "opacity-0 md:opacity-100"
        } `}
      >
        <XMarkIcon className="pointer-events-none absolute -right-10 top-[50%] h-8 w-8 -translate-y-1/2 border border-danblue-300 text-danblue-300 opacity-50 md:hidden" />
        <div className="flex flex-col overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-danviolet-600 scrollbar-thumb-rounded-full">
          <div className="my-[10vh] text-center text-5xl font-bold text-danviolet-100 md:hidden ">
            ChatGPT
          </div>
          <div className="flex-1 pb-8">
            <div>
              <NewChatButton />
              <div className="flex flex-col space-y-2">
                <div className="p-2">
                  <ModelSelection />
                </div>
                <div>
                  {error && (
                    <div className="text-center font-bold text-red-500">
                      Error: {JSON.stringify(error)}
                    </div>
                  )}
                  {loading && (
                    <div className="animate-pulse text-center text-danblue-300">
                      Loading Chats...
                    </div>
                  )}
                  {chats?.docs.map((chat) => (
                    <ChatRow key={chat.id} id={chat.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {session && (
          <div className="relative flex flex-col justify-end">
            <div className="absolute left-0 right-0 top-0 h-8 -translate-y-full bg-gradient-to-t from-danviolet-900 to-transparent"></div>
            <div
              onClick={() => signOut()}
              className="group mx-auto flex w-fit cursor-pointer flex-col items-center justify-center space-y-1 overflow-hidden p-2"
            >
              {/*eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={session.user?.image || "../fallbackUserImage.png"}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "../fallbackUserImage.png";
                }}
                alt="Profile picture"
                className="mx-auto h-12 w-12 rounded-full transition duration-500  ease-savage_sig group-hover:opacity-50"
              />
              <div className="relative font-medium text-danviolet-100 opacity-50 transition duration-500 ease-savage_sig group-hover:-translate-y-1 group-hover:opacity-100">
                Sign out
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

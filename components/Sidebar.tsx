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

export default function Sidebar() {
  const { data: session } = useSession();

  const [show, setShow] = useState(false);

  const handleNav = () => {
    setShow(!show);
  };

  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email || "NO EMAIL", "chats"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <>
      <AdjustmentsHorizontalIcon
        onClick={() => handleNav()}
        className={`fixed right-6 top-6 h-8 w-8 bg-white/10 text-danblue-600 shadow-lg drop-shadow-lg transition duration-500 ease-savage_sig md:hidden ${
          show ? "opacity-0" : "opacity-100"
        } `}
      />
      {show && (
        <div
          onClick={() => handleNav()}
          className={`fixed z-20 h-full w-full md:hidden ${
            show ? "visible" : "hidden"
          } `}
        ></div>
      )}
      <div
        className={`fixed -left-2/3 top-0 z-50 flex h-screen w-2/3 flex-col justify-between bg-danviolet-900 transition duration-500 ease-savage_sig md:static md:left-0 md:w-[20rem] ${
          show ? "max-md:translate-x-full" : "opacity-0 md:opacity-100"
        } `}
      >
        <div className="flex flex-col overflow-y-auto p-2">
          <div className="flex-1">
            <div>
              <NewChatButton />
              <div className="flex flex-col space-y-2">
                <div className="p-2">
                  <ModelSelection />
                </div>
                <div>
                  {loading && (
                    <div className="animate-pulse text-center text-white">
                      Loading Chats...
                    </div>
                  )}

                  {/* Map through the ChatRows */}
                  {chats?.docs.map((chat) => (
                    <ChatRow key={chat.id} id={chat.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {session && (
          <div className="flex flex-col justify-end border-t border-danviolet-800 pt-8">
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

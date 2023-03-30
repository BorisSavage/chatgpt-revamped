"use client";

import { db } from "@/firebase";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChatButton from "./NewChatButton";

export default function Sidebar() {
    const { data: session } = useSession();

    const [show, setShow] = useState(false);
    const [width, setWidth] = useState(() => {
        return window.innerWidth;
    });

    const MOBILE_BREAKPOINT = 768;

    const mobileElementsShow = width < MOBILE_BREAKPOINT;

    const handleNav = () => {
        setShow(!show);
    };

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        if (width > MOBILE_BREAKPOINT) {
            setShow(true);
        } else setShow(false);
        // return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    const [chats, loading] = useCollection(
        session &&
            query(
                collection(
                    db,
                    "users",
                    session?.user?.email || "NO EMAIL",
                    "chats"
                ),
                orderBy("createdAt", "desc")
            )
    );

    return (
        <>
            {mobileElementsShow && (
                <AdjustmentsHorizontalIcon
                    onClick={() => handleNav()}
                    className={`fixed top-6 right-6 h-8 w-8 bg-white/10 text-danblue-600 shadow-lg drop-shadow-lg transition duration-500 ease-savage-sig-2 ${
                        show ? "opacity-0" : "opacity-100"
                    } `}
                />
            )}
            {show && mobileElementsShow && (
                <div
                    onClick={() => handleNav()}
                    className={`fixed z-20 h-full w-full ${
                        show ? "visible" : "hidden"
                    } `}
                ></div>
            )}
            <div
                className={`fixed top-0 -left-2/3 z-50 flex h-screen w-2/3 flex-col justify-between bg-danviolet-900 transition duration-500 ease-savage-sig-2 md:static md:left-0 md:w-[20rem] ${
                    show ? "max-md:translate-x-full" : "opacity-0"
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
                    <div className="border-t border-danviolet-800 pt-8">
                        <div
                            onClick={() => signOut()}
                            className="group mx-auto flex cursor-pointer flex-col items-center justify-center overflow-hidden"
                        >
                            {/*eslint-disable-next-line @next/next/no-img-element*/}
                            <img
                                src={
                                    session.user?.image ||
                                    "../fallbackUserImage.png"
                                }
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "../fallbackUserImage.png";
                                }}
                                alt="Profile picture"
                                className="mx-auto mb-2 h-12 w-12 rounded-full transition duration-500  ease-savage-sig-2 group-hover:opacity-50"
                            />
                            <div className="relative -bottom-2 font-medium text-danviolet-200 opacity-0 transition duration-500  ease-savage-sig-2 group-hover:-translate-y-3 group-hover:opacity-100">
                                Sign out
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

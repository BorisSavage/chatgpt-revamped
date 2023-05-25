/* eslint-disable @next/next/no-img-element */
import { DocumentData } from "firebase/firestore";

export default function Message({ message }: Required<DocumentData>) {
  const isDan = message?.user?.name === "Dan";

  return (
    <div
      className={`py-5 ${
        isDan ? "bg-danviolet-700 text-danviolet-200" : "text-danviolet-100"
      }`}
    >
      <div className="mx-auto flex max-w-2xl space-x-5 px-10">
        <img
          src={message?.user?.avatar}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "../fallbackUserImage.png";
          }}
          alt="avatar"
          className="h-8 w-8 flex-shrink-0"
        />
        <p className="pt-1 text-sm">
          {message?.text || "Message text not available"}
        </p>
      </div>
    </div>
  );
}

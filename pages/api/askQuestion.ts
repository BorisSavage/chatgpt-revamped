import { adminDb } from "@/firebaseAdmin";
import queryApi from "@/utils/queryApi";
import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID!" });
    return;
  }

  //ChatGPT Query
  const response = await queryApi(prompt, model);

  const now = admin.firestore.Timestamp.now();
  const date = now.toDate();
  const timeDiff = 1;
  date.setSeconds(date.getSeconds() + timeDiff);
  const normalizedTimestamp = admin.firestore.Timestamp.fromDate(date);

  const message: Message = {
    text: response || "ChatGPT doesn't know what to say! Weird..",
    createdAt: normalizedTimestamp,
    user: {
      _id: "DanGPT",
      name: "Dan",
      avatar: "/ClosedAI_logo.png",
    },
  };

  await adminDb
    .collection("users")
    .doc(session.user.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}

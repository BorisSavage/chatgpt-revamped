import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";

export default function ChatPage({
    params: { id },
}: {
    params: { id: string };
}) {
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <Chat chatId={id} />
            <ChatInput chatId={id} />
        </div>
    );
}

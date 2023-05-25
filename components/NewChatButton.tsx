import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function NewChatButton() {
  const router = useRouter();

  const homepage = async () => {
    router.push(`/`);
  };

  return (
    <div
      onClick={homepage}
      className="group relative flex cursor-pointer items-center justify-start space-x-2 rounded-lg border border-danviolet-500 px-4 py-3 text-sm text-danviolet-200 transition-all duration-500 ease-savage_sig hover:border-danviolet-400 hover:bg-danviolet-800 hover:text-danblue-300"
    >
      <PlusIcon className="h-5 w-5 text-danblue-300 transition duration-500 ease-savage_sig group-hover:rotate-90 group-hover:scale-110 group-hover:text-dangreen-500" />
      <p className="flex-1 truncate">New Chat</p>
    </div>
  );
}

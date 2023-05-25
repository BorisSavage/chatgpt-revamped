import { ReactNode } from "react";

export default function InfoText({ info }: { info: string | ReactNode }) {
  if (typeof info === "string") {
    return (
      <p className="max-w-[300px] rounded-lg bg-danviolet-700/80 p-4">
        &quot;{info}&quot;
      </p>
    );
  }

  return (
    <div className="max-w-[300px] rounded-lg bg-danviolet-700/80 p-4">
      {info}
    </div>
  );
}

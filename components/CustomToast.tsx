import { Toast } from "react-hot-toast";
import { Transition } from "@headlessui/react";

export default function CustomToast({
  t,
  children,
  success,
}: {
  t: Toast;
  children: React.ReactNode;
  success?: boolean;
}) {
  return (
    <Transition
      appear
      show={t.visible}
      enter="transform ease-out duration-[300ms] transition"
      enterFrom="sm:-translate-y-2 opacity-0 translate-y-0 translate-x-[3.25rem] sm:translate-x-0"
      enterTo="sm:translate-y-0 opacity-100 translate-x-0"
      leave="transition ease-in duration-[300ms]"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex h-12 flex-col justify-start md:h-16">
        <div className="relative">
          <div
            className={`absolute -inset-1 animate-slight_tilt opacity-50 blur-md md:blur-xl ${
              success === undefined
                ? "bg-danblue-300"
                : success
                ? "bg-dangreen-300"
                : "bg-red-500"
            }`}
          ></div>
          <div className="relative flex h-8 w-52 items-center justify-evenly rounded border border-danviolet-300 bg-danviolet-600 text-sm font-medium text-danviolet-50 md:h-12 md:w-56 md:rounded-lg md:font-bold">
            {children}
          </div>
        </div>
      </div>
    </Transition>
  );
}

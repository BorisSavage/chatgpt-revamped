/**
 * 'Home Page' component
 *
 *
 */

import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import InfoText from "../components/InfoText";
import ChatInput from "@/components/ChatInput";
import ExamplePrompt from "@/components/ExamplePrompt";

export default function page() {
  return (
    <div className="relative flex h-[100dvh] flex-col">
      <div className="flex flex-1 flex-col items-center justify-start overflow-y-auto overflow-x-hidden px-2 pb-44 pt-[10vh] text-danviolet-50 scrollbar-thin scrollbar-thumb-danviolet-700 scrollbar-thumb-rounded-full lg:pt-[20vh]">
        <div className="mb-20 text-5xl font-bold">ChatGPT</div>

        <div className="flex flex-col space-x-0 space-y-7 text-center lg:flex-row lg:space-x-2 lg:space-y-0">
          <div>
            <div className="mb-5 flex flex-col items-center justify-center">
              <SunIcon className="mb-1 h-8 w-8"></SunIcon>
              <h2 className="text-lg font-medium">Examples</h2>
            </div>

            <div className="space-y-2">
              <ExamplePrompt
                prompt={
                  "In the style of an angry South Londoner, explain music theory"
                }
              ></ExamplePrompt>
              <ExamplePrompt prompt="Write a news story about pickles"></ExamplePrompt>
              <ExamplePrompt prompt="What's the smell of the sea?"></ExamplePrompt>
            </div>
          </div>
          <div>
            <div className="mb-5 flex flex-col items-center justify-center">
              <BoltIcon className="mb-1 h-8 w-8"></BoltIcon>
              <h2 className="text-lg font-medium">Capabilities</h2>
            </div>

            <div className="space-y-2">
              <InfoText
                info={<p>User authentication with Google</p>}
              ></InfoText>
              <InfoText
                info={<p>Multiple OpenAI language models to choose from</p>}
              ></InfoText>
              <InfoText
                info={<p>Messages stored in Firebase&apos;s Firestore</p>}
              ></InfoText>
            </div>
          </div>
          <div>
            <div className="mb-5 flex flex-col items-center justify-center">
              <ExclamationTriangleIcon className="mb-1 h-8 w-8"></ExclamationTriangleIcon>
              <h2 className="text-lg font-medium">Limitations</h2>
            </div>

            <div className="space-y-2">
              <InfoText
                info={<p>May occasionally generate incorrect information</p>}
              ></InfoText>
              <InfoText info={<p>May produce biased content</p>}></InfoText>
              <InfoText
                info={
                  <>
                    <p>
                      Can be overwhelmed with too many users because of the
                      OpenAI rate limits{" "}
                      <span className="opacity-50">{"¯\\_(ツ)_/¯"}</span>
                    </p>
                  </>
                }
              ></InfoText>
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </div>
  );
}

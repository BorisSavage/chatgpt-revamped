import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import InfoText from "../components/InfoText";

export default function page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-2 py-44 text-danviolet-50 md:justify-center md:py-0">
      <div className=" mb-20 text-5xl font-bold ">ChatGPT</div>

      <div className="flex flex-col space-x-0 space-y-2 text-center md:flex-row md:space-x-2 md:space-y-0">
        <div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <SunIcon className="mb-1 h-8 w-8"></SunIcon>
            <h2 className="font-medium">Examples</h2>
          </div>

          <div className="space-y-2">
            <InfoText
              info={
                "In the style of an angry South Londoner, explain quantum computing"
              }
            ></InfoText>
            <InfoText info={"Are you conscious?"}></InfoText>
            <InfoText info={"Tell me a corny joke"}></InfoText>
          </div>
        </div>
        <div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <BoltIcon className="mb-1 h-8 w-8"></BoltIcon>
            <h2 className="font-medium">Capabilities</h2>
          </div>

          <div className="space-y-2">
            <InfoText info={<p>User authentication with Google</p>}></InfoText>
            <InfoText
              info={<p>Multiple OpenAI language models to choose from</p>}
            ></InfoText>
            <InfoText
              info={<p>Messages stored in Firebase's Firestore</p>}
            ></InfoText>
          </div>
        </div>
        <div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <ExclamationTriangleIcon className="mb-1 h-8 w-8"></ExclamationTriangleIcon>
            <h2 className="font-medium">Limitations</h2>
          </div>

          <div className="space-y-2">
            <InfoText
              info={<p>May occasionally generate incorrect information</p>}
            ></InfoText>
            <InfoText info={<p>May produce biased content</p>}></InfoText>
            <InfoText
              info={
                <>
                  <p>Gotta admit the OG is a little better</p>{" "}
                  <span className="opacity-50">{"¯\\_(ツ)_/¯"}</span>
                </>
              }
            ></InfoText>
          </div>
        </div>
      </div>
    </div>
  );
}

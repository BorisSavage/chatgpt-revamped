import {
    BoltIcon,
    ExclamationTriangleIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import InfoText from "../components/InfoText";

export default function page() {
    return (
        <div className="flex h-screen flex-col items-center justify-center px-2 text-danviolet-50">
            <div className=" mb-20 text-5xl font-bold ">ChatGPT</div>

            <div className="flex space-x-2 text-center">
                <div>
                    <div className="mb-5 flex flex-col items-center justify-center">
                        <SunIcon className="mb-1 h-8 w-8"></SunIcon>
                        <h2 className="font-medium">Examples</h2>
                    </div>

                    <div className="space-y-2">
                        <InfoText
                            info={
                                "Explain quantum computing in the style of an angry South Londoner"
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
                        <InfoText
                            info={"User authentication with Google"}
                        ></InfoText>
                        <InfoText
                            info={
                                "Multiple OpenAI language models to choose from"
                            }
                        ></InfoText>
                        <InfoText
                            info={"Messages stored in Firebase's Firestore"}
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
                            info={
                                "May occasionally generate incorrect information"
                            }
                        ></InfoText>
                        <InfoText
                            info={
                                "May occasionally produce harmful instructions or biased content"
                            }
                        ></InfoText>
                        <InfoText
                            info={
                                "Limited knowledge of world and events after 2021 (not really as good as the OG) "
                            }
                        ></InfoText>
                    </div>
                </div>
            </div>
        </div>
    );
}

import openai from "./chatgpt";

const queryApi = async (prompt: string, model: string) => {
    const res = await openai
        .createCompletion({
            model,
            prompt,
            temperature: 0.9,
            top_p: 1,
            max_tokens: 1000,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        .then((res) => res.data.choices[0].text)
        .catch(
            (err) =>
                `ChatGPT was not able to find an aswer, refer to the error message -> (Error: ${err.message})`
        );

    return res;
};

export default queryApi;
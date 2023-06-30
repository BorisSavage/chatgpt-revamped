import openai from "./chatgpt";

const queryApi = async (prompt: string, model: string) => {
  const res = model.startsWith("gpt-3.5")
    ? await openai
        .createChatCompletion({
          model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
          max_tokens: 1000,
        })
        .then((res) => res.data.choices[0].message?.content)
        .catch((err) => {
          if (err.response.status === 429)
            return "ChatGPT is overwhelmed! (or my quota has been exceeded haha) Please try again in a minute or select a different model ;)";
          return `ChatGPT was not able to find an aswer, refer to the error message -> (Error: ${
            err?.response?.status || err.message
          })`;
        })
    : await openai
        .createCompletion({
          model,
          prompt,
          temperature: 0.8,
          max_tokens: 1000,
        })
        .then((res) => res.data.choices[0].text)
        .catch((err) => {
          if (err.response.status === 429)
            return "ChatGPT is overwhelmed! (or my quota has been exceeded haha) Please try again in a minute or select a different model ;)";
          return `ChatGPT was not able to find an aswer, refer to the error message -> (Error: ${
            err?.response?.status || err.message
          })`;
        });

  return res;
};

export default queryApi;

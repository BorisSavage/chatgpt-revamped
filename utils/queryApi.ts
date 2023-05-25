import openai from "./chatgpt";

const queryApi = async (prompt: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 4000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => {
      if (err.response.status === 429)
        return "ChatGPT is overwhelmed! (or my quota has been exceeded haha) Please try again in a minute or select a different model ;)";
      return `ChatGPT was not able to find an aswer, refer to the error message -> (Error: ${err.response.status})`;
    });

  return res;
};

export default queryApi;

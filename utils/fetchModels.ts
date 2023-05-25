const fetchModels = () =>
  fetch("../api/getEngines").then((response) => response.json());

export default fetchModels;

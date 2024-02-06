import axios from "axios";

const ACCESS_KEY = "AGNMiP3FVMhRRM0e6xxk52RIDOCH5aYr2KkPgy7w030";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(`/search/photos`, {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      lang: "en",
      per_page: "9",
      orientation: "portrait",
    },
  });
  return data;
};

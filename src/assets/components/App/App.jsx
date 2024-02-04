import axios from "axios";

import css from "./App.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { useState } from "react";

export const App = () => {
  const [photos, setPhotos] = useState([]);

  const ACCESS_KEY = "AGNMiP3FVMhRRM0e6xxk52RIDOCH5aYr2KkPgy7w030";
  axios.defaults.baseURL = "https://api.unsplash.com/";

  const searchPhotos = async (query, page) => {
    try {
      const response = await axios.get(
        `/search/photos?client_id=${ACCESS_KEY}&query=${query}&page=${page}&lang=en`
      );
      setPhotos(response.data.results);
    } catch (error) {}
  };

  return (
    <div>
      <SearchBar onSearch={searchPhotos} />
      {photos.length > 0 && (
        <ul>
          {photos.map(({ id, urls: { small }, alt_description }) => (
            <li key={id}>
              <img
                src={small}
                alt={alt_description}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

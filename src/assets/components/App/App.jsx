import axios from "axios";

import css from "./App.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { useState } from "react";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Loader } from "../Loader/Loader";

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
    <>
      <SearchBar onSearch={searchPhotos} />
      {/* {loadin && <Loader />} */}
      <ImageGallery photos={photos} />
    </>
  );
};

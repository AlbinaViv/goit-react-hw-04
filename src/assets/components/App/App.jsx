import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../Loader/Loader";
import Modal from "react-modal";

import css from "./App.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { useState } from "react";
import { ImageGallery } from "../ImageGallery/ImageGallery";

const ACCESS_KEY = "AGNMiP3FVMhRRM0e6xxk52RIDOCH5aYr2KkPgy7w030";

axios.defaults.baseURL = "https://api.unsplash.com/";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "500px",
    width: "1000px",
  },
};

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("idle");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState({ src: "", alt: "" });

  function openModal(img) {
    setCurrentImg(img);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const searchPhotos = async (query, page = 1) => {
    try {
      // const response = await axios.get(
      //   `/search/photos?client_id=${ACCESS_KEY}&query=${query}&page=${page}&lang=en`
      // );
      const response = await axios.get(`/search/photos`, {
        params: {
          client_id: ACCESS_KEY,
          query,
          page,
          lang: "en",
        },
      });
      setPhotos(response.data.results);
    } catch (error) {}
  };

  const notify = () => toast.error("Please, enter key word!");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      notify();
      return;
    }
    searchPhotos(search.trim());

    // trim() прибирає зайві пробіли

    e.target.reset();
  };

  return (
    <>
      <SearchBar
        handleSubmit={handleSubmit}
        search={search}
        setSearch={setSearch}
      />
      <Loader />
      {/* {loadin && <Loader />} */}
      <ImageGallery
        photos={photos}
        openModal={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <img
          src={currentImg.src}
          alt={currentImg.alt}
        />
      </Modal>
      <Toaster />
    </>
  );
};

// Modal.setAppElement(App);

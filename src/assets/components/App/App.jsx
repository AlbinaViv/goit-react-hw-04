import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../Loader/Loader";
import Modal from "react-modal";

import css from "./App.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { useState } from "react";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "../ImageModal/ImageModal";

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
  const [loadin, setLoadin] = useState(false);
  const [error, setError] = useState(false);

  const [currentImg, setCurrentImg] = useState({ src: "", alt: "" });
  const [galleryPage, setGalleryPage] = useState(1);

  function openModal(img) {
    setCurrentImg(img);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const searchPhotos = async (query, page = 1) => {
    try {
      setError(false);
      setPhotos([]);
      setLoadin(true);

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
    } catch (error) {
      setError(true);
    } finally {
      setLoadin(false);
    }
  };

  const notify = () => toast.error("Please, enter key word!");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      notify();
      return;
    }
    searchPhotos(search.trim());
    setGalleryPage(1);

    // trim() прибирає зайві пробіли

    e.target.reset();
  };
  const onLoadMore = () => {
    setGalleryPage((prevGalleryPage) => prevGalleryPage + 1);
  };

  return (
    <>
      <SearchBar
        handleSubmit={handleSubmit}
        search={search}
        setSearch={setSearch}
      />
      {loadin && <Loader />}
      {error && <b>Oops, reload the page!</b>}

      <ImageGallery
        photos={photos}
        openModal={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ImageModal
          src={currentImg.src}
          alt={currentImg.alt}
        />
      </Modal>
      <LoadMoreBtn onClick={onLoadMore} />
      <Toaster />
    </>
  );
};

// Modal.setAppElement(App);

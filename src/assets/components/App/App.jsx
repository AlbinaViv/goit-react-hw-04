import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../Loader/Loader";

import css from "./App.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "../ImageModal/ImageModal";
import { fetchImages } from "../../services/image.service";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loadin, setLoadin] = useState(false);
  const [error, setError] = useState(false);

  const [currentImg, setCurrentImg] = useState({ src: "", alt: "" });
  const [galleryPage, setGalleryPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  {
    showBtn && <button> Load more ... </button>;
  }
  useEffect(() => {
    const searchPhotos = async (query, total_pages, page = 1) => {
      try {
        setError(false);
        setLoadin(true);
        const data = await fetchImages(query, page, total_pages);
        setShowBtn(total_pages !== page);

        setPhotos((prev) => [...prev, ...data.results]);
        console.log(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoadin(false);
      }
    };
    searchPhotos(search, galleryPage);
  }, [galleryPage, search]);

  function openModal(img) {
    setCurrentImg(img);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const notify = () => toast.error("Please, enter key word!");

  const handleSubmit = (search) => {
    // search.preventDefault();
    if (!search) {
      notify();
      return;
    }
    setSearch(search);
    setGalleryPage(1);
    setPhotos([]);

    // trim() прибирає зайві пробіли
  };
  const onLoadMore = () => {
    setGalleryPage((prevGalleryPage) => prevGalleryPage + 1);
  };

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />
      {loadin && <Loader />}
      {error && <ErrorMessage />}

      <ImageGallery
        photos={photos}
        openModal={openModal}
      />
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={currentImg.src}
        alt={currentImg.alt}
      />

      {photos.length > 0 && <LoadMoreBtn onClick={onLoadMore} />}
      <Toaster />
    </>
  );
};

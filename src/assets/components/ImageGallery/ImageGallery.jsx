import React from "react";
import css from "./ImageGallery.module.css";
import { ImageCard } from "../ImageCard/ImageCard";

export const ImageGallery = ({ photos, openModal }) => {
  return (
    <ul className={css.imageList}>
      {photos.map(({ id, urls: { small, regular }, alt_description }) => (
        <li
          key={id}
          onClick={() => openModal({ src: regular, alt: alt_description })}
        >
          <ImageCard
            small={small}
            descr={alt_description}
          />
        </li>
      ))}
    </ul>
  );
};

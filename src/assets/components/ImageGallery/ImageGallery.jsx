import React from "react";
import css from "./ImageGallery.module.css";
import { ImageCard } from "../ImageCard/ImageCard";

export const ImageGallery = ({ photos }) => {
  return (
    <ul className={css.imageList}>
      {photos.map(({ id, urls: { small }, alt_description }) => (
        <li key={id}>
          <ImageCard
            small={small}
            descr={alt_description}
          />
        </li>
      ))}
    </ul>
  );
};

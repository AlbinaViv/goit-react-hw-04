import css from "./ImageCard.module.css";

export const ImageCard = ({ urls: { small }, alt_description }) => {
  return (
    <div>
      <img
        className={css.imageCard}
        src={small}
        alt={alt_description}
        width="300"
        height="400"
      />
    </div>
  );
};

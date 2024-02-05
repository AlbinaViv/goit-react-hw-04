import css from "./ImageCard.module.css";

export const ImageCard = ({ small, descr }) => {
  return (
    <div>
      <img
        className={css.imageCard}
        src={small}
        alt={descr}
        width="300"
        height="400"
      />
    </div>
  );
};

import PropTypes from "prop-types";
import css from "./LoadMoreBtn.module.css";

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <button
      className={css.button}
      type="button"
      onClick={onClick}
    >
      Load More
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

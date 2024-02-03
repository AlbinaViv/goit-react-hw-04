import css from "./SearchBar.module.css";

export const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e.target.elements.query.value);
    e.target.reset();
  };
  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="query"
        placeholder="Search photos..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

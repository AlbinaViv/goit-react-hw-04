import css from "./SearchBar.module.css";

export const SearchBar = ({ handleSubmit, search, setSearch }) => {
  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        autoComplete="off"
        name="query"
        value={search}
        placeholder="Search images and photos"
        onChange={({ target: { value } }) => setSearch(value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

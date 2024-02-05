import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

// export const SearchBar = ({ onSearch }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (e.target.elements.query.value === "") {
//       notify();
//     } else {
//       onSearch(e.target.elements.query.value);
//     }
//     e.target.reset();
//   };
//   const notify = () => toast("Here is your Search.");
//   return (
//     <form
//       className={css.form}
//       onSubmit={handleSubmit}
//     >
//       <input
//         type="text"
//         autocomplete="off"
//         name="query"
//         placeholder="Search images and photos"
//       />
//       <button
//         onClick={notify}
//         type="submit"
//       >
//         Search
//       </button>
//       <Toaster />
//     </form>
//   );
// };

export const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.elements.query.value === "") {
      notify();
    } else {
      onSearch(e.target.elements.query.value);
    }
    e.target.reset();
  };

  const notify = () => toast.error("There's nothing here!");
  // const notifySuccess = () => toast.success("just what you were looking for");

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
    >
      {" "}
      <input
        type="text"
        autoComplete="off"
        name="query"
        placeholder="Search images and photos"
      />{" "}
      <button
        onClick={notify}
        type="submit"
      >
        {" "}
        Search{" "}
      </button>{" "}
      <Toaster />{" "}
    </form>
  );
};

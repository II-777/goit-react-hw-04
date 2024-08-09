// External Libraries
import { forwardRef } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
// Styles
import css from './SearchBar.module.css';

const SearchBar = forwardRef(({ onSearch }, ref) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e);
  };

  return (
    <header className={css.searchBarHeader}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.searchFormBtn}
        >
          <HiOutlineSearch size="24" className={css.searchFormIcon} />
          <span className={css.searchFormBtnLabel}>Search</span>
        </button>
        <input
          type="text"
          name="query"
          ref={ref}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.searchFormInput}
        />
      </form>
    </header>
  );
});

export default SearchBar;

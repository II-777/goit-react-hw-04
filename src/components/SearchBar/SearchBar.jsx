// External Libraries
import React from 'react';
import { Field, Form, Formik } from 'formik';
import { HiOutlineSearch } from 'react-icons/hi';

// Styles 
import css from './SearchBar.module.css';

const INITIAL_VALUES = {
  newQuery: '',
};

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (values) => {
    onSearch(values.newQuery);
  };

  return (
    <header className={css.searchBarHeader}>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className={css.searchForm}>
            <button
              disabled={Object.keys(errors).length > 0}
              className={css.searchFormBtn}
              type="submit"
            >
              <HiOutlineSearch size="24" className={css.searchFormIcon} />
              <span className={css.searchFormBtnLabel}>Search</span>
            </button>
            <Field
              type="text"
              name="newQuery"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={css.searchFormInput}
            />
          </Form>
        )}
      </Formik>
    </header>
  );
};

export default SearchBar;

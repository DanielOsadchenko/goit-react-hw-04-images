import { useState } from 'react';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';
import { FaSearch } from "react-icons/fa";



export default function SearchBar ({onSubmit}) {
  const [inputQuery, setInputQuery] = useState('');


  const handleChange = (e) => {
    setInputQuery(e.currentTarget.value)
  }

  const formSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputQuery);
    setInputQuery('')
  }
    return <header className={css.Searchbar}>

      <form className={css.SearchForm} onSubmit={formSubmit}>
  
        <button type="submit" className={css.button}>
          <FaSearch/>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={inputQuery}
        />

      </form>
    </header>
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
}
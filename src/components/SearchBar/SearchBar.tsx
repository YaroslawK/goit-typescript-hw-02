import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search query.');
    } else {
      onSubmit(query);
    }
  };

  return (
    <header>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;

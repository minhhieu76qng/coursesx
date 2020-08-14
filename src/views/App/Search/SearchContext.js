import { createContext } from 'react';

const SearchContext = createContext({
  instructors: [],
  courses: [],
  searchLoading: false,
  historyLoading: false,
});

export default SearchContext;

function SearchBar({ search, setSearch }) {
  return (
    <input
      className="searchBar"
      type="text"
      placeholder="🔍 Search posts..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
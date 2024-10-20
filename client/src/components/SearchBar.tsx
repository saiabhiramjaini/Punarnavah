interface SearchBarProps{
  searchQuery: string;
  setSearchQuery: (e : any) => void;
}
function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="pt-5 w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {setSearchQuery(e.target.value)}}
        className="w-full px-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:border-transparent"
      />
    </div>
  );
}

export default SearchBar;
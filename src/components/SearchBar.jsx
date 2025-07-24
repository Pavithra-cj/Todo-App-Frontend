import React from "react";
import { Icon } from "@iconify/react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-6">
      <Icon
        icon="mdi:magnify"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
      />
      <input
        type="text"
        placeholder="Search Tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon icon="mdi:close" className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

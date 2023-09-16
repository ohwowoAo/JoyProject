"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBoxProps {
  setSearch: (value: string) => void;
  search: string;
  handleSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  // setSearch,
  // search,
  handleSearch,
}) => {
  const [search, setSearch] = useState<string>(""); // 초기값과 타입을 지정

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.keyCode === 13) && search.trim() !== "") {
      e.preventDefault();
      handleSearch(search.trim()); // 검색어를 부모 컴포넌트로 전달
    }
  };

  useEffect(() => {
    if (search === "") {
      handleSearch(search.trim());
    }
  }, [search]);
  return (
    <form
      // onSubmit={handleSubmit}
      className="border rounded-full bg-[#f5f5f5] w-[300px] h-[34px] text-[#7d7d7dff] font-bold flex items-center gap-[10px] text-base pl-[15px] pr-[15px]"
    >
      <Search size={18} />
      <input
        type="text"
        value={search}
        placeholder="제목, 글 내용을 검색해보세요."
        onChange={onChangeSearch}
        className="bg-[#f5f5f5] focus:outline-none"
        onKeyPress={handleKeyPress}
      />
    </form>
  );
};

export default SearchBox;

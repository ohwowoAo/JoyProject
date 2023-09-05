"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  const [search, setSearch] = useState<string>(""); // 초기값과 타입을 지정

  useEffect(() => {
    console.log(search);
  }, [search]);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <form className="border rounded-full bg-[#f5f5f5] w-[300px] h-[34px] text-[#7d7d7dff] font-bold flex items-center gap-[10px] text-base pl-[15px] pr-[15px]">
      <Search size={18} />
      <input
        type="text"
        value={search}
        placeholder="제목, 글 내용을 검색해보세요."
        onChange={onChangeSearch}
        className="bg-[#f5f5f5] focus:outline-none"
      />
    </form>
  );
};

export default SearchBox;

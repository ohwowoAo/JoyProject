import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="md:container md:mx-auto ">
      <main className="max-w-1180 mx-auto h-[85px] flex justify-between items-center">
        <Link href="/">
          <img
            src="https://holaworld.io/images/logo/hola_logo_y.png"
            alt="logo"
            className="w-[105px] h-[32px]"
          ></img>
        </Link>
        <div className="flex gap-[25px]">
          <Link href="/components/register">
            <p className="font-bold text-base md:text-lg">새 글 쓰기</p>
          </Link>
          <Link href="/components/hookformzod">
            <p className="font-bold text-base md:text-lg">hookform,zod</p>
          </Link>
          <Link href="/components/count">
            <p className="font-bold text-base md:text-lg">zustand</p>
          </Link>
          <Link href="/components/reacttable">
            <p className="font-bold text-base md:text-lg">table</p>
          </Link>
        </div>
      </main>
    </header>
  );
};

export default Header;

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Maindata from "../data";
import { MessageCircle } from "lucide-react";
import TagTab from "./tagTab";

//라이브러리 이벤트 속성과 디자인 요소 스타일링
const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
};
const Main = () => {
  // let [productData, setProductdata] = useState(data);
  console.log(Maindata);

  const [selectedCategory, setSelectedCategory] = useState("all"); // 초기 선택은 '전체'

  useEffect(() => {
    console.log(`selectedCategory의 값이 변경되었습니다: ${selectedCategory}`);
  }, [selectedCategory]);

  function getNumberByTag(tag: string) {
    switch (tag) {
      case "project":
        return "🗂 프로젝트";
      case "new":
        return "🍞 따끈따끈 새 글";
      case "hot":
        return "💙 인기";
      default:
        return 0; // 기본값 설정
    }
  }
  return (
    <>
      <section>
        <Slider {...settings}>
          <Link href="/" className="focus:outline-none">
            <img
              src="/img/mainBanner.png"
              alt="mainBanner"
              className="w-[100%] h-[100%]"
            ></img>
          </Link>
          <Link href="/" className="focus:outline-none">
            <img
              src="/img/mainBanner.png"
              alt="mainBanner"
              className="w-[100%] h-[100%]"
            ></img>
          </Link>
          <Link href="/" className="focus:outline-none">
            <img
              src="/img/mainBanner.png"
              alt="mainBanner"
              className="w-[100%] h-[100%]"
            ></img>
          </Link>
        </Slider>
      </section>
      <section className="w-[1325px] mx-auto mt-[100px] ">
        <div className="flex gap-4 font-bold text-2xl text-gray-600 mb-[25px]">
          <p
            onClick={() => setSelectedCategory("all")}
            className="cursor-pointer"
          >
            전체
          </p>
          <p
            onClick={() => setSelectedCategory("project")}
            className="cursor-pointer"
          >
            프로젝트
          </p>
          <p
            onClick={() => setSelectedCategory("study")}
            className="cursor-pointer"
          >
            스터디
          </p>
        </div>
        <TagTab />
        <div className="grid grid-cols-4 gap-6">
          {Maindata.map(function (data, i) {
            if (
              selectedCategory === "all" ||
              data.tag.includes(selectedCategory)
            ) {
              return (
                <div
                  key={i}
                  className="p-4 border-2 border-solid border-[#d1d1d1] rounded-[30px] p-[25px] hover:scale-105"
                  style={{ transition: ".2s ease-in" }}
                >
                  <Link href={`/detail/${i}`}>
                    <ul className="mt-2">
                      {Array.isArray(data.tag)
                        ? data.tag.map((tag, index) =>
                            tag === "project" ? (
                              <li
                                key={index}
                                className="inline-block p-1 px-2 bg-[#efefef] text-[#656565] rounded-[30px] text-xs font-bold tracking-tighter"
                              >
                                🗂 프로젝트
                              </li>
                            ) : tag === "new" ? (
                              <li
                                key={index}
                                className="inline-block p-1 px-2 bg-[#fff9d5] text-[#fdb900] rounded-[30px] text-xs font-bold tracking-tighter"
                              >
                                🍞 따끈따끈 새 글
                              </li>
                            ) : tag === "hot" ? (
                              <li
                                key={index}
                                className="inline-block p-1 px-2 bg-[#f1f7ff] text-[#74a0e2] rounded-[30px] text-xs font-bold tracking-tighter"
                              >
                                💙 인기
                              </li>
                            ) : tag === "study" ? (
                              <li
                                key={index}
                                className="inline-block p-1 px-2 bg-[#efefef] text-[#656565] rounded-[30px] text-xs font-bold tracking-tighter"
                              >
                                ✏️ 스터디
                              </li>
                            ) : null
                          )
                        : null}
                    </ul>

                    <div className="flex text-sm gap-8 text-gray-400 font-bold mt-[20px]">
                      <p>마감일 |</p>
                      <p>{data.end}</p>
                    </div>
                    <h3 className="min-h-[56px] text-lg font-bold mt-[10px] mb-[10px] multiline-ellipsis">
                      {data.title}
                    </h3>
                    <ul>
                      {Array.isArray(data.target)
                        ? data.target.map((target, index) => (
                            <li
                              key={index}
                              className="inline-block p-[3px] px-[10px] mr-[5px] mb-[10px] bg-[#f2f4f8] rounded-lg text-xs font-bold leading-tight text-blue-600"
                            >
                              {target}
                            </li>
                          ))
                        : null}
                    </ul>
                    {/* <div className="bg-blue-200 rounded-lg font-bold text-xs leading-tight text-blue-600">
                  {data.target}
                </div> */}
                    <div className="mt-[10px] mb-[24px]">
                      {Array.isArray(data.stack)
                        ? data.stack.map((stack, index) =>
                            stack === "js" ? (
                              <img
                                className="inline-block w-[32px] mr-[5px]"
                                src="https://holaworld.io/images/languages/javascript.svg"
                                key={index}
                              />
                            ) : stack === "react" ? (
                              <img
                                className="inline-block w-[32px] mr-[5px]"
                                src="https://holaworld.io/images/languages/react.svg"
                                key={index}
                              />
                            ) : stack === "ts" ? (
                              <img
                                className="inline-block w-[32px] mr-[5px]"
                                src="https://holaworld.io/images/languages/typescript.svg"
                                key={index}
                              />
                            ) : stack === "vue" ? (
                              <img
                                className="inline-block w-[32px] mr-[5px]"
                                src="https://holaworld.io/images/languages/vue.svg"
                                key={index}
                              />
                            ) : null
                          )
                        : null}
                    </div>
                    <div className="border-t-2 border-solid border-[#f2f2f2] flex justify-between pt-[8px]">
                      <div className="font-bold  text-sm ">{data.writer}</div>
                      <div className="flex items-center gap-[4px] text-gray-400 ">
                        <p>
                          <MessageCircle color="gray" size={18} />
                        </p>
                        <p>
                          {Array.isArray(data.comments) &&
                          data.comments.length > 0
                            ? data.comments.length
                            : 0}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            } else {
              return null; // 또는 다른 처리를 수행하십시오.
            }
          })}
        </div>
      </section>
    </>
  );
};

export default Main;

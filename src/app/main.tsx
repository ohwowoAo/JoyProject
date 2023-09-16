/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Maindata from "./data";
import { MessageCircle, Loader } from "lucide-react";
import TagTab from "./tagTab";
import SearchBox from "./searchBox";
import HotTopic from "./hotTopic";

const itemsPerPage = 8; // 페이지당 아이템 수
const initialData = Maindata.slice(0, itemsPerPage); // 초기 데이터

interface TagInfo {
  [key: string]: {
    bgColor: string;
    textColor: string;
    text: string;
  };
}

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
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [itemCount, setItemCount] = useState(itemsPerPage); // 현재 로드된 아이템 갯수
  const [selectedCategory, setSelectedCategory] = useState("all"); // 초기 선택은 '전체'
  const [tagFilter, setTagFilter] = useState<string | string[]>([]);
  const [target, setTarget] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [expandedTabs, setExpandedTabs] = useState<string[]>([]);

  // if (isLoading) return <div>데이터 가져오는중</div>;

  const toggleExpand = (tabName: string, e: React.MouseEvent) => {
    if (expandedTabs.includes(tabName)) {
      // 탭이 이미 열려있을 때, 해당 탭을 닫습니다.
      setExpandedTabs([]);
    } else {
      // 탭이 닫혀있을 때, 해당 탭을 엽니다.
      setExpandedTabs([tabName]);
      e.stopPropagation();
    }
  };
  // 모든 탭을 닫는 함수
  const handleCloseAllTabs = () => {
    setExpandedTabs([]); // 모든 탭을 닫습니다.
  };

  const handleDataFromTagTab = (data: any) => {
    setTagFilter((prev) => {
      // prev가 문자열 또는 배열인 경우 처리
      if (typeof prev === "string") {
        // 문자열인 경우 배열로 변환
        prev = [prev];
      }

      if (prev.includes(data)) {
        // data가 이미 존재하는 경우 제거
        return prev.filter((tag) => tag !== data);
      } else {
        // data가 존재하지 않는 경우 추가
        return [...prev, data];
      }
    });
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading &&
      itemCount < Maindata.length
    ) {
      loadMoreData();
    }
  };

  // 추가 데이터 로드 함수
  const loadMoreData = () => {
    setLoading(true);
    const nextPage = itemCount + itemsPerPage;
    const newData = Maindata.slice(itemCount, nextPage);

    if (newData.length > 0) {
      setData([...data, ...newData]);
      setItemCount(nextPage);
    }

    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [itemCount, loading]);

  //스크롤이벤트
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredData = useMemo(() => {
    return data.filter((data) => {
      const showByCategory =
        selectedCategory === "all" || data.tag.includes(selectedCategory);

      const showByTagFilter =
        tagFilter.length > 0
          ? Array.isArray(tagFilter)
            ? tagFilter.some((tag) => data.stack.includes(tag))
            : data.stack.includes(tagFilter)
          : true;

      const showByTarget = target ? data.target.includes(target) : true;
      const searchFilter =
        search === "" ||
        data.title.includes(search) ||
        data.target.includes(search) ||
        data.stack.includes(search) ||
        data.writer.includes(search);

      return showByCategory && showByTagFilter && showByTarget && searchFilter;
    });
  }, [tagFilter, selectedCategory, target, search, data]);

  const handleSearch = (searchValue: string) => {
    // 기본 제출 동작 막기
    setSearch(searchValue);
  };

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
    <div onClick={handleCloseAllTabs}>
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
        <HotTopic />
        <div className="flex gap-4 font-bold text-2xl mt-[40px] mb-[25px]">
          <p
            onClick={() => setSelectedCategory("all")}
            className={`cursor-pointer ${
              selectedCategory === "all" ? "text-black" : "text-gray-400"
            }`}
          >
            전체
          </p>
          <p
            onClick={() => setSelectedCategory("project")}
            className={`cursor-pointer ${
              selectedCategory === "project" ? "text-black" : "text-gray-400"
            }`}
          >
            프로젝트
          </p>
          <p
            onClick={() => setSelectedCategory("study")}
            className={`cursor-pointer ${
              selectedCategory === "study" ? "text-black" : "text-gray-400"
            }`}
          >
            스터디
          </p>
        </div>
        <div className="flex justify-between">
          <TagTab
            tagFilter={tagFilter}
            handleDataFromTagTab={handleDataFromTagTab}
            setTarget={setTarget}
            target={target}
            toggleExpand={toggleExpand}
            expandedTabs={expandedTabs}
          />
          <SearchBox
            setSearch={setSearch}
            search={search}
            handleSearch={handleSearch}
          />
        </div>

        {/* 컨텐츠 영역 시작 */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-4 gap-6 mb-[100px]">
            {filteredData.map((data, i) => (
              <Link
                key={i}
                // href={{
                //   pathname: `/components/detail/${i}`,
                //   query: { projectId: `${i}` },
                // }}
                href={`/detail/${i}`}
              >
                <div
                  key={i}
                  className="border-2 border-solid border-[#d1d1d1] rounded-[30px] p-[25px] hover:scale-105"
                  style={{ transition: ".2s ease-in" }}
                >
                  <ul className="mt-2">
                    {Array.isArray(data.tag)
                      ? data.tag.map((tag, index) => {
                          const tagInfo: TagInfo = {
                            project: {
                              bgColor: "#efefef",
                              textColor: "#656565",
                              text: "🗂 프로젝트",
                            },
                            new: {
                              bgColor: "#fff9d5",
                              textColor: "#fdb900",
                              text: "🍞 따끈따끈 새 글",
                            },
                            hot: {
                              bgColor: "#f1f7ff",
                              textColor: "#74a0e2",
                              text: "💙 인기",
                            },
                            study: {
                              bgColor: "#efefef",
                              textColor: "#656565",
                              text: "✏️ 스터디",
                            },
                          };

                          const tagData = tagInfo[tag];

                          return tagData ? (
                            <li
                              key={index}
                              className={`inline-block p-1 px-2 bg-[${tagData.bgColor}] text-[${tagData.textColor}] rounded-[30px] text-xs font-bold tracking-tighter`}
                            >
                              {tagData.text}
                            </li>
                          ) : null;
                        })
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

                  <div className="mt-[10px] mb-[24px]">
                    {Array.isArray(data.stack)
                      ? data.stack.map((stack, index) =>
                          stack === "JavaScript" ? (
                            <img
                              className="inline-block w-[32px] mr-[5px]"
                              src="https://holaworld.io/images/languages/javascript.svg"
                              key={index}
                            />
                          ) : stack === "React" ? (
                            <img
                              className="inline-block w-[32px] mr-[5px]"
                              src="https://holaworld.io/images/languages/react.svg"
                              key={index}
                            />
                          ) : stack === "Typescript" ? (
                            <img
                              className="inline-block w-[32px] mr-[5px]"
                              src="https://holaworld.io/images/languages/typescript.svg"
                              key={index}
                            />
                          ) : stack === "Vue" ? (
                            <img
                              className="inline-block w-[32px] mr-[5px]"
                              src="https://holaworld.io/images/languages/vue.svg"
                              key={index}
                            />
                          ) : stack === "Java" ? (
                            <img
                              className="inline-block w-[32px] mr-[5px]"
                              src="https://holaworld.io/images/languages/java.svg"
                              key={index}
                            />
                          ) : stack === "Spring" ? (
                            <img
                              className="inline-block w-[32px] mr-[5px]"
                              src="https://holaworld.io/images/languages/spring.svg"
                              key={index}
                            />
                          ) : stack === "Nodejs" ? (
                            <img
                              className="inline-block w-[32px] mr-[5px]"
                              src="https://holaworld.io/images/languages/nodejs.svg"
                              key={index}
                            />
                          ) : stack === "Go" ? (
                            <img
                              className="inline-block w-[32px] mr-[5px]"
                              src="https://holaworld.io/images/languages/go.svg"
                              key={index}
                            />
                          ) : stack === "Kotlin" ? (
                            <img
                              className="inline-block w-[32px] mr-[5px]"
                              src="https://holaworld.io/images/languages/kotlin.svg"
                              key={index}
                            />
                          ) : stack === "Express" ? (
                            <img
                              className="inline-block w-[32px] mr-[5px]"
                              src="https://holaworld.io/images/languages/express.svg"
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
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center mt-[30px]">
            <img
              src="	https://holaworld.io/images/info/empty.png"
              alt=""
              className="w-[160px] m-auto"
            />
            <p className="mt-[20px] text-2xl leading-[1.7] font-black">
              앗! 찾으시는 글이 아직 없네요.
              <br />
              직접 모집해볼까요?
            </p>
          </div>
        )}
      </section>
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      <div
        className="fixed right-6 bottom-6 w-16 h-16 cursor-pointer"
        onClick={scrollToTop}
      >
        <img src="	https://holaworld.io/images/info/topButton.png" alt="" />
      </div>
    </div>
  );
};

export default Main;

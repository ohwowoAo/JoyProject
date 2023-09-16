"use client";

import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { z } from "zod";

// Zod 스키마 정의
const TabContentSchema = z.object({
  tabTitle: z.string(),
  content: z.array(z.string()),
});

interface TagTabProps {
  handleDataFromTagTab: (data: string | string[]) => void;
  tagFilter: string | string[];
  // expandedTabs: () => void;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  target: string;
}

const TagTab: React.FC<TagTabProps> = ({
  handleDataFromTagTab,
  tagFilter,
  setTarget,
  target,
}: // expandedTabs,
TagTabProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [expandedTabs, setExpandedTabs] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string | null>("인기");

  const toggleExpand = (tabName: string) => {
    if (expandedTabs.includes(tabName)) {
      setExpandedTabs(expandedTabs.filter((name) => name !== tabName));
    } else {
      setExpandedTabs([...expandedTabs, tabName]);
    }
  };

  // 각 탭에 대한 내용 배열
  const tabContents: Array<z.infer<typeof TabContentSchema>> = [
    { tabTitle: "인기", content: ["JavaScript", "React"] },
    {
      tabTitle: "프론트엔드",
      content: ["JavaScript", "React", "Vue", "Typescript"],
    },
    { tabTitle: "백엔드", content: ["E", "F"] },
  ];

  // 탭을 클릭할 때 호출되는 함수
  const handleTabClick = (tabTitle: string) => {
    setSelectedTab(tabTitle);
  };

  // useEffect(() => {
  //   console.log("target", target);
  // }, [target]);

  return (
    <div className="flex gap-[10px]">
      <section className="relative">
        <div
          onClick={() => toggleExpand("certification")}
          className={`w-36 h-9 pl-[18px] pr-[10px] font-bold text-mg tracking-wide flex justify-between items-center rounded-full mb-8 border whitespace-nowrap cursor-pointer ${
            tagFilter.length === 0
              ? "border-gray-300 text-gray-900"
              : "border-[#00b9ae] text-[#00b9ae]"
          }
          `}
        >
          <p className="truncate">
            {tagFilter.length === 0
              ? "기술스택"
              : typeof tagFilter === "string"
              ? tagFilter
              : tagFilter.join(", ")}
          </p>
          <ChevronDown />
        </div>
        {expandedTabs.includes("certification") && (
          <div className="absolute max-w-5xl w-[90vw] z-10 p-8 top-[46px] left-0 border-2 border-gray-300 rounded-2xl bg-white">
            <ul className="flex gap-[30px] border-b-[3px] border-solid border-gray-200 pb-[10px] pl-[16px] mb-[25px]">
              {/* 탭들 */}
              {tabContents.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => handleTabClick(tab.tabTitle)}
                  className={`whitespace-nowrap font-bold text-lg cursor-pointer relative ${
                    selectedTab === tab.tabTitle ? "selectedTab" : ""
                  } ${
                    selectedTab === tab.tabTitle
                      ? "text-black"
                      : " text-gray-600"
                  }`}
                >
                  {tab.tabTitle}
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-[10px] mb-[50px]">
              {selectedTab &&
                tabContents
                  .find((tab) => tab.tabTitle === selectedTab)
                  ?.content.map((content, index) => (
                    <li
                      key={index}
                      className={`border border-gray-300 rounded-full p-[6px] pt-[7px] pr-[12px] pb-[6px] cursor-pointer hover:scale-105  ${
                        tagFilter.length === 0 || tagFilter.includes(content)
                          ? "opacity-100"
                          : "opacity-40"
                      }`}
                      style={{ transition: ".2s ease-in" }}
                      onClick={() => handleDataFromTagTab(content)}
                    >
                      {content === "JavaScript" ? (
                        <img
                          className="inline-block w-[32px] mr-[5px]"
                          src="https://holaworld.io/images/languages/javascript.svg"
                          key={index}
                        />
                      ) : content === "React" ? (
                        <img
                          className="inline-block w-[32px] mr-[5px]"
                          src="https://holaworld.io/images/languages/react.svg"
                          key={index}
                        />
                      ) : content === "Typescript" ? (
                        <img
                          className="inline-block w-[32px] mr-[5px]"
                          src="https://holaworld.io/images/languages/typescript.svg"
                          key={index}
                        />
                      ) : content === "Vue" ? (
                        <img
                          className="inline-block w-[32px] mr-[5px]"
                          src="https://holaworld.io/images/languages/vue.svg"
                          key={index}
                        />
                      ) : null}
                      {content}
                    </li>
                  ))}
            </ul>
          </div>
        )}
      </section>
      <section className="relative">
        <div
          className={`w-36 h-9 pl-[18px] pr-[10px] border font-bold text-mg tracking-wide flex justify-between items-center rounded-full mb-2 cursor-pointer ${
            target === ""
              ? "border-gray-300 text-gray-900"
              : "border-[#00b9ae] text-[#00b9ae]"
          }`}
          onClick={() => toggleExpand("education")}
        >
          {target === "" ? "포지션" : target}
          <ChevronDown />
        </div>
        {expandedTabs.includes("education") && (
          <div className="absolute w-[100%] z-10 pl-[20px] pr-[20px] pt-[8px] pb-[8px] top-[46px] left-0 border-2 border-gray-300 font-bold rounded-2xl bg-white ">
            <p
              className={`mt-[8px] mb-[8px] cursor-pointer ${
                target === "전체" ? "border-[#00b9ae] text-[#00b9ae]" : ""
              }`}
              onClick={() => setTarget("전체")}
            >
              전체
            </p>
            <p
              className={`mt-[8px] mb-[8px] cursor-pointer ${
                target === "프론트엔드" ? "border-[#00b9ae] text-[#00b9ae]" : ""
              }`}
              onClick={() => setTarget("프론트엔드")}
            >
              프론트엔드
            </p>
            <p
              className={`mt-[8px] mb-[8px] cursor-pointer ${
                target === "백엔드" ? "border-[#00b9ae] text-[#00b9ae]" : ""
              }`}
              onClick={() => setTarget("백엔드")}
            >
              백엔드
            </p>
            <p
              className={`mt-[8px] mb-[8px] cursor-pointer ${
                target === "디자이너" ? "border-[#00b9ae] text-[#00b9ae]" : ""
              }`}
              onClick={() => setTarget("디자이너")}
            >
              디자이너
            </p>
            <p
              className={`mt-[8px] mb-[8px] cursor-pointer ${
                target === "IOS" ? "border-[#00b9ae] text-[#00b9ae]" : ""
              }`}
              onClick={() => setTarget("IOS")}
            >
              IOS
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TagTab;

"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

// Zod 스키마 정의
const TabContentSchema = z.object({
  tabTitle: z.string(),
  content: z.array(z.string()),
});

// 탭 내용을 검사하는 함수
function isValidTabContent(
  data: any
): data is z.infer<typeof TabContentSchema> {
  try {
    TabContentSchema.parse(data);
    return true;
  } catch (error) {
    return false;
  }
}

const TagTab = () => {
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

  return (
    <div className="flex gap-[10px]">
      <section className="relative">
        <div
          onClick={() => toggleExpand("certification")}
          className="w-36 h-9 pl-[18px] pr-[10px] border border-gray-300 text-gray-900 font-bold text-mg tracking-wide flex justify-between items-center rounded-full mb-8"
        >
          기술스택
          <ChevronDown />
        </div>
        {expandedTabs.includes("certification") && (
          <div className="absolute max-w-5xl w-90vw absolute z-10 p-8 top-[46px] left-0 border-2 border-gray-300 rounded-2xl bg-white">
            <ul className="flex gap-[30px] border-b-[3px] border-solid border-gray-200 pb-[10px] pl-[16px] mb-[25px]">
              {/* 탭들 */}
              {tabContents.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => handleTabClick(tab.tabTitle)}
                  className="whitespace-nowrap font-bold text-lg text-gray-600 cursor-pointer"
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
                      className="border border-gray-300 rounded-full p-[6px] pt-[7px] pr-[12px] pb-[6px]"
                    >
                      {content}
                    </li>
                  ))}
            </ul>
          </div>
        )}
      </section>
      <section>
        <div
          className="w-36 h-9 pl-[18px] pr-[10px] border border-gray-300 text-gray-900 font-bold text-mg tracking-wide flex justify-between items-center rounded-full mb-2"
          onClick={() => toggleExpand("education")}
        >
          포지션
          <ChevronDown />
        </div>
        {expandedTabs.includes("education") && (
          <div>
            <p>전체</p>
            <p>프론트엔드</p>
            <p>백엔드</p>
            <p>디자이너</p>
            <p>IOS</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TagTab;

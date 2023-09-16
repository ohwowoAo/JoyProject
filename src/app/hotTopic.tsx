import React from "react";
import Maindata from "./data";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//라이브러리 이벤트 속성과 디자인 요소 스타일링
const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: false,
  autoplaySpeed: 5000,
  pauseOnHover: false,
};

const HotTopic = () => {
  return (
    <div className="mt-[100px] mb-[60px] hotTopicWrap">
      <p className="font-bold text-2xl mb-[20px]">🔥 이번주 올라 인기글</p>
      <div>
        <Slider {...settings}>
          {Maindata.map((data, i) => (
            <div
              key={i}
              className="border-2 border-solid border-[#d1d1d1] rounded-[30px] p-[25px]"
            >
              <Link href={`/components/detail/${i}`}>
                <ul className="mt-2 ">
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
                <h3 className="min-h-[53px] text-base font-black mt-[10px] mb-[10px] multiline-ellipsis">
                  {data.title}
                </h3>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HotTopic;

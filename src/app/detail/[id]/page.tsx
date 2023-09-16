"use client";

import { useParams } from "next/navigation";
import { Key, ReactNode, useEffect, useState, useMemo } from "react";
import Maindata from "../../data";
import Header from "../../header";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Loading from "../../loading";

interface MaindataItem {
  id: string;
  tag: string[];
  end: string;
  title: string;
  contents: string;
  target: string[];
  stack: string[];
  writer: string;
  comments: string[];
}

const ProjectDetail = () => {
  const params = useParams();
  const projectId = useMemo(
    () => parseInt(params.id as string, 10),
    [params.id]
  );

  console.log("projectId", projectId);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (Maindata) {
      // 더미 데이터에서 projectId와 일치하는 상품을 찾아옵니다.
      const foundProject = Maindata.find((p) => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
      } else {
        setProject(null); // 상품을 찾지 못한 경우
      }
    }
  }, [projectId]);

  return (
    <div>
      <Header />
      {project ? (
        <div className="w-8/12 mx-auto mt-[100px] mb-[200px] ">
          <Link href="/">
            <ArrowLeft size={30} />
          </Link>
          <div className="mt-[8px] pb-[8px] border-b-[3px] border-solid border-gray-200">
            <h1 className="mt-[40px] font-extrabold text-4xl leading-[1.265] tracking-tighter text-black">
              {project.title}
            </h1>
            <p
              className="flex items-center mt-[32px] mb-[32px] text-gray-700 cursor-pointer text-lg font-bold"
              onClick={() => console.log("ssss")}
            >
              <img
                src="https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG"
                alt=""
                className="w-[48px]"
              ></img>
              {project.writer}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-[60px]">
            <div className="flex items-center">
              <p className="text-gray-500 text-xl font-black tracking-tighter mr-[30px]">
                모집 구분
              </p>
              <p className="font-bold text-xl">
                {Array.isArray(project.tag)
                  ? project.tag.includes("project")
                    ? "프로젝트"
                    : "스터디"
                  : null}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-500 text-xl font-black tracking-tighter mr-[30px]">
                모집 마감
              </p>
              <p className="font-bold text-xl">{project.end}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-500 text-xl font-black tracking-tighter mr-[30px]">
                모집 분야
              </p>
              <p className="font-bold text-xl">{project.target}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-500 text-xl font-black tracking-tighter mr-[30px]">
                사용 언어
              </p>
              <p>
                {Array.isArray(project.stack)
                  ? project.stack.map(
                      (stack: string, index: Key | null | undefined) =>
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
              </p>
            </div>
          </div>

          <div className="mt-[200px] mb-[100px]">
            <h3 className=" text-gray-700 text-2xl font-bold pb-6 border-b-[3px] border-solid border-gray-200">
              프로젝트 소개
            </h3>
            <p className="mt-[30px] leading-10 text-lg">{project.content}</p>
          </div>
          <div>
            <p className="mb-4 text-base font-bold">
              {Array.isArray(project.comments) && project.comments.length > 0
                ? `댓글 ${project.comments.length}`
                : "댓글 0"}
            </p>

            {/* {Array.isArray(project.comments) &&
              project.comments.map((comment: string, index: number) => (
                <p key={index}>{comment}</p>
              ))} */}

            {Array.isArray(project.comments) &&
              project.comments.map(
                (
                  comment: {
                    commentAuthor: ReactNode;
                    commentCon: ReactNode;
                    date: string;
                  },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="pt-6 pb-6 border-b-[2px] border-gray-300"
                  >
                    <div className="flex items-center gap-[20px]">
                      <img
                        src="https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG"
                        alt=""
                        className="w-[48px]"
                      ></img>
                      <div>
                        <p className="text-gray-700 font-black">
                          {comment.commentAuthor}
                        </p>
                        <p className="text-xs leading-[126.5%] tracking-tighter text-gray-400">
                          {comment.date}
                        </p>
                      </div>
                    </div>
                    <p
                      key={index}
                      className="mt-[30px] mb-[10px] text-base leading-[1.7] tracking-tighter break-all"
                    >
                      {comment.commentCon}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProjectDetail;

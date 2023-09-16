"use client";

import { useForm, Controller } from "react-hook-form";
import Header from "../header";
import Select from "react-select";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Layout from "./layout";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const schema = z.object({
  contact: z
    .string({
      required_error: "연락 가능한 이메일 주소를 입력해주세요.",
    })
    .min(1, { message: "필수값입니다." }),
  number: z
    .number({
      required_error: "필수값입니다.",
      invalid_type_error: "필수값입니다.",
    })
    .min(1, { message: "1보다 큰 숫자를 입력해주세요." })
    .max(100, { message: "100보다 작은숫자를 입력해주세요." }),
  gather: z.string({ required_error: "필수값입니다." }),
  proceed: z.string({ required_error: "필수값입니다." }),
  position: z.string({ required_error: "필수값입니다." }),
});

const options = [
  { value: "프로젝트", label: "프로젝트" },
  { value: "스터디", label: "스터디" },
];
const proccoptions = [
  { value: "전체", label: "전체" },
  { value: "온라인", label: "온라인" },
  { value: "오프라인", label: "오프라인" },
  { value: "온/오프라인", label: "온/오프라인" },
];
const positionoptions = [
  { value: "전체", label: "전체" },
  { value: "프론트엔드", label: "프론트엔드" },
  { value: "백엔드", label: "백엔드" },
  { value: "디자이너", label: "디자이너" },
  { value: "IOS", label: "IOS" },
];

const QuillEditor = dynamic(() => import("react-quill"), {
  suspense: true,
  ssr: false,
});

const Register = () => {
  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const contentRegex = /<p>(.*?)<\/p>/;
  const regex =
    /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|~!@#$%^&*()_+|<>?:{}|a-z|A-Z|0-9|<p>.*<\/p>]*$/;
  const projectTitleRef = useRef<any>(null);
  const projectContentRef = useRef<any>(null);
  const [projectTit, setProjectTit] = useState<string>("");
  const [projectCon, setProjectCon] = useState<string>("");
  // const [date, setDate] = useState<any>("");

  const handleFormSubmit = async () => {
    const result = getValues();
    // const match = contentRegex.exec(result.projectContent);
    const match = contentRegex.exec(projectCon);
    if (projectTitleRef.current && projectTitleRef.current.value === "") {
      alert("프로젝트 제목을 입력해주세요.");
      projectTitleRef.current.focus();
    } else if (
      (match && !regex.test(match[1].replaceAll(" ", ""))) ||
      (match && match[1] === "<br>") ||
      projectCon === ""
    ) {
      alert("프로젝트 내용을 입력해주세요.");
      // projectContentRef.current.focus();
    } else {
      console.log("result", result);
      console.log("project", {
        projectTit: projectTit,
        projectCon: projectCon,
        // deadline: `${date.$y}.${date.$M + 1}.${date.$D}`,
      });
    }

    // if (
    //   (match && !regex.test(match[1].replaceAll(" ", ""))) ||
    //   (match && match[1] === "<br>") ||
    //   (projectContentRef.current && projectContentRef.current.value === "")
    // ) {
    //   console.log(match && match[1]);
    //   console.log(
    //     projectContentRef.current && projectContentRef.current.value === ""
    //   );
    //   alert("프로젝트 내용을 입력해주세요.");
    //   projectContentRef.current.focus();
    // }
  };

  return (
    <Layout>
      <div>
        <Header />
        <main className="w-[1024px] mx-auto mt-[60px] mb-[100px]">
          <h2 className="font-bold text-2xl p-4 mb-9 border-b-[3px] border-solid border-gray-200 tracking-[-2px] text-[#333333]">
            1. &nbsp; 프로젝트 기본 정보를 입력해주세요.
          </h2>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <fieldset className="relative ">
              <section className="grid grid-cols-2 gap-6">
                <div>
                  <legend className="pb-[10px] font-bold">연락방법</legend>
                  <div>
                    {/* <label htmlFor="name">이메일주/소</label> */}
                    <input
                      id="contact"
                      type="text"
                      {...register("contact")}
                      //message 항목이 필수임
                      className="w-[100%] h-[54px] pl-[12px] rounded-[4px] border border-solid border-gray-300"
                      placeholder="연락 가능한 이메일 주소를 입력해주세요."
                    />
                  </div>
                  <div className="mt-[5px] text-red-700">
                    <ErrorMessage
                      errors={errors}
                      name="contact"
                      render={({ message }) => <p>{message}</p>}
                    />
                  </div>
                </div>
                <div>
                  <legend className="pb-[10px] font-bold">모집인원</legend>
                  <div>
                    <input
                      id="number"
                      min="1"
                      max="100"
                      {...register("number", { valueAsNumber: true })}
                      className="w-[100%] h-[54px] pl-[12px] rounded-[4px] border border-solid border-gray-300"
                      type="number"
                      placeholder="모집하는 총 인원수를 적어주세요."
                    />
                  </div>
                  <div className="mt-[5px] text-red-700">
                    <ErrorMessage
                      errors={errors}
                      name="number"
                      render={({ message }) => <p>{message}</p>}
                    />
                  </div>
                </div>
                <div>
                  <div className="pb-[10px]">
                    <label htmlFor="gather" className="font-bold">
                      모집구분
                    </label>
                  </div>
                  <Controller
                    control={control}
                    name="gather"
                    rules={{ required: "필수 입력사항입니다." }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        className="h-[54px] leading-[41px]"
                        inputId="gather"
                        options={options}
                        ref={ref}
                        value={options.find((option) => option.value === value)}
                        onChange={(option) => onChange(option && option.value)}
                        placeholder="스터디/프로젝트"
                      />
                    )}
                  />
                  <div className="mt-[5px] text-red-700">
                    <ErrorMessage
                      errors={errors}
                      name="gather"
                      render={({ message }) => <p>{message}</p>}
                    />
                  </div>
                </div>
                <div>
                  <div className="pb-[10px]">
                    <label htmlFor="proceed" className="font-bold">
                      진행방식
                    </label>
                  </div>
                  <Controller
                    control={control}
                    name="proceed"
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        className="h-[54px] leading-[41px]"
                        inputId="proceed"
                        options={proccoptions}
                        // 참조를 전달해줌으로써 hook form이랑 select input이랑 연결 (전달시 에러가 있을시 자동으로 해당 인풋으로 포커스해줌)
                        ref={ref}
                        // react-select 컴포넌트를 통해 선택된 값이랑 폼 선택값이 동일하도록 설정
                        value={proccoptions.find(
                          (option) => option.value === value
                        )}
                        // react-select 컴포넌트를 통해 값을 변경하였을경우 flavor 필드폼값도 변경.
                        // 폼 입력값은 {label: "레이블", "value": "값"}의 객체가 아닌 value 값만 추출하여 전달  }
                        onChange={(option) => onChange(option && option.value)}
                        placeholder="온라인/오프라인"
                      />
                    )}
                  />
                  <div className="mt-[5px] text-red-700">
                    <ErrorMessage
                      errors={errors}
                      name="proceed"
                      render={({ message }) => <p>{message}</p>}
                    />
                  </div>
                </div>
                <div>
                  <div className="pb-[10px]">
                    <label htmlFor="position" className="font-bold">
                      모집 포지션
                    </label>
                  </div>
                  <Controller
                    control={control}
                    name="position"
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        className="h-[54px] leading-[41px]"
                        inputId="position"
                        options={positionoptions}
                        ref={ref}
                        value={positionoptions.find(
                          (option) => option.value === value
                        )}
                        onChange={(option) => onChange(option && option.value)}
                        placeholder="프론트엔드,백엔드..."
                      />
                    )}
                  />
                  <div className="mt-[5px] text-red-700">
                    <ErrorMessage
                      errors={errors}
                      name="position"
                      render={({ message }) => <p>{message}</p>}
                    />
                  </div>
                </div>
                <div>
                  <div className="pb-[10px]">
                    <label htmlFor="deadline" className="font-bold">
                      모집 마감일
                    </label>
                  </div>
                  <DatePicker
                    className="w-[100%]"
                    onChange={(datePick: any) => {
                      // setDate(datePick);
                      setValue(
                        "deadline",
                        `${datePick.$y}.${datePick.$M + 1}.${datePick.$D}`
                      );
                      console.log("datePick", datePick);
                    }}
                  />
                  <div className="mt-[5px] text-red-700">
                    <ErrorMessage
                      errors={errors}
                      name="deadline"
                      render={({ message }) => <p>{message}</p>}
                    />
                  </div>
                </div>
              </section>
              <section>
                <h2 className="font-bold text-2xl p-4 mt-[60px] mb-9 border-b-[3px] border-solid border-gray-200 tracking-[-2px] text-[#333333]">
                  2. &nbsp; 프로젝트에 대해 소개해주세요.
                </h2>
                <div>
                  <legend className="pb-[10px] font-bold">제목</legend>
                  {/* <label htmlFor="name">이메일주/소</label> */}
                  <input
                    // id="projectTitle"
                    type="text"
                    // {...register("projectTitle")}
                    className="w-[100%] h-[54px] pl-[12px] mb-[20px] rounded-[4px] border border-solid border-gray-300"
                    placeholder="글 제목을 입력해주세요!"
                    ref={projectTitleRef}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setProjectTit(newValue);
                    }}
                  />
                </div>
              </section>

              {/* <ReactQuill
                className="h-[520px] mb-[50px]"
                placeholder="프로젝트에 대해 소개해주세요!"
                onChange={(content) => {
                  setValue("projectContent", content.trim());
                }}
                ref={projectContentRef}
              /> */}
              <QuillEditor
                id="projectContent"
                className="h-[520px] mb-[50px]"
                placeholder="프로젝트에 대해 소개해주세요!"
                onChange={(content) => {
                  // setValue("projectContent", content.trim());
                  setProjectCon(content.trim());
                }}
                // ref={projectContentRef}
              />
              <div className="absolute bottom-[-40px] right-0">
                <Link href="/">
                  <button className="bg-[#e9ecef] text-gray-700 mr-4 rounded-md px-5 h-8 text-base">
                    취소
                  </button>
                </Link>
                <button
                  type="submit"
                  className=" bg-[#262626] text-white p-1 px-4 rounded-md font-bold"
                >
                  글등록
                </button>
              </div>
            </fieldset>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default Register;

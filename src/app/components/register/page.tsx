"use client";

import { useForm, Controller } from "react-hook-form";
import useCounter from "../../store"; // TypeScript 스토어 파일 가져오기
import Header from "../header";
import Select from "react-select";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";

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
  // gather: z.string().nonempty("Field is gather"),
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
const Page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (formValue: any) => {
    //숫자로 변환
    // formValue.number = Number(formValue.number);
    console.log("console", formValue);
    console.log("console", isNaN(formValue.number));
  };

  // const { count, increment, decrement } = useCounter();

  return (
    <div>
      <Header />
      <main className="w-[1024px] mx-auto mt-[60px]">
        <section>
          <h2 className="font-bold text-2xl p-4 mb-9 border-b-[3px] border-solid border-gray-200 tracking-[-2px]">
            1. &nbsp; 프로젝트 기본 정보를 입력해주세요.
          </h2>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <fieldset className="relative grid grid-cols-2 gap-6">
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
                  {/* <label htmlFor="name">이메일주/소</label> */}
                  <input
                    id="number"
                    // {...register("number", {
                    //   min: { value: 1, message: "1명 이상여야 합니다." },
                    //   max: { value: 100, message: "100명 이하여야 합니다." },
                    // })}
                    {...register("number", { valueAsNumber: true })}
                    // {...(register("number")s,
                    // { setValueAs: (v: string) => parseInt(v) })}
                    // {...(register("number"), { valueAsNumber: true })}
                    // {...(register("number"), { setValueAs: (value: string) => parseInt(value, 10) })}
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
                      // 참조를 전달해줌으로써 hook form이랑 select input이랑 연결 (전달시 에러가 있을시 자동으로 해당 인풋으로 포커스해줌)
                      ref={ref}
                      // react-select 컴포넌트를 통해 선택된 값이랑 폼 선택값이 동일하도록 설정
                      value={options.find((option) => option.value === value)}
                      // react-select 컴포넌트를 통해 값을 변경하였을경우 flavor 필드폼값도 변경.
                      // 폼 입력값은 {label: "레이블", "value": "값"}의 객체가 아닌 value 값만 추출하여 전달  }
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
                {/* <span>{errors.gather && errors.gather?.message}</span> */}
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
                    name="gather"
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
                  <label htmlFor="position" className="font-bold">
                    모집 마감일
                  </label>
                </div>
                {/* <Controller
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
                </div> */}
              </div>
              <button
                type="submit"
                className="absolute bottom-[-70px] right-0 bg-[#262626] text-white p-1 px-4 rounded-md font-bold"
              >
                글등록
              </button>
            </fieldset>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Page;

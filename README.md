## 스터디 팀원 구하는 '홀라'사이트 클론

- project 목표 : zod, zustand, react-hook-form, react-select 공부 & 실습을 위한 joy project

- 기술 스택 :

- zod : 스키마 선언 및 유효성 검사 라이브러리로 typeScript의 한계를 보완했다는 특징떄문에 최근 개발자들로 부터 많은 인기를 끌고 있다. 또한, react-hook-form과의 합이 좋다는 평이 있어서 적용하게 되었다.
  참고 사이트 : https://zod.dev/

- zustand : 상태 관리 라이브러리 중 하나로 작은 패키지와 직관적인 사용법 때문에 요즘 인기가 있다. 근무했을때는 redux를 사용했었는데 보다 사용하기 간편하고 쉽다는 장점때문에 이번 프로젝트에서 적용해 보기로했다. 보일러 플레이트가 없다는 특징이 있다.
  참고 사이트 : https://docs.pmnd.rs/zustand/getting-started/introduction

- react-hook-form : 근무하면서 이미 만들어진 react-hook-form 코드를 수정만 해보고 직접 작성해본 적은 없어서 적용해보았다. react-hook-form은 비제어 컴포넌트 방식이라는 특징을 가지고 있고 form의 데이터와 상태를 Provider 아래에서 props drilling 없이 사용할 수 있다는 장점이 있다.
  참고 사이트 : https://react-hook-form.com/get-started

- react-select : react-hook-form을 적용하다 알게 됐는데, selectBox에 쓰는 거의 모든 기능을 쉽게 구현할 수 있다는 장점이 있어 함께 적용하게 되었다. 자동으로 handler 검색기능도 제공해 매우 편리하게 사용할 수 있을 것 같다.

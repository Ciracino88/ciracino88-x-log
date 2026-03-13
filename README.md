LEVEL 1
NEXT-JS-X-SUPABASE - 나누리 프로젝트 이름


LEVEL 2
1) .next - next js 및 react 에 필요한 프레임워크 모음 폴더. 딱히 들여다볼 필요 x
2) components - 자주 쓸 것 같은 요소들을 만들어서 저장해둔 폴더.
3) node_modules - 1번이랑 비슷한 느낌. 딱히 들여다볼 필요 x
4) public - 프로젝트 내부에 저장되어서 쓰이는 로컬 파일들. 성경책 데이터, 로고 이미지 등이 있음.
5) utils - supabase 같이 외부 프레임워크를 편리하게 쓰기 위해 객체를 만들어서 모아둔 곳.
6) .env.local - supabase 같이 api 요청에 필요한 중요한 key 값을 github 상에 올리지 않고 사용하기 위해 이곳에 선언함.
7) .gitignore - 6번 env 파일같이 깃허브 상에 업로드 하지 않는 문서들을 적어둔 파일. 딱히 들여다볼 필요 x
8) 이외 잡다한 것 - 딱히 들여다볼 필요 x


LEVEL 2.5 (app 폴더 내부를 살펴보기 이전에 알아둘 상식)
1) page.tsx - react 에서 뷰를 담당하는 부분. 여기서 화면을 그리고 컴포넌트를 만든다.
2) layout.tsx - 네비바 같이 화면 상에 항상 고정적으로 보이는 요소들을 선언하는 공간.
3) ~~.module.css - 해당 뷰의 css 파일.
4) react 에서는 폴더를 생성하면 그게 라우터가 됨. 예를 들어, mainPage 라는 이름의 폴더를 만들면 /mainPage 를 주소창에 입력하면 mainPage 로 이동함. mainPage 폴더 안에 만들어진 page.tsx 파일이 해당 페이지의 화면이고, mainPage.module.css 파일이 페이지의 css 파일임.


LEVEL 3 (app 폴더 내부)
1) actions - supabase 로그인, 비밀번호 재설정, 로그아웃 등의 함수를 서버 사이드에서 처리하는 로직들 모음. 딱히 들여다볼 필요 x
2) adminPage - 관리자 페이지.
2.1) bulletin - 주보 업로드 페이지.
3) auth - 로그인 api 요청에 대한 콜백 처리 함수. 콜백 코드에 따라 홈으로 이동할지, 로그인 페이지로 돌려보낼지 결정. 딱히 들여다볼 필요 x
4) data - 임시 더미 데이터를 선언해둔 폴더. 혹은 거의 변동하지 않는 데이터들을 선언함.
5) executives - 임원진 페이지
5.1) organization - 임원진 페이지 중에서 조직도 섹션
6) login - 로그인 화면
7) mainPage - 나누리 페이지 접속 시, 가장 먼저 뜨는 화면.
8) mypage- 로그인 시, 네비바에 로그인 유저의 이름이 링크로 뜸. 이걸 누르면 여기로 옴. 여기서 비밀번호를 재설정함.
9) types - 자주 이용하는 객체를 타입으로 정의하여 모아둔 폴더.
10) weekly - 주보 페이지.
11) global - 모든 페이지에 적용되는 css.
12) favicon.ico - 나누리 페이지 아이콘. 딱히 들여다볼 필요 x
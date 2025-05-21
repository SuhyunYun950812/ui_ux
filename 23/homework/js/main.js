document.addEventListener("DOMContentLoaded", function () {
  // 1. 객체 찾기
  const content = document.querySelector(".bigpicture"); // 전체레이아웃
  const imgList = document.querySelectorAll(".bigpicture img"); // 이미지배열리스트노드

  let list = [1, 0, 0, 0];
  let timerId; // timer 핸들
  // 함수 시간에 따라서 이미지 화면1, 인디게이터 1 선택이 되서 화면에 보여줘야한다.
  function listArray() {
    for (let i = 0; i < list.length; i++) {
      imgList[i].style.zIndex = list[i];
    }
  }
  for (let i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener("click", () => {
      list.unshift(list.pop());
      listArray();
    });
  }
  // 3초마다 navgateright 기능을 불러준다.
  function startTimer() {
    timerId = setInterval(() => {
      list.unshift(list.pop());
      listArray();
    }, 3000);
  }
  startTimer();
  // contain영역에 마우스가 올라가면 타이머가 멈추게 한다.
  content.addEventListener("mouseenter", () => { clearInterval(timerId) });
  // contain영역에 마우스가 빠져나가면 타이머가 작동시키게 한다.
  content.addEventListener("mouseleave", () => { startTimer() });

  document.querySelector("#callnum").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("버튼 눌림");
    alert("인증번호가 전송되었습니다!");
  });
  document.querySelector("#signup").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("버튼 눌림");
    alert("회원가입 되었습니다!");
  });
}); // End of DOMContentLoaded
// document 메모리 모두 로드가 되었을 때 onLoad() 함수 call
function onLoad() {
  // id 패턴검색을 진행할 event 정의
  let idPattern = /^[\w]{3,12}$/;
  let pwPattern = /^[\w]{6,8}$/;
  let namePattern = /^[가-힣]{1,4}|[a=zA-Z]{1}[a=zA-Z\x20]{1,10}$/;
  let nicknamePattern = /^[가-힣]{2}|[a=zA-Z]{4}[a=zA-Z\x20]{1,10}$/;
  let telPattern = /^[0-9]{9,10}$/;
  let emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  let phoneNumPattern = /^(010)-?[0-9]{3,4}-?[0-9]{4}$/;
  let birthDayPattern = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
  let checkHumanPattern = /^RcAPC6$/;

  let id = document.querySelector("#id");
  let pw = document.querySelector("#pw");
  let pwCheck = document.querySelector("#pwCheck");
  let submit = document.querySelector("#submit");
  let name = document.querySelector("#name");
  let zipcode = document.querySelector("#zipcode");
  let addrSearch = document.querySelector("#addrSearch");
  let addr1 = document.querySelector("#addr1");
  let nickname = document.querySelector("#nickname");
  let email = document.querySelector("#email");
  let tel = document.querySelector("#tel");
  let phoneNum = document.querySelector("#phoneNum");
  let birthDay = document.querySelector("#birthDay");
  let checkHuman = document.querySelector("#checkHuman");
  let reset = document.querySelector("#reset");
  let msg = document.querySelectorAll(".msg");

  // 아이디
  id.addEventListener("blur", () => {
    validate(id, idPattern, "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자 이하 입력하세요.")
  });
  // 패스워드
  pw.addEventListener("blur", () => {
    validate(pw, pwPattern, "영문자, 숫자, _만 입력 가능. 최소 6자이상 12자 이하 입력하세요.")
  });
  //패스워드 확인
  pwCheck.addEventListener("blur", () => {
    if (pw.value === pwCheck.value) {
      pwCheck.nextSibling.innerHTML = "패스워드 일치";
      pwCheck.nextSibling.style.color = "blue";
    } else {
      pwCheck.nextSibling.innerHTML = "패스워드 불일치.";
      pwCheck.nextSibling.style.color = "red";
      pwCheck.value = " ";
      pwCheck.focus();
    }
  });
  // 이름
  name.addEventListener("blur", () => {
    validate(name, namePattern, "한글 1-4자, 영어1-10자 이내로 작성하세요.");
  });
  // 닉네임
  nickname.addEventListener("blur", () => {
    validate(nickname, nicknamePattern, "한글 2자, 영어4자 이상으 로 작성하세요.");
  });
  // 이메일
  email.addEventListener("blur", () => {
    validate(email, emailPattern, "이메일 형식에 따라 정확히 입력해주세요");
  });
  // 전화번호
  tel.addEventListener("blur", () => {
    validate(tel, telPattern, "연락처가 올바르지 않습니다.");
  });
  // 휴대폰번호
  phoneNum.addEventListener("blur", () => {
    validate(phoneNum, phoneNumPattern, "연락처가 올바르지 않습니다.");
  });
  // 생년월일
  birthDay.addEventListener("blur", () => {
        validate(birthDay, birthDayPattern, "정확한 생년월일 8자리를 입력해주세요");
  });
  // 자동등록방지
  checkHuman.addEventListener("blur", () => {
    validate(checkHuman, checkHumanPattern, "자동등록방지 숫자가 일치하지 않습니다.");
  });
  // 우편번호 이벤트처리
  addrSearch.addEventListener("click", () => {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
        if (data !== null && data !== undefined) {
          console.log('zipcode', data.zonecode);
          console.log('data.roadAddress', data.roadAddress);
          zipcode.value = data.zonecode;
          addr1.value = data.roadAddress;
        } else {
          addrSearch.nextSibling.innerHTML = "daum api 오류발생으로 직접입력바람";
          zipcode.focus();
        }
      }
    }).open();
  });
  // 리셋 누를시 스팬 메시지 초기화 (미완성)
  reset.addEventListener("click",()=>{
    for(let i = 0 ; i < msg.length ; i++){
      msg[i].textContent = "";
    }
  });
  //회원가입전송기능 점검
  submit.addEventListener("click", function () {
    //회원에 전체데이터를 점검
    //아이디
    let idReturn = validate(id, idPattern, "값을 정확하게 입력요청");
    if (idReturn === false) return;
    let pwReturn = validate(pw, pwPattern, "값을 정확하게 입력요청");
    if (pwReturn === false) return;
    let nameReturn = validate(name, namePattern, "값을 정확하게 입력요청");
    if (nameReturn === false) return;
    //패스워드
    let form = document.querySelector("form");
    alert('서버에 전송');
    form.submit();
  });
  //공통으로 사용되는 함수
  function validate(inputObj, pattern, message) {
    if (inputObj.value.match(pattern)) {
      inputObj.nextSibling.innerHTML = "성공";
      inputObj.nextSibling.style.color = "blue";
      return true;
    } else {
      inputObj.nextSibling.innerHTML = message;
      inputObj.nextSibling.style.color = "red";
      inputObj.value = "";
      inputObj.focus();
      return false;
    }
  }
}
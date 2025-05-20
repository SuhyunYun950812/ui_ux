    document.addEventListener("DOMContentLoaded", function () {
      let loginIdPattern = /^ysh0812$/;
      let loginPwPattern = /^258456$/;


      let loginId = document.querySelector("#loginid");
      let loginPw = document.querySelector("#loginpw");
      let loginbtn = document.querySelector("#loginbtn");
      let loginCheck = document.querySelector("#loginCheck");

      loginbtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (loginIdPattern.test(loginId.value) && loginPwPattern.test(loginPw.value)) {
          alert("로그인 성공");
          loginCheck.textContent = "";
        } else {
          loginCheck.textContent = "아이디 혹은 비밀번호가 틀렸습니다. 다시 입력해주세요.";
          loginCheck.style.color = "red";
        }
      });
    });
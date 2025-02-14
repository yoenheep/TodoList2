$(document).ready(function () {
  $("#todayP").text(getToday());

  // 스토리지 내용 todos로 받기
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  localStorage.setItem("todos", JSON.stringify(todos)); // 빈 배열 초기화

  // todos 출력
  todos.forEach((i) => {
    addTodo(i.check, i.content, i.date);
    check();
  });

  // 더하기 버튼을 눌렀을 때
  $("#addBtn").click(function () {
    addArray();
  });

  $("#addText").on("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작 방지
      $("#addBtn").click(); // 버튼 클릭 이벤트 실행
    }
  });

  // 체크박스 눌렀을 때
  $(document).on("click", ".checkBox", function () {
    let index = $(this).parent().index();
    todos[index].check = $(this).is(":checked");

    localStorage.setItem("todos", JSON.stringify(todos));

    check();
  });

  // 삭제버튼 눌렀을 때
  $(document).on("click", ".delBtn", function () {
    let index = $(this).parent().index();
    todos.splice(index, 1); // 배열에서 항목 제거
    $(this).parent().remove(); // 화면에서 항목 제거
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos);
  });

  // 더블클릭 했을 때
  $(document).on("dblclick", ".listSpan", function () {
    if ($(this).find("input").length === 0) {
      let reInput = $(`<input type ="text" class = "reInput"/>`);
      let reBtn = $(`<button class="reBtn">✏</button>`);

      let nowText = $(this).text();
      $(this).text("");
      reInput.val(nowText);

      $(this).append(reInput);
      $(this).append(reBtn);
    }
  });

  // 수정 버튼 눌렀을 때
  $(document).on("click", ".reBtn", function () {
    let reText = $(".reInput").val(); // 수정된 텍스트

    if (reText == "") {
      alert("수정문구 작성");
    } else {
      // todos 배열에서도 해당 항목을 수정
      let index = $(this).parent().parent().index();
      todos[index].content = reText;

      $(this).parent().text(reText); // 화면에서 텍스트 수정
      $(this).parent().empty();
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log(todos);
    }
  });

  // 날짜받기
  function getToday() {
    let date = new Date();
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2)
    );
  }

  //시간받기
  function getNow() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    $("#now").text(`${hours} : ${minutes} : ${seconds}`);
  }

  setInterval(() => {
    getNow();
  }, 1000);

  // html 생성 함수
  function addTodo(check, content, date) {
    let checkBox = $(`<input type="checkbox" class="checkBox" />`);
    let newLi = $(`<li class="listLi"></li>`);
    let span = $(`<span class="listSpan">${content}</span>`);
    let delBtn = $(`<button class="delBtn">✖</button>`);
    let dateSpan = $(`<span class="listDate">${date}</span>`);

    newLi.append(checkBox);
    newLi.append(span);
    newLi.append(delBtn);
    newLi.append(dateSpan);
    checkBox.prop("checked", check);

    $("#ulList").append(newLi);
    $("#addText").val("");
  }

  // add 배열 추가
  function addArray() {
    let newContent = $("#addText").val().trim(); // 입력값 앞뒤 공백 제거

    if (newContent === "") {
      alert("문구를 작성하세요.");
      return;
    }

    // todos 배열에서 중복 체크
    let isDuplicate = todos.some((todo) => todo.content === newContent);

    if (isDuplicate) {
      alert("같은 할 일이 이미 존재합니다.");
      return;
    }

    let object = {
      check: false,
      content: newContent,
      date: getToday(),
    };
    // 로컬 스토리지 및 배열에 추가
    todos.push(object);
    localStorage.setItem("todos", JSON.stringify(todos));
    addTodo(false, newContent, getToday());
    console.log(todos);
  }

  // 체크박스 변화 함수
  function check() {
    // 클릭된 체크박스를 기준으로 스타일을 적용
    $(".checkBox").each(function () {
      if ($(this).is(":checked")) {
        $(this)
          .siblings(".listSpan")
          .css("text-decoration-line", "line-through");
      } else {
        $(this).siblings(".listSpan").css("text-decoration-line", "none");
      }
    });
  }

  /* 날씨 API */
  const API_KEY = "8bae7c1d7875e2c7ecf2c801c7799338";

  function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let sky = data.weather[0].main;
        let skyIcon = data.weather[0].icon;
        let imageurl = `https://openweathermap.org/img/wn/${skyIcon}@2x.png`;
        switch (sky) {
          case "Clear":
            $("#todayWeather").text("맑음");
            break;
          case "Wind":
            $("#todayWeather").text("바람");
            break;
          case "Clouds":
            $("#todayWeather").text("구름");
            break;
          case "Rain":
            $("#todayWeather").text("비");
            break;
          case "Snow":
            $("#todayWeather").text("눈");
            break;
        }
        $("#todayImg").attr("src", imageurl);
      });
  }

  function fail() {
    alert("날씨를 알 수 없음");
  }

  navigator.geolocation.getCurrentPosition(success, fail);
});

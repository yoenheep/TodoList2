$(document).ready(function () {
  $("#todayP").text(getToday());

  // 객체 받는 곳
  const todos = [];

  // 스토리지 내용 todos로 받기
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let data = JSON.parse(localStorage.getItem(key));
    todos.push(data);
  }

  // todos 출력
  todos.forEach((i) => {
    addTodo(i.check, i.content, i.date);
    check();
  });

  // 더하기 버튼을 눌렀을 때
  $("#addBtn").click(function () {
    if ($("#addText").val() != "") {
      let newContent = $("#addText").val(); // 내용
      let object = {
        check: false,
        content: newContent,
        date: getToday(),
      };

      // content를 key로 사용
      localStorage.setItem(newContent, JSON.stringify(object)); // 객체를 저장

      todos.push(object); // 배열에도 추가
      addTodo(false, newContent, getToday()); // 추가 함수 호출
      console.log(todos);
    } else {
      alert("문구 작성");
    }
  });

  $(document).on("click", ".checkBox", function () {
    let index = $(this).parent().index();
    todos[index].check = $(this).is(":checked");

    let key = todos[index].content;
    let checkData = JSON.parse(localStorage.getItem(key));
    checkData.check = $(this).is(":checked");
    localStorage.setItem(key, JSON.stringify(checkData));

    check();
  });

  $(document).on("click", ".delBtn", function () {
    let index = $(this).parent().index();
    let key = todos[index].content; // content를 key로 사용
    localStorage.removeItem(key); // 해당 항목 삭제
    todos.splice(index, 1); // 배열에서 항목 제거
    $(this).parent().remove(); // 화면에서 항목 제거
    console.log(todos);
  });

  $(document).on("dblclick", ".listSpan", function () {
    if ($(this).find("input").length === 0) {
      let reInput = $(`<input type ="text" class = "reInput"/>`);
      let reBtn = $(`<button class="reBtn">수정</button>`);

      let nowText = $(this).text();
      $(this).text("");
      reInput.val(nowText);

      $(this).append(reInput);
      $(this).append(reBtn);
    }
  });

  $(document).on("click", ".reBtn", function () {
    let reText = $(".reInput").val(); // 수정된 텍스트
    let oldKey = $(this).siblings(".listSpan").text(); // 수정 전 텍스트가 저장된 key

    if (reText == "") {
      alert("수정문구 작성");
    } else {
      // oldKey를 기준으로 로컬 스토리지에서 해당 데이터를 찾아 수정
      let contentData = JSON.parse(localStorage.getItem(oldKey));

      // 새로운 content와 함께 key를 업데이트
      contentData.content = reText;
      localStorage.removeItem(oldKey); // 이전 key 삭제
      localStorage.setItem(reText, JSON.stringify(contentData)); // 새로운 key로 저장

      // todos 배열에서도 해당 항목을 수정
      let index = todos.findIndex((todo) => todo.content === oldKey);
      todos[index].content = reText;

      $(this).parent().text(reText); // 화면에서 텍스트 수정
      $(this).parent().empty();
      console.log(todos);
    }
  });

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
});

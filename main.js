$(document).ready(function () {
  $("#todayP").text(getToday());

  const todos = [
    { check: true, content: "아 진짜 하기싫다...", date: "2025-02-10" },
  ];

  todos.forEach((i) => {
    addTodo(i.check, i.content, i.date);
    check();
  });

  $("#addBtn").click(function () {
    if ($("#addText").val() != "") {
      let newContent = $("#addText").val();
      todos.push({
        check: false,
        content: newContent,
        date: getToday(),
      });
      addTodo(false, newContent, getToday());
      console.log(todos);
    } else {
      alert("문구작성");
    }
  });

  $(document).on("click", ".checkBox", function () {
    let index = $(this).parent().index();
    todos[index].check = $(this).is(":checked");
    check();
  });

  $(document).on("click", ".delBtn", function () {
    let index = $(this).parent().index();
    todos.splice(index, 1);
    $(this).parent().remove();
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
    let reText = $(".reInput").val();
    let index = $(this).parent().parent().index();

    if (reText == "") {
      alert("수정문구작성");
    } else {
      todos[index].content = reText;
      $(this).parent().text(reText);
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

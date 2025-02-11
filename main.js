$(document).ready(function () {
  $("#addBtn").click(function () {
    if ($("#addText").val() != "") {
      let checkBox = $(`<input type="checkbox" id="checkBox" />`);
      let newLi = $(`<li id="listLi"></li>`);
      let span = $(`<span id="listSpan">${$("#addText").val()}</span>`);
      let delBtn = $(`<button id="delBtn">삭제</button>`);

      newLi.append(checkBox);
      newLi.append(span);
      newLi.append(delBtn);

      $("#ulList").append(newLi);
      $("#addText").val("");
    } else {
      alert("문구작성");
    }
  });

  $(document).on("click", "#checkBox", function () {
    if ($(this).is(":checked")) {
      $("#listSpan").css("text-decoration-line", "line-through");
    } else {
      $("#listSpan").css("text-decoration-line", "none");
    }
  });

  $(document).on("click", "#delBtn", function () {
    $(this).parent().remove();
  });

  $(document).on("dblclick", "#listSpan", function () {
    if ($(this).find("input").length === 0) {
      let reInput = $(`<input type ="text" id = "reInput"/>`);
      let reBtn = $(`<button id="reBtn">수정</button>`);

      let nowText = $(this).text();
      $(this).text("");
      reInput.val(nowText);

      $(this).append(reInput);
      $(this).append(reBtn);
    }
  });

  $(document).on("click", "#reBtn", function () {
    let reText = $("#reInput").val();

    if (reText == "") {
      alert("수정문구작성");
    } else {
      $(this).parent().text(reText);

      $(this).parent().empty();
    }
  });
});

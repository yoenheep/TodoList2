$(document).ready(function () {
  console.log("ready");
  $("#addBtn").click(function () {
    let newLi = `<li id="listLi">${$("#addText").val()}</li>`;
    let delBtn = `<button id="delBtn">삭제</button>`;
    $("#ulList").append(newLi);
    newLi.append(delBtn);
  });

  $("#delBtn").click(function () {
    $(this).unwrap();
  });
});

const startDate = document.getElementById("start-date-i");
const endDate = document.getElementById("end-date-i");
const startDateString = document.getElementById("startDate");
const endDateString = document.getElementById("endDate");

$(document).ready(function () {
  $(startDate).datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    todayHighlight: true,
    orientation: "bottom",
  });

  $(startDate).on("changeDate", function (e) {
    const selectDate = e.date;
    const formatedDate = formatDate(selectDate);
    startDateString.value = formatedDate;
    $(startDate).datepicker("hide");
  });

  $(endDate).datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    todayHighlight: true,
    orientation: "bottom",
  });

  $(endDate).on("changeDate", function (e) {
    const selectDate = e.date;
    const formatedDate = formatDate(selectDate);
    endDateString.value = formatedDate;
    $(endDate).datepicker("hide");
  });

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  document
    .getElementById("showCalendarBtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const parts = startDateString.value.split("/").join("");
      const numberStartdate = parseInt(parts, 10);
      const parts2 = endDateString.value.split("/").join("");
      const numberEnddate = parseInt(parts2, 10);
      console.log(parts, parts2);
      if (numberStartdate > numberEnddate) {
        alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
        return;
      }
    });
});

const startDate = document.getElementById("start-date-i");
const endDate = document.getElementById("end-date-i");
const startDateString = document.getElementById("startDate");
const endDateString = document.getElementById("endDate");

// function checkRequired2(inputArr){
//       let isRequired = false
//       inputArr.forEach(input=>{
//        if(input.value.trim()===''){
//         showError(input,`*${getFieldName(input)} is required` )
//         isRequired =true
//        }else{
//         showSuccess(input)
//        }
//       })
//       return isRequired
// }
// function getFieldName(input) {
//   return input.name.charAt(0).toUpperCase() + input.name.slice(1)
// }
// function showError(input, message) {
//   const formControl = input.parentElement
//   formControl.className = 'form-control error'
//   const small = formControl.querySelector('small')
//   small.innerText = message
//   small.style.color = 'red'
// }
// // Show success outline
// function showSuccess(input) {
//   const formControl = input.parentElement
//   formControl.className = 'form-control success'
//   const small = formControl.querySelector('small')
//   small.innerText = ''
// }
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
    return `${year}-${month}-${day}`;
  }

  document
    .getElementById("showCalendarBtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const parts = startDateString.value.split("-").join("");
      const numberStartdate = parseInt(parts, 10);
      const parts2 = endDateString.value.split("-").join("");
      const numberEnddate = parseInt(parts2, 10);
      console.log(startDateString.value, endDateString.value);
      // if(checkRequired2([startDateString,endDateString])){
      //   return
      // }
      if (numberStartdate >= numberEnddate ) {
        alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
        return;
      }
      fetch(`/api/totalAmout?startDate=${new Date(startDateString.value)}&endDate=${new Date(endDateString.value)}`)
      .then(res => res.json())
      .then(data => {
        if(data.message ==="success"){
          document.getElementById("result_total").textContent=`Doanh thu từ ${startDateString.value} đến ${endDateString.value} là: ${data.total.toLocaleString()} VNĐ`
          document.getElementById("result_total").style.fontWeight ='bold' 
          document.getElementById("title").textContent = "Sản phẩm đã bán"
          const productSoltOut = data.uniqueProduct.map((product) => `
        <div class="col-lg-4 mb-4 text-center">
          <div class="product-entry border">
            <a class="prod-img">
              <img src="${product.imageDefault}" class="img-fluid" alt="Fstyle shop">
            </a>
            <div class="desc">
              <h2><a href="#">${product.name}</a></h2>
              <span class="price">Giá: ${product.price.toLocaleString()} VNĐ</span>
              <span class="price">Số lượng đã bán: ${product.soldQuantity}</span>
            </div>
          </div>
        </div>
        `
          )
          .join("");
    
        document.getElementById("product-list-sold-out").innerHTML = productSoltOut;
        }else{
          alert(data.message)
        }
      })
    });
});

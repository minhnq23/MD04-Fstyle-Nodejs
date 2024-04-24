fetch("/api/orders")
  .then((response) => response.json())
  .then((data) => {
    if (data.message === "All orders retrieved successfully") {
      $(".cart .icon-shopping-cart").text(`Order[${data.orders.length}]`);
      displayOrder(data.orders);
    }
  })
  .catch((error) => console.error("Error fetching orders:", error));

function displayOrder(orders) {
  const tableOrder = document.getElementById("order-table-body");
  tableOrder.innerHTML = "";

  orders.forEach((order) => {
    const newRow = document.createElement("tr");
    newRow.setAttribute("data-order-id", order._id);
    newRow.innerHTML = `
        <td class= 'h6'>${order._id}</td>
        <td class= 'h6'>${order.idUser}</td>
        <td class= 'h6'>${order.quantity}</td>
        <td class= 'h6'>${order.status}</td>
        <td class= 'h6'>${order.timeOrder}</td>
        <a href="${order._id}" style="color: #007bff; text-decoration: none; text-align: center; display: block;">Chi tiết</a>
       
        `;
    tableOrder.appendChild(newRow);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các hàng (rows) trong bảng
  const rows = document.querySelectorAll("#order-table-body tr");

  // Lặp qua từng hàng và gán event listener cho mỗi hàng
  rows.forEach(function (row) {
    row.addEventListener("click", function () {
      // Xử lý sự kiện click ở đây
      // Ví dụ: In ra ID của hàng khi click vào
      const orderId = row.getAttribute("data-order-id");
      alert("Đã click vào hàng có ID:", orderId);
    });
  });
});

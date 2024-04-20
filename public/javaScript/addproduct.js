const nameInput = document.getElementById("product-name");
const brandInput = document.getElementById("product-brand");
const sizeInput = document.getElementById("product-size");
const priceInput = document.getElementById("product-price");
const colorInput = document.getElementById("product-color");
const quantityInput = document.getElementById("product-quantity");
const descriptionInput = document.getElementById("product-description");
const categorySelect = document.getElementById("product-category-name"); // Đã sửa đổi thành categorySelect
const imageInput = document.getElementById("product-image");
const addButton = document.getElementById("btn-add");
const nameError = document.querySelector("#productname-error");
const imageError = document.querySelector("#productimage-error");

// Kiểm tra tên sản phẩm
function checkName(nameInput) {
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Vui lòng nhập tên sản phẩm";
    return false;
  }
  return true;
}

// Kiểm tra ảnh được chọn
function checkImageSelected(imageInput) {
  if (imageInput.value.trim() === "") {
    imageError.textContent = "Vui lòng nhập link ảnh";
    return false;
  }
  return true;
}

fetch("/api/get/categories")
  .then((response) => response.json())
  .then((data) => {
    displayCategories(data.categories);
    console.log(data.categories);
  })
  .catch((error) => console.error("Lỗi khi lấy dữ liệu thể loại:", error));

  function displayCategories(categories) {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  }

function getCategoryValue() {
  if (categorySelect.selectedIndex !== -1) {
    return categorySelect.options[categorySelect.selectedIndex].textContent;
  } else {
    console.error("Không có thể loại nào được chọn");
    return null;
  }
}

addButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (!checkName(nameInput) || !checkImageSelected(imageInput)) {
    return;
  }

  fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      image: imageInput.value,
      brand: brandInput.value,
      size: sizeInput.value,
      price: priceInput.value,
      color: colorInput.value,
      quantity: quantityInput.value,
      description: descriptionInput.value,
      category: getCategoryValue(),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Thêm sản phẩm thành công") {
        alert(data.message);
        window.location.href = "/products";
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      alert("Lỗi: " + err);
    });
});

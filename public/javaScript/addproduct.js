const nameInputPro = document.getElementById("product-name");
const brandInput = document.getElementById("product-brand");
let checkboxes = document.querySelectorAll('input[name="size"]:checked');
const priceInput = document.getElementById("product-price");
const colorInput = document.getElementById("product-color");
const quantityInput = document.getElementById("product-quantity");
const descriptionInput = document.getElementById("product-description");
const categorySelect = document.getElementById("product-category-name"); 
const imageInputPro = document.getElementById("product-image");
const addButtonPro = document.getElementById("btn-add-product");
const nameErrorPro = document.querySelector("#productname-error");
const brandError = document.querySelector("#brand-error");
const priceError = document.querySelector("#price-error");
const sizeError = document.querySelector("#size-error");
const quantityError = document.querySelector("#quantity-error");
const colorError = document.querySelector("#color-error");
const descError = document.querySelector("#description-error");
const imageErrorPro = document.querySelector("#productimage-error");

let idCategory='';

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
      if (input.value.trim() === '') {
          showError(input, `*${getFieldName(input)} is required`)
          isRequired = true
      }else {
          showSuccess(input)
      }
  })
  return isRequired
}
// Get fieldname
function getFieldName(input) {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1)
}
// Show input error message
function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message
  small.style.color = 'red'
}
// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
  const small = formControl.querySelector('small')
  small.innerText = ''
}
//phần liên quan category
populateCategorySelect();
async function loadCategories() {
  try {
    const response = await fetch("/api/get/categories");
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Error loading categories:", error);
    return [];
  }
}

async function populateCategorySelect() {
  const categories = await loadCategories();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category._id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}
categorySelect.addEventListener("change", function() {
  idCategory = categorySelect.options[categorySelect.selectedIndex].value;
});

function checkCategorySelected(){
    if(!idCategory &&categorySelect.options.length >0){
      idCategory = categorySelect.options[0].value;
      console.log(idCategory)
    }
}
//end category
//phần size
function getSelectedSizes() {
  checkboxes = document.querySelectorAll('input[name="size"]:checked');
  let selectedSizes = [];
  checkboxes.forEach(function(checkbox) {
    selectedSizes.push(checkbox.value);
  });
  const selectedSizesString = selectedSizes.join(",");
  return selectedSizesString;
}
function convertSize(size){
  const mang = size.split(",");
  return mang;
}
function checkSizeSelected() {
  const selectedSizes = getSelectedSizes();
  if (selectedSizes === '') {
    sizeError.innerText='*Size is required'
    sizeError.style.color='red'
    return false;
  } else {
    sizeError.innerText=""
    return true;
  }
}
//end size
//click
addButtonPro.addEventListener("click", function (e) {
  e.preventDefault();
  checkCategorySelected();
  console.log(getSelectedSizes());
  if (checkRequired([nameInputPro, brandInput, priceInput, quantityInput, colorInput, descriptionInput,imageInputPro])&&!checkSizeSelected()) {
    return;
  }
  createProduct()
});
async function createProduct(){
  const arrayImage = imageInputPro.value.split(',')
  const newProduct = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInputPro.value,
      image64: arrayImage,
      brand: brandInput.value,
      size: convertSize(getSelectedSizes()),
      price: priceInput.value,
      color: colorInput.value,
      quantity: quantityInput.value,
      description: descriptionInput.value,
      categoryId: idCategory,
    }),
  })
    const data = await newProduct.json()
      if (data.message === "Sản phẩm được thêm thành công") {
        alert(data.message)
        window.location.replace("/products");
      } else {
        alert(data.message);
      }
}

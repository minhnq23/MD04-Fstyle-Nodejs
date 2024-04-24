const query_search_product = document.getElementById("query-search-product");
const btn_search_product = document.getElementById("btn-search");
let dataProducts = [];
let dataCategory2 = [];
fetch("/api/get/categories")
  .then((res) => res.json())
  .then((data) => {
    dataCategory2 = data.categories;
  })
  .catch((err) => console.log("err:", err));
//
function getNamecategoryById(categoryId, listCategory) {
  const category = listCategory.find((cat) => cat._id === categoryId);
  return category ? category.name : null;
}
//
fetch("/api/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(dataProducts);
    dataProducts = data.products;

    displayProducts(dataProducts);
  })
  .catch((error) => console.error("Error fetching products:", error));

btn_search_product.addEventListener("click", function (e) {
  e.preventDefault();
  const result_search = query_search_product.value.trim().toLowerCase();

  const filteredProduct = dataProducts.filter((products) => {
    return products.name.toLowerCase().includes(result_search);
  });

  displayProducts(filteredProduct);
});

function displayProducts(products) {
  const tableBody1 = document.getElementById("products-list");
  tableBody1.innerHTML = "";

  products.forEach((product) => {
    console.log(product);
    const newRow = document.createElement("tr");
    let imageSrc = product.image64[0];
    if (imageSrc.startsWith("http")) {
      newRow.innerHTML = `
        <td class="h5">${product._id}</td>
        <td class="h5">${product.name}</td>
        <td> <img src="${imageSrc}" style="max-width: 100px; max-height: 100px;" class="rounded mx-auto d-block" alt="Fstyle shop"></td>
        <td class="h5">${product.brand}</td>
        <td class="h5">${product.size}</td>
        <td class="h5">${product.price}</td>
        <td class="h5">${product.color}</td>
        <td class="h5">${product.quantity}</td>
        <td class="h5">${product.status}</td>
        <td class="h5">${product.description}</td>
        <td class="h5">${getNamecategoryById(
          product.category,
          dataCategory2
        )}</td>
      `;
    } else {
      newRow.innerHTML = `
        <td class="h5">${product._id}</td>
        <td class="h5">${product.name}</td>
        <td class="h5">${product.brand}</td>
        <td class="h5">${product.category.id}</td>
      `;
    }

    tableBody1.appendChild(newRow);
  });
}
document
  .getElementById("add-product-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "/addproduct";
  });

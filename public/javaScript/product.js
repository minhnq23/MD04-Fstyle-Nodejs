const query_search_product = document.getElementById("query-search-product");
const btn_search_product = document.getElementById("btn-search-product");
let dataProducts = [];
let nameCategory='';
//get name ccategory
async function getNamecategory(idCategory) {
  try {
    const response = await fetch(`/api/get/categories/${idCategory}`);
    const data = await response.json(); 
    return data.category.name;
  } catch (error) {
    console.error("err_name_category:", error);
    return "Error";
  }
}
fetch("/api/products")
  .then((response) => response.json())
  .then((data) => {
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

async function displayProducts(products) {
  const tableBody1 = document.getElementById("products-list");
  tableBody1.innerHTML = "";

  for (const product of products) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="h5">${product._id}</td>
      <td class="h5">${product.name}</td>
      <td> <img src="${product.image64[0]}" style="max-width: 100px; max-height: 100px;" class="rounded mx-auto d-block" alt="Fstyle shop"></td>
      <td class="h5">${product.brand}</td>
      <td class="h5">${product.size}</td>
      <td class="h5">${product.price.toLocaleString()}</td>
      <td class="h5">${product.color}</td>
      <td class="h5">${product.quantity}</td>
      <td class="h5">${product.quantity===0 ?"Hết hàng": "Còn hàng"}</td>
      <td class="h5">${product.description}</td>
      <td class="h5">${await getNamecategory(product.category)}</td>
    `;
    tableBody1.appendChild(newRow);
  }
}
document.getElementById('add-product-btn').addEventListener('click', async function(e){
  e.preventDefault();
  window.location.href="/addproduct";
})

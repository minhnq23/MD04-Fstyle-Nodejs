const query_search = document.getElementById("query-search");
const btn_search = document.getElementById("btn-search");
let dataCategory = [];

fetch("/api/get/categories")
  .then((response) => response.json())
  .then((data) => {
    dataCategory = data.categories;
    console.log(dataCategory)
    displayCategories(dataCategory);
  })
  .catch((error) => console.error("Error fetching products:", error));

btn_search.addEventListener("click", function (e) {
  e.preventDefault();
  const result_search = query_search.value.trim().toLowerCase();

  const filteredCategories = dataCategory.filter((category) => {
    return category.name.toLowerCase().includes(result_search);
  });

  displayCategories(filteredCategories);
});

function displayCategories(categories) {
  const tableBody = document.getElementById("category-table-body");
  tableBody.innerHTML = ""; // Xóa bảng hiện có để hiển thị kết quả tìm kiếm mới

  categories.forEach((category) => {
    const newRow = document.createElement("tr");
    let imageSrc = category.image;
    
      newRow.innerHTML = `
                <td class="h5">${category._id}</td>
                <td class="h5">${category.name}</td>
                <td> <img src="${imageSrc}" style="max-width: 100px; max-height: 100px;" class="rounded mx-auto d-block" alt="Fstyle shop"></td>
            `;
    
        tableBody.appendChild(newRow);
    });
}
document.getElementById("add-category-btn").addEventListener('click', function(){
    window.location.href="addcategory";
})
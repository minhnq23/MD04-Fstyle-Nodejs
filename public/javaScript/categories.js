const query_search = document.getElementById("query-search");
const btn_search = document.getElementById("btn-search");
let dataCategory = [];

fetch("/api/get/categories")
  .then((response) => response.json())
  .then((data) => {
    displayCategories(data.categories)
    dataCategory = data.categories
  })
  .catch((error) => console.error("Error fetching category:", error));

btn_search.addEventListener("click", function (e) {
  e.preventDefault();
  const result_search = query_search.value.trim().toLowerCase();

  const filteredCategories = dataCategory.filter((category) => {
    return category.name.toLowerCase().includes(result_search);
  });

  displayCategories(filteredCategories);
});

async function displayCategories(categories) {
  const tableBody = document.getElementById("category-table-body");
  tableBody.innerHTML = ""; // Xóa bảng hiện có để hiển thị kết quả tìm kiếm mới

 await categories.forEach((category) => {
    const newRow = document.createElement("tr");
   
      newRow.innerHTML = `
                <td class="h5">${category._id}</td>
                <td class="h5">${category.name}</td>
                <td> <img src="${category.image}" style="max-width: 100px; max-height: 100px;" class="rounded mx-auto d-block" alt="Fstyle shop"></td>
            `;
    
        tableBody.appendChild(newRow);
    });
}
document.getElementById("add-category-btn").addEventListener('click', function(){
    window.location.href ="addcategory";
})
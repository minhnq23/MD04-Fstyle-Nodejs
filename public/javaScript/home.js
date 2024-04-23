// fetch("/api/products")
//   .then((response) => response.json())
//   .then((data) => {
//     const productListHTML = data.products
//       .map(
//         (product) => `
//     <div class="col-lg-3 mb-4 text-center">
//       <div class="product-entry border">
//         <a href="#" class="prod-img">
//           <img src="${product.image64[0]}" class="img-fluid" alt="Fstyle shop">
//         </a>
//         <div class="desc">
//           <h2><a href="#">${product.name}</a></h2>
//           <span class="price">${product.price} VNĐ</span>
//         </div>
//       </div>
//     </div>
//     `
//       )
//       .join("");

//     document.getElementById("products-list").innerHTML = productListHTML;
//   })
//   .catch((error) => console.error("Error fetching products:", error));

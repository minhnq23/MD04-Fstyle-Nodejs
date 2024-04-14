const endpoint = "/api/products";
fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const productListHTML = data.products.map(product =>   `
    <div class="col-lg-3 mb-4 text-center">
      <div class="product-entry border">
        <a href="#" class="prod-img">
          <img src="data:image/jpeg;base64,${product.image64[0]}" class="img-fluid" alt="Free html5 bootstrap 4 template">
        </a>
        <div class="desc">
          <h2><a href="#">${product.name}</a></h2>
          <span class="price">$${product.price}</span>
        </div>
      </div>
    </div>
    `).join('');

    document.getElementById('product-list-container').innerHTML = productListHTML;
  })
  .catch(error => console.error('Error fetching products:', error));

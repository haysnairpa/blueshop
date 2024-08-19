let allProducts = [];
let currentProductIndex = 0;
let productsPerPage = 8;

const displayProducts = (products) => {
  const $productContainer = $(".recom-card-container");
  $productContainer.empty();

  if (products.length === 0) {
    $productContainer.html(`<p class="text-center text-gray-600">No products found</p>`)
  } else {
    products.forEach((product) => {
        const $productCard = createProductCard(product);
        $productContainer.append($productCard);
    });
  }

};

const categoryBtn = {
  "mens-categories": "men's clothing",
  "womens-categories": "women's clothing",
  "jewerly-categories": "jewelery",
  "tech-categories": "electronics",
};

$(".category-icon").on("click", function () {
  const categoryId = $(this).attr("id");
  const categoryName = categoryBtn[categoryId];

  if (categoryName) {
    displayProductsByCategories(categoryName);
    $("#show-more-btn").hide();
  }
});

const displayProductsByCategories = (id) => {
  const filterCategories = $.grep(allProducts, function (product) {
    return product.category === id;
  });
  $(".recom-card-container").empty();
  displayProducts(filterCategories);
};

// BELOW IS THE ANOTHER WAY TO FILTER CATEGORIES

// $('#mens-categories').on('click', function() {
//     displayProductsByCategories('men\'s clothing')
// })
// $('#womens-categories').on('click', function() {
//     displayProductsByCategories('women\'s clothing')
// })
// $('#jewerly-categories').on('click', function() {
//     displayProductsByCategories('jewelery')
// })
// $('#tech-categories').on('click', function() {
//     displayProductsByCategories('electronics')
// })

// END OF ANOTHER WAY

$('form').on('submit', function (e) {
    e.preventDefault()

    const searchTerm = $('#search-input').val().toLowerCase().trim()

    if (searchTerm) {
        const filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        )
        displayProducts(filteredProducts)
        $('#show-more-btn').hide()
    } else {
        displayProducts(allProducts)
    }
})

const loadMoreProducts = () => {
  const nextProducts = allProducts.slice(
    currentProductIndex,
    currentProductIndex + productsPerPage
  );
  displayProducts(nextProducts);
  currentProductIndex += productsPerPage;

  if (currentProductIndex >= allProducts.length) {
    $("#show-more-btn").hide();
  }
};

const createProductCard = (product) => {
  const $productCard = $("<div></div>")
    .addClass(
      "recom-card w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    )
    .attr("data-id", product.id);

  $productCard.html(`
        <div class="recom-img-container w-full h-64 bg-gray-200 bg-white relative">
            <img src="${product.image}" alt="${product.title}" class="products h-full w-full object-contain p-4">
        </div>

        <div class="text-desc p-4 flex flex-col justify-between h-40">
            <p class="products-name font-bold text-sm md:text-lg text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">${product.title}</p>
            <div class="flex items-center justify-between mt-2">
                <p class="products-price text-lg font-semibold text-gray-900">$<span class='text-black font-bold'>${product.price}</span></p>
                <button class="add-products text-sm text-white bg-[var(--third)] hover:bg-blue-700 py-2 px-4 rounded-lg">Add to Cart</button>
            </div>
        </div>
    `);

  $productCard.on("click", function (event) {
    if ($(event.target).closest(".add-products").length === 0) {
      const selectedProduct = product;
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
      window.location.href = `/productDetail.html`;
    }
  });

  return $productCard;
};

$.getJSON("https://fakestoreapi.com/products", (data) => {
  allProducts = data;
  loadMoreProducts();
}).fail((error) => {
  console.error("Error:", error);
});

$("#show-more-btn").on("click", function () {
  loadMoreProducts();
});

$(document).on("click", ".add-products", function (event) {
  event.stopPropagation();
  event.preventDefault();

  const $productCard = $(this).closest(".recom-card");
  const name = $productCard.find(".products-name").text();
  const price = $productCard.find(".products-price span").text();
  const img = $productCard.find(".products").attr("src");

  let itemFound = false;

  shopList.forEach((list) => {
    if (list.name === name) {
      itemFound = true;
      list.count++;
    }
  });

  if (!itemFound) {
    shopList.push({
      name,
      price,
      img,
      count: 1,
    });
  }

  localStorage.setItem("shopList", JSON.stringify(shopList));

  cartNums++;

  cartNumsContainer.html(cartNums);
  localStorage.setItem("cartNums", JSON.stringify(cartNums));
  console.log(shopList);
});

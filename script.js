const products = [
  {
    id: 1,
    name: "Смартфон Samsung Galaxy S23",
    price: 25000,
    img: "https://via.placeholder.com/200x150?text=Samsung+S23",
    description: "Сучасний смартфон з 8GB RAM та 256GB пам'яті, камера 108MP."
  },
  {
    id: 2,
    name: "Ноутбук MacBook Air M2",
    price: 45000,
    img: "https://via.placeholder.com/200x150?text=MacBook+Air",
    description: "Легкий ноутбук для роботи та навчання, процесор Apple M2, 16GB RAM."
  },
  {
    id: 3,
    name: "Навушники Sony WH-1000XM4",
    price: 7000,
    img: "https://via.placeholder.com/200x150?text=Sony+Headphones",
    description: "Безпровідні навушники з активним шумопоглинанням та високоякісним звуком."
  },
  {
    id: 4,
    name: "Ігрова приставка PlayStation 5",
    price: 18000,
    img: "https://via.placeholder.com/200x150?text=PS5",
    description: "Консоль нового покоління для ігор у 4K, швидкий SSD і підтримка VR."
  },
  {
    id: 5,
    name: "Смарт-годинник Apple Watch Series 9",
    price: 12000,
    img: "https://via.placeholder.com/200x150?text=Apple+Watch",
    description: "Смарт-годинник з моніторингом здоров'я, GPS та водозахистом."
  },
  {
    id: 6,
    name: "Фотоапарат Canon EOS R6",
    price: 60000,
    img: "https://via.placeholder.com/200x150?text=Canon+EOS+R6",
    description: "Бездзеркальний фотоапарат з 20MP, 4K відео та високою швидкістю серійної зйомки."
  }
];

// Кошик
const cart = [];

const productsContainer = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

function updateCart() {
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total;
}

function addProductToCart(product) {
  cart.push(product);
  updateCart();
}

function toggleDescription(descEl) {
  descEl.style.display = descEl.style.display === "block" ? "none" : "block";
}

function renderProducts() {
  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="description">${product.description}</div>
      <p>Ціна: ${product.price} грн</p>
      <button>Додати в кошик</button>
    `;

    const title = productDiv.querySelector("h3");
    const description = productDiv.querySelector(".description");
    title.addEventListener("click", () => toggleDescription(description));

    const btn = productDiv.querySelector("button");
    btn.addEventListener("click", () => addProductToCart(product));

    productsContainer.appendChild(productDiv);
  });
}

renderProducts();
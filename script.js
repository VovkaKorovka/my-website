const products = [
  { id: 1, name: "Смартфон Samsung Galaxy S23", price: 25000, img: "https://cdn.samsungshop.com.ua/products/7491/cover/163274/Rectangle-122-large-webp-large.webp", description: "Сучасний смартфон з 8GB RAM та 256GB пам'яті, камера 108MP." },
  { id: 2, name: "Ноутбук MacBook Air M2", price: 45000, img: "https://3d-model.net/uploads/posts/2023-12/noutbuk-macbook-air-m2-2022-ot-apple-0.jpg", description: "Легкий ноутбук для роботи та навчання, процесор Apple M2, 16GB RAM." },
  { id: 3, name: "Навушники Sony WH-1000XM4", price: 7000, img: "https://tse4.mm.bing.net/th/id/OIP.ucpUS0IU8lXH7XXQvU3l5QHaK_?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Безпровідні навушники з активним шумопоглинанням та високоякісним звуком." }
];

// Кошик {productId: quantity}
const cart = {};

const productsContainer = document.getElementById("products");
const cartSummary = document.getElementById("cart-summary");
const cartModal = document.getElementById("cart-modal");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

const viewCartBtn = document.getElementById("view-cart");
const cartClose = document.getElementById("cart-close");

// Модалка товару
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const modalAdd = document.getElementById("modal-add");
const modalClose = document.getElementById("modal-close");

let currentProduct = null;

function updateCartSummary() {
  const totalQty = Object.values(cart).reduce((a,b)=>a+b,0);
  const totalPrice = Object.entries(cart).reduce((sum,[id,qty])=>{
    const p = products.find(p=>p.id==id);
    return sum + p.price*qty;
  },0);
  cartSummary.textContent = `Кошик: ${totalQty} товарів | ${totalPrice} грн`;
}

function addProductToCart(product) {
  if(cart[product.id]) cart[product.id]++;
  else cart[product.id]=1;
  updateCartSummary();
}

function openModal(product) {
  currentProduct = product;
  modalImg.src = product.img;
  modalName.textContent = product.name;
  modalDescription.textContent = product.description;
  modalPrice.textContent = product.price;
  modal.style.display = "block";
}

function closeModal() { modal.style.display="none"; }

modalClose.addEventListener("click", closeModal);
window.addEventListener("click",(e)=>{ if(e.target===modal) closeModal(); });
modalAdd.addEventListener("click",()=>{ if(currentProduct){ addProductToCart(currentProduct); closeModal(); } });

// Кошик
viewCartBtn.addEventListener("click",()=>{
  cartItemsDiv.innerHTML="";
  for(const [id, qty] of Object.entries(cart)){
    const p = products.find(pr=>pr.id==id);
    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${p.name} - ${qty} шт. - ${p.price*qty} грн`;
    cartItemsDiv.appendChild(itemDiv);
  }
  const totalPrice = Object.entries(cart).reduce((sum,[id,qty])=>{
    const p = products.find(pr=>pr.id==id);
    return sum + p.price*qty;
  },0);
  cartTotalEl.textContent = totalPrice;
  cartModal.style.display="block";
});

cartClose.addEventListener("click",()=>cartModal.style.display="none");
window.addEventListener("click",(e)=>{ if(e.target===cartModal) cartModal.style.display="none"; });

// Відображення товарів
function renderProducts(){
  products.forEach(product=>{
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML=`
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Ціна: ${product.price} грн</p>
      <button>Додати в кошик</button>
    `;
    const title = div.querySelector("h3");
    const btn = div.querySelector("button");
    title.addEventListener("click",()=>openModal(product));
    btn.addEventListener("click",()=>addProductToCart(product));
    productsContainer.appendChild(div);
  });
}

renderProducts();
updateCartSummary();
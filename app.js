const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Italian",
    price: 11.99,
    description: "Wood-fired crust, basil, tomato, and mozzarella.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Paneer Tikka Bowl",
    category: "Indian",
    price: 10.5,
    description: "Smoky paneer, rice, pickled onions, and mint chutney.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Spicy Ramen",
    category: "Japanese",
    price: 12.75,
    description: "Rich broth, noodles, soft egg, and chili oil.",
    image: "https://images.unsplash.com/photo-1618889482923-38250401a84e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Crispy Tacos",
    category: "Mexican",
    price: 9.99,
    description: "Chicken, salsa fresca, corn, and chipotle crema.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Avocado Salad",
    category: "Healthy",
    price: 8.25,
    description: "Greens, avocado, cucumber, and lemon dressing.",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Smash Burger",
    category: "American",
    price: 13.5,
    description: "Double patty, cheddar, caramelized onions, and pickles.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Butter Chicken",
    category: "Indian",
    price: 12.25,
    description: "Creamy tomato curry with tender chicken and naan.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Falafel Wrap",
    category: "Middle Eastern",
    price: 9.5,
    description: "Crispy falafel, tahini, pickles, and fresh herbs.",
    image: "https://images.unsplash.com/photo-1662116765994-1e4200c43589?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "Pad Thai",
    category: "Thai",
    price: 11.75,
    description: "Rice noodles, peanuts, bean sprouts, and lime.",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "Caesar Chicken Wrap",
    category: "American",
    price: 9.25,
    description: "Grilled chicken, romaine, parmesan, and Caesar dressing.",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    name: "Veggie Sushi Set",
    category: "Japanese",
    price: 13.2,
    description: "Assorted cucumber, avocado, and tempura rolls.",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    name: "Greek Salad Bowl",
    category: "Healthy",
    price: 8.95,
    description: "Feta, olives, tomato, cucumber, and oregano vinaigrette.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 13,
    name: "BBQ Chicken Pizza",
    category: "Italian",
    price: 12.99,
    description: "BBQ sauce, roasted chicken, onions, and mozzarella.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 14,
    name: "Korean Rice Bowl",
    category: "Korean",
    price: 12.1,
    description: "Gochujang chicken, sesame rice, kimchi, and greens.",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=80"
  }
];

const state = {
  activeCategory: "All",
  search: "",
  cart: []
};

const menuGrid = document.getElementById("menu-grid");
const categoryFilters = document.getElementById("category-filters");
const searchInput = document.getElementById("search-input");
const cartItems = document.getElementById("cart-items");
const subtotal = document.getElementById("subtotal");
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");
const viewCartBtn = document.getElementById("view-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");
const foodCardTemplate = document.getElementById("food-card-template");

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function categories() {
  return ["All", ...new Set(foods.map((food) => food.category))];
}

function filteredFoods() {
  return foods.filter((food) => {
    const passCategory = state.activeCategory === "All" || food.category === state.activeCategory;
    const q = state.search.trim().toLowerCase();
    const passSearch = !q || food.name.toLowerCase().includes(q) || food.description.toLowerCase().includes(q);
    return passCategory && passSearch;
  });
}

function addToCart(id) {
  const target = foods.find((food) => food.id === id);
  const existing = state.cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: target.id, name: target.name, price: target.price, qty: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  renderCart();
}

function renderCategories() {
  categoryFilters.innerHTML = "";
  categories().forEach((name) => {
    const btn = document.createElement("button");
    btn.className = `chip ${state.activeCategory === name ? "active" : ""}`;
    btn.textContent = name;
    btn.addEventListener("click", () => {
      state.activeCategory = name;
      renderCategories();
      renderMenu();
    });
    categoryFilters.appendChild(btn);
  });
}

function renderMenu() {
  const list = filteredFoods();
  menuGrid.innerHTML = "";

  if (!list.length) {
    const empty = document.createElement("p");
    empty.textContent = "No dishes match this filter.";
    menuGrid.appendChild(empty);
    return;
  }

  list.forEach((food) => {
    const node = foodCardTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector("img").src = food.image;
    node.querySelector("img").alt = food.name;
    node.querySelector(".category").textContent = food.category;
    node.querySelector("h3").textContent = food.name;
    node.querySelector(".desc").textContent = food.description;
    node.querySelector(".price").textContent = money(food.price);
    node.querySelector(".add-btn").addEventListener("click", () => addToCart(food.id));
    menuGrid.appendChild(node);
  });
}

function renderCart() {
  cartItems.innerHTML = "";

  if (!state.cart.length) {
    const empty = document.createElement("p");
    empty.textContent = "Cart is empty.";
    cartItems.appendChild(empty);
  } else {
    state.cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div>
          <p><strong>${item.name}</strong></p>
          <p class="meta">${item.qty} x ${money(item.price)}</p>
        </div>
        <div>
          <p><strong>${money(item.price * item.qty)}</strong></p>
          <button data-remove-id="${item.id}">Remove</button>
        </div>
      `;
      row.querySelector("button").addEventListener("click", () => removeFromCart(item.id));
      cartItems.appendChild(row);
    });
  }

  const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  subtotal.textContent = money(total);
  cartCount.textContent = String(state.cart.reduce((sum, item) => sum + item.qty, 0));
}

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderMenu();
});

viewCartBtn.addEventListener("click", () => {
  cartPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

checkoutBtn.addEventListener("click", () => {
  if (!state.cart.length) {
    alert("Your cart is empty.");
    return;
  }
  alert(`Order placed! Total: ${subtotal.textContent}`);
  state.cart = [];
  renderCart();
});

renderCategories();
renderMenu();
renderCart();

const navbarNav = document.querySelector(".navbar-nav");
const menu = document.querySelector("#menu");
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
const search = document.querySelector("#search");
const shoppingCartList = document.querySelector(".shopping-cart-list");
const cart = document.querySelector("#shopping-cart-button");

// function for icons
const iconsFunction = {
  menuFunction: () => {
    if (navbarNav.classList.contains("active")) {
      menu.style.color = "#b6895b";
    } else {
      menu.style.color = "white";
    }
  },

  searchFunction: () => {
    if (searchForm.classList.contains("active")) {
      search.style.color = "#b6895b";
      
    } else {
      search.style.color = "white";

    }
  },

  cartFunction: () => {
    if (shoppingCartList.classList.contains("active")) {
      cart.style.color = "#b6895b";
      document.body.style.overflow = 'hidden';
    } else {
      cart.style.color = "white";
      document.body.style.overflow = 'auto';
    }
  },
};

// event icons
menu.addEventListener("click", (e) => {
  navbarNav.classList.toggle("active");

  iconsFunction.menuFunction();
  e.preventDefault();
});

search.addEventListener("click", (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();

  iconsFunction.searchFunction();
  e.preventDefault();
});

cart.addEventListener("click", function (e) {
  shoppingCartList.classList.toggle("active");

  iconsFunction.cartFunction();
  e.preventDefault();
});

// outside event icons
document.addEventListener("click", function (e) {
  if (!navbarNav.contains(e.target) && !menu.contains(e.target)) {
    navbarNav.classList.remove("active");
    iconsFunction.menuFunction();
  }

  if (!searchForm.contains(e.target) && !search.contains(e.target)) {
    searchForm.classList.remove("active");
    iconsFunction.searchFunction();
  }

  if (!shoppingCartList.contains(e.target) && !cart.contains(e.target)) {
    shoppingCartList.classList.remove("active");
    iconsFunction.cartFunction();
  }
});

// app
document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Aceh Gayo", img: "aceh.jpg", price: 35000 },
      { id: 2, name: "Arabica", img: "arabica.jpg", price: 75000 },
      { id: 3, name: "Robusta", img: "robusta.jpg", price: 50000 },
      { id: 4, name: "Excelsa", img: "excelsa.jpg", price: 90000 },
      { id: 5, name: "Liberika", img: "liberika.jpg", price: 55000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

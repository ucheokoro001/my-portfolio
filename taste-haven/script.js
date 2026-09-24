/* =========================================
   WHATSAPP
========================================= */

const WHATSAPP_NUMBER = "2349128685771";


/* =========================================
   FOOD DATA
========================================= */

const foods = [

  {
    name: "Haven Jollof",
    price: 4500,
    category: "Popular",
    tag: "BESTSELLER",
    description:
      "Rich Nigerian jollof rice served with grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=90"
  },

  {
    name: "Crispy Chicken",
    price: 5500,
    category: "Chicken",
    tag: "POPULAR",
    description:
      "Golden crispy chicken with our signature house sauce.",
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=1000&q=90"
  },

  {
    name: "Signature Bowl",
    price: 6500,
    category: "Popular",
    tag: "CHEF'S PICK",
    description:
      "Fresh vegetables, rice, chicken and our special dressing.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=90"
  },

  {
    name: "Creamy Pasta",
    price: 6000,
    category: "Main",
    tag: "POPULAR",
    description:
      "Creamy pasta prepared with herbs and premium ingredients.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=90"
  },

  {
    name: "Grilled Chicken",
    price: 7000,
    category: "Chicken",
    tag: "SPECIAL",
    description:
      "Juicy grilled chicken with roasted vegetables.",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=90"
  },

  {
    name: "Chocolate Dessert",
    price: 3500,
    category: "Dessert",
    tag: "SWEET",
    description:
      "Rich chocolate dessert finished with creamy toppings.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=90"
  }

];


/* =========================================
   ELEMENTS
========================================= */

const foodGrid =
  document.getElementById("foodGrid");

const cart =
  document.getElementById("cart");

const cartItems =
  document.getElementById("cartItems");

const cartTotal =
  document.getElementById("cartTotal");

const cartOverlay =
  document.getElementById("cartOverlay");

const closeCart =
  document.getElementById("closeCart");

const toast =
  document.getElementById("toast");

const menuToggle =
  document.getElementById("menuToggle");

const mobileNav =
  document.getElementById("mobileNav");

let cartData = [];


/* =========================================
   MONEY
========================================= */

function money(value) {

  return "₦" +
    value.toLocaleString("en-NG");

}


/* =========================================
   RENDER MENU
========================================= */

function renderMenu(category = "All") {

  const filtered =
    category === "All"
      ? foods
      : foods.filter(
          food =>
            food.category === category
        );


  foodGrid.innerHTML = "";


  filtered.forEach((food, index) => {

    const card =
      document.createElement("article");


    card.className =
      "food-card";


    card.style.animationDelay =
      `${index * 80}ms`;


    card.innerHTML = `

      <div class="food-image">

        <img
          src="${food.image}"
          alt="${food.name}"
          loading="lazy"
          onerror="
            this.onerror=null;
            this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=90';
          "
        >

        <span class="food-tag">
          ${food.tag}
        </span>

      </div>


      <div class="food-info">

        <div class="food-title-row">

          <h3 class="food-name">
            ${food.name}
          </h3>

          <strong class="food-price">
            ${money(food.price)}
          </strong>

        </div>


        <p class="food-description">
          ${food.description}
        </p>


        <button
          class="add-order"
          data-id="${foods.indexOf(food)}"
        >
          ADD TO ORDER +
        </button>

      </div>

    `;


    foodGrid.appendChild(card);

  });

}


/* =========================================
   FILTERS
========================================= */

document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".filter")
          .forEach(btn => {

            btn.classList.remove("active");

          });


        button.classList.add("active");


        renderMenu(
          button.dataset.category
        );

      }
    );

  });


/* =========================================
   ADD TO CART
========================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(".add-order");


    if (!button) return;


    const food =
      foods[button.dataset.id];


    cartData.push(food);


    updateCart();

    openCart();

    showToast(
      `${food.name} added to your order`
    );

  }
);


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

  cartItems.innerHTML = "";


  if (cartData.length === 0) {

    cartItems.innerHTML = `

      <p style="color:#777">

        Your order is currently empty.

      </p>

    `;

    cartTotal.textContent = "₦0";

    return;

  }


  let total = 0;


  cartData.forEach(
    (food, index) => {

      total += food.price;


      const item =
        document.createElement("div");


      item.className =
        "cart-item";


      item.innerHTML = `

        <img
          src="${food.image}"
          alt="${food.name}"
        >


        <div class="cart-item-info">

          <h4>
            ${food.name}
          </h4>

          <p>
            ${money(food.price)}
          </p>

        </div>


        <button
          class="remove-item"
          data-index="${index}"
        >
          ×
        </button>

      `;


      cartItems.appendChild(item);

    }
  );


  cartTotal.textContent =
    money(total);

}


/* =========================================
   REMOVE CART ITEM
========================================= */

cartItems.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(".remove-item");


    if (!button) return;


    cartData.splice(
      Number(button.dataset.index),
      1
    );


    updateCart();

  }
);


/* =========================================
   OPEN CART
========================================= */

function openCart() {

  cart.classList.add("active");

  cartOverlay.classList.add("active");

}


/* =========================================
   CLOSE CART
========================================= */

function closeCartMenu() {

  cart.classList.remove("active");

  cartOverlay.classList.remove("active");

}


closeCart.addEventListener(
  "click",
  closeCartMenu
);


cartOverlay.addEventListener(
  "click",
  closeCartMenu
);


/* =========================================
   WHATSAPP ORDER
========================================= */

document
  .getElementById("whatsappOrder")
  .addEventListener(
    "click",
    () => {

      if (cartData.length === 0) {

        showToast(
          "Your order is empty"
        );

        return;

      }


      let message =
        "Hi, I would like to place an order from Taste Haven.%0A%0A";


      cartData.forEach(food => {

        message +=
          `• ${food.name} - ${money(food.price)}%0A`;

      });


      const total =
        cartData.reduce(
          (sum, food) =>
            sum + food.price,
          0
        );


      message +=
        `%0ATotal: ${money(total)}`;


      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank"
      );

    }
  );


/* =========================================
   CUSTOM REQUEST
========================================= */

document
  .getElementById("customForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document.getElementById(
          "customerName"
        ).value;


      const request =
        document.getElementById(
          "foodRequest"
        ).value;


      const details =
        document.getElementById(
          "foodDetails"
        ).value;


      const message =
        "Hi, I would like to make a custom food request.%0A%0A" +

        `Name: ${encodeURIComponent(name)}%0A` +

        `Request: ${encodeURIComponent(request)}%0A` +

        `Details: ${encodeURIComponent(details)}`;


      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank"
      );

    }
  );


/* =========================================
   MOBILE MENU
========================================= */

menuToggle.addEventListener(
  "click",
  event => {

    event.stopPropagation();

    menuToggle.classList.toggle(
      "active"
    );

    mobileNav.classList.toggle(
      "active"
    );

  }
);


/* =========================================
   MOBILE MENU LINKS
========================================= */

mobileNav
  .querySelectorAll("a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mobileNav.classList.remove(
          "active"
        );

        menuToggle.classList.remove(
          "active"
        );

      }
    );

  });


/* =========================================
   CLICK OUTSIDE = CLOSE MENU
========================================= */

document.addEventListener(
  "click",
  event => {

    const insideMenu =
      mobileNav.contains(event.target);


    const clickedToggle =
      menuToggle.contains(event.target);


    if (
      mobileNav.classList.contains("active") &&
      !insideMenu &&
      !clickedToggle
    ) {

      mobileNav.classList.remove(
        "active"
      );

      menuToggle.classList.remove(
        "active"
      );

    }

  }
);


/* =========================================
   ESCAPE = CLOSE MENU
========================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      mobileNav.classList.remove(
        "active"
      );

      menuToggle.classList.remove(
        "active"
      );

      closeCartMenu();

    }

  }
);


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2200
    );

}


/* =========================================
   REVEAL ANIMATION
========================================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.classList.add(
            "visible"
          );


          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    observer.observe(element);

  });


/* =========================================
   LOADER
========================================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        document
          .getElementById("loader")
          .classList.add("hide");

      },
      1500
    );

  }
);


/* =========================================
   INITIAL MENU
========================================= */

renderMenu();

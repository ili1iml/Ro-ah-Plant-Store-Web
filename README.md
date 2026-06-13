# Rodah · روضة 🌿
**An Arabic Plant Store — E-Commerce UI with Shopping Cart**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![localStorage](https://img.shields.io/badge/localStorage-Persistent-4CAF50?style=flat)
![RTL](https://img.shields.io/badge/RTL-Arabic--First-009688?style=flat)

---

## 🔗 Live Demo
[**→ View Live Project**](https://ili1iml.github.io/Rodah-Plant-Store-Web/)

---

## 📸 Preview

> *(Add a screenshot here)*

---

## 💡 About

**Rodah** (Arabic for "garden") is a fully interactive Arabic e-commerce UI for a plant store. It features a complete shopping cart system with quantity controls, real-time total calculation, toast notifications, localStorage persistence, and category + live search filtering — all built with zero libraries or frameworks.

This is my sixth front-end project and my most feature-complete one yet — the first with a real e-commerce interaction flow from browsing to checkout.

---

## ✨ Features

- **Shopping Cart Drawer** — Slide-in side cart with smooth animation
- **Add / Remove / Quantity Control** — Full cart item management with +/− buttons
- **localStorage Persistence** — Cart survives page refresh
- **Real-time Total** — Cart total updates instantly on every change
- **Live Search** — Filters products as you type
- **Category Filter** — Toggle between Indoor 🏠 and Outdoor 🌳 plants
- **Toast Notifications** — Animated success/error messages on cart actions
- **Checkout Flow** — Calculates total and clears cart on purchase
- **Sticky Header** — Glassmorphism navbar stays visible while scrolling
- **Scroll-to-Products** — "Shop Now" button smoothly scrolls to the grid
- **Responsive Design** — Adapts to mobile with stacked layout
- **Arabic-first (RTL)** — Full right-to-left layout with Cairo font

---

## 🛠️ Built With

| Technology | Usage |
|---|---|
| HTML5 | Semantic structure — hero, header, grid, cart drawer, footer |
| CSS3 | RTL layout, glassmorphism header, card grid, animated cart |
| Vanilla JavaScript | Full app logic — cart state, filtering, search, localStorage |
| localStorage API | Persistent cart across sessions |
| Font Awesome 6 | Cart, search, and action icons |
| Google Fonts (Cairo) | Arabic-optimized typeface |

---

## 📂 Project Structure

```
rodah/
├── index.html        # Full page — hero, header, filters, grid, cart drawer
├── style.css         # Complete styling — RTL, grid, cart, toast, responsive
├── script.js         # All app logic — products data, cart, search, filters
├── images/           # Plant product images
└── README.md         # You are here
```

---

## 🚀 Getting Started

No installation or dependencies required.

```bash
# Clone the repository
git clone https://github.com/ili1iml/Rodah-Plant-Store-Web.git

# Navigate into the folder
cd rodah

# Open in your browser
open index.html
```

---

## 🧠 What I Learned

- Building a **full cart state system** — tracking items, quantities, and totals in a JavaScript array, then syncing the entire UI on every change
- Combining **search and category filters** simultaneously — filtering a shared product array through two independent conditions at once
- Implementing **localStorage persistence** for cart data, including safe JSON parsing with try/catch for corrupted data
- Designing a **slide-in drawer** using `transform: translateX()` and `visibility` toggling — smoother than `display: none` for animated components
- Creating **toast notifications** that appear and auto-dismiss using `classList` and `setTimeout`
- Using **event delegation** by re-attaching listeners after every `innerHTML` re-render — and understanding why this is a pattern worth replacing with proper delegation later
- Structuring a **real product data array** and rendering the entire UI dynamically from it, keeping HTML clean and data-driven

---

## 🗺️ Roadmap

- [ ] Add a product detail modal with description and care instructions
- [ ] Implement a wishlist feature
- [ ] Add quantity selector directly on the product card
- [ ] Replace innerHTML re-render with proper event delegation
- [ ] Rebuild with React — CartContext for global state, ProductCard as a component
- [ ] Connect to a real backend or Supabase for live product data

---

## 👩‍💻 Author

**MOUDI ALOTAIBI**  
*Front-end developer in training — building a portfolio one project at a time*

---

> *"روضة" — a garden. Because every space deserves a little green. 🌱*
  

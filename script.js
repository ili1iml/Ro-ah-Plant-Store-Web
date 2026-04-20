document.addEventListener('DOMContentLoaded', function() {
    // قائمة المنتجات (6 نباتات)
    const products = [
        { id: 1, name: "فيكس مطاطي", price: 85, category: "indoor", img: "images/المطاط.jpg", catName: "داخلية" },
        { id: 2, name: "نبات الثعبان", price: 55, category: "indoor", img: "images/الثعبان.jpg", catName: "داخلية" },
        { id: 3, name: "البوتس", price: 95, category: "indoor", img: "images/بوتس.jpg", catName: "داخلية" },
        { id: 4, name: "ورد جوري", price: 120, category: "outdoor", img: "images/جوري.jpg", catName: "خارجية" },
        { id: 5, name: "لافندر", price: 70, category: "outdoor", img: "images/لافندر.jpg", catName: "خارجية" },
        { id: 6, name: "ياسمين", price: 90, category: "outdoor", img: "images/الياسمين.jpg", catName: "خارجية"} ,
    ];

    let cart = [];
    let currentCategory = "all";
    let currentSearch = "";

    // عناصر DOM
    const productsContainer = document.getElementById("productsContainer");
    const cartCountSpan = document.getElementById("cartCount");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartItemsListDiv = document.getElementById("cartItemsList");
    const cartTotalAmountSpan = document.getElementById("cartTotalAmount");
    const toastMsgDiv = document.getElementById("toastMsg");
    const toastTextSpan = document.getElementById("toastText");

    // عرض الإشعار
    function showNotification(message) {
        toastTextSpan.innerText = message;
        toastMsgDiv.classList.add("show");
        setTimeout(() => {
            toastMsgDiv.classList.remove("show");
        }, 2200);
    }

    // تحديث عدد السلة (badge)
    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.innerText = totalItems;
    }

    // حفظ السلة في localStorage
    function saveCart() {
        localStorage.setItem("plantCart", JSON.stringify(cart));
    }

    function loadCart() {
        const saved = localStorage.getItem("plantCart");
        if (saved) {
            try {
                cart = JSON.parse(saved);
            } catch (e) { cart = []; }
        } else {
            cart = [];
        }
        updateCartBadge();
        renderCartUI();
    }

    // إضافة منتج للسلة
    function addToCart(product) {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
            showNotification(`✨ تمت إضافة ${product.name} مرة أخرى بنجاح 🌟`);
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                quantity: 1
            });
            showNotification(`🌟 تمت إضافة ${product.name} إلى السلة بنجاح 🌟`);
        }
        updateCartBadge();
        saveCart();
        renderCartUI();
    }

    // تحديث عرض السلة
    function renderCartUI() {
        if (!cartItemsListDiv) return;
        if (cart.length === 0) {
            cartItemsListDiv.innerHTML = `<div class="empty-cart-msg">🛒 سلة فارغة، أضف نباتاتك المفضلة 🌱</div>`;
            cartTotalAmountSpan.innerText = `0 ر.س`;
            return;
        }

        let html = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <img class="cart-item-img" src="${item.img}" alt="${item.name}">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price} ر.س</div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="cart-qty-minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="cart-qty-plus" data-id="${item.id}">+</button>
                        <button class="cart-remove" data-id="${item.id}" style="background:#f5e2d4; width:30px;"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
        });
        cartItemsListDiv.innerHTML = html;
        cartTotalAmountSpan.innerText = `${total} ر.س`;

        // إضافة مستمعات للأزرار داخل السلة
        document.querySelectorAll('.cart-qty-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                changeQuantity(id, -1);
            });
        });
        document.querySelectorAll('.cart-qty-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                changeQuantity(id, 1);
            });
        });
        document.querySelectorAll('.cart-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                removeCartItem(id);
            });
        });
    }

    function changeQuantity(productId, delta) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) {
                removeCartItem(productId);
            } else {
                item.quantity = newQty;
                updateCartBadge();
                saveCart();
                renderCartUI();
            }
        }
    }

    function removeCartItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartBadge();
        saveCart();
        renderCartUI();
        showNotification("🗑 تم إزالة المنتج من السلة");
    }

    // عرض المنتجات حسب الفلتر والبحث
    function filterAndRenderProducts() {
        let filtered = [...products];
        if (currentCategory !== "all") {
            filtered = filtered.filter(p => p.category === currentCategory);
        }
        if (currentSearch.trim() !== "") {
            const searchLower = currentSearch.trim().toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchLower));
        }
        renderProductsToGrid(filtered);
    }

function renderProductsToGrid(productsArray) {
    if (!productsContainer) return;
    if (productsArray.length === 0) {
        productsContainer.innerHTML = `
            <div style="text-align:center; grid-column:1/-1; padding: 60px;">
                🌿 لا توجد نباتات تطابق بحثك 🌿
            </div>
        `;
        return;
    }
        let gridHtml = "";
        productsArray.forEach(prod => {
            gridHtml += `
                <div class="product-card" data-id="${prod.id}">
                    <img class="product-img" src="${prod.img}" alt="${prod.name}" loading="lazy">
                    <div class="product-info">
                        <div class="product-title">${prod.name}</div>
                        <span class="product-cat">${prod.catName}</span>
                        <div class="product-price">${prod.price} ر.س</div>
                        <button class="add-to-cart" data-id="${prod.id}"><i class="fas fa-cart-plus"></i> أضف للسلة</button>
                    </div>
                </div>
            `;
        });
        productsContainer.innerHTML = gridHtml;

        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                const product = products.find(p => p.id === id);
                if (product) addToCart(product);
            });
        });
    }

    //اعداد الأحداث
    function setupEventListeners() {
        // أزرار التصنيف
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                currentCategory = category;
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                filterAndRenderProducts();
            });
        });

        // البحث
        const searchBtn = document.getElementById("searchBtn");
        const searchInput = document.getElementById("searchInput");
        function performSearch() {
            currentSearch = searchInput.value;
            filterAndRenderProducts();
        }
        searchBtn.addEventListener("click", performSearch);
        searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") performSearch();
        });

        // زر الرئيسية (يعيد ضبط الفلتر والبحث)
        const homeBtn = document.querySelector('.filter-btn[data-category="all"]');
        if (homeBtn) {
            homeBtn.addEventListener('click', () => {
                currentCategory = "all";
                currentSearch = "";
                searchInput.value = "";
                filterAndRenderProducts();
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove("active"));
                homeBtn.classList.add("active");
            });
        }

        // فتح وإغلاق السلة
        const cartIconBtn = document.getElementById("cartIcon");
        const closeCart = document.getElementById("closeCartBtn");
        const overlay = document.getElementById("cartOverlay");
        function openCart() { cartDrawer.classList.add("open"); }
        function closeCartFunc() { cartDrawer.classList.remove("open"); }
        cartIconBtn.addEventListener("click", openCart);
        closeCart.addEventListener("click", closeCartFunc);
        overlay.addEventListener("click", closeCartFunc);

        // زر تسوق الآن → تمرير سلس للمنتجات
        const shopBtn = document.getElementById("shopNowBtn");
        shopBtn.addEventListener("click", () => {
            productsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        // إتمام الشراء
        const checkoutButton = document.getElementById("checkoutBtn");
        checkoutButton.addEventListener("click", () => {
            if (cart.length === 0) {
                showNotification("⚠️ السلة فارغة، أضف منتجات أولاً");
                return;
            }
            const totalVal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
            showNotification(`✅ تم إتمام عملية الشراء بنجاح! المبلغ الإجمالي: ${totalVal} ر.س شكراً لتسوقك 🌟`);
            cart = [];
            updateCartBadge();
            saveCart();
            renderCartUI();
            closeCartFunc();
        });
    }

    // التهيئة
    function init() {
        loadCart();
        filterAndRenderProducts();
        setupEventListeners();
        renderCartUI();
    }

    init();
});
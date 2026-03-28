// Product Data
const products = [
    {
        id: 1,
        name: "Diamond Solitaire Ring",
        category: "rings",
        price: 1299.00,
        image: "http://static.photos/luxury/640x360/101",
        description: "18K White Gold with 1ct Diamond"
    },
    {
        id: 2,
        name: "Gold Chain Necklace",
        category: "necklaces",
        price: 499.00,
        image: "http://static.photos/fashion/640x360/102",
        description: "14K Yellow Gold, 18 inches"
    },
    {
        id: 3,
        name: "Sapphire Stud Earrings",
        category: "earrings",
        price: 899.00,
        image: "http://static.photos/luxury/640x360/103",
        description: "Blue Sapphire with Diamond Halo"
    },
    {
        id: 4,
        name: "Pearl Bracelet",
        category: "bracelets",
        price: 349.00,
        image: "http://static.photos/fashion/640x360/104",
        description: "Freshwater Pearls with Silver Clasp"
    },
    {
        id: 5,
        name: "Emerald Cut Ring",
        category: "rings",
        price: 2499.00,
        image: "http://static.photos/luxury/640x360/105",
        description: "Platinum with 2ct Emerald"
    },
    {
        id: 6,
        name: "Rose Gold Pendant",
        category: "necklaces",
        price: 599.00,
        image: "http://static.photos/fashion/640x360/106",
        description: "14K Rose Gold with Morganite"
    },
    {
        id: 7,
        name: "Diamond Drop Earrings",
        category: "earrings",
        price: 1599.00,
        image: "http://static.photos/luxury/640x360/107",
        description: "1.5ct Total Weight Diamonds"
    },
    {
        id: 8,
        name: "Tennis Bracelet",
        category: "bracelets",
        price: 3299.00,
        image: "http://static.photos/fashion/640x360/108",
        description: "14K White Gold with 3ct Diamonds"
    },
    {
        id: 9,
        name: "Vintage Style Ring",
        category: "rings",
        price: 1899.00,
        image: "http://static.photos/luxury/640x360/109",
        description: "Art Deco Design with Rubies"
    },
    {
        id: 10,
        name: "Layered Necklace Set",
        category: "necklaces",
        price: 449.00,
        image: "http://static.photos/fashion/640x360/110",
        description: "Triple Layer Gold Chains"
    },
    {
        id: 11,
        name: "Hoop Earrings",
        category: "earrings",
        price: 299.00,
        image: "http://static.photos/luxury/640x360/111",
        description: "14K Gold, 30mm diameter"
    },
    {
        id: 12,
        name: "Charm Bracelet",
        category: "bracelets",
        price: 399.00,
        image: "http://static.photos/fashion/640x360/112",
        description: "Sterling Silver with Gold Accents"
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    updateCartCount();
    startCountdown();
    lucide.createIcons();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Render Products
function renderProducts(filter) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    filtered.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100';
        card.innerHTML = `
            <div class="product-image-container relative aspect-w-3 aspect-h-2 h-64 bg-gray-100">
                <img src="${product.image}" alt="${product.name}" class="product-image w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors"></div>
                <button onclick="addToCart(${product.id})" class="quick-add absolute bottom-4 left-4 right-4 bg-white text-gray-900 py-3 rounded-lg font-medium shadow-lg hover:bg-amber-600 hover:text-white transition-colors flex items-center justify-center">
                    <i data-lucide="shopping-bag" class="h-4 w-4 mr-2"></i>
                    Add to Cart
                </button>
                <button class="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white text-gray-600 hover:text-red-500 transition-colors" onclick="toggleWishlist(this)">
                    <i data-lucide="heart" class="h-5 w-5"></i>
                </button>
            </div>
            <div class="p-6">
                <p class="text-xs text-amber-600 font-medium uppercase tracking-wider mb-2">${product.category}</p>
                <h3 class="font-serif text-lg font-bold text-gray-900 mb-1">${product.name}</h3>
                <p class="text-gray-500 text-sm mb-3">${product.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-xl font-bold text-gray-900">$${product.price.toLocaleString()}</span>
                    <div class="flex text-amber-400">
                        <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                        <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                        <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                        <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                        <i data-lucide="star" class="h-4 w-4 fill-current"></i>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
        
        // Stagger animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    lucide.createIcons();
}

// Filter Products
function filterProducts(category) {
    // Update buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-amber-600', 'text-white', 'border-amber-600');
        btn.classList.add('text-gray-700', 'border-gray-300');
        if (btn.dataset.filter === category) {
            btn.classList.add('active', 'bg-amber-600', 'text-white', 'border-amber-600');
            btn.classList.remove('text-gray-700', 'border-gray-300');
        }
    });
    
    renderProducts(category);
    
    // Scroll to products if from category click
    if (window.scrollY < 500) {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    showToast(`${product.name} added to cart!`);
    
    // Open cart sidebar
    const sidebar = document.getElementById('cart-sidebar');
    const panel = document.getElementById('cart-panel');
    sidebar.classList.remove('hidden');
    setTimeout(() => {
        panel.classList.remove('translate-x-full');
    }, 10);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
            updateCartCount();
        }
    }
}

// Render Cart Items
function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 mt-12">
                <i data-lucide="shopping-bag" class="h-16 w-16 mx-auto mb-4 opacity-30"></i>
                <p>Your cart is empty</p>
                <button onclick="toggleCart(); window.location.href='#products'" class="mt-4 text-amber-600 hover:text-amber-700 font-medium">Start Shopping</button>
            </div>
        `;
        totalElement.textContent = '$0.00';
    } else {
        let total = 0;
        container.innerHTML = cart.map(item => {
            total += item.price * item.quantity;
            return `
                <div class="flex gap-4 mb-6 pb-6 border-b">
                    <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
                    <div class="flex-1">
                        <h4 class="font-serif font-bold text-gray-900 mb-1">${item.name}</h4>
                        <p class="text-sm text-gray-500 mb-2">${item.description}</p>
                        <p class="font-bold text-amber-600">$${item.price.toLocaleString()}</p>
                        <div class="flex items-center mt-2 space-x-2">
                            <button onclick="updateQuantity(${item.id}, -1)" class="p-1 hover:bg-gray-100 rounded">
                                <i data-lucide="minus" class="h-4 w-4"></i>
                            </button>
                            <span class="w-8 text-center font-medium">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" class="p-1 hover:bg-gray-100 rounded">
                                <i data-lucide="plus" class="h-4 w-4"></i>
                            </button>
                            <button onclick="removeFromCart(${item.id})" class="ml-4 text-red-500 hover:text-red-700 text-sm">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        totalElement.textContent = `$${total.toLocaleString()}`;
    }
    
    lucide.createIcons();
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    badge.textContent = count;
    badge.style.opacity = count > 0 ? '1' : '0';
}

// Toggle Cart
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const panel = document.getElementById('cart-panel');
    
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        renderCartItems();
        setTimeout(() => {
            panel.classList.remove('translate-x-full');
        }, 10);
    } else {
        panel.classList.add('translate-x-full');
        setTimeout(() => {
            sidebar.classList.add('hidden');
        }, 300);
    }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Toggle Search
function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
        }, 10);
        overlay.querySelector('input').focus();
    } else {
        overlay.classList.add('opacity-0');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }
}

// Toggle Wishlist
function toggleWishlist(btn) {
    const icon = btn.querySelector('i');
    if (btn.classList.contains('text-red-500')) {
        btn.classList.remove('text-red-500');
        btn.classList.add('text-gray-600');
        icon.setAttribute('fill', 'none');
    } else {
        btn.classList.add('text-red-500');
        btn.classList.remove('text-gray-600');
        icon.setAttribute('fill', 'currentColor');
        showToast('Added to wishlist!');
    }
}

// Show Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    showToast('Proceeding to checkout...');
    // Here you would typically redirect to a checkout page
}

// Subscribe Newsletter
function subscribeNewsletter() {
    showToast('Thank you for subscribing!');
    event.target.reset();
}

// Countdown Timer
function startCountdown() {
    // Set date to 2 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    
    function update() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) return;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    update();
    setInterval(update, 1000);
}

// Close search on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const searchOverlay = document.getElementById('search-overlay');
        const cartSidebar = document.getElementById('cart-sidebar');
        
        if (!searchOverlay.classList.contains('hidden')) {
            toggleSearch();
        }
        
        if (!cartSidebar.classList.contains('hidden')) {
            toggleCart();
        }
    }
});

// Close search when clicking outside
document.getElementById('search-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        toggleSearch();
    }
});
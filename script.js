// International Barber Shop Website - Complete JavaScript
// No Frameworks, Pure Vanilla JS

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing website...");
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize all systems
    initNavigation();
    initStylesShowcase();  // MAKE SURE THIS IS CALLED!
    initProducts();
    initPricing();
    initBookingSystem();
    initLanguageSystem();
    initCurrencySystem();
    initMobileMenu();
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
    
    console.log("Website initialization complete!");
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.remove('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// ==================== HAIRCUT STYLES WITH WORKING IMAGES ====================
const haircutStyles = [
    { 
        id: 1, 
        name: "Classic Gentleman Cut", 
        time: "60 min", 
        desc: "Timeless sophistication",
        image: "images/classic_gentleman_cut.jpg"
    },
    { 
        id: 2, 
        name: "Low Fade", 
        time: "45 min", 
        desc: "Subtle, clean transition",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop"
    },
    { 
        id: 3, 
        name: "Mid Fade", 
        time: "50 min", 
        desc: "Balanced modern look",
        image: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=400&h=400&fit=crop"
    },
    { 
        id: 4, 
        name: "High Fade", 
        time: "55 min", 
        desc: "Bold, dramatic style",
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop"
    },
    { 
        id: 5, 
        name: "Skin Fade", 
        time: "60 min", 
        desc: "Ultra-sharp contrast",
        image: "https://images.unsplash.com/photo-1621605815972-f9d2f1a6c8f3?w=400&h=400&fit=crop"
    },
    { 
        id: 6, 
        name: "Taper Fade", 
        time: "50 min", 
        desc: "Natural, gradual fade",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop"
    },
    { 
        id: 7, 
        name: "Buzz Cut", 
        time: "30 min", 
        desc: "Low maintenance classic",
        image: "https://images.unsplash.com/photo-1560931730-9f6a32d8d083?w=400&h=400&fit=crop"
    },
    { 
        id: 8, 
        name: "Textured Crop", 
        time: "45 min", 
        desc: "Modern, versatile style",
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop"
    },
    { 
        id: 9, 
        name: "French Crop", 
        time: "40 min", 
        desc: "European elegance",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop"
    },
    { 
        id: 10, 
        name: "Slick Back", 
        time: "55 min", 
        desc: "Polished professional",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=400&fit=crop"
    },
    { 
        id: 11, 
        name: "Pompadour", 
        time: "60 min", 
        desc: "Retro-inspired volume",
        image: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=400&h=400&fit=crop"
    },
    { 
        id: 12, 
        name: "Side Part Classic", 
        time: "45 min", 
        desc: "Timeless gentleman",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=400&fit=crop"
    },
    { 
        id: 13, 
        name: "Modern Quiff", 
        time: "55 min", 
        desc: "Contemporary volume",
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop"
    },
    { 
        id: 14, 
        name: "Beard & Fade Combo", 
        time: "75 min", 
        desc: "Complete grooming",
        image: "https://images.unsplash.com/photo-1621605815972-f9d2f1a6c8f3?w=400&h=400&fit=crop"
    },
    { 
        id: 15, 
        name: "Afro Shape Up", 
        time: "50 min", 
        desc: "Precision shaping",
        image: "https://images.unsplash.com/photo-1560931730-9f6a32d8d083?w=400&h=400&fit=crop"
    },
    { 
        id: 16, 
        name: "Curly Top Fade", 
        time: "60 min", 
        desc: "Texture contrast",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop"
    },
    { 
        id: 17, 
        name: "Executive Business Cut", 
        time: "45 min", 
        desc: "Boardroom ready",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=400&fit=crop"
    }
];

function initStylesShowcase() {
    console.log("initStylesShowcase called!");
    
    const stylesGrid = document.querySelector('.styles-grid');
    const styleDropdown = document.getElementById('style');
    
    console.log("Styles grid found:", !!stylesGrid);
    console.log("Style dropdown found:", !!styleDropdown);
    
    if (!stylesGrid || !styleDropdown) {
        console.error('ERROR: Styles grid or dropdown not found in DOM!');
        console.error('Check your HTML has elements with class "styles-grid" and id "style"');
        return;
    }
    
    // Clear existing content
    stylesGrid.innerHTML = '';
    styleDropdown.innerHTML = '<option value="">Select a style</option>';
    
    console.log('Creating style cards...');
    
    // Generate style cards and dropdown options
    haircutStyles.forEach(style => {
        // Create style card
        const card = document.createElement('div');
        card.className = 'style-card';
        card.dataset.styleId = style.id;
        
        // Get initials for placeholder
        const initials = style.name.split(' ').map(word => word[0]).join('');
        
        card.innerHTML = `
            <div class="style-image">
                <div class="image-loading">${initials}</div>
                <img src="${style.image}" 
                     alt="${style.name}"
                     loading="lazy">
            </div>
            <div class="style-info">
                <h3>${style.name}</h3>
                <p>${style.desc} • ${style.time}</p>
            </div>
        `;
        
        // Add click event
        card.addEventListener('click', function() {
            selectStyle(style.id, style.name);
            scrollToBooking();
        });
        
        stylesGrid.appendChild(card);
        
        // Add dropdown option
        const option = document.createElement('option');
        option.value = style.id;
        option.textContent = `${style.name} (${style.time})`;
        styleDropdown.appendChild(option);
    });
    
    console.log(`Created ${haircutStyles.length} style cards`);
    
    // Initialize image loading
    setTimeout(initializeImageLoading, 100);
}

function initializeImageLoading() {
    const images = document.querySelectorAll('.style-image img');
    console.log(`Found ${images.length} images to load`);
    
    images.forEach(img => {
        // Check if image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
            const loadingDiv = img.previousElementSibling;
            if (loadingDiv && loadingDiv.classList.contains('image-loading')) {
                loadingDiv.style.display = 'none';
            }
        } else {
            // Add load event listener
            img.addEventListener('load', function() {
                console.log(`Image loaded: ${this.src}`);
                this.style.opacity = '1';
                const loadingDiv = this.previousElementSibling;
                if (loadingDiv && loadingDiv.classList.contains('image-loading')) {
                    loadingDiv.style.display = 'none';
                }
            });
            
            img.addEventListener('error', function() {
                console.error(`Image failed to load: ${this.src}`);
                const loadingDiv = this.previousElementSibling;
                if (loadingDiv && loadingDiv.classList.contains('image-loading')) {
                    loadingDiv.textContent = 'Style Image';
                    loadingDiv.style.background = 'linear-gradient(45deg, #3A2718, #2C2C2C)';
                    loadingDiv.style.color = '#F5F1E8';
                    loadingDiv.style.fontSize = '1.2rem';
                    loadingDiv.style.fontWeight = 'bold';
                }
            });
        }
    });
}

function selectStyle(styleId, styleName) {
    const styleDropdown = document.getElementById('style');
    const styleCards = document.querySelectorAll('.style-card');
    
    // Update dropdown
    if (styleDropdown) {
        styleDropdown.value = styleId;
    }
    
    // Update visual selection on cards
    styleCards.forEach(card => {
        card.classList.remove('selected');
        if (parseInt(card.dataset.styleId) === styleId) {
            card.classList.add('selected');
        }
    });
    
    // Store in session for WhatsApp booking
    sessionStorage.setItem('selectedStyle', styleName);
}

function scrollToBooking() {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        window.scrollTo({
            top: bookingSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// ==================== PRODUCTS ====================
const groomingProducts = [
    { id: 1, name: "Premium Pomade", price: 25, icon: "fas fa-gem", desc: "Strong hold, matte finish" },
    { id: 2, name: "Hair Growth Oil", price: 30, icon: "fas fa-oil-can", desc: "Natural ingredients" },
    { id: 3, name: "Charcoal Shampoo", price: 22, icon: "fas fa-pump-soap", desc: "Deep cleansing" },
    { id: 4, name: "Beard Conditioner", price: 28, icon: "fas fa-leaf", desc: "Softens & nourishes" },
    { id: 5, name: "Styling Wax", price: 20, icon: "fas fa-fire", desc: "Flexible hold" },
    { id: 6, name: "Aftershave Balm", price: 24, icon: "fas fa-wind", desc: "Soothes & protects" }
];

function initProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    groomingProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <p class="product-price" data-price="${product.price}">$${product.price}.00</p>
                <button class="btn btn-whatsapp btn-small product-order-btn" data-product="${product.name}">
                    <i class="fab fa-whatsapp"></i> Order via WhatsApp
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to product buttons
    document.querySelectorAll('.product-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.dataset.product;
            const productPrice = this.parentElement.querySelector('.product-price').textContent;
            sendWhatsAppOrder(productName, productPrice);
        });
    });
}

// ==================== PRICING SYSTEM ====================
const pricingPlans = [
    { 
        name: "Basic", 
        price: 30,
        etb: 900,
        eur: 28,
        gbp: 24,
        popular: false,
        features: ["Haircut", "Neck shave", "Hot towel", "Basic styling"]
    },
    { 
        name: "Premium", 
        price: 50,
        etb: 1500,
        eur: 46,
        gbp: 40,
        popular: true,
        features: ["Premium haircut", "Beard trim", "Hot towel shave", "Hair wash", "Premium styling", "Relaxing massage"]
    },
    { 
        name: "Executive", 
        price: 75,
        etb: 2250,
        eur: 69,
        gbp: 60,
        popular: false,
        features: ["All Premium features", "Hair treatment", "Face massage", "Grooming consultation", "Priority booking"]
    }
];

const productPrices = {
    "Premium Pomade": { usd: 25, etb: 750, eur: 23, gbp: 20 },
    "Hair Growth Oil": { usd: 30, etb: 900, eur: 28, gbp: 24 },
    "Charcoal Shampoo": { usd: 22, etb: 660, eur: 20, gbp: 17 },
    "Beard Conditioner": { usd: 28, etb: 840, eur: 26, gbp: 22 },
    "Styling Wax": { usd: 20, etb: 600, eur: 18, gbp: 16 },
    "Aftershave Balm": { usd: 24, etb: 720, eur: 22, gbp: 19 }
};

function initPricing() {
    const pricingGrid = document.querySelector('.pricing-grid');
    if (!pricingGrid) return;
    
    pricingGrid.innerHTML = '';
    
    pricingPlans.forEach(plan => {
        const pricingCard = document.createElement('div');
        pricingCard.className = `pricing-card ${plan.popular ? 'popular' : ''}`;
        
        if (plan.popular) {
            pricingCard.innerHTML = `<div class="popular-badge">Most Popular</div>`;
        }
        
        pricingCard.innerHTML += `
            <div class="pricing-header">
                <h3>${plan.name} Package</h3>
                <div class="price" data-usd="${plan.price}" data-etb="${plan.etb}" data-eur="${plan.eur}" data-gbp="${plan.gbp}">$${plan.price}</div>
                <p class="period">per session</p>
            </div>
            <ul class="pricing-features">
                ${plan.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
            <button class="btn ${plan.popular ? 'btn-primary' : 'btn-outline'} btn-large" 
                    onclick="selectStyle(null, '${plan.name} Package'); scrollToBooking();">
                Book Now
            </button>
        `;
        
        pricingGrid.appendChild(pricingCard);
    });
}

// ==================== CURRENCY SYSTEM ====================
function initCurrencySystem() {
    const currencySelect = document.getElementById('currency-select');
    if (!currencySelect) return;
    
    // Load saved currency preference
    const savedCurrency = localStorage.getItem('preferredCurrency') || 'USD';
    currencySelect.value = savedCurrency;
    
    // Update all prices on page load
    updateAllPrices(savedCurrency);
    
    // Add change event
    currencySelect.addEventListener('change', function() {
        const selectedCurrency = this.value;
        localStorage.setItem('preferredCurrency', selectedCurrency);
        updateAllPrices(selectedCurrency);
    });
}

function updateAllPrices(currency) {
    // Update service prices
    const priceElements = document.querySelectorAll('.price, .product-price');
    const currencySymbols = {
        'USD': '$',
        'ETB': 'ETB ',
        'EUR': '€',
        'GBP': '£'
    };
    
    priceElements.forEach(element => {
        if (element.classList.contains('price')) {
            // Pricing cards
            const usdPrice = element.dataset.usd;
            const etbPrice = element.dataset.etb;
            const eurPrice = element.dataset.eur;
            const gbpPrice = element.dataset.gbp;
            
            let price;
            switch(currency) {
                case 'ETB': price = etbPrice; break;
                case 'EUR': price = eurPrice; break;
                case 'GBP': price = gbpPrice; break;
                default: price = usdPrice;
            }
            
            element.textContent = `${currencySymbols[currency]}${price}`;
        } else if (element.classList.contains('product-price')) {
            // Product prices
            const productName = element.closest('.product-info').querySelector('h3').textContent;
            const prices = productPrices[productName];
            
            if (prices) {
                let price;
                switch(currency) {
                    case 'ETB': price = prices.etb; break;
                    case 'EUR': price = prices.eur; break;
                    case 'GBP': price = prices.gbp; break;
                    default: price = prices.usd;
                }
                
                element.textContent = `${currencySymbols[currency]}${price}`;
                element.dataset.price = price;
            }
        }
    });
}

// ==================== LANGUAGE SYSTEM ====================
const translations = {
    en: {
        nav_home: "Home",
        nav_services: "Services",
        nav_styles: "Styles",
        nav_booking: "Book Now",
        nav_products: "Products",
        nav_pricing: "Pricing",
        nav_location: "Location",
        nav_contact: "Contact",
        hero_title: "Timeless Grooming for the Modern Gentleman",
        hero_subtitle: "Precision. Style. Confidence.",
        hero_button1: "Reserve Your Spot",
        hero_button2: "Book via WhatsApp",
        styles_title: "Signature Haircut Styles",
        services_title: "Premium Services",
        booking_title: "Reserve Your Appointment",
        products_title: "Premium Grooming Products",
        pricing_title: "Transparent Pricing",
        location_title: "Find Our Studio",
        trust_title: "Why Choose Aster's",
        trust_1: "Experienced Barbers",
        trust_2: "Hygienic Environment",
        trust_3: "Premium Tools",
        trust_4: "Relaxing Atmosphere",
        trust_5: "International Standards",
        footer_hours: "Business Hours",
        footer_monday: "Monday - Friday",
        footer_saturday: "Saturday",
        footer_sunday: "Sunday",
        form_name: "Full Name",
        form_phone: "Phone Number",
        form_email: "Email (Optional)",
        form_style: "Haircut Style",
        form_date: "Preferred Date",
        form_time: "Preferred Time",
        form_button: "Confirm Reservation",
        product_add: "Order via WhatsApp",
        most_popular: "Most Popular",
        premium: "Premium",
        basic: "Basic",
        book_now: "Book Now",
        call_now: "Call Now"
    },
    am: {
        nav_home: "መነሻ",
        nav_services: "አገልግሎቶች",
        nav_styles: "ቅጦች",
        nav_booking: "ቦታ ለማስያዝ",
        nav_products: "ምርቶች",
        nav_pricing: "ዋጋ",
        nav_location: "አድራሻ",
        nav_contact: "አግኙን",
        hero_title: "ለዘመናዊ ገንዘብ ያለው የዘላለም ውበት",
        hero_subtitle: "ትክክለኛነት. ቅጥ. በራስ መተማመን.",
        hero_button1: "ቦታዎን ያስይዙ",
        hero_button2: "በ WhatsApp ይያዙ",
        styles_title: "ልዩ የፀጉር ቅጦች",
        services_title: "የፕሪሚየም አገልግሎቶች",
        booking_title: "ፕሮግራም ያስይዙ",
        products_title: "የፕሪሚየም ውበት ምርቶች",
        pricing_title: "ግልፅ የዋጋ አሰጣጥ",
        location_title: "ስቱዲዮችን ያግኙ",
        trust_title: "ለምን አስተርን መምረጥ",
        trust_1: "ባለሙያ አሳሾች",
        trust_2: "ንፁህ አካባቢ",
        trust_3: "የፕሪሚየም መሳሪያዎች",
        trust_4: "የማረፊያ አየር",
        trust_5: "ዓለም አቀፍ ደረጃዎች",
        footer_hours: "የሥራ ሰዓት",
        footer_monday: "ሰኞ - ዓርብ",
        footer_saturday: "ቅዳሜ",
        footer_sunday: "እሑድ",
        form_name: "ሙሉ ስም",
        form_phone: "ስልክ ቁጥር",
        form_email: "ኢሜይል (አማራጭ)",
        form_style: "የፀጉር ቅጥ",
        form_date: "የተመረጠበት ቀን",
        form_time: "የተመረጠበት ሰዓት",
        form_button: "ማስያዝ ያረጋግጡ",
        product_add: "በ WhatsApp ይያዙ",
        most_popular: "በጣም ታዋቂ",
        premium: "ፕሪሚየም",
        basic: "መሰረታዊ",
        book_now: "አሁን ይያዙ",
        call_now: "አሁን ይደውሉ"
    },
    it: {
        nav_home: "Home",
        nav_services: "Servizi",
        nav_styles: "Stili",
        nav_booking: "Prenota",
        nav_products: "Prodotti",
        nav_pricing: "Prezzi",
        nav_location: "Posizione",
        nav_contact: "Contatto",
        hero_title: "Toelettatura senza tempo per il gentiluomo moderno",
        hero_subtitle: "Precisione. Stile. Fiducia.",
        hero_button1: "Prenota il tuo posto",
        hero_button2: "Prenota via WhatsApp",
        styles_title: "Stili di Taglio Firme",
        services_title: "Servizi Premium",
        booking_title: "Prenota il tuo appuntamento",
        products_title: "Prodotti di Toelettatura Premium",
        pricing_title: "Prezzi Trasparenti",
        location_title: "Trova il nostro studio",
        trust_title: "Perché Scegliere Aster",
        trust_1: "Barbieri Esperti",
        trust_2: "Ambiente Igienico",
        trust_3: "Strumenti Premium",
        trust_4: "Atmosfera Rilassante",
        trust_5: "Standard Internazionali",
        footer_hours: "Orari di Apertura",
        footer_monday: "Lunedì - Venerdì",
        footer_saturday: "Sabato",
        footer_sunday: "Domenica",
        form_name: "Nome Completo",
        form_phone: "Numero di Telefono",
        form_email: "Email (Opzionale)",
        form_style: "Stile di Taglio",
        form_date: "Data Preferita",
        form_time: "Orario Preferito",
        form_button: "Conferma Prenotazione",
        product_add: "Ordina via WhatsApp",
        most_popular: "Più Popolare",
        premium: "Premium",
        basic: "Base",
        book_now: "Prenota Ora",
        call_now: "Chiama Ora"
    },
    fr: {
        nav_home: "Accueil",
        nav_services: "Services",
        nav_styles: "Styles",
        nav_booking: "Réserver",
        nav_products: "Produits",
        nav_pricing: "Tarifs",
        nav_location: "Emplacement",
        nav_contact: "Contact",
        hero_title: "Toilettage intemporel pour le gentleman moderne",
        hero_subtitle: "Précision. Style. Confiance.",
        hero_button1: "Réservez votre place",
        hero_button2: "Réserver via WhatsApp",
        styles_title: "Styles de Coupe Signature",
        services_title: "Services Premium",
        booking_title: "Réservez votre rendez-vous",
        products_title: "Produits de Toilettage Premium",
        pricing_title: "Tarification Transparente",
        location_title: "Trouvez notre studio",
        trust_title: "Pourquoi Choisir Aster",
        trust_1: "Barbiers Expérimentés",
        trust_2: "Environnement Hygiénique",
        trust_3: "Outils Premium",
        trust_4: "Atmosphère Détendue",
        trust_5: "Normes Internationales",
        footer_hours: "Heures d'Ouverture",
        footer_monday: "Lundi - Vendredi",
        footer_saturday: "Samedi",
        footer_sunday: "Dimanche",
        form_name: "Nom Complet",
        form_phone: "Numéro de Téléphone",
        form_email: "Email (Optionnel)",
        form_style: "Style de Coupe",
        form_date: "Date Préférée",
        form_time: "Heure Préférée",
        form_button: "Confirmer la Réservation",
        product_add: "Commander via WhatsApp",
        most_popular: "Plus Populaire",
        premium: "Premium",
        basic: "Basique",
        book_now: "Réserver Maintenant",
        call_now: "Appeler Maintenant"
    },
    de: {
        nav_home: "Startseite",
        nav_services: "Dienstleistungen",
        nav_styles: "Stile",
        nav_booking: "Jetzt buchen",
        nav_products: "Produkte",
        nav_pricing: "Preise",
        nav_location: "Standort",
        nav_contact: "Kontakt",
        hero_title: "Zeitlose Pflege für den modernen Gentleman",
        hero_subtitle: "Präzision. Stil. Selbstvertrauen.",
        hero_button1: "Ihren Platz reservieren",
        hero_button2: "Über WhatsApp buchen",
        styles_title: "Signature Haarschnitt-Stile",
        services_title: "Premium-Dienstleistungen",
        booking_title: "Termin buchen",
        products_title: "Premium-Pflegeprodukte",
        pricing_title: "Transparente Preise",
        location_title: "Finden Sie unser Studio",
        trust_title: "Warum Aster wählen",
        trust_1: "Erfahrene Barbiere",
        trust_2: "Hygienische Umgebung",
        trust_3: "Premium-Werkzeuge",
        trust_4: "Entspannende Atmosphäre",
        trust_5: "Internationale Standards",
        footer_hours: "Öffnungszeiten",
        footer_monday: "Montag - Freitag",
        footer_saturday: "Samstag",
        footer_sunday: "Sonntag",
        form_name: "Vollständiger Name",
        form_phone: "Telefonnummer",
        form_email: "E-Mail (Optional)",
        form_style: "Haarschnitt-Stil",
        form_date: "Bevorzugtes Datum",
        form_time: "Bevorzugte Uhrzeit",
        form_button: "Reservierung bestätigen",
        product_add: "Über WhatsApp bestellen",
        most_popular: "Am beliebtesten",
        premium: "Premium",
        basic: "Basic",
        book_now: "Jetzt buchen",
        call_now: "Jetzt anrufen"
    }
};

function initLanguageSystem() {
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) return;
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    languageSelect.value = savedLanguage;
    
    // Update all text on page load
    updateAllText(savedLanguage);
    
    // Add change event
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        localStorage.setItem('preferredLanguage', selectedLanguage);
        updateAllText(selectedLanguage);
    });
}

function updateAllText(language) {
    const translation = translations[language];
    if (!translation) return;
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translation[key]) {
            element.textContent = translation[key];
        }
    });
    
    // Update placeholder texts
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    if (nameInput) nameInput.placeholder = translation['form_name'];
    if (phoneInput) phoneInput.placeholder = translation['form_phone'];
    if (emailInput) emailInput.placeholder = translation['form_email'];
}

// ==================== BOOKING SYSTEM ====================
function initBookingSystem() {
    const bookingForm = document.getElementById('reservation-form');
    const whatsappButton = document.getElementById('whatsapp-booking');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processBookingForm();
        });
    }
    
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            sendWhatsAppBooking();
        });
    }
}

function processBookingForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const style = document.getElementById('style').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    // Basic validation
    if (!name || !phone || !style || !date || !time) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Get style name
    const styleSelect = document.getElementById('style');
    const selectedOption = styleSelect.options[styleSelect.selectedIndex];
    const styleName = selectedOption.text.split(' (')[0];
    
    // Show confirmation
    const confirmation = `
        Thank you for your booking request!
        
        Details:
        Name: ${name}
        Phone: ${phone}
        ${email ? `Email: ${email}\n` : ''}
        Style: ${styleName}
        Date: ${formattedDate}
        Time: ${time}
        
        We will contact you shortly to confirm your appointment.
    `;
    
    alert(confirmation);
    
    // Reset form
    document.getElementById('reservation-form').reset();
    
    // Reset date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

function sendWhatsAppBooking() {
    const name = document.getElementById('name').value || '[Customer Name]';
    const phone = document.getElementById('phone').value || '[Phone Number]';
    const style = document.getElementById('style').value;
    const date = document.getElementById('date').value || new Date().toISOString().split('T')[0];
    const time = document.getElementById('time').value || '[Preferred Time]';
    
    // Get style name
    let styleName = '[Style]';
    if (style) {
        const styleSelect = document.getElementById('style');
        const selectedOption = styleSelect.options[styleSelect.selectedIndex];
        styleName = selectedOption.text.split(' (')[0];
    } else {
        const storedStyle = sessionStorage.getItem('selectedStyle');
        if (storedStyle) styleName = storedStyle;
    }
    
    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    
    // Create WhatsApp message
    const message = `Hello Aster,

I would like to book a haircut appointment.

Name: ${name}
Phone: ${phone}
Style: ${styleName}
Date: ${formattedDate}
Time: ${time}

Please confirm availability.`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (replace with actual number)
    const whatsappNumber = '1234567890';
    
    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}

function sendWhatsAppOrder(productName, productPrice) {
    const message = `Hello Aster,

I would like to order: ${productName}
Price: ${productPrice}

Please let me know about availability and payment options.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '1234567890';
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}

// ==================== ANIMATIONS ====================
// Add scroll animations
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const header = document.querySelector('.header');
    
    // Header shadow on scroll
    if (scrollPosition > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .trust-card, .style-card');
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initial animation setup
window.addEventListener('load', function() {
    const animateElements = document.querySelectorAll('.service-card, .trust-card, .style-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation after a small delay
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});

// Debug function
function debugImageLoading() {
    console.log("=== DEBUG IMAGE LOADING ===");
    
    const images = document.querySelectorAll('.style-image img');
    console.log(`Total images found: ${images.length}`);
    
    images.forEach((img, index) => {
        console.log(`Image ${index + 1}: ${img.src}`);
        console.log(`  Complete: ${img.complete}`);
        console.log(`  Natural Width: ${img.naturalWidth}`);
    });
}

// Run debug
setTimeout(debugImageLoading, 2000);
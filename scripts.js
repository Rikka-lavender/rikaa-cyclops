document.addEventListener("DOMContentLoaded", function () {
    // Get buttons and content area
    const content = document.getElementById("content");
    const homeBtn = document.getElementById("home-btn");
    const menuBtn = document.getElementById("menu-btn");
    const orderBtn = document.getElementById("order-btn");
    const storeBtn = document.getElementById("store-btn");

    // Function to update content dynamically
    const loadContent = (htmlContent) => {
        content.innerHTML = htmlContent;
    };

    // Event listeners for buttons
    homeBtn.addEventListener("click", () => {
        loadContent(`
      <h1>Welcome to Cake Shop</h1>
      <p>Discover our delicious cakes and treats!</p>
    `);
    });

    menuBtn.addEventListener("click", () => {
        loadContent(`
      <h1>Our Menu</h1>
      <ul>
        <li>Chocolate Cake - $15</li>
        <li>Vanilla Cake - $12</li>
        <li>Red Velvet Cake - $18</li>
      </ul>
    `);
    });

    orderBtn.addEventListener("click", () => {
        loadContent(`
      <h1>Order Online</h1>
      <form>
        <label for="cake">Choose your cake:</label>
        <select id="cake" class="form-select">
          <option>Chocolate Cake</option>
          <option>Vanilla Cake</option>
          <option>Red Velvet Cake</option>
        </select>
        <br>
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" class="form-control" min="1">
        <br>
        <button type="submit" class="btn btn-primary">Place Order</button>
      </form>
    `);
    });

    storeBtn.addEventListener("click", () => {
        loadContent(`
      <h1>Our Store</h1>
      <p>Visit us at:</p>
      <address>
        123 Cake Street,<br>
        Sweet Town, 45678
      </address>
    `);
    });

    // Default content on page load
    loadContent(`
    <h1>Welcome to Cake Shop</h1>
    <p>Click the buttons above to explore our site!</p>
  `);
});


// Carousel auto-play with Bootstrap
const milkTeaCarousel = document.getElementById('milk_teaCarousel');
const carouselInstance = new bootstrap.Carousel(milkTeaCarousel, {
    interval: 3000, // Set auto-play interval to 3 seconds
    pause: 'hover' // Pauses carousel when mouse is over it
});

// Start/Pause the carousel on button clicks
document.querySelector('.carousel-control-prev').addEventListener('click', () => carouselInstance.prev());
document.querySelector('.carousel-control-next').addEventListener('click', () => carouselInstance.next());

// Highlight active link based on section in view
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('header .nav-link');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70; // Offset for fixed header
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('class');
        }
    });

    // Remove active class from all links and add to the current section's link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// Display order summary based on selected options
function updateOrderSummary() {
    const flavor = document.getElementById('flavor').value;
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;

    // Collect toppings
    const toppings = [];
    if (document.getElementById('boba').checked) toppings.push('Boba');
    if (document.getElementById('jelly').checked) toppings.push('Jelly');
    if (document.getElementById('pudding').checked) toppings.push('Pudding');

    // Check if required fields are selected
    if (flavor && size && quantity) {
        const summary = `
            <p><strong>Flavor:</strong> ${flavor.replace('_', ' ')}</p>
            <p><strong>Size:</strong> ${size}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Toppings:</strong> ${toppings.join(', ') || 'None'}</p>
        `;
        document.getElementById('orderSummary').innerHTML = summary;
    } else {
        document.getElementById('orderSummary').innerHTML = `<p class="text-muted">Please select all options to see the summary.</p>`;
    }
}

// Listen for changes to update the summary dynamically
document.getElementById('flavor').addEventListener('change', updateOrderSummary);
document.getElementById('size').addEventListener('change', updateOrderSummary);
document.getElementById('quantity').addEventListener('input', updateOrderSummary);
document.getElementById('boba').addEventListener('change', updateOrderSummary);
document.getElementById('jelly').addEventListener('change', updateOrderSummary);
document.getElementById('pudding').addEventListener('change', updateOrderSummary);

// Submit order
function submitOrder() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    // Basic form validation
    if (name && phone && address) {
        alert("Thank you for your order! Your order has been placed successfully.");
        // Here you could add AJAX code to send the order data to a server
        document.getElementById('orderForm').reset();
        document.getElementById('orderSummary').innerHTML = `<p class="text-muted">Please select options to see the summary.</p>`;
    } else {
        alert("Please fill out all required fields.");
    }
}

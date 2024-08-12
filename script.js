// script.js

let cart = [];

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCart();
}

function addToCartAndRedirect(itemName, itemPrice) {
    addToCart(itemName, itemPrice);
    window.location.href = "cart.html";
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        displayCartItems();
    }
}

function displayCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            removeFromCart(index);
        };

        li.appendChild(deleteButton);
        cartItemsElement.appendChild(li);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the given index
    updateCart(); // Update the cart and UI
}

function checkout() {
    const cartItems = cart.map(item => `${item.name}: $${item.price.toFixed(2)}`).join('\n');
    alert("Checkout:\n" + cartItems);
    sendEmail(cartItems);
    cart = [];
    updateCart();
}

function sendEmail(cartItems) {
    console.log("Email sent with the following items:\n" + cartItems);
}

document.getElementById('checkout-button').addEventListener('click', checkout);
window.onload = loadCart;

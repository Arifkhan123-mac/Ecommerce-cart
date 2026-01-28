
document.addEventListener("DOMContentLoaded", () => {

    // ===== DOM ELEMENTS =====
    let ProductList = document.getElementById("product-list");
    let cartItems = document.getElementById("cart-items");
    let emptyMsg = document.getElementById("empty-cart");
    let cartTotal = document.getElementById("cart-total");
    let total = document.getElementById("total-price");
    let checkoutBtn = document.getElementById("checkout-btn");

    // ===== PRODUCTS =====
    let ProductArr = [
        { id: 1, name: "Product1", price: 20.55 },
        { id: 2, name: "Product2", price: 50.25 },
        { id: 3, name: "Product3", price: 40.25 },
    ];

    // ===== CART =====
    let ShoppingCartArr = JSON.parse(localStorage.getItem("item"))||[];

    // ===== RENDER PRODUCTS =====
    ProductArr.forEach((p) => {
        let div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <span>${p.name}</span>
            <span>$${p.price}</span>
            <button data-id="${p.id}">Add to cart</button>
        `;
        ProductList.appendChild(div);
    });

    // ===== ADD TO CART =====
    ProductList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            let productId = parseInt(e.target.dataset.id);
            let product = ProductArr.find(p => p.id === productId);

            ShoppingCartArr.push(product);
            saveToLocalStorage()
            RenderCart();
        }
    });

    // ===== RENDER CART =====
    function RenderCart() {
        let totalAmount = 0;
        cartItems.innerHTML = "";

        if (ShoppingCartArr.length === 0) {
            emptyMsg.classList.remove("hidden");
            cartTotal.classList.add("hidden");
            total.textContent = "0";
            return;
        }

        emptyMsg.classList.add("hidden");
        cartTotal.classList.remove("hidden");

        ShoppingCartArr.forEach(item => {
            let div = document.createElement("div");
            div.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(div);

            totalAmount += item.price;
        });

        total.textContent = totalAmount.toFixed(2);
    // saveToLocalStorage()
    }

    // ===== REMOVE ITEM =====
    
cartItems.addEventListener("click",(e)=>{
if(e.target.classList.contains("remove-btn")){
    let removeId = parseInt(e.target.getAttribute("data-id"))
ShoppingCartArr = ShoppingCartArr.filter(item=>item.id!==removeId)
saveToLocalStorage()
RenderCart()
}
})


    // ===== CHECKOUT =====
    checkoutBtn.addEventListener("click", () => {
        alert("Checkout successful");

        ShoppingCartArr.length = 0;
        cartItems.innerHTML = "";
        emptyMsg.classList.remove("hidden");
        cartTotal.classList.add("hidden");
        total.textContent = "0";
        saveToLocalStorage()
        RenderCart()
    });
function saveToLocalStorage(){
    localStorage.setItem("item",JSON.stringify(ShoppingCartArr))
}
RenderCart()
});

var menu = document.getElementById("menu");
var toggleMenu = document.getElementById("toggleMenu");
var cart = document.getElementById("cart");
var toggleCart = document.getElementById("toggleCart");
var closeCart = document.getElementById("close-cart");
let quantity = document.querySelector('.quantity');
var kasirItem = document.querySelector(".kasir");
var cartItem = document.getElementById("cart-item");
let total = document.querySelector('.total');


// Toggle Menu
toggleMenu.addEventListener("click", function(event) {
    event.stopPropagation(); // Menghentikan event klik menyebar ke atas
    menu.style.display = menu.style.display === "block" ? "none" : "block";
    cart.style.display = "none";
});
document.addEventListener("click", function(event) {
    var isClickInsideMenu = menu.contains(event.target);
    var isClickOntoggleMenu = (event.target === toggleMenu);
    
    if (!isClickInsideMenu && !isClickOntoggleMenu) {
        menu.style.display = "none";
    }
});


// Toggle Cart
toggleCart.addEventListener("click", function(){
    cart.style.display = cart.style.display === "flex" ? "none" : "flex";
});
closeCart.addEventListener("click", function(){
    cart.style.display = "none";
});

// Product
let products = [
    {
        id: 1,
        img: "Chitato.png",
        name: "Chitato(250g)",
        price: 10000
    },
    {
        id: 2,
        img: "Coca-cola.png",
        name: "Coca-cola(450ml)",
        price: 7000
    },
    {
        id: 3,
        img: "Fanta.png",
        name: "Fanta(450ml)",
        price: 7000
    },
    {
        id: 4,
        img: "Sprite.png",
        name: "Sprite(450ml)",
        price: 7000
    },
    {
        id: 5,
        img: "Aqua.png",
        name: "Aqua(600ml)",
        price: 3500
    },
    {
        id: 6,
        img: "Chuba.png",
        name: "Chuba(250g)",
        price: 8000
    },
    {
        id: 7,
        img: "Chuba 2.png",
        name: "Chuba(250g)",
        price: 8000
    },
    {
        id: 8,
        img: "Taro.png",
        name: "Taro(250g)",
        price: 9000
    },
    {
        id: 9,
        img: "Good Time.png",
        name: "Good Time(450g)",
        price: 8000
    },
    {
        id: 10,
        img: "Milkita.png",
        name: "Milkita(30pcs)",
        price: 18000
    }
];
let kasirItems  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('card');
        newDiv.innerHTML = `
        <div class="image">
            <img src="./image/${value.img}" alt="">
        </div>
        <div class="deskripsi">
            <h2>${value.name}</h2>
            <p>Rp. ${value.price.toLocaleString()}</p>
        </div>
        <div class="buttons">
            <button class="btn" onclick="addToCard(${key})">Tambah</button>
        </div>`;
    kasirItem.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(kasirItems[key] == null){
        // copy product form list to list card
        kasirItems[key] = JSON.parse(JSON.stringify(products[key]));
        kasirItems[key].quantity = 1;
    }
    reloadCard();

    // Open Cart If Product in list
    cart.style.display = "flex";
}
function reloadCard(){
    cartItem.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    kasirItems.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div class="image">
                <img src="./image/${value.img}" alt="">
            </div>
            <p class="nama-product">${value.name}</p>
            <p class="harga-product">Rp.${value.price.toLocaleString()}</p>
            <button class="btn-icon" onclick="changeQuantity(${key}, ${value.quantity - 1})">
            <i class="fa-solid fa-minus"></i></i></button>
            <p>${value.quantity}</p>
            <button class="btn-icon" onclick="changeQuantity(${key}, ${value.quantity + 1})">
            <i class="fa-solid fa-plus"></i></button>
            <button class="btn-icon" onclick="changeQuantity(${key}, ${value.quantity - value.quantity})">
            <i class="fa-regular fa-trash-can"></i></button>`;
            cartItem.appendChild(newDiv);
        }
    })
    if(totalPrice === 0){
        total.style.display = "none";
    } else {
        total.style.display = "inherit";
        total.innerText ='Total Harga: Rp. ' +totalPrice.toLocaleString();
    }

    if(count === 0){
        quantity.style.display = "none";
    } else {
        quantity.style.display = "inline";
        quantity.innerText = count;
    }
    
    // Close Cart If Total Price = 0
    if(totalPrice == 0){
        cart.style.display = "none";
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `Keranjang Kosong`;
        cartItem.appendChild(newDiv);
    }
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete kasirItems[key];
    } else {
        kasirItems[key].quantity = quantity;
        kasirItems[key].price = quantity * products[key].price;
    }
    reloadCard();
}
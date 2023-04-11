fetch('app/data/shoes.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        renderAllProduct(data.shoes);
        renderCart();
       
    });

// render total price
function renderTotalPrice() {
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
    let total_price = 0;
    if (cart !== null) {
        cart.forEach(product => {
            total_price += product.price * product.quantity;
        })
    }
    document.querySelector("#total-price").innerHTML = Math.round(total_price * 100) / 100;
}


function renderAllProduct(products) {
    let datahtml = "";
    products.forEach((product) => {
        datahtml += `<li>
            <img style="background-color:${product.color} " src="${product.image}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <span>
                <h3>$ ${product.price}</h3>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                Add to cart
                </button>
            </span>
        </li>`;
    });
    document.querySelector("#item").innerHTML = datahtml;
}

// click add to cart
document.querySelector("#item").addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
        let id = e.target.getAttribute("data-id");
        let name = e.target.getAttribute("data-name");
        let price = e.target.getAttribute("data-price");
        let image = e.target.getAttribute("data-image");
        addToCart(id, name, price, image);
    }
});

function addToCart(id, name, price, image) {
    let cart = localStorage.getItem('cart');

    cart = JSON.parse(cart);
    if (cart === null) {
        cart = [];
    }

    // find product in cart
    let product = cart.find(product => product.id === id);


    if (!product) {
        product = {
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        }
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// click plus
document.querySelector("#cart").addEventListener("click", function (e) {
    if (e.target.id === "plus") {
        let id = e.target.getAttribute("data-id");
        plusItem(id);
    }
})

function plusItem(id) {
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);

    // find product in cart
    let product = cart.find(product => product.id === id);
    product.quantity += 1;

    // set lại giá trị cho localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();

}

// click minus
document.querySelector("#cart").addEventListener("click", function (e) {
    if (e.target.id === "minus") {
        let id = e.target.getAttribute("data-id");
        minusItem(id);
    }
})

function minusItem(id) {
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);

    // find product in cart
    let product = cart.find(product => product.id === id);
    if (product.quantity > 1) {
        product.quantity -= 1;
    } else {
        cart = cart.filter(product => product.id !== id);
    }

    // set lại giá trị cho localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// remove item from cart
document.querySelector("#cart").addEventListener("click", function (e) {
    if (e.target.classList.contains("remove")) {
        let id = e.target.getAttribute("data-id");
        removeItem(id);
    }
})

function removeItem(id) {
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);

    // filter trả về mảng mới không có phần tử có id trùng với id truyền vào
    cart = cart.filter(product => product.id !== id);

    // set lại giá trị cho localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}




// show cart
function renderCart() {
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
    let datahtml = "";
    if (cart !== null) {
        for (let [key, product] of Object.entries(cart)) {
            const total_price = Math.round(product.price * product.quantity * 100) / 100;
            datahtml += `<div class="cart-item">
        <div class="cart-item-image">
            <img style="background-color:${product.color}" src="${product.image}">
        </div>
        <div class="cart-item-info">
            <h3>${product.name}</h3>
            <span id="price">$ ${total_price}</span>
            <div>
                <div>
                    <button id="minus" data-id="${product.id}"></button>
                    <span id="quantity">${product.quantity}</span>
                    <button id="plus" data-id="${product.id}"></button>
                </div>
                <div>
                    <button class="remove" data-id="${product.id}"></button>
                </div>
            </div>
        </div>
    </div>`;
        }
    } else {
        datahtml = `<div class="cart-item">
    <div class="cart-item-info">
        <h3>Cart is empty</h3>
    </div>`;
    }
    document.querySelector("#cart").innerHTML = datahtml;
    renderTotalPrice();
}
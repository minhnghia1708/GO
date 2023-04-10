const products = fetch('https://my-json-server.typicode.com/nghiattps13085/apigoldenowl/shoes')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
    getProducts(products);
console.log(products);
function getProducts(products) {
    let datahtml = "";
    products.forEach((product) => {
        datahtml += `<li>
                <img style="background-color:${product.color} " src="${product.image}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <span>
                    <h3>$ ${product.price}</h3>
                    <button class="add-to-cart" >Add to cart</button>
                </span>
            </li>`;
    });
    document.querySelector("#items").innerHTML = datahtml;
}
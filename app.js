//main varables
const cartButton = document.getElementById(`button-cart-toggle`)

const cartItemsEl = document.getElementById(`cart`)

const totalEl = document.querySelectorAll('.subtotal-text')
const cartBottomEl = document.getElementById('subtotal')






//end of main variables


// pruducts start

const products = [{
        id: 1,
        name: `shirt 1`,
        img: `./imgs/shirt 1 png.png`,
        instock: 5,
        price: 10,
        numberOfUnits: 1,
    },
    {
        id: 2,
        name: `shirt 2`,
        img: `./imgs/shirt 2 png.png`,
        instock: 5,
        price: 7,
        numberOfUnits: 1,
    },
    {
        id: 3,
        name: `shirt 3`,
        img: `./imgs/shirt 3 png.png`,
        instock: 5,
        price: 17,
        numberOfUnits: 1,
    },
    {
        id: 4,
        name: `shirt 4`,
        img: `./imgs/shirt 4 png.png`,
        instock: 5,
        price: 1,
        numberOfUnits: 1,
    },
    {
        id: 5,
        name: `shirt 5`,
        img: `./imgs/shirt 5 png.png`,
        instock: 5,
        price: 14,
        numberOfUnits: 1,
    },
    {
        id: 6,
        name: `shirt 6`,
        img: `./imgs/shirt 6 png.png`,
        instock: 5,
        price: 5,
        numberOfUnits: 1,
    },

]



products.forEach((product) => {
    const productTemplate = `
    <div class="products-container">
    <button class="add-to-cart" onclick="addToCartFunction(${product.id})"><img id="cart-png" src="./imgs/cartpng.png" alt="" srcset=""></button>
    <!-- button end -->
    <div class="products-img-container">
        <img class="product-img" src="${product.img}" alt="">
    </div>
    <!-- break -->
    <div class="product-title">${product.name}</div>
    </div>
    
    `


    const productsDiv = document.getElementById(`main-content`)

    productsDiv.insertAdjacentHTML("afterbegin", productTemplate)

})

let cart = JSON.parse(sessionStorage.getItem("CART")) || [];
updateCart();

function addToCartFunction(id) {
    //product exist??
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id)
    } else {
        const item = products.find((product) => product.id === id)
        cart.push(item)
    }

    updateCart()
}


//products end




//seccondary variables
const cartDiv = document.getElementById(`cart-container`)

//end of seccondary main variables

//button menu button

cartButton.addEventListener(`click`, () => {
    cartDiv.classList.toggle('active');
})

//button menu button end


function renderSubtototal() {
    let totalPrice = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;

    });

    totalEl.forEach((element, numbers) => {
        element.innerHTML = `Subtotal : $${totalPrice.toFixed(2)}`
    })

}

// cart template start

//cart template start

function updateCart() {
    sessionStorage.setItem("CART", JSON.stringify(cart))
    renderCart();
    renderSubtototal();

    //save cart
    //localStorage.setItem("CART", JSON.stringify(cart))
}

//renderCartItems

function renderCart() {

    cartItemsEl.innerHTML = "";

    cart.forEach((item) => {

        const cartItemTemplate = `

<!-- !!!cart container items start!!! -->
<div class="cart-product-container">
    <div class="cart-product-img"><img class="img-cart" onclick="removeItemFromCart(${item.id})" src="${item.img}" alt="" srcset=""></div>
    <!-- this will show image to the cart -->
    <div class="text-cart-container">
        <!-- top contains text dont destroy -->
        <div class="product-cart-name" onclick="removeItemFromCart(${item.id})">${item.name}, $${item.price}</div>
        <!-- this is were the name will go up top -->
        <div class="product-other">
            <!-- where other stuff will go like buttons -->

            <button class="negative" onclick="changeNumberOfUnits('minus',${item.id})" ><img class="minus" src="./imgs/minus.png" alt="" srcset=""></button>
            <!-- subtracts number of requested units -->

            <div class="number">${item.numberOfUnits}</div>
            <!-- shows number of units -->
            <button class="positive" onclick="changeNumberOfUnits('plus',${item.id})" ><img class="plus" src="./imgs/plus.png" alt="" srcset=""></button>
            <!-- adds number of requested units -->
        </div>

    </div>
</div>

`

        cartItemsEl.insertAdjacentHTML(`afterbegin`, cartItemTemplate)

        renderSubtototal()

    })
}


function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus" && numberOfUnits < item.instock) {
                numberOfUnits++;
            }

        }

        return {
            ...item,
            numberOfUnits,
        }
    })
    updateCart();
}

function renderSubtototall() {
    let totalPrice = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
    });

    totalEl.innerHTML = `Subtotal : $${totalPrice}`

    console.log(totalEl.innerHTML)

}


const removeItem = document.querySelectorAll('.product-cart-name')


//setInterval(removeItem, 6000)

function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id)

    removeItem.forEach((item) => {
        item.addEventListener('click', () => {
            cart = cart.filter((item) => item.id !== id)
        })
    })

    updateCart();

}

// const promise = new Promise((resolve, reject) => {

//     function loop() {
//         if (cart.length === 0) {
//             console.log('empty')
//         } else {
//             console.log('not empty')
//         }
//     }

//     setInterval(loop, 5000)

// })
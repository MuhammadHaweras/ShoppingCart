let removeItem = document.querySelectorAll('.btn-danger')
for (let i = 0; i < removeItem.length; i++) {
    let delBtn = removeItem[i];
    delBtn.addEventListener('click', event => {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    })
}

let cartInput = document.querySelectorAll('.cart-quantity-input')
for (let index = 0; index < cartInput.length; index++) {
    const element = cartInput[index];
    element.addEventListener('change', (event) => {
        let inputVal = event.target
        if (isNaN(inputVal.value) || inputVal.value <= 0) {
            inputVal.value = 1
        }
        updateCartTotal()
    })

}

let addToCart = document.querySelectorAll('.shop-item-button')
for (let index = 0; index < addToCart.length; index++) {
    const element = addToCart[index];
    element.addEventListener('click', event => {
        let addBtn = event.target
        let shop = addBtn.parentElement.parentElement
        let title = shop.querySelectorAll('.shop-item-title')[0].innerText;
        let price = shop.querySelectorAll('.shop-item-price')[0].innerText;
        let imageSrc = shop.querySelectorAll('.shop-item-image')[0].src;
        addToCartMethod(title, price, imageSrc)
        updateCartTotal()
    })

}


const addToCartMethod = (title, price, imageSrc) => {
    let cartDiv = document.createElement('div')
    cartDiv.classList.add('cart-row')
    let cartRows = document.querySelectorAll('.cart-items')[0]
    let cartName = cartRows.querySelectorAll('.cart-item-title')

    for (let index = 0; index < cartName.length; index++) {
        if (cartName[index].innerText == title) {
            alert("This item already added in store")
            return
        }

    }

    let html = ` <div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src="${imageSrc}"
              width="100"
              height="100"
            />
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" />
            <button class="btn btn-danger" type="button">REMOVE</button>
          </div>`
    cartDiv.innerHTML = html
    cartRows.append(cartDiv)
    cartDiv.querySelectorAll('.btn-danger')[0].addEventListener('click', event => {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    })
    cartDiv.querySelectorAll('.cart-quantity-input')[0].addEventListener('change', event => {
        let inputVal = event.target
        if (isNaN(inputVal.value) || inputVal.value <= 0) {
            inputVal.value = 1
        }
        updateCartTotal()
    })
}

const purchase = document.querySelectorAll('.btn-purchase')[0]
purchase.addEventListener('click', () => {
    alert("Thank you for purchasing")
    let cartItems = document.querySelectorAll('.cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)

    }
    updateCartTotal()
})
const updateCartTotal = () => {
    let cartItems = document.querySelectorAll('.cart-items')[0]
    let cartRows = cartItems.querySelectorAll('.cart-row')
    var total = 0
    for (let index = 0; index < cartRows.length; index++) {
        let element = cartRows[index];
        let priceElem = element.querySelectorAll('.cart-price')[0]
        let qntElem = element.querySelectorAll('.cart-quantity-input')[0]
        let price = parseFloat(priceElem.innerText.replace('$', ''))
        let qnt = qntElem.value
        total = total + (price * qnt)
    }
    total = Math.round(total * 100) / 100
    document.querySelectorAll('.cart-total-price')[0].innerText = `$${total}`
}
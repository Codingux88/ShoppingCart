
let paymentRightTop = document.getElementById("payment_right_top");
let paymentLeftBottom = document.getElementById('payment_right_bottom');
let paymentButton = document.getElementById('payment_button');


let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (paymentRightTop.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
        <div class="item">
            <div class="item_left">
                <img src=${search.img} alt="">
                <div class="item_details">
                    <h4>${search.name}</h4>
                    <div class="item_quanity">
                        <button onclick="decrement(${id})"><i class='bx bx-minus'></i></button>
                        <span id=${id}>${item}</span>
                        <button onclick="increment(${id})"><i class='bx bx-plus'></i></button>
                        <h5 id="price">$${search.price}</h5>
                    </div>  
                </div>
                <div class="remove">
                    <i onclick="removeItem(${id})" class='bx bx-x'></i>
                </div>
            </div>
        </div> 
      `;
      })
      .join(""));
  } else {
    paymentRightTop.innerHTML = `
    <div class="empty_cart">Cart is empty</div>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

// let clearCart = () => {
//   basket = [];
//   generateCartItems();
//   localStorage.setItem("data", JSON.stringify(basket));
// };

let TotalAmount = () => {
  if (basket.length !== 0) {
    let subtotal = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

      let tax = 0.0725;
      let taxTotal = subtotal * tax;
      taxTotal = Math.round(taxTotal * 100) / 100;
      let total = subtotal + taxTotal;
      total = Math.round(total* 100) / 100;
      total = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });

      paymentLeftBottom.innerHTML = `
      <div class="total_left">
        <h6>Subtotal</h6>
        <h6>Tax</h6>
        <h6>Shipping</h6>
        <h6>Total</h6>
    </div>
    <div class="total_right">
        <h6 id="subtotal">$${subtotal}</h6>
        <h6 id="tax">$${taxTotal}</h6>
        <h6 id="shipping">$0.00</h6>
        <h6 id="total">${total}</h6>
    </div>
      `;

      paymentButton.innerHTML = `
      <button id="pay_amount">Pay ${total}</button>
      `
    
    
  } else{
    paymentLeftBottom.innerHTML = `
      <div class="total_left">
        <h6>Subtotal</h6>
        <h6>Tax</h6>
        <h6>Shipping</h6>
        <h6>Total</h6>
    </div>
    <div class="total_right">
        <h6 id="subtotal">$0.00</h6>
        <h6 id="tax">$0.00</h6>
        <h6 id="shipping">$0.00</h6>
        <h6 id="total">$0.00</h6>
    </div>
      `;

      paymentButton.innerHTML = `
      <button id="pay_amount">Pay $0.00</button>
      `

  }
};

TotalAmount();


// payment methods

let credit = document.getElementById('credit');
let paypal = document.getElementById('paypal');
let creditIcon = document.getElementsByClassName('bxs-credit-card')[0];
let checkIcon = document.getElementsByClassName('bxs-check-circle')[0];
let paypalIcon = document.getElementsByClassName('bxl-paypal')[0];
let checkIconPaypal = document.getElementById('check');
let creditMethodPay = document.getElementById('credit_method');

credit.addEventListener('click', ()=>{
    paypal.setAttribute('style', 'color: #000; border: 1px solid #ccc');
    paypalIcon.setAttribute('style', 'color: #000');
    checkIconPaypal.setAttribute('style', 'color: #000');

    credit.setAttribute('style', 'color: #008CBA; border: 1px solid #008CBA');
    creditIcon.setAttribute('style', 'color: #008CBA');
    checkIcon.setAttribute('style', 'color: #008CBA');

    creditMethod()
})

paypal.addEventListener('click', ()=>{
    credit.setAttribute('style', 'color: #000; border: 1px solid #ccc');
    creditIcon.setAttribute('style', 'color: #000');
    checkIcon.setAttribute('style', 'color: #000');

    paypal.setAttribute('style', 'color: #008CBA; border: 1px solid #008CBA');
    paypalIcon.setAttribute('style', 'color: #008CBA');
    checkIconPaypal.setAttribute('style', 'color: #008CBA');

    paypalMethod()
})

let creditMethod = () => {
    creditMethodPay.innerHTML = `
    <label for="Cardholder name">Cardholder name</label>
    <input type="text" id="card_name"><br />

    <label for="Card number" >Card number</label>
    <input type="text" id="card_number"><br />

    
    <label for="Expiration date">Expiration date</label><br />
    <div class="expiration">    
        <input type="text" id="card_month">
        <span> / </span>
        <input type="text" id="card_year"><br />
    </div>
    

    <label for="Expiration date">CW</label><br />
    <input type="text" id ='card_cw'>
    `
}

creditMethod()

let paypalMethod = () => {
    creditMethodPay.innerHTML = `
    <div class="paypal_content">Click button below to login payapl to make a payment.</div>
    `
  }
     

    
    


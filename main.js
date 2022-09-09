let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return(shop.innerHTML = shopItemsData.map((x) => {
    let {id, name, price, img} = x;
    let search = basket.find((x)=>x.id === id) || [];
    return`
        <div class="items_box" id=product-id-${id}>
            <div class="item">
                <img src=${img}  alt="">
                <div class="bottom_box">
                    <div class="info_box">
                        <li class="title">${name}</li>
                        <li class="price">$${price}</li>
                    </div>
    
                    <div class="cart_box">
                    <i onclick="decrement(${id})" class='bx bx-minus'></i>
                    <div id=${id}>
                    ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick="increment(${id})" class='bx bx-plus'></i>
                    </div>
                </div>
            </div>
        </div>
    `;
  }).join(''))
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x)=>x.id === selectedItem.id);

  if(search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    })
  }else{
    search.item += 1;
  }
  update(selectedItem.id)
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem  = id;
  let search = basket.find((x)=>x.id === selectedItem.id);

  if(search === undefined) return;
  else if(search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x)=>x.item !== 0)
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x)=>x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let totalItems = document.getElementById('cartAmount');
  totalItems.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}

calculation();


//add item







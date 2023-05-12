// Set rates + misc
const taxRate = 0.05;
const shippingRate = 15.0;
const fadeTime = 300;

// Assign actions
document.querySelectorAll(".product-quantity input").forEach((input) => {
  input.addEventListener("change", function () {
    updateQuantity(this);
  });
});

document.querySelectorAll(".product-removal button").forEach((button) => {
  button.addEventListener("click", function () {
    removeItem(this);
  });
});

// Recalculate cart
function recalculateCart() {
  var subtotal = 0;

  // Sum up row totals
  var products = document.querySelectorAll(".product");
  for (var i = 0; i < products.length; i++) {
    var price = parseFloat(
      products[i].querySelector(".product-line-price").textContent
    );
    subtotal += price;
  }

  // Calculate totals
  var tax = subtotal * taxRate;
  var shipping = subtotal > 0 ? shippingRate : 0;
  var total = subtotal + tax + shipping;

  // Update totals display
  var totalsValues = document.querySelectorAll(".totals-value");
  for (var i = 0; i < totalsValues.length; i++) {
    totalsValues[i].style.display = "none";
    document.querySelector("#cart-subtotal").textContent = subtotal.toFixed(2);
    document.querySelector("#cart-tax").textContent = tax.toFixed(2);
    document.querySelector("#cart-shipping").textContent = shipping.toFixed(2);
    document.querySelector("#cart-total").textContent = total.toFixed(2);
    if (total == 0) {
      document.querySelector(".checkout").style.display = "none";
    } else {
      document.querySelector(".checkout").style.display = "block";
    }
    totalsValues[i].style.display = "block";
  }
}

function updateQuantity(quantityInput) {
  // Calculate line price
  var productRow = quantityInput.parentElement.parentElement;
  var price = parseFloat(
    productRow.querySelector(".product-price").textContent
  );
  var quantity = parseInt(quantityInput.value);
  var linePrice = price * quantity;

  // Update line price display and recalc cart totals
  var productLinePrice = productRow.querySelector(".product-line-price");
  productLinePrice.style.display = "none";
  productLinePrice.textContent = linePrice.toFixed(2);
  recalculateCart();
  productLinePrice.style.display = "block";
}

function removeItem(removeButton) {
  // Remove row from DOM and recalc cart total
  var productRow = removeButton.parentElement.parentElement;
  productRow.style.display = "none";
  productRow.parentNode.removeChild(productRow);
  recalculateCart();
}

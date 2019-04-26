function purchaseProduct(event) {
  event.preventDefault();
  console.log(event);
}

function openProductModal(event) {
  let data = event.path[2].innerText
  data = data.split("\n")
  let productItemTitle = document.querySelector('#productItemTitle');
  let productItemDescription = document.querySelector('#productItemDescription');
  let prodcutPrice = document.querySelector('#productItemPrice')
  productItemTitle.innerHTML=data[0]
  productItemDescription.innerHTML=data[2]
  $('#purchaseProductModal').modal('show')
}

var stripe = Stripe('pk_test_yLLLzXInGmnsC7vYSbSuEIQj');

var checkoutButton = document.getElementById('theButton');
checkoutButton.addEventListener('click', function () {
  // When the customer clicks on the button, redirect
  // them to Checkout.
  stripe.redirectToCheckout({
    items: [{sku: 'sku_ExBWqWqQJXdoHI', quantity: 1}],

    // Note that it is not guaranteed your customers will be redirected to this
    // URL *100%* of the time, it's possible that they could e.g. close the
    // tab between form submission and the redirect.
    successUrl: window.location.protocol + '//fourhundredfifteen.com',
    cancelUrl: window.location.protocol + '//fourhundredfifteen.com/canceled',
  })
  .then(function (result) {
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer.
      var displayError = document.getElementById('error-message');
      displayError.textContent = result.error.message;
    }
  }); 
});
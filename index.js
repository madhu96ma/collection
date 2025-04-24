function fun(){
    alert("buynow");
}

// document.addEventListener('DOMContentLoaded', function() {
//     const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
//     addToCartButtons.forEach(button => {
//       button.addEventListener('click', function() {
//         const productName = this.dataset.productName;
//         const productPrice = parseFloat(this.dataset.productPrice);
//         const productImage = this.dataset.productImage;
  
//         // Call your addcart function with the retrieved values
//         addcart(productName, productPrice, productImage);
//       });
//     });
  
//     // Your addcart function
//     function addcart(name, price, image) {
//         console.log('Adding to cart:', { name, price, image });
//         // Here you would implement your actual add to cart logic:
//         // - Store the product information in a cart array
//         // - Update the cart display in the UI
//         // - Potentially send data to a server
//         alert('Adding to cart:', { name, price, image })
//       }
//   });


  document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior

            const productName = this.dataset.productName;
            const productPrice = parseFloat(this.dataset.productPrice);
            const productImage = this.dataset.productImage;

            const productInfo = {
                name: productName,
                price: productPrice,
                image: productImage
            };



            // Store the product information in localStorage
            localStorage.setItem('currentProduct', JSON.stringify(productInfo));

            // Redirect to the addcart page
            window.location.href = 'addcart.html';
            addcart(productName, productPrice, productImage);
        });
    });

    function addcart(name, price, image) {
        console.log('Adding to cart:', { name, price, image });
        // Here you would implement your actual add to cart logic:
        // - Store the product information in a cart array
        // - Update the cart display in the UI
        // - Potentially send data to a server
        alert('Adding to cart:', { name, price, image })
      }
});






var cart;

function getCart() {
	(sessionStorage.getItem('cart') != null) ? cart = JSON.parse(sessionStorage.getItem('cart')) : cart=[];
}

function getQuantityinCart() {
	var totalQuantity = 0;
	_.each(cart, function(item, index) {
		totalQuantity = totalQuantity + item.quantity;
	})
	return totalQuantity;
}

function updateQuantityInCart() {
	$('.cart .circle span').html(getQuantityinCart());
}

function addSeeCartEvent() {
	$('.big-menu a.cart').click(function() {
		showCart();
	});
}

function showCart() {
	var cartTemplate = _.template($('#cartProducts').html());
	getCart();
	showUpdateCartButton();
	var cartProducts = ''
	_.each(cart, function(product, index){
		cartProducts += cartTemplate({
						index: index,
						image: product.image,
						title: product.name,
						price: product.price,
						size: product.size,
						quantity: product.quantity
					})
	})
	$('.modal-body').html(cartProducts);
}

function showUpdateCartButton() {
	_.isEmpty(cart) ? $('.modal-footer').addClass('hidden') : $('.modal-footer').removeClass('hidden');
}

function updateSessionStorage() {
	sessionStorage.setItem('cart', JSON.stringify(cart));
}

function addUpdateCartButtonEvent() {
	$('body').on('click', '.modal-footer .btn-update', function() {
		var newCart = $('.cart-product .count');
		_.each(newCart, function (product, index) {
			if (cart[index].quantity !== parseInt($(product).html())) {
				cart[index].quantity = parseInt($(product).html());
				updateSessionStorage();
				updateQuantityInCart();
			} 
		});

	});
}

function deleteCartProductEvent() {
	$('.modal-body').on('click', '.close', function() {
		if (confirm("Are you sure you want to remove this item from the cart?")) {
			var productId = $(this).attr('data-id');
			cart.splice(productId, 1);
			updateSessionStorage();
			$('.cart-product[data-id="' + productId + '"]').remove();
			showUpdateCartButton();
			updateQuantityInCart();
		}		
	})
}


function addQuantityEvent() {
	$('body').on('click', '.operation', function() {
		var number = parseInt($(this).siblings('.count').html());
		if ($(this).html() === '+') {
			$(this).siblings('.count').html(number+1);
		} 
		if ($(this).html() === '-' && number != 1) {
			$(this).siblings('.count').html(number-1);
		} 
});
}

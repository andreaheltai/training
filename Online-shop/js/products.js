$(document).ready(function() {
	getCart();
	addProducts();
	showMainImage();
	addSelectImageEvent();
	addQuantityEvent();
	addSizeSelectEvent();
	addOrderNowEvent();
	addSeeCartEvent();
	deleteCartProductEvent();
	updateQuantityInCart();
	addUpdateCartButtonEvent();
});

function addProducts(){
	var productTemplate = _.template($('#productsTemplate').html());

	var filteredProducts = _.filter(products, function(product, index) {return index < 4; });
	
	_.each(filteredProducts, function(product, index){
		var allProducts = '<div class="col col-lg-3 col-md-3 col-sm-3 col-xs-12">';
		allProducts += productTemplate({
						count: product.count,
						desc: product.desc,
						name: product.name,
						price: product.price,
						sizes: product.sizes
					})
		allProducts += '</div>';
		$('.all-products').append(allProducts);
	})
}

function showMainImage() {
	var imagePath = $('.preview.active').children('img').attr('src');
	$('.main-img').children('img').attr('src', imagePath);
}

function addSelectImageEvent() {
	$('.preview').click(function() {
		$('.preview.active').removeClass('active');
		$(this).addClass('active');
	});
}

function addSizeSelectEvent() {
	$('.sizes').click(function() {
		$('.sizes.active').removeClass('active');
		$(this).addClass('active');
	});
}

function getSelectedSize() {
	return $('.choose .sizes.active').html();
}

function getSelectedQuantity() {
	return parseInt($('.choose .count').html());
}

function getProductImage() {
	return $('.main-img img').attr('src');
}

function getProductName() {
	return $('.main-product h1.text-uppercase').html();
}

function getProductPrice() {
	return $('.main-product .price-value').html();
}

function getProduct() {
	return {
			name: getProductName(),
			price: getProductPrice(),
			image: getProductImage(),
			size: getSelectedSize(),
			quantity: getSelectedQuantity()
		};
}

function addOrderNowEvent() {
	$('.btn-order').click(function() {
		var product = getProduct();
		getCart();
		_.isEmpty(cart) ?  cart.push(product) : checkProductsInCart(product);
		updateQuantityInCart();
		updateSessionStorage();
	})
}

function checkProductsInCart(product) {
	var found = cart.find(function(item) {
		return (product.name.toLowerCase() === item.name.toLowerCase() && product.size === item.size);
	})

	if (found) {
		found.quantity = found.quantity + product.quantity;
	} else {
		cart.push(product);
	}
}



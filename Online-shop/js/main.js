$(document).ready(function(){
	addFilters();
	addProducts();
	getCart();
	updateQuantityInCart();
	addSeeCartEvent();
	addUpdateCartButtonEvent();
	deleteCartProductEvent();
	addQuantityEvent();
});

function addFilters(){
	var filterTemplate = _.template($('#filterTemplate').html());
	var sectionsTemplate = _.template($('#sectionsTemplate').html());

	_.each(filters, function(filter, index, filters) {
		var titles = filterTemplate({title: filter.title, index: index});
		var labels = '';
		var sections = filter.sections;

		_.each(sections, function (section, index, sections) {
			labels += sectionsTemplate ({ title: filter.title, index: index, label: section});
		})
		
		$(".filters").append(titles);
		$(".sections-" + index).append(labels);
	})
}

function addProducts(){
	var productTemplate = _.template($('#productsTemplate').html());
	
	_.each(products, function(product, index, products){
		var allProducts = '<div class="col col-lg-4 col-md-4 col-sm-4 col-xs-12">';
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
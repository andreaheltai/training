var list = Array.from(document.getElementsByClassName("number"));
var allProducts = document.getElementsByClassName("product");
var allProductPages = document.getElementsByClassName("products");
var brandFilters = [];

addArrowEvent();
addNumberEvent();
addBrandEvent();
getPaginatedProducts();

//Adds click event for page arrows
function addArrowEvent() {
	var allArrows = document.getElementsByClassName("arrow");

	for (i = 0; i < allArrows.length; i++) {
		allArrows[i].addEventListener("click", function() { selectPage(this) });
	}
}

//Adds click event for numbers
function addNumberEvent() {
	for (i = 0; i < list.length; i++) {
		list[i].addEventListener("click", function() { 
			var currentPosition = list.indexOf(document.getElementsByClassName("number active")[0]);
			list[currentPosition].classList.remove("active");
			this.classList.add("active");
			getPaginatedProducts();
		});
	} 
}

//Adds event when brand checboxes are checked
function addBrandEvent() {
	var allBrands = document.getElementsByClassName("brand");
	for (var i=0; i<allBrands.length; i++) {
		allBrands[i].addEventListener("change", 
			function() {
				if (this.checked) {
					brandFilters.push(this.getAttribute('id'));
					filterWhenChecked();
				} else {
					var index = brandFilters.indexOf(this.getAttribute('id'));
					brandFilters.splice(index, 1);
					if (brandFilters.length === 0) {
						console.log('empty brandfilters');
						unfilter();
					} else {
						filterWhenChecked();
					};					
				}
			});
		};
};

//Filter products based on checked checkboxes
function filterWhenChecked() {
	//Show all product pages
	for (var i=0; i<allProductPages.length; i++) {
		allProductPages[i].classList.remove('no-display');
	}

	//Hide all products that don't match filters
	for (var i=0; i<allProducts.length; i++) {
		allProducts[i].classList.add('no-display');
		for (var j=0; j<brandFilters.length; j++) {
			if (allProducts[i].getAttribute('data-brand') === brandFilters[j]) {
				allProducts[i].classList.remove('no-display');
				break;
			}
		}
	}
}

//Show all products paginated
function unfilter() {
	//Show all products
	for (var i=0; i<allProducts.length; i++) {
			allProducts[i].classList.remove('no-display');
	}

	//Make first page active and hide rest of pages
	removeActive();
	makeActive(0);
	getPaginatedProducts();
}

//Based on clicked arrow, check page transition and make active next page
function selectPage(arrow) {
	//Establish visible pages
	if (arrow.getAttribute("data-direction") === "next") {
		rightTransition();
	} else {
		leftTransition();		
	}

	// Remove the active class from current page
	var currentPosition = list.indexOf(document.getElementsByClassName("number active")[0]);
	var futurePosition = arrow.getAttribute("data-direction") === "next" ? currentPosition + 1 : currentPosition - 1;
	removeActive();
	makeActive(futurePosition);	

	//Get paginated products
	getPaginatedProducts();
}

//Takes active class off of current active page
function removeActive() {
	var currentPosition = list.indexOf(document.getElementsByClassName("number active")[0]);
	list[currentPosition].classList.remove("active");
}

// Makes another page active
function makeActive(position) {
	//If element is last in list, start from beginning
	if (position === list.length) {
		list[0].classList.add("active");
		return;
	}

	//If element is first in list, start from the end
	if (position === -1) {
		list[list.length-1].classList.add("active");
		return;
	}

	list[position].classList.add("active");	
}

//Checks if element to the right is last one visible and transitions to next pages
function rightTransition() {
	var currentPosition = list.indexOf(document.getElementsByClassName("number active")[0]);

	if (currentPosition !== list.length-1 &&
		list[currentPosition+1].classList.contains('no-display')) {
	 	
	 	//Show next 8 numbers to the right
	 	for (var i=1; i<=8; i++) {
	 		if (currentPosition+i < list.length) {
	 			list[currentPosition+i].classList.remove('no-display');
	 		};
	 	}

	 	//Hide all numbers to the left 	
	 	for (var j=currentPosition; j>=0; j--) {
	 		list[j].classList.add('no-display');
	 	}
	}

	//If last element, start from beginning of the list
	if (currentPosition === list.length-1 && 
		list[0].classList.contains('no-display')) {

		//Show first 8 numbers in list
		for (var i=0; i<=7; i++) {
		 	list[i].classList.remove('no-display');
		}

		//Hide all other numbers
		for (var j=8; j<list.length; j++) {
	 		list[j].classList.add('no-display');
	 	}
	}
}

//Checks if element to the left is last one visible and transitions to next pages
function leftTransition() {
	var currentPosition = list.indexOf(document.getElementsByClassName("number active")[0]);

	if (currentPosition != 0 &&  
		list[currentPosition-1].classList.contains('no-display')) {
		
		//Show next 8 numbers to the left
		for (var i=1; i<=8; i++) {
			if (currentPosition-i >= 0) {
	 			list[currentPosition-i].classList.remove('no-display');
	 		}
	 	}

	 	//Hide all numbers to the right
	 	for (var j=currentPosition; j<list.length; j++) {
	 		list[j].classList.add('no-display');
	 	}
	}

	//If first element, start from end of the list
	if (currentPosition === 0 && 
		list[list.length-1].classList.contains('no-display')) {

		//Show last numbers in list
		var toShow = list.length % 8;

		for (var i=1; i<=toShow; i++) {
		 	list[list.length-i].classList.remove('no-display');
		}

		//Hide all other numbers
		for (var j=0; j<list.length-toShow; j++) {
	 		list[j].classList.add('no-display');
	 	}
	}
}


//Shows different products based on the page you're on
function getPaginatedProducts() {
	var currentPage = list.indexOf(document.getElementsByClassName("number active")[0]);

	for (i=0; i<allProductPages.length; i++) {
		allProductPages[i].classList.add('no-display');
	}

	allProductPages[currentPage].classList.remove('no-display');
}

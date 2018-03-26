var list = Array.from(document.getElementsByClassName("number"));

addArrowEvent();

function addArrowEvent() {
	var allArrows = document.getElementsByClassName("arrow");

	for (i = 0; i < allArrows.length; i++) {
		allArrows[i].addEventListener("click", function() { selectPage(this) });
	}
}

function getCurrent() {
//Returns the position of the active page in the list array
	for (var i=0; i < list.length; i++) {
		if (list[i].classList.contains("active")) {
			return i;
		};
	};
}

function selectPage(arrow) {
	var currentPosition = list.indexOf(document.getElementsByClassName("number active")[0]);

	//Establish visible pages
	if (arrow.getAttribute("data-direction") === "next") {
		rightTransition();
	} else {
		leftTransition();		
	}

	// Remove the active class from current page
	list[currentPosition].classList.remove("active");
	var futurePosition = arrow.getAttribute("data-direction") === "next" ? currentPosition + 1 : currentPosition - 1;
	makeActive(futurePosition);	
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

//Checks if element is last visible and transitions to next pages
function rightTransition() {
	var current = list.indexOf(document.getElementsByClassName("number active")[0]);
	if (current !== list.length-1 &&
		list[current+1].classList.contains('no-display')) {
	 	
	 	//Show next 8 numbers to the right
	 	for (var i=1; i<=8; i++) {
	 		if (current+i < list.length) {
	 			list[current+i].classList.remove('no-display');
	 		};
	 	}

	 	//Hide all numbers to the left 	
	 	for (var j=current; j>=0; j--) {
	 		list[j].classList.add('no-display');
	 	}
	}

	//If last element, start from beginning of the list
	if (current === list.length-1 && 
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

function leftTransition() {
	var current = list.indexOf(document.getElementsByClassName("number active")[0]);
	if (current != 0 &&  
		list[current-1].classList.contains('no-display')) {
		
		//Show next 8 numbers to the left
		for (var i=1; i<=8; i++) {
			if (current-i >= 0) {
	 			list[current-i].classList.remove('no-display');
	 		}
	 	}

	 	//Hide all numbers to the right
	 	for (var j=current; j<list.length; j++) {
	 		list[j].classList.add('no-display');
	 	}
	}

	//If first element, start from end of the list
	if (current === 0 && 
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

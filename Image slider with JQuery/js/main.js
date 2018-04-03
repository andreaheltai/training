var allImages = $('.sml-img');

$(document).ready(function() {

	//Opt-in for tooltips and popovers
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip();
	  $('[data-toggle="popover"]').popover();
	})

	//Add click event to info circle
	$('.fa-info-circle').click(function(){
		$('.about').removeClass('no-display');
		$('.shadow').removeClass('no-display');
	});

	//Add click event to exit symbol
	$('.fa-times-circle').click(function(){
		closeModal();
	});

	//Add click event to modal background
	$('.shadow').click(function(){
		closeModal();
	})

	//Activate tabs
	$('#trial-tabs a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})

	loadThumbnails();
	loadHeroImage();
	addHeroArrowEvent();
	showThumbArrows();
	addThumbArrowEvent();
	addImgEvent();
});

//Set images as background for thumbnails
function loadThumbnails(){
	//Loads images in thumbnails
	$('.sml-img').each(function(index) {
		var number = index+1;
		$(this).css('background-image', 'url("images/photo' + number + '.jpg")');
	});

	styleLastImg();
}


//Sets hero image based on active thumbnail image
function loadHeroImage(){
	var bgr = $('.sml-img.active').css('background-image');
	$('.hero-image').css('background-image', bgr);
}

//Adds click event to arrows on hero image
function addHeroArrowEvent() {
	$('.arrow').each(function() {
		$(this).click(function() {
			goToNextImage($(this).attr('data-direction'));
		}
		);
	});
}

//Adds click event to arrows on thumbnails
function addThumbArrowEvent() {
	$('.arr').each(function() {
		$(this).click(function() {
			transitionNextImage($(this).attr('data-direction'));
			styleLastImg();
			showThumbArrows();
		}
		);
	});
}


//Adds click event to thumbnails
function addImgEvent(){
	$('.sml-img').each(function() {
		$(this).click(function() {
			var activeIndex = allImages.index($('.active'));
			removeActive(activeIndex);
			setActive(allImages.index(this));
			loadHeroImage();
		});
	});
}

//Remove border-right from last visible thumbnail and add border-right to rest of images
function styleLastImg() {
	$('.sml-img').each(function() {
		$(this).css('border-right', '3px solid transparent');
	});
	$('.sml-img').not('.no-display').last().css('border-right', 'none');
}


//Decide which image should be made active
function goToNextImage(direction) {
	var activeIndex = allImages.index($('.sml-img.active'));
	var lastVisible = allImages.index($('.sml-img').not('.no-display').last());
	var firstVisible = allImages.index($('.sml-img').not('.no-display').first());

	removeActive(activeIndex);
	//Check if image that will be made active is visible & makes it active
	if (direction === 'right') {
		if (activeIndex === lastVisible) {
			transitionNextImage(direction);
		}
		setActive(activeIndex + 1);
	} else {
		if (activeIndex === firstVisible) {
			transitionNextImage(direction);
		}
		setActive(activeIndex - 1);
	}

	//Load new active image
	styleLastImg()
	showThumbArrows();
	loadHeroImage();
}

//Remove active class from a thumbnail
function removeActive(index) {
	$('.sml-img:eq(' + index + ')').removeClass('active');
}


//Adds active class to a thumbnail
function setActive(index) {
	// If element is last in list, start from the beginning
	if (index === allImages.length) {
		$('.sml-img:eq(0)').addClass('active');
		return;
	}

	//If element is first in list, start from the end
	if (index === -1) {
		var next = allImages.length-1;
		$('.sml-img:eq(' + next + ')').addClass('active');
		return;
	}

	$('.sml-img:eq(' + index + ')').addClass('active');	
}

//Transitions visible thumbnail images to the left or to the right
function transitionNextImage(direction) {
	var lastVisible = allImages.index($('.sml-img').not('.no-display').last());
	var firstVisible = allImages.index($('.sml-img').not('.no-display').first());
	var visibleImages = $('.sml-img').not('.no-display').length;

	if (direction === 'right') {
		//If last image in list, transition to first images
		if (lastVisible === allImages.length-1) {
			for (var i=0; i < allImages.length; i++) {
				if (i < visibleImages) {
					$('.sml-img:eq(' + i + ')').removeClass('no-display');
				} else {
					$('.sml-img:eq(' + i + ')').addClass('no-display');
				}
			}
			return;
		} 
		//Stop displaying first visible thumbnail
		$('.sml-img:eq(' + firstVisible + ')').addClass('no-display');
		//Start displaying next thumbnail after last visible 
		var newVisible = lastVisible + 1;
		$('.sml-img:eq(' + newVisible + ')').removeClass('no-display');

	} else {
		//If first image in list, transition to last images
		if (firstVisible === 0) {
			for (var i=0; i < allImages.length; i++) {
				if (i < allImages.length - visibleImages) {
					$('.sml-img:eq(' + i + ')').addClass('no-display');
				} else {
					$('.sml-img:eq(' + i + ')').removeClass('no-display');
				}
			}
			return;
		}
		//Stop displaying last visible thumbnail
		$('.sml-img:eq(' + lastVisible + ')').addClass('no-display');
		//Start displaying thumbnail previous to first thumbnail 
		var newVisible = firstVisible - 1;
		$('.sml-img:eq(' + newVisible + ')').removeClass('no-display');
	}
}

//Hides arrows on thumbnails if first or last of all thumbnail images is visible
function showThumbArrows() {
	var lastVisible = allImages.index($('.sml-img').not('.no-display').last());
	var firstVisible = allImages.index($('.sml-img').not('.no-display').first());
	
	$('.arr').each(function(){
		$(this).removeClass('no-display');
	})

	if (lastVisible === allImages.length-1) {
		$('.fa-angle-double-right').addClass('no-display');
	}

	if (firstVisible === 0) {
		$('.fa-angle-double-left').addClass('no-display');
	}
};

function closeModal() {
	$('.about').addClass('no-display');
	$('.shadow').addClass('no-display');	
};


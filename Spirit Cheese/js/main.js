var questionsArray = [
						{question: 'Which drink do you prefer with cheese?',
						answer1: {option: 'Champagne',
								  val: 2},	
						answer2: {option: 'Red Wine',
								  val: 3},
						answer3: {option: 'White Wine',
								  val: 1}	
						},
						{question: 'What kind of bread do you like?',
						answer1: {option: 'White bread',
								  val: 3},	
						answer2: {option: 'Toast',
								  val: 2},	
						answer3: {option: 'Crackers',
								  val: 1}	
						},
						{question: 'Which fruit do you prefer?',
						answer1: {option: 'Pear',
								  val: 2},	
						answer2: {option: 'Watermelon',
								  val: 1},	
						answer3: {option: 'Apple',
								  val: 3}	
						},
						{question: 'Which nuts do you prefer?',
						answer1: {option: 'Pecans',
								  val: 2},	
						answer2: {option: 'Almonds',
								  val: 3},	
						answer3: {option: 'Walnuts',
								  val: 1}	
						}
					]

var resultsArray = [
					{result: 'Feta',
					image: 'images/feta.jpeg',
					description: "Your spirit cheese is flavorful and robust. This Greek delicacy goes well with some crackers, watermelon and walnuts. Oh, and don't forget the White Wine - Cheers!"
					},
					{result: 'Brie',
					image: 'images/brie.jpg',
					description: "Your spirit cheese is sophisticated and smooth. This French delicacy goes well with some toast, pears and pecans. Oh, and don't forget the Champagne - Cheers!"
					},
					{result: 'Cheddar',
					image: 'images/cheddar.png',
					description: "Your spirit cheese is strong and well-balanced. This English delicacy goes well with some white bread, apples and almonds. Oh, and don't forget the Red Wine - Cheers!"
					},
				   ]
var questionIndex;
var result = 0;

$(document).ready(function() {
	newQuestion(0);
	addNextEvent();
});

function newQuestion(index) {
	$('.question-box h2').html(questionsArray[index].question);
	$('.question-box label[for="option-1"]').html(questionsArray[index].answer1.option);
	$('.question-box label[for="option-1"]').attr("data-value", questionsArray[index].answer1.val);
	$('.question-box label[for="option-2"]').html(questionsArray[index].answer2.option);
	$('.question-box label[for="option-2"]').attr("data-value", questionsArray[index].answer2.val);
	$('.question-box label[for="option-3"]').html(questionsArray[index].answer3.option);
	$('.question-box label[for="option-3"]').attr("data-value", questionsArray[index].answer3.val);
	$('#option-1').prop('checked', false);
	$('#option-2').prop('checked', false);
	$('#option-3').prop('checked', false);
	questionIndex = index;
	if (questionIndex === questionsArray.length-1) {
		$('.question-box .btn-text').text('get result');
	};
}

function addNextEvent() {
	$('.btn.next').click(function() {
		if ($('.btn-text').html().toLowerCase() === 'next') {
			showNextQuestion(true);
		} else {
			showNextQuestion(false);
			showResult();
		}
			
	})
}

function addResultIfChecked() {
	var checked = false;
	for (var i = 0; i <= 3; i++) {
		if ($('#option-' + i).is(':checked')) {
			checked = true;	
			result += parseInt($('label[for="option-' + i + '"]').attr("data-value"));		
		} 
	}
	return checked;
}

function showNextQuestion(show) {
	if (addResultIfChecked()) {
		if (show === true) {
			newQuestion(questionIndex+1);
		}
		$('.alert').html('');
	} else {
		$('.alert').html('Please select an option from the above.');
	}	
}

function showResult() {
	$('.interactive').html('');
	var html = '';
	if (result < 7) {
		html += resultHtml(0);
	} else if (result < 9) {
		html += resultHtml(1);
	} else {
		html += resultHtml(2);
	}
	$('.interactive').html(html);
}

function resultHtml(index) {
	var quizResult = resultsArray[index];
	var html = '<div class="result col-lg-12 col-md-12 col-sm-12 col-xs-12">' + 
		          '<div class="image col-lg-4 col-md-4 col-sm-12 col-xs-12" style="background-image: url('+ quizResult.image+')">' + 
		          '</div>' + 
		          '<div class="text col-lg-6 col-md-6 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1">' + 
		            '<h2 class="result-title">' + quizResult.result + '<span class="subtitle"> is your spirit cheese</span> </h2>' + 
		            '<p class="description">'+ quizResult.description +'</p>' +
		          '</div>' + 
		        '</div>';
	return html;
}
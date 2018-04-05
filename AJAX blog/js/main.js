$(document). ready(function(){
	addSaveEvent();
	getArticles();
})

//Add event on "Save" button when adding article
function addSaveEvent() {
	$('.modal .save-btn').click(function() {
		if (checkIfEmpty($('.modal #artTitle').val()) || checkIfEmpty($('.modal #artContent').val())) {
			alert('Please fill out title and content before posting.')
		} else {
			postArticle($('.modal #artTitle').val(), $('.modal #artContent').val());
			$('#add-article').modal('hide');
		}
	});
}

//AJAX call to GET all articles in DB
function getArticles(){
	$.ajax({
		url:"https://jsonplaceholder.typicode.com/posts/?callback=?",
		type: "GET",
		dataType: 'json',
		success: function(res) {
			displayArticles(res);
		},
		error: function(err) {
			alert('Articles could not be retrieved');
		}
	});
}

//Display all articles retrieved from DB 
function displayArticles(articles) {
	var html = '';
	$.each(articles, function(index, article) {
		if (index > 19) {
			return false;
		}

		var shortTitle = shorten(article.title, 15);
		var shortContent = shorten(article.body, 120);

		html = '<div class="row article text-left">' + 
					'<h2 class="text-capitalize">' + shortTitle + '...</h2>' + 
          			'<p class="description">' + shortContent + '...</p>' +
			        '<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#article-details" data-id="' + article.id + '">Read more</button>' +
		          	'<div class="hr"></div>' +
		        '</div> <!-- Article end -->'; 

		$('.articles').append(html);
		$('.article .btn-lg[data-id=' + article.id +']').click(function(){
			$('.modal-header h2').html(article.title);
			$('.modal-body .description').html(article.body);
			$('.modal-footer .article-delete').attr('data-id', article.id);
		})
	});

	addDeleteEvent();
}

//Shortens a string to a number of characters 
function shorten(str, maxLen, separator = ' ') {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}


// AJAX call to DELETE all articles in DB
function deleteArticle(id) {	
	$.ajax({
		url:"https://jsonplaceholder.typicode.com/posts/" + id + "?callback=?",
		type: "DELETE",
		dataType: 'json',
		success: function(res) {
			console.log(res);
			alert('Article ' + res.id + ' was deleted');
		},
		error: function(err) {
			alert('Article could not be deleted');
		}
	});
}

// AJAX call to POST a new article in DB
function postArticle(title, content) {
	var data = JSON.stringify({
			      title: title,
			      body: content,
			      userId: 1
			    });
	$.ajax({
		url:"https://jsonplaceholder.typicode.com/posts/?callback=?",
		type: "POST",
		headers: {
	      "Content-type": "application/javascript; charset=UTF-8"
	    },
		data: data,
		dataType: 'json',
		success: function(res) {
			console.log(res);
			alert('Article saved.');
		},
		error: function(err) {
			alert('Article could not be saved.');
		}
	});

}

//Check if string is empty
function checkIfEmpty(string) {
	return string === "";
}

//Add event to delete buttons
function addDeleteEvent() {
	$('.btn.article-delete').click(function() {
		var id = $(this).attr('data-id');
		deleteArticle(id);
		$('#article-' + id).modal('hide');
		getArticles();
	});
}


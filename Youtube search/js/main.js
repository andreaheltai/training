document.getElementsByClassName('fa-search')[0].addEventListener('click', function() {
	if (getSearchQuery() !== '') {
		document.getElementsByClassName('flex-container')[0].innerHTML = '';
		getSearchResults();
	}
})

document.querySelector('[name="search"]').addEventListener('keypress', function (e) {
	if (e.keyCode == 13 && getSearchQuery() !== '') {
		document.getElementsByClassName('flex-container')[0].innerHTML = '';
		getSearchResults();
	}
})

document.querySelector(".modal-header .fa-times").addEventListener('click', function() {
	closeModal();
})

document.querySelector(".close-modal").addEventListener('click', function() {
	closeModal();
})

function closeModal() {
	document.querySelector(".modal").style.display = "none";
	document.querySelector(".close-modal").style.display = "none";
	document.getElementById("player").setAttribute('src', 'https://www.youtube.com/embed/');
}

function getSearchQuery() {
	return document.querySelector('[name="search"]').value;
}

function createRequestURL() {
	var part = 'snippet';
	var maxResults = '8';
	var q = getSearchQuery();
	var type = 'video';
	var key = 'MY_API_KEY';
	
	var url = 'https://www.googleapis.com/youtube/v3/search?' + 
		  'part=' + part + 
		  '&maxResults=' + maxResults + 
		  '&q=' + q + 
		  '&type=' + type + 
		  '&key=' + key;

	return url;
}

function getSearchResults() {
	fetch(createRequestURL())
	.then((resp) => resp.json())
	.then(function(data) {
		//Iterate through each element of the object
		console.log(data.items);
		Object.keys(data.items).map(function(objectKey, index) {
			var value = data.items[objectKey];
			appendResult(value);
		})
	})
	.catch(function(error) {
		document.getElementsByClassName('flex-container')[0].innerHTML = "An error occured. Please try again later."
	})
}

function appendResult(video) {
	var container = document.getElementsByClassName('flex-container')[0];

	var html = '<div class="video-info" data-id="' + video.id.videoId + '" data-target="#video-modal">' + 
					'<div class="play-vid">' + 
						'<img class="video-tmb" src="' + video.snippet.thumbnails.medium.url + '" alt="' + video.snippet.title + '">' + 
						'<div class="play"><i class="fas fa-play"></i></div>' +
					'</div>' +
					'<h2 class="title">' + video.snippet.title + '</h2>' + 
					'<h3 class="channel">' + video.snippet.channelTitle + '<i class="fas fa-check-circle"></i></h3>' + 
					'<p class="description">' + video.snippet.description.substring(0, 100) + '...</p>' +
				'</div>';

	container.innerHTML += html;
	addPlayVideoEvent();
}

function addPlayVideoEvent() {
	var allVideos = document.getElementsByClassName("video-info");
	Object.keys(allVideos).map(function(objectKey, index) {
		allVideos[index].addEventListener('click', function() {
			document.querySelector(".modal").style.display = "block";
			document.querySelector(".close-modal").style.display = "block";
			document.querySelector(".modal-header .title").innerHTML = allVideos[index].querySelector(".title").innerHTML;
			var url = "http://www.youtube.com/embed/" + allVideos[index].getAttribute('data-id') + '?enablejsapi=1';
			document.getElementById("player").setAttribute('src', url);
		})
	})
}


const bookApp = {}

bookApp.key = '92ce41f5dc6c49e6b98f905ef14579a4';

bookApp.init = function(){
	bookApp.getBook();
	bookApp.getImage();
	bookApp.getMusic();
	bookApp.events();
	
};
 
bookApp.getBook = function(userChoice){
	$.ajax({
		url: 'https://api.nytimes.com/svc/books/v3/lists.json',
		method: 'GET',
		dataType: 'json',
		data: {
			"api-key": bookApp.key,
			list: userChoice
		}
	}).then(function(res){
		const bookInfo = res.results[0].book_details;
		const bookArray = bookInfo.concat(res.results[1].book_details,res.results[2].book_details,res.results[3].book_details,res.results[4].book_details);

		bookApp.displayChoice(bookArray);
	})
}

bookApp.getImage = function(userChoice){
	$.ajax({
		url: 'https://api.nytimes.com/svc/books/v3/lists/overview.json',
		method: 'GET',
		dataType: 'json',
		data: {
			"api-key": bookApp.key,
			list_name_encoded: userChoice
		}
	}).then(function(result) {
		console.log('I did it!', result);
	});	
}

bookApp.getMusic = function(){
	$.ajax({
		url: 'https://api.spotify.com/v1/search',
		method: 'GET',
		dataType: 'json',
		data: {
			q: "sad",
			type: "playlist",
		}
	}).then(function(res) {
		const playArray = res.playlists.items;
		bookApp.displayMusic(playArray);
	});	
}

bookApp.events = function() {
	$('select').on('change', function(){
		const usersChoice = $(this).val();
		$('.spotify').show();
		bookApp.getBook(usersChoice);
	})
}

bookApp.displayChoice = function(books) {
	$('#bookChoice').empty();
	books.forEach(function(bookArray){
    	var title = $('<h2>').text(bookArray.title);
	    var author = $('<h3>').text(bookArray.author);
	    var summ =  $('<p>').addClass('summ').text(bookArray.description);
	    var choiceInfo = $('<div>').addClass('piece').append(title, author, summ);
	    $('#bookChoice').append(choiceInfo);
});
};


bookApp.displayMusic = function(music) {
	$('#playlist').empty();
		const random = Math.floor(Math.random()*music.length);
		let playArray = music[random];
		const user = playArray.owner.id;
		const listID = playArray.id;
		const baseUrl = `https://embed.spotify.com/?uri=spotify:user:${user}:playlist:${listID}`;
		const playlistBox = $('.playlist').html(`<iframe src="${baseUrl}" width="300" height="380"></iframe>`)
};



$(function(){
	bookApp.init();
});




	// res.results.lists[0].books[0].title

		// const initialFiction = res.results.lists[0].books;
		// const fictionArray = initialFiction.concat(res.results.lists[2].books, res.results.lists[4].books);

		// const initialNonFiction = res.results.lists[1].books;
		// const nonFictionArray = initialNonFiction.concat(res.results.lists[3].books, res.results.lists[5].books);
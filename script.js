let page = 1;
let totalPages = 1;
const newsPerPage = 9;
let fetchedData;

fetch('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=898a83deb74f4547b4c7e7db26b74612')
	.then(res => {
		return res.json();
	})
	.then(data => {
		fetchedData = data.articles
		console.log(data.articles)
		totalPages = Math.ceil(data.articles.length / newsPerPage);
		displayNews(data.articles, page);
	})
	.catch(error => console.log(error));

document.getElementById("prev").addEventListener("click", () => {
	if (page > 1) {
		page--;
		displayNews(fetchedData, page);
	}
});

document.getElementById("next").addEventListener("click", () => {
	if (page < totalPages) {
		page++;
		displayNews(fetchedData, page);
	}
});

function displayNews(articles, page) {
	let startIndex = (page - 1) * newsPerPage;
	let endIndex = startIndex + newsPerPage;
	let newsArticles = articles.slice(startIndex, endIndex);

	let news = '';
	newsArticles.forEach(element => {
		news += `
			<div class="news">
			<a href=${element.url} target="_blank">
				<img class="news-image" src=${element.urlToImage}><br>
				<div class="news-info">
				<h3 class="news-author">${element.author}</h3>
				<p class="news-title">${element.title}</p>
				<p class="news-description">${element.description}</p><br>
				<small class="news-publisheddate">${element.publishedAt}</small>
				</div>					
			</a>
			</div>
    	`;
	});

	document.getElementById('latest-news').innerHTML = news;
	document.getElementById('page-number').innerHTML = `Page ${page} of ${totalPages}`;
}



// Function to fetch data based on search term
const searchNews = () => {
	const searchTerm = document.getElementById("searchInput").value;
	fetch(`https://newsapi.org/v2/top-headlines?q=${searchTerm}&apiKey=898a83deb74f4547b4c7e7db26b74612`)
	  .then((res) => {
		return res.json();
	  })
	  .then((data) => {
		console.log(data.articles);
		document.getElementById("latest-news").innerHTML = "";
		data.articles.forEach((element) => {
		  const news = `
				  <div class="news">
					  <a href=${element.url} target="_blank">
						  <img class="news-image" src=${element.urlToImage}><br>
						  <div class="news-info">
							  <h3 class="news-author">${element.author}</h3>
							  <p class="news-title">${element.title}</p>
							  <p class="news-description">${element.description}</p><br>
							  <small class="news-publisheddate">${element.publishedAt}</small>
						  </div>					
					  </a>
				  </div>
			  `;
  
		  document.getElementById("latest-news").innerHTML += news;
		});
	  })
	  .catch((error) => console.log(error));
  };
  
  // Add click event listener to the search button
  document.getElementById("searchButton").addEventListener("click", searchNews);




// Change Sogody text on buttton click
document.getElementById('sogody').addEventListener('click', function () {
	this.innerHTML = 'Loading...';
});




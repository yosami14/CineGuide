const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjQyMzYxNTEzOWQyNWQ3NzI1ZGIxNjFhMjJmOTE4OCIsInN1YiI6IjY0OWU4NTBhNWFiYTMyMDBlMmZmNmYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hxhSphc65Jgq4gklOIA6xrsDSa-DXQGfBKQCcT1Av5U'
  }
};

// Function to fetch data from a URL and parse the response as JSON
const fetchData = url => {
  return fetch(url, options)
    .then(response => response.json());
};

// Fetch both URLs simultaneously
Promise.all([
  fetchData('https://api.themoviedb.org/3/trending/all/day?language=en-US'),
  fetchData('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc')
])
  .then(responses => {
    const topCineResponse = responses[0];
    const moviesResponse = responses[1];

    // Process the responses separately
    topCine(topCineResponse);
    movies(moviesResponse);
  })
  .catch(err => console.error(err));


const topCine = (data) => {
  let carouselExampleDark = $('#carouselExampleDark');
  carouselExampleDark.addClass('carousel carousel-dark slide');

  for (const eachtopCine of data.results) {
    let index = data.results.indexOf(eachtopCine);
    let indexActive = '';

    if (index === 0) {
      indexActive = 'active';
    }

    let indicator = $('<button>')
      .attr('type', 'button')
      .attr('data-bs-target', '#carouselExampleDark')
      .attr('data-bs-slide-to', index)
      .addClass(indexActive)
      .attr('aria-current', index === 0)
      .attr('aria-label', `Slide ${index + 1}`);

    $('.carousel-indicators').append(indicator);

    let carouselItem = $('<div>').addClass('carousel-item');
    if (index === 0) {
      carouselItem.addClass('active');
    }
    carouselItem.attr('data-bs-interval', 3000); // Changed from 1000 to 3000

    $('.carousel-inner').append(carouselItem);

    let carouselImg = $('<img>')
      .attr('src', `http://image.tmdb.org/t/p/w500${eachtopCine.backdrop_path}`)
      .attr('alt', `Image of ${eachtopCine.name}`)
      .addClass('d-block w-100');

    let carouselCaption = $('<div>').addClass('carousel-caption d-none d-md-block text-start col col-lg-4');
    let h5Caption
if(eachtopCine.name){
      h5Caption = $('<h1>').text(`${eachtopCine.name}`);
}
else{
  h5Caption = $('<h1>').text(`${eachtopCine.title}`)
}
    let pCaption = $('<h4>').text(eachtopCine.overview);
    carouselCaption.append(h5Caption, pCaption);

    carouselItem.append(carouselImg, carouselCaption);
  }
};

// movies
const movies = (data) => {
  for (const eachMovie of data.results) {
    // Create card element
    let card = $('<div>')
    .addClass('card');

    // Create img element for card
    let img = $('<img>')
      .attr('src', `http://image.tmdb.org/t/p/w500${eachMovie.backdrop_path}`)
      .addClass('card-img-top')
      .attr('alt', `Image of ${eachMovie.name}`);
    // Create card-body element
    let cardBody = $('<div>')
    .addClass('card-body');
    
    

    // Create card-title element
    let cardTitle = $('<h5>')
      .addClass('card-title')
      .text(eachMovie.title);
      
    // Append elements to card-body
    cardBody.append(cardTitle);

    // Append elements to card
    card.append(img, cardBody);

    // Append card to the movies section
    $('.card-group').append(card);
  }
};

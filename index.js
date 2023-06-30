const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjQyMzYxNTEzOWQyNWQ3NzI1ZGIxNjFhMjJmOTE4OCIsInN1YiI6IjY0OWU4NTBhNWFiYTMyMDBlMmZmNmYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hxhSphc65Jgq4gklOIA6xrsDSa-DXQGfBKQCcT1Av5U'
  }
};

const fetchData = url => {
  return fetch(url, options)
    .then(response => response.json());
};

Promise.all([
  fetchData('https://api.themoviedb.org/3/trending/all/day?language=en-US'),
  fetchData('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'),
  fetchData('https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc'),
  fetchData('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'),
  fetchData('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
])
  .then(responses => {
    const topCineResponse = responses[0];
    const moviesResponse = responses[1];
    const tvResponse = responses[2];
    const upComingResponse = responses[3];
    const topRatedResponse = responses[4];

    topCine(topCineResponse);
    movies(moviesResponse);
    tv(tvResponse);
    upComing(upComingResponse);
    topRated(topRatedResponse)
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
    carouselItem.attr('data-bs-interval', 3000);

    $('.carousel-inner').append(carouselItem);

    let carouselImg = $('<img>')
      .attr('alt', `Image of ${eachtopCine.name}`)
      .addClass('d-block w-100');

    if ($(window).width() > 600) {
      carouselImg.attr('src', `http://image.tmdb.org/t/p/w500${eachtopCine.backdrop_path}`);
    } else if ($(window).width() < 600) {
      carouselImg.attr('src', `http://image.tmdb.org/t/p/w500${eachtopCine.poster_path}`);
    }

    let carouselCaption = $('<div>').addClass('carousel-caption d-none d-md-block text-start col col-lg-4');
    let h5Caption;

    if (eachtopCine.name) {
      h5Caption = $('<h1>').text(`${eachtopCine.name}`);
    } else {
      h5Caption = $('<h1>').text(`${eachtopCine.title}`);
    }

    let pCaption = $('<h4>').text(eachtopCine.overview);
    carouselCaption.append(h5Caption, pCaption);

    carouselItem.append(carouselImg, carouselCaption);
  }
};

const movies = (data) => {
  for (const eachMovie of data.results) {
    let card = $('<div>').addClass('card');
    let img = $('<img>')
      .addClass('card-img-top')
      .attr('alt', `Image of ${eachMovie.name}`)
      .attr('src', `http://image.tmdb.org/t/p/w500${eachMovie.poster_path}`);


    let cardBody = $('<div>').addClass('card-body');
    let cardTitle = $('<h5>').addClass('card-title').text(eachMovie.title);
      
    cardBody.append(cardTitle);
    card.append(img, cardBody);
    $('.movieGroup').append(card);
  }
};

const tv = (data) => {
  for (const eachMovie of data.results) {
    let card = $('<div>').addClass('card');
    let img = $('<img>')
      .addClass('card-img-top')
      .attr('alt', `Image of ${eachMovie.name}`)
      .attr('src', `http://image.tmdb.org/t/p/w500${eachMovie.poster_path}`);

    let cardBody = $('<div>').addClass('card-body');
    let cardTitle = $('<h5>').addClass('card-title').text(eachMovie.name);

    cardBody.append(cardTitle);
    card.append(img, cardBody);
    $('.tvGroup').append(card);
  }
};

const upComing = (data) => {
  for (const eachMovie of data.results) {
    let card = $('<div>').addClass('card');
    let img = $('<img>')
      .addClass('card-img-top')
      .attr('alt', `Image of ${eachMovie.name}`)
      .attr('src', `http://image.tmdb.org/t/p/w500${eachMovie.poster_path}`);

    let cardBody = $('<div>').addClass('card-body');
    let cardTitle = $('<h5>').addClass('card-title').text(eachMovie.title);

    cardBody.append(cardTitle);
    card.append(img, cardBody);
    $('.upComingGroup').append(card);
  }
};

const topRated = (data) => {
  for (const eachMovie of data.results) {
    let card = $('<div>').addClass('card');
    let img = $('<img>')
      .addClass('card-img-top')
      .attr('alt', `Image of ${eachMovie.name}`)
      .attr('src', `http://image.tmdb.org/t/p/w500${eachMovie.poster_path}`);

    let cardBody = $('<div>').addClass('card-body');
    let cardTitle = $('<h5>').addClass('card-title').text(eachMovie.title);

    cardBody.append(cardTitle);
    card.append(img, cardBody);
    $('.topRatedGroup').append(card);
  }
}

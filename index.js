const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjQyMzYxNTEzOWQyNWQ3NzI1ZGIxNjFhMjJmOTE4OCIsInN1YiI6IjY0OWU4NTBhNWFiYTMyMDBlMmZmNmYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hxhSphc65Jgq4gklOIA6xrsDSa-DXQGfBKQCcT1Av5U'
  }
};

fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
  .then(response => response.json())
  .then(response => topCine(response))
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

    let carouselCaption = $('<div>').addClass('carousel-caption d-none d-md-block text-start');
    let h5Caption
if(eachtopCine.name){
      h5Caption = $('<h5>').text(`${eachtopCine.name}`);
}
else{
  h5Caption = $('<h5>').text(`${eachtopCine.title}`)
}
    let pCaption = $('<p>').text(eachtopCine.overview);
    carouselCaption.append(h5Caption, pCaption);

    carouselItem.append(carouselImg, carouselCaption);
  }
};

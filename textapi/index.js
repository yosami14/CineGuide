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


  const topCine = (data) =>{
  // let bannerMain = $('#bannerMain');
  //carousel Holder
  let carouselExampleDark = $('#carouselExampleDark');
  carouselExampleDark.addClass('carousel carousel-dark slide');

  // var carouselIndicators = $('.carousel-indicators')
  // let carouselInner = $('.carousel-inner');

  for (const eachtopCine of data) {
    let index = data.indexOf(eachtopCine);
    let indexActive = '';

    if (index === 0) {
      indexActive = 'active';
    }

    let indicator = $('<button>')
      .attr('type', 'button')
      .attr('data-bs-target', '#carouselExampleDark')
      .attr('data-bs-slide-to', index)
      .addClass(indexActive)
      .attr('aria-current', index === 0);
      // .attr('aria-label', 'Slide ' + (index + 1));

    // Add the indicator to the carousel indicators container
    $('.carousel-indicators').append(indicator);


//carousel-inner
let carouselItem = $('<div>') 
    carouselItem
    .attr("data-bs-interval",'10000')
    .classAdd('carousel-item')
    if(index == 0){
      carouselItem.classAdd(' active')
    }
    $('.carousel-inner').append(carouselItem)
    //carousel img
    let carousel_img = $('img') 
    carousel_img
    .attr('src',`http://image.tmdb.org/t/p/w500 ${eachtopCine.results.backdrop_path}`)
    .attr('alt',`Image of${eachtopCine.results.name}`)
    .classAdd('d-block w-100')
    
    //carousel-caption
    let carouselCaption = $('div')
    .addClass('d-none d-md-block text-start')
    let h5Caption = $('<h5>').text(eachtopCine.results.name);
    let pCaption = $('<p>').text(eachtopCine.results.overview);
    carouselCaption.append(h5Caption, pCaption);
    carouselItem.append(carousel_img,carouselCaption)
    $('carousel-inner').append(carouselItem)
  }

}
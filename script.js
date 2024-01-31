const apiKey = '716b1819e64715885194068ab1ab2892'

const baseUrl = 'https://api.themoviedb.org/3/';

// const movieIds = 872585;

const endpoint = 'movie/popular';

// Constructing the full URL
const url = `${baseUrl}${endpoint}?api_key=${apiKey}`;

// Making API request using the Fetch()
const smallImages = ['image/number.png', 'image/PngItem.png'];
fetch(url)
  .then(response => response.json())
  .then(data => {
    // const movieIds = data.results.map(movie => movie.id);
    // console.log('Movie IDs:', movieIds);

    //fetching posterPath

    //styling the posterPath
    const MoviePoster = document.getElementById('Movie-poster');
    MoviePoster.style.display = 'flex'
    MoviePoster.style.flexDirection ='row';
    MoviePoster.style.flexWrap ='wrap';
    MoviePoster.style.gap ='1rem';

   data.results.forEach(movie => {
    if(movie.posterPath !== null){

      const movieContainer = document.createElement('div');
      // movieContainer.style.display = 'flex';

      const posterImage = document.createElement('img');
      posterImage.classList.add('posterPath')
      posterImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      posterImage.alt = `${movie.title} poster`
      posterImage.style.display = 'flex'
  
      posterImage.addEventListener('click', function(){
      const movieid = movie.id;
      location.href = `details.html?id=${movieid}`
    })
       //fetching posterPath details
      const movietitle = document.createElement('p');
      movietitle.textContent = movie.title;

      const movieDate = document.createElement('p');
      movieDate.textContent =`Release Date:${ movie.release_date}`;

      // const genre = document.createElement('p');
      // genre.textContent = `genre${movie.movie_genre}`

      movieContainer.appendChild(posterImage);
      movieContainer.appendChild(movietitle);
      movieContainer.appendChild(movieDate);
      // movieContainer.appendChild(genre)

      const spacer = document.createElement('hr'); 
      MoviePoster.appendChild(spacer);

       //Small image section

       smallImages.forEach((imageSrc, index) => {
         const smallImage = document.createElement('img');
         smallImage.src = imageSrc;
         smallImage.classList.add('small-image');
         smallImage.style.height = '20px'
         movieContainer.appendChild(smallImage);

         let text1 = document.createElement('span');
         text1.textContent = movie.vote_average;

         let text2 = document.createElement('span');
         text2.textContent = '95%';
          if (index === 0) {
            movieContainer.appendChild(text1);
            smallImage.style.marginRight = '10px'
            text1.style.marginRight = '4rem'
  }else if(index === 1){
    movieContainer.appendChild(text2);
    smallImage.style.marginRight = '10px'
  }
       });

      MoviePoster.appendChild(movieContainer)
    }

   });
    }) 

.catch(error =>{
    console.log(error)
})
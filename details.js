    const link = new URLSearchParams(window.location.search);
    const movieid = link.get('id');
    console.log('movie id:', movieid);

    const apiKey = 'f6c406089fd9f7114034b43b375a72f6';
    const baseUrl = 'https://api.themoviedb.org/3/';
    const endpoint = `/movie/${movieid}`;


    function runtimConvert(time){
        const hour = Math.floor(time /60);
        const seconds = time % 60;
        return `${hour}h ${seconds}s` 
    }
    fetch(`${baseUrl}${endpoint}?api_key=${apiKey}&append_to_response=videos`) 
    .then((response) => response.json())
    .then((movie) => {
    console.log(movie); 

    const movieTrailer = document.getElementById('trailer');

    // Fetching the trailers
    const trailers = movie.videos.results.filter(video => video.type === 'Trailer');
    if (trailers.length > 0) {
        const trailerKey = trailers[0].key; // Assuming the first trailer is the official one
        const trailerURL = `https://www.youtube.com/embed/${trailerKey}`;

        const trailerIframe = document.createElement('iframe');
        trailerIframe.setAttribute('src', trailerURL);
        trailerIframe.setAttribute('width', '100%');
        trailerIframe.setAttribute('height', '300vh');
        trailerIframe.setAttribute('title', 'Movie Trailer');
        trailerIframe.setAttribute('allowFullScreen', '');
        trailerIframe.classList.add('col-xl-12', 'col-lg-12', 'col-md-6', 'col-sm-12', 'col-md-12')

        movieTrailer.appendChild(trailerIframe);

        // Creatng a new container for movie details
        const detailsContainer = document.createElement('div');

           //creating an unorderd list to append other movie info
        const Wrapper = document.createElement('ul')

           //fetching movie title and other details
        const title = document.createElement('h4');
        title.textContent = movie.title;   

        const releaseDate = document.createElement('li');
        releaseDate.textContent = movie.release_date;

        const runtime = document.createElement('li');
        runtime.textContent = `${runtimConvert(movie.runtime)}`;

        const genre = document.createElement('li');
        genre.textContent = movie.genres.map(genre => genre.name).join(', ');


        //Adding star image
        const rate = document.createElement('p');
        rate.style.marginRight = '10rem';

        const image = document.createElement('img');
        image.src ='image/Star.png';
        image.alt = 'Star'; 
        image.classList.add('starImage');
        image.style.marginBottom = '0.5rem'
        image.style.marginRight = '0.1rem'
        rate.appendChild(image);

        const textContainer = document.createElement('span')

        const averageText = document.createElement('span');
        averageText.textContent = `${movie.vote_average}`;
        averageText.classList.add('average-style');
        textContainer.appendChild(averageText);

        const countText = document.createElement('span');
        countText.textContent = `${movie.vote_count}`;
        countText.classList.add('count-style');
        textContainer.appendChild(countText);

        rate.appendChild(textContainer);

        //Adding the left image and two buttons
        const imageParent = document.createElement('div');

        const firstParent = document.createElement('div');
        const movieOverview = document.createElement('p');
        movieOverview.textContent = movie.overview;
        movieOverview.classList.add('col-lg-8','col-md-6', 'col-sm-12', 'col-12');

        const lastPart = document.createElement('nav');
        lastPart.innerHTML = `
        <button>Top rated movie #65</button>
        <p>Awards 9 nominations</p>
        <img src="Expand Arrow.png" alt="">`
        lastPart.classList.add('rated', 'col-lg-8',"col-md-4","col-3")
        firstParent.appendChild(movieOverview);
        firstParent.appendChild(lastPart);

        const secondparent = document.createElement('div');
        secondparent.classList.add('col-lg-4','col-md-6', 'col-sm-12', 'col-12')
        secondparent.style.marginLeft = '2rem'

        //first button
        const firstChild = document.createElement('div');
        firstChild.innerHTML = `
        <img src="image/Two Tickets.png"</img>
        <span>See Showtimes</span>`
        firstChild.classList.add('ticket');

        //second button
        const secondChild = document.createElement('div');
        secondChild.innerHTML = `
        <img src="image/List.png"</img>
        <span>More watch options</span>`
        secondChild.classList.add('list');

        //the image
        const thirdChild = document.createElement('div');
        thirdChild.innerHTML = `
        <img src="image/Rectangle 37.png"</img>
        <p><img src="image/List2.png"</img>
        <span>The Best Movies and Shows in September</span></p>`
        thirdChild.classList.add('rectangle-image')
        thirdChild.style.position = 'relative';

        secondparent.appendChild(firstChild);
        secondparent.appendChild(secondChild);
        secondparent.appendChild(thirdChild);
        imageParent.appendChild(firstParent)
        imageParent.appendChild(secondparent);


        imageParent.style.display = 'flex';

        //appending movie info to the unorderd list
        Wrapper.appendChild(title);
        Wrapper.appendChild(runtime);
        Wrapper.appendChild(releaseDate);
        Wrapper.appendChild(genre);
        Wrapper.appendChild(rate);

        
        //styling the movie details container(wrapper)
        Wrapper.style.display = 'flex'
        Wrapper.style.gap = '2rem'

        detailsContainer.appendChild(Wrapper);

        detailsContainer.appendChild(imageParent);
        // detailsContainer.appendChild(directorElement);

        movieTrailer.appendChild(detailsContainer);

        // styling the trailerIframe and the detailsContainer
        movieTrailer.style.display = 'flex';
        movieTrailer.style.flexDirection = 'column'
        detailsContainer.style.marginTop = '3rem'
    } else {
        movieTrailer.innerHTML = 'No trailers available.';
    }
})
.catch(error => {
    console.log(error);
});


// Function to get director name from crew array
// function getDirectorNames(movie) {
//     const directors = [];
  
//     if (movie && movie.credits && movie.credits.crew) {
//       const directorList = movie.credits.crew.filter(person => person.job === 'Director');
//       directors.push(...directorList.map(director => director.name));
//     }
  
//     return directors.length > 0 ? directors : ['Director Not Found'];
//   }
  
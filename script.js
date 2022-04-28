const submitSearch = document.getElementById("searchButton");
const userInput = document.getElementById("userSearch");
const selector = document.getElementById('movieSelector');

//Let's get the request of the user on rails (not RoR though)
const searchingForMovie = () => {
    const url = `http://www.omdbapi.com/?s=${userInput.value}&page=2&apikey=33253fc8`

    fetch(url, {
        method: "POST",
      })
      fetch(url).then((response) =>
        response.json().then((specs) => {
          selector.innerHTML = "";
          movieSpecs(specs);
        ;}))
        .catch((error) => console.error('error:', error));
}

//Catching this data for each corresponding result
const movieSpecs = (specs) => {
    const specsArray = specs.Search;
  specsArray.forEach( (spec) => {
    const image = spec.Poster;
    const title = spec.Title;
    const date = spec.Year;
    const id = spec.imdbID;

    showMovieSpecs(selector, image, title, date, id);
  });
}

//Displaying the data on click
submitSearch.addEventListener('click', () => {
    searchingForMovie();
});

//A bit of a look for each movie on results 
const showMovieSpecs = (selector, image, title, date, id) => {
    selector.innerHTML += `
    <div class="container text-center">
      <div class="card mb-3 text-left" style="width: 500px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${image}" class="card-img" alt="A missing movie poster">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${date}</p>
              <button class="buttonLearnMore btn btn-primary" onclick="showLearnMore('${id}')">Plus d'infos</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
    
}

const showLearnMore =  async function (id) {
    const urlById = await fetch(`http://www.omdbapi.com/?i=${id}&page=2&apikey=ff461133`)
    const popUpSelector = document.getElementById('moviePopup');
    const popUpDetails = await urlById.json();
    const image = popUpDetails.Poster;
    const title = popUpDetails.Title;
    const date = popUpDetails.Year;
    const plot = popUpDetails.Plot;
    
    try {
      popUpSelector.innerHTML = "";
      popUpLike(popUpSelector, image, title, date, plot);
    } catch (error) {
      console.error("error : ", error)
    }
}
  
const popUpLike = (selector, image, title, date, plot) => {
    selector.innerHTML += `
    <div class="container popup__container popupShit text-center">
      <div class="card text-left" style="width: 500px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${image}" class="card-img" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${date}</p>
              <p>${plot}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
}

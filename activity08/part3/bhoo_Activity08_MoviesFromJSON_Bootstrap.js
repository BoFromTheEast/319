/* 
Name : Bo Oo
Feb 21, 2024
Activity07
*/

fetch("./bhoo_Activity08_MoviesFromJSON.json")
.then(response => response.json())
.then(myMovies => loadMovies(myMovies));
function loadMovies(myMovies) {
  var CardMovie = document.getElementById("col");
  for (var i = 0; i<myMovies.movies.length; i++){
  let title = myMovies.movies[i].title;
  let year = myMovies.movies[i].year;
  let url = myMovies.movies[i].url;

  let AddCardMovie = document.createElement("div");
  AddCardMovie.classList.add("col");
  AddCardMovie.innerHTML = `
            <div class="card shadow-sm">
              <img src=${url} class="card-img-top" alt="..."></img>
                <div class="card-body">
                  <p class="card-text"> <strong>${title}</strong>, ${year}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <!--<button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>-->
                    </div>
                    <!--<small class="text-body-secondary">9 mins</small>-->
                  </div>
                </div>
              </div>
            `;
    CardMovie.appendChild(AddCardMovie);
  } 
} 

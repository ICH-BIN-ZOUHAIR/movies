let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Function to fetch the data from the api

let getMovie = () =>{
    const key = "3a7a499d";
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    //if input ield is empty
    if(movieName.length <= 0){
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
    }
    //if input value is not empty
    else{
        fetch(url).then((resp) => resp.json()).then((data) => {
            //if moovie exist in api database
            if(data.Response == "True"){
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster" />
                        <div class="right">
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg" />
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot :</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast :</h3>
                    <p>${data.Actors}</p>
                    <p class="last"><a href="https://github.com/ICH-BIN-ZOUHAIR" target="_blank">You like it? Follow me on github to see more...</a></p>
                `
            }
            //if movie is not in api database
            else {
                result.innerHTML = `<h3 classs="msg">${data.Error}</h3>`;
            }
        })
        //if error occurs
        .catch(() =>{
            result.innerHTML = `<h3 class="msg">Error Occured!</h3>`;
        });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);

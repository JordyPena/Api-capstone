//create event listener for which dropdown bodypart was selected
//fetch body part and amount of workouts needed
//store data into a function to use for displaying

//create an alert for errors
$("#submit").on("click", (event) => {
  $(".form-container").addClass("form-submit");
  $(".form-container").removeClass("form-container");
  $("#hidden").show();
  $("#result").empty();
  $("#videos").empty();
  $("#result").show();

  event.preventDefault();
  let selected = $("#bodypart").val();
  let amount = $("#resultAmount").val();
  if (amount === "") {
    amount = 5;
  } else if (amount < 0) {
    displayErrors("Enter an amount greater than 0");
    return;
  }
  workoutSearch(amount, selected);
  videoSearch(selected, 50);
});
// get workouts
function workoutSearch(amount, selected) {
  fetch(`https://wger.de/api/v2/exerciseinfo/?language=2&status=2`)
    .then((response) => {
      if (response.status === 200) return response.json();
      else if (response.status === 404)
        displayErrors(
          "No results found please select a bodypart from the dropdown menu."
        );
      else throw new Error("Something went wrong please try again.");
    })
    .then((responseJson) => {
      displayWorkouts(responseJson, selected, amount);
    })
    .catch((error) => displayErrors(error));
}
///display workout name and description
function displayWorkouts(responseJson, selected, amount) {
  let counter = 0;
  for (let i = 0; i < responseJson.length; i++) {
    if (responseJson[i].category.name === selected) {
      if (counter < amount) {
        if (responseJson[i].description !== "") {
          $("#result").append(categoryTemplate(responseJson[i]));
          counter++;
        }
      }
    }
  }
}

// create html with name and workout description
function categoryTemplate(data) {
  let myHtml = `<div class="workout-container"><p class="workout-name">${data.name}</p>
    <div class="workout-description">${data.description}</div></div>`;

  return myHtml;
}

//fetch youtube api
//create a alert for errors
//grab a random amount of videos
//selecet maxResults from the random amount of videos
//display videos

//get video data
function videoSearch(userSelection, maxResults) {
  const APIKEY = `AIzaSyDZEqC-1amZMJiATBCGnpxarIpT_eBmzR0`;

  fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&type=video&part=snippet&maxResults=${maxResults}&q=${userSelection}+workouts&order=date`
  )
    .then((response) => {
      if (response.status === 200) return response.json();
      else if (response.status === 404)
        displayErrors(
          "No results found please select a bodypart from the dropdown menu."
        );
      else throw new Error("Something went wrong please try again.");
    })
    .then((responseJson) => {
      displayVideos(responseJson);
    })
    .catch((error) => displayErrors(error));
}
//display videos
function displayVideos(responseJson) {
  let vidArray = [];
  while (vidArray.length < 5) {
    let randomIndex = Math.floor(
      Math.random() * Math.floor(responseJson.items.length)
    );
    vidArray.push(responseJson.items.splice(randomIndex, 1)[0]);
  }
  for (let i = 0; i < vidArray.length; i++) {
    let VIDEO = `<iframe width="300" height="225" src="https://www.youtube.com/embed/${vidArray[i].id.videoId}" frameborder="0" allowfullscreen></iframe>`;

    $("#videos").append(VIDEO);
  }
}

// display box for errors
function displayErrors(error) {
  $(".errors").text(error);
}

//document ready
$(function () {
  $("#hidden").hide();
  $("#result").hide();
});


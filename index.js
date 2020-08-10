const APIKEY = `AIzaSyDZEqC-1amZMJiATBCGnpxarIpT_eBmzR0`
const VIDEO = ""
//create event listener for which dropdown bodypart was selected
//fetch body part and amount of workouts needed
//store data into a function to use for displaying
$("#submit").on("click", event => {
    $("#hidden").show();
    $("#result").empty();
    
    event.preventDefault();
    let selected = $("#bodypart").val();
    let amount = $("#resultAmount").val();
    if (amount === "") {
        amount = 5;
    }
    fetch(`https://wger.de/api/v2/exerciseinfo/?language=2&status=2`)
    .then(response => { 
        if (response.status === 200)
            return response.json() 
        else if (response.status === 404) 
            alert("No results found please select a bodypart from the dropdown menu.")
        else
            throw new Error("Something went wrong please try again.")
        
    })
    .then(responseJson => {
        
        let counter = 0; 
        for (let i = 0; i < responseJson.length; i++) {
            
            if (responseJson[i].category.name === selected) {
                
                if (counter < amount) {

                    if (responseJson[i].description !== "") {

                        categoryDisplay(responseJson[i]);
                        counter++;
                        
                    }

                }
            }
        }
        
    })
    .catch(error => alert(error)) 
    videoSearch(APIKEY,selected,50)
})


//display workout name
//dispay workout description
function categoryDisplay(data) {
    let myHmtl = 
    `<div class="workout-name">${data.name}</div>
    <div class="workout-description">${data.description}</div>` 
    
    $("#result").append(myHmtl);

    
}


// run youtube only when you get the workout API working!!
//fetch youtube api
//grab video and display

function videoSearch(key, userSelection, maxResults) {
    $("#videos").empty()
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&type=video&part=snippet&maxResults=${maxResults}&q=${userSelection}+workouts&order=date`)
    .then(response => {
        if (response.status === 200)
            return response.json()
        else if (response.status === 404)
            alert("No results found please select a bodypart from the dropdown menu.")
        else
            throw new Error("Something went wrong please try again.")
    })
    .then(responseJson => {
        let vidArray = [];
        while (vidArray.length < 5) {
           let randomIndex = Math.floor(Math.random() * Math.floor(responseJson.items.length));
           vidArray.push(responseJson.items.splice(randomIndex, 1)[0])
        }
       for (let i = 0; i < vidArray.length; i++)  {
                    
            let VIDEO = `<iframe width="300" height="225" src="https://www.youtube.com/embed/${vidArray[i].id.videoId}" frameborder="0" allowfullscreen></iframe>`

            $("#videos").append(VIDEO);
        }
    }) 
    .catch(error => alert(error)) 
    
}



//document ready
$(function() {
    $("#hidden").hide();
    
})



//feedback from riley remember to have a function to generate information
//and one for manilupating the dom




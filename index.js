//create event listener for which dropdown bodypart was selected
$("#submit").on("click", event => {
    $("#result").empty();
    console.log("bodypart")
    event.preventDefault();
    let selected = $("#bodypart").val();
    let amount = $("#resultAmount").val();
    fetch(`https://wger.de/api/v2/exerciseinfo/`)
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson)
        let counter = 0; 
        for (let i = 0; i < responseJson.length; i++) {
            
            if (responseJson[i].category.name === selected) {
                
                if (counter < amount) {

                    if (responseJson[i].description !== "") {

                        categoryDisplay(responseJson[i].description);
                        counter++;
                        console.log("hello")
                    }

                }
                
                    
               //console.log(counter); 
            }
        }
        
    })
})

function categoryDisplay(description) {
    $("#result").append(description);


}
//then fetch data with that bodyparts id

 //this is to store excersise id that user selected

//fetch the actual workout based on category id
//fetch(`https://wger.de/api/v2/exercise/?format=json&exercise=${id}`)
//.then(response => response.json())
//.then(responseJson => {

//})
    //create a catch for if 200 ok and 404 when no matches
    //display


// run youtube only when you get the workout API working!!


//feedback from riley remember to have a function to generate information
//and one for manilupating the dom




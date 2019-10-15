
const mq = window.matchMedia( "(min-width: 1100px)" );

if (mq.matches) {
    //Refresh on resize, so evrything scales correctly
    window.onresize = function(){ location.reload(); }
    //    alert("window width >= 1100px");
} else {
    //  alert("window width < 1100px");
}




//Top section animations
TweenMax.from('#line', 1, {marginLeft:"-100%"});
TweenMax.from('#sdfLogo', 1, {marginTop:"-100%", delay: 0.5});
TweenMax.from('#locBox', 1, {left:"100vw", delay: 1.5});
TweenMax.from('#ticket', 1, {left:"100vw", delay: 1.5});
TweenMax.from('nav', 1, {left: "-60vh", delay: 1.5, ease: Power2.easeOut});


// Adds listener to all titles, they need to be turned into 
// anchor tags in HTML file for it to work.
let elementsArray = document.querySelectorAll(".filmTit"); 
//Add listener that triggers a modal with word-info
elementsArray.forEach(function(elem) {
    elem.addEventListener("click", function() {
        infoWindow(this.text)}, true);
        console.log(elem.text);
});


//Open a modal window with info about the word that is clicked
function infoWindow(word){

    //Call to findInfo function that sends a request for info about selected word
    findInfo(word);

    //Boolean keeping track of whether modal is open or not
    let modalOpen = true;

    // Get the span element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the span (the X), close the modal
    span.onclick = function() {
        
        modalCloseAnim();
    }

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target != modal && modalOpen == true) {
    //         modalCloseAnim();
    //         modalOpen = false;
    //     }
    // }

}


//Function that retrieves information about selected word and outputs it as HTML in a list
function findInfo(word){

    //Prepare to take only the first word of the sent word
    var name = word.split(' ');

    console.log(name);


    //Get the modText container that will hold the text
    const modText = document.getElementById("modText");

    //Empty element from potential previous text
    modText.innerHTML = "";


        //Make the modal visible
        modalOpenAnim();

            //Transform JSON string to object
            var film = info.films[name[0]];

            //If there's NO word-info...
            if (film.resultCode == "NO_DATA"){

                errorMessage("Didn't find any information about this word...");

            //If there IS word-info...
            } else {

                
                //Set chosen word as header
                const h1 = document.createElement("h1");
                h1.textContent = film.title;
                modText.appendChild(h1);

                //Create list and list items
                const list = document.createElement("ul");
                const description = document.createElement("li");

                //Add content to the listitems
                description.textContent = film.description;

                //Append all elements to the modText container
                modText.appendChild(list);
                list.appendChild(description);
            }
}




//ANIMATIONS

function modalOpenAnim(){
    TweenMax.to('#modal', 0.5, {display: "block", opacity: 1, delay: 0, ease: Power2.easeInOut});
    TweenMax.to('#shadow', 0.5, {display: "block", opacity: 1, delay: 0, ease: Power2.easeInOut});
}

function modalCloseAnim(){
    TweenMax.to('#modal', 0.5, {display: "none", opacity: 0, delay: 0, ease: Power2.easeInOut});
    TweenMax.to('#shadow', 0.5, {display: "none", opacity: 0, delay: 0, ease: Power2.easeInOut});
}
//hover effect on easy and hard
const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");

const levels = Array.from(document.getElementsByClassName("mode")); // find the class called mode
const squares = Array.from(document.getElementsByClassName("square"));

let gameLevel = levels.find((level) => { //finds the selected level button in html
    const classList = Array.from(level.classList);
    return classList.includes("selected");
}).innerHTML;

//event listener: change selected btwn easy and hard

levels.forEach((level) =>{

    level.addEventListener("click", function(){
        levels.forEach(mode => mode.classList.remove("selected")); //removes from all the levels
        this.classList.add("selected");

        gameLevel = this.innerHTML; // updates on which game level is chosen when running console
    });

});
// setting colors in squares
// attempt to make all squares have same color rgb(200,45,255)
//event listner on start button
const startButton = document.getElementById("reset")

startButton.addEventListener("click", function(){
    // alert("You clicked me!");
    for(let i=0; i < squares.length; i = i +1){
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        const rgbString = "rgb(" + red + "," + green + "," + blue + ")";
        console.log(rgbString);

        const square = squares[i];
        square.style.backgroundColor = rgbString;
        
    }
    // const firstSquare = squares[0];

    // firstSquare.style.backgroundColor = "rgb(200, 45, 255)";
    // console.log(firstSquare);
});
startButton.addEventListener("click", function change() {
    document.getElementById("reset").innerHTML = "Reset Color";
});

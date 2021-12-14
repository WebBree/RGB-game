//rgb
const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");
const colorDisplayElement = document.getElementById("color-display");

// array 
const levels = Array.from(document.getElementsByClassName("mode")); // find the class called mode
const squares = Array.from(document.getElementsByClassName("square"));


let selectedLevelButton = levels.find((level) => { //finds the selected level button in html
    const classList = Array.from(level.classList);
    return classList.includes("selected");
});

let gameLevel = selectedLevelButton.innerHTML;

//event listener: change selected btwn easy and hard

levels.forEach((level) =>{
    level.addEventListener("click", function(){
        levels.forEach((mode) => mode.classList.remove("selected")); //removes from all the levels
        this.classList.add("selected");

        gameLevel = this.innerHTML; // updates on which game level is chosen when running console

    });

});

const startButton = document.getElementById("reset");

startButton.addEventListener("click", function(){
    this.innerHTML = "New Colors";
    // assign each square a color
    for(let i=0; i < squares.length; i = i +1){
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        const rgbString = "rgb(" + red + "," + green + "," + blue + ")";
        
        const square = squares[i];

        square.dataset.rgb_value = JSON.stringify([red, green, blue]);
        square.style.backgroundColor = rgbString;

    }
    // assign the header a random value
    const randomSquareIndex = Math.floor(Math.random() * 6);
    const headerColorSquare = squares[randomSquareIndex];
    setHeaderRgbBackgroundColor(headerColorSquare);
});

function setHeaderRgbBackgroundColor(squareElement){
    const setHeaderElementBackgroundColor = (rgbValues, element) => {
        const [r, g, b] = rgbValues;
        const rgbString = `rgb(${r}, ${g}, ${b})`; 
        element.style.backgroundColor =  rgbString;
        element.innerHTML = rgbValues.find((rgbValue) => {
            return rgbValue > 0;
        });
    };
    const rgbString = squareElement.dataset.rgb_value;
    colorDisplayElement.dataset.rgb_value = rgbString;
    const [red, green, blue] = JSON.parse(rgbString);

    const redBackground = [red, 0, 0];
    const greenBackground = [0, green, 0];
    const blueBackground = [0, 0, blue];

    setHeaderElementBackgroundColor(redBackground, rElement);
    setHeaderElementBackgroundColor(greenBackground, gElement);
    setHeaderElementBackgroundColor(blueBackground, bElement);

}

squares.forEach((square) => {
    square.addEventListener("click", function (){
        const headerRgbValue = colorDisplayElement.dataset.rgb_value;
        const squareRgbValue = this.dataset.rgb_value;

        if(headerRgbValue === squareRgbValue) {
            setSquareBackgroundAfterWin(headerRgbValue);
        } else{
            this.classList.add("hidden");
        }
    });
});

function setSquareBackgroundAfterWin(headerRgbString){
    const [r, g, b] = JSON.parse(headerRgbString);
    const rgbString = `rgb(${r}, ${g}, ${b})`;

    squares.forEach((sq) => {
        sq.classList.remove("hidden");
        sq.style.backgroundColor = rgbString;
    });
}
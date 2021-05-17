'use strict';

// global variables
let leftImgIndex;
let centerImgIndex;
let rightImgIndex;


// getting elements
let leftImgElement = document.getElementById('leftimg');
let centerImgElement = document.getElementById('centerimg');
let rightImgElement = document.getElementById('rightimg');

// global count the user clicks
let maxUserClicks = 25;
let userClicksCounter = 0;

// global array
let proDucts = [];

function Weirdproductimages(productName, path, timeShown) {
    this.productName = productName;
    this.path = path;
    this.timeShown = timeShown;
    // votes 
    this.votes = 0;

    proDucts.push(this);
}

new Weirdproductimages('bag', 'img/bag.jpg');
new Weirdproductimages('banana', 'img/banana.jpg');
new Weirdproductimages('bathroom', 'img/bathroom.jpg');
new Weirdproductimages('boots', 'img/boots.jpg');
new Weirdproductimages('breakfast', 'img/breakfast.jpg');
new Weirdproductimages('bubblegum', 'img/bubblegum.jpg');
new Weirdproductimages('cthulhu', 'img/cthulhu.jpg');
new Weirdproductimages('dog duck', 'img/dog-duck.jpg');
new Weirdproductimages('dragon', 'img/dragon.jpg');
new Weirdproductimages('pen', 'img/pen.jpg');
new Weirdproductimages('shark', 'img/shark.jpg');
new Weirdproductimages('sweep', 'img/sweep.png');
new Weirdproductimages('tautaun', 'img/tauntaun.jpg');
new Weirdproductimages('unicorn', 'img/unicorn.jpg');
new Weirdproductimages('water', 'img/water-can.jpg');
new Weirdproductimages('wine', 'img/wine-glass.jpg');

console.log(proDucts);

function imgRanomizer() {
    return Math.floor(Math.random() * proDucts.length);
}

// function to render the images 
function renderThreeImages() {
    leftImgIndex = imgRanomizer();
    centerImgIndex = imgRanomizer();
    rightImgIndex = imgRanomizer();

    while (leftImgIndex === rightImgIndex) {
        rightImgIndex = imgRanomizer();
    }
    while (leftImgIndex === centerImgIndex) {
        centerImgIndex = imgRanomizer();
    }
    while (centerImgIndex === rightImgIndex) {
        rightImgIndex = imgRanomizer();
    }
    // console.log(leftImgIndex);
    // console.log(centerImgIndex);
    // console.log(rightImgIndex);

    // console.log(proDucts[leftImgIndex]);
    // console.log(proDucts[centerImgIndex]);
    // console.log(proDucts[rightImgIndex]);

    // Src attribute
    leftImgElement.src = proDucts[leftImgIndex].path;
    centerImgElement.src = proDucts[centerImgIndex].path;
    rightImgElement.src = proDucts[rightImgIndex].path;
}

renderThreeImages();

// event listen

leftImgElement.addEventListener('click', userClick);
centerImgElement.addEventListener('click', userClick);
rightImgElement.addEventListener('click', userClick);

function userClick(clickEvent) {

    userClicksCounter++;

    if (userClicksCounter <= maxUserClicks) {

        if (clickEvent.target.id === 'leftimg') {

            proDucts[leftImgIndex].votes = proDucts[leftImgIndex].votes + 1;
        } else {
            proDucts[rightImgIndex].votes = proDucts[rightImgIndex].votes + 1;
           
        }
        renderThreeImages();

    } else {
        leftImgElement.removeEventListener('click', userClick);
        centerImgElement.removeEventListener('click', userClick);
        rightImgElement.removeEventListener('click', userClick);

        // create list by getting the element 
        let list = document.getElementById('idVotes')
        let liElement;
        for (let i = 0; i < proDucts.length; i++) {
          liElement = document.createElement('li');
          list.appendChild(liElement);
          liElement.textContent = `${proDucts[i].productName} you voted it ${proDucts[i].votes} times`
            
        }
    }
}


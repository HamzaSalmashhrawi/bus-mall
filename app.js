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
let maxUserClicks = 5;
let userClicksCounter = 0;

// global array
let proDucts = [];
let productVotes = [];
let productShown = [];

// global array for products name 

let imgName = [];

function Weirdproductimages(name, path) {
    this.name = name;
    this.path = path;
    this.timeShown = 0; // num of times the image has been displayed 

    this.votes = 0;   // num of times the user clicked the image 

    imgName.push(this.name); // pushing to the global array
    proDucts.push(this);

    //

}

// setting local storage function 
function saveToLocalStorage() {
    let saVed = JSON.stringify(proDucts);
    localStorage.setItem('allProduct', saVed);
}

// getting local storage function 
function getLocalStorage() {
    let strIngs = localStorage.getItem('allProduct');
    let backToNormal = JSON.parse(strIngs);

    if (backToNormal !==null)
    proDucts = backToNormal ;
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

// global array to prevent the image shown 2 times in  a row 
let firstImages = [];

firstImages = [leftImgIndex, centerImgIndex, rightImgIndex];

// function to render the images 
function renderThreeImages() {
    leftImgIndex = imgRanomizer();
    centerImgIndex = imgRanomizer();
    rightImgIndex = imgRanomizer();

    do {
        leftImgIndex = imgRanomizer();
        centerImgIndex = imgRanomizer();
        rightImgIndex = imgRanomizer();
    }
    while (
        leftImgIndex === rightImgIndex ||
        leftImgIndex === centerImgIndex ||
        centerImgIndex === rightImgIndex ||
        firstImages.includes(leftImgIndex) ||
        firstImages.includes(centerImgIndex) ||
        firstImages.includes(rightImgIndex)
    )

    firstImages = [leftImgIndex, centerImgIndex, rightImgIndex];


    // Src attribute
    leftImgElement.src = proDucts[leftImgIndex].path;
    proDucts[leftImgIndex].timeShown++;
    centerImgElement.src = proDucts[centerImgIndex].path;
    proDucts[centerImgIndex].timeShown++;
    rightImgElement.src = proDucts[rightImgIndex].path;
    proDucts[rightImgIndex].timeShown++;
    // console.log(proDucts[leftImgIndex].timeShown);
}
renderThreeImages();


// event listen
images.addEventListener('click', userClick);


function userClick(clickEvent) {

    userClicksCounter++;

    if (userClicksCounter <= maxUserClicks) {

        if (clickEvent.target.id === 'leftimg') {

            proDucts[leftImgIndex].votes = proDucts[leftImgIndex].votes + 1;
        } else if (clickEvent.target.id === 'centerImg') {
            proDucts[centerImgIndex].votes = proDucts[centerImgIndex].votes + 1;
        } else {
            proDucts[rightImgIndex].votes = proDucts[rightImgIndex].votes + 1;

        }
        renderThreeImages();

    } else {
        images.removeEventListener('click', userClick);

        // create list by getting the element 
        let list = document.getElementById('idVotes')
        let liElement;
        for (let i = 0; i < proDucts.length; i++) {
            liElement = document.createElement('li');
            list.appendChild(liElement);
            liElement.textContent = `${proDucts[i].name} you voted it ${proDucts[i].votes} times, and you have viewed it ${proDucts[i].timeShown}`
            productVotes.push(proDucts[i].votes);
            productShown.push(proDucts[i].timeShown);
        }
        // calling the Local storage add to it each time clicking 
        saveToLocalStorage();

        chart();
    }
    function chart() {
        let ctx = document.getElementById('resultChart').getContext('2d');
        let name = [];
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: imgName,
                datasets: [{
                    label: '# of Your Votes',
                    data: productVotes,
                    backgroundColor:
                        'rgba(255, 99, 132, 0.7)',


                    borderColor:
                        'rgba(255, 99, 132, 1)',


                    borderWidth: 1
                },
                {
                    label: '# of shown',
                    data: productShown,
                    backgroundColor:
                        'rgba(54, 162, 235, 0.7)',

                    borderColor:
                        'rgba(54, 162, 235, 1)',

                    borderWidth: 1
                }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

getLocalStorage();
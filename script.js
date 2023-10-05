const count = document.getElementById('count');
const timeValue = document.getElementById('time');
const startBtn =document.getElementById('new');
const stopBtn = document.getElementById('stop');
const gameContainer = document.querySelector('.game-container');
const result = document.getElementById('result-for-game');
const resultContainer = document.querySelector('.result-container');

const audioplayer = document.querySelector('audio');
const audio = new Audio();

let imgs;
let intervalTime;
let firstimage = false;
let secondimage = false;

const values = [
    {name:"Group1", image:"./assets/images/Group1.jpg"},
    {name:"Group2", image:"./assets/images/Group2.jpg"},
    {name:"Group3", image:"./assets/images/Group3.jpg"},
    {name:"Group4", image:"./assets/images/Group4.jpg"},
    {name:"Group5", image:"./assets/images/Group5.jpg"},
    {name:"Group6", image:"./assets/images/Group6.jpg"},
    {name:"Group7", image:"./assets/images/Group7.jpg"},
    {name:"Group8", image:"./assets/images/Group8.jpg"},
];

let countMoves = 0;
winerCount = 0;

let second =0;
minute=0;

const generatorOfTime = () =>{
    second += 1;
    if(second >= 60){
        minute += 1;
        second = 0;
    }

    let secValue = second < 10 ? `0${second}` : second;
    let minValue = minute < 10 ? `0${minute}` : minute;
    timeValue.innerHTML =`<span>Ваше время: </span>${minValue}:${secValue}`

};

const counter = () =>{
    countMoves += 1;
    count.innerHTML = `<span>Ваши ходы: ${countMoves} </span>`;
};

const generetorImage = (scale = 4) => {
    let imgArray = [...values];
    let imgValue = [];
    scale = (scale*scale)/2;
    for (let k=0; k<scale; k++){
const imgRandom = Math.floor(Math.random()*imgArray.length);
imgValue.push(imgArray[imgRandom]);
imgArray.splice(imgRandom, 1);
    }
    return imgValue;
};

const gridGenerator = (imgValue, scale = 4)=> {
    gameContainer.innerHTML="";
    imgValue = [...imgValue, ...imgValue];
    imgValue.sort(() => Math.random() - 0.5);
    for (let k=0; k < scale*scale; k++){
        gameContainer.innerHTML +=
        `<div class="img-wrapper" data-image-value="${imgValue[k].name}">
        <div class="img-before-click">RSS</div>
        <div class="img-after-click">
        <img src="${imgValue[k].image}" class="image"/></div>
     </div>`;
    }

    gameContainer.style.gridTemplateColumns = `repeat(${scale},auto)`;
  
    imgs = document.querySelectorAll(".img-wrapper");
    imgs.forEach((img) => {
      img.addEventListener("click", () => {
        if (!img.classList.contains("treehouse")) {
          img.classList.add("turnaround");
           if (!firstimage) {
            firstimage = img;
           firstimageValue = img.getAttribute("data-image-value");
          
        } else {
            counter();
          
            secondimage = img;
            let secondimageValue = img.getAttribute("data-image-value");
            if (firstimageValue == secondimageValue) {
            
              firstimage.classList.add("treehouse");
              secondimage.classList.add("treehouse");
              
              firstimage = false;
              
              winerCount += 1;
            
              if (winerCount == Math.floor(imgValue.length / 2)) {
                result.innerHTML = `<h2>Поздравляю, Вы победили!</h2>
              <h3>Ваши ходы: ${countMoves}</h3>`;

              audio.src = './assets/Queen_We_Are_The_Champions.mp3';
    audioplayer.currentTime = 0;
    audioplayer.play();


                stopAllGame();
              }
            } else {
              
              let [first, second] = [firstimage, secondimage];
              firstimage = false;
              secondimage = false;
              let delay = setTimeout(() => {
                first.classList.remove("turnaround");
                second.classList.remove("turnaround");
              }, 950);
            }
          }
        }
      });
    });

};

startBtn.addEventListener("click", () => {
    countMoves = 0;
    time = 0;
    /*second = 0;
    minute = 0;*/
    
    resultContainer.classList.add("invisible");
    stopBtn.classList.remove("invisible");
    startBtn.classList.add("invisible");
    
    intervalTime = setInterval(generatorOfTime, 1050);
    
    count.innerHTML = `<span>Ваши ходы: ${countMoves}</span> `;
    
    init();
  });
  
  stopBtn.addEventListener("click", (stopAllGame = () => {
    resultContainer.classList.remove("invisible");
      stopBtn.classList.add("invisible");
      startBtn.classList.remove("invisible");
      clearInterval(intervalTime);
      countMoves = 0;
    second = 0;
    minute = 0;

    /*result.innerHTML = `<h2>Вы остановили игру!</h2>
              <h3>Ваши ходы: ${countMoves}</h3>`;*/
    })
  );

  const init = () => {
    result.innerText = "";
    winerCount = 0;
    let imgValue = generetorImage();
    console.log(imgValue);
    gridGenerator(imgValue);
  };

  init();
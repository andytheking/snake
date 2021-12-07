// 'use strict';

const canvas = document.getElementById('game'); /* задаю размеры поля */
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/canva.png'; /* "вызываю" картинку */

const foodImg = new Image();
foodImg.src = 'img/donut.png';

let box = 32;   /* переменная, которая отвечает за длину или ширину одного квадратика на поле */

let score = 0;

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box, /* .floor - для округления до единиц. 17 - это 17 ячеек*/
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
  if(event.keyCode == 37 && dir != 'right')   /* узнать в гугле КОДЫ клавиш на клаве */
    dir = 'left';
  else if(event.keyCode == 38 && dir != 'down')
    dir = 'up';
  else if(event.keyCode == 39 && dir != 'left')
    dir = 'right';
  else if(event.keyCode == 40 && dir != 'up')
    dir = 'down';
}

function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(head.x == arr[i].x && head.y == arr[i].y)
      clearInterval(game);
  }
}

function drawGame() {   /* функция для "отрисовки" изображений */
  ctx.drawImage(ground, 0, 0);  /* координаты идут с верхней левой точки */

  ctx.drawImage(foodImg, food.x, food.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'blue';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box, /* .floor - для округления до единиц. 17 - это 17 ячеек*/
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop();
  }

  // snake.pop();  /* эта ф-я удаляет последний объект в массиве */

  if(snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17)
    clearInterval(game);

  if(dir == 'left') snakeX -= box;
  if(dir == 'right') snakeX += box;
  if(dir == 'up') snakeY -= box;
  if(dir == 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}



let game = setInterval(drawGame, 100);  /* вызываем функцию drawGame каждые 100 мили секунд */

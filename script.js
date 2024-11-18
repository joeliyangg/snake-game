const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Game variables
let snake;
let direction;
let foodX;
let foodY;
let gameSpeed = 100; // Speed in milliseconds

// Initialize game
function initGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 }; // Start with no movement
    createFood();
}

// Create the first food location
function createFood() {
    foodX = Math.floor(Math.random() * 20) * 20;
    foodY = Math.floor(Math.random() * 20) * 20;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, 20, 20);
}

function checkFoodCollision() {
    if (snake[0].x === foodX && snake[0].y === foodY) {
        snake.push({}); // Add a new segment to the snake
        createFood(); // Create new food
    }
}

function checkCollision() {
    // Check if snake hits the wall
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }

    // Check if snake hits itself
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    initGame();
}

function gameLoop() {
    if (checkCollision()) {
        alert('Game Over');
        resetGame(); // Reset the game instead of reloading the page
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop();

    // Check for food collision
    checkFoodCollision();

    // Draw the food
    drawFood();

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
}

// Listen for keyboard events
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = direction.y === -20;
    const goingDown = direction.y === 20;
    const goingRight = direction.x === 20;
    const goingLeft = direction.x === -20;

    if (keyPressed === LEFT_KEY && !goingRight) {
        direction = { x: -20, y: 0 };
    }

    if (keyPressed === UP_KEY && !goingDown) {
        direction = { x: 0, y: -20 };
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        direction = { x: 20, y: 0 };
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        direction = { x: 0, y: 20 };
    }
}

// Start the game
initGame();
setInterval(gameLoop, gameSpeed);
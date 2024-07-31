const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const outerRadius = 250;
const innerRadius = 200; // Radius for the white center
const segments = 36;
const segmentAngle = (2 * Math.PI) / segments;
const wheelNumbers = [15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26,32]
let isSpinning = false;
let currentAngle = 0;
let spinSpeed = 0;
let playerWallet = 100; //initial amount
let playerBet = 0; //initial player bet
let playerBetOn = ''; 
let currentBets = new Set();


const centerImage = new Image();
centerImage.src = '../images/reclame_middle.png';  //path to image

// Function to draw the roulette wheel on canvas
function drawWheel(angleOffset = 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // // Draw the inner white circle
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    // ctx.fillStyle = '#FFFFFF';
    // ctx.fill();


    // Draw the outer colored segments
    for (let i = 0; i < segments; i++) {
        const angleStart = i * segmentAngle + angleOffset;
        const angleEnd = (i + 1) * segmentAngle + angleOffset;

        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, angleStart, angleEnd);
        ctx.arc(centerX, centerY, innerRadius, angleEnd, angleStart, true);
        ctx.closePath();
        
        ctx.fillStyle = (i % 2 === 0) ? '#000000' : '#FF0000';
        ctx.fill();

        const textAngle = angleStart + segmentAngle / 2;
        const textX = centerX + (outerRadius - 30) * Math.cos(textAngle);
        const textY = centerY + (outerRadius - 30) * Math.sin(textAngle);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(wheelNumbers[i], textX, textY);
    }

    // Draw the inner circle as an image
    if (centerImage.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();

        const imgX = centerX - innerRadius;
        const imgY = centerY - innerRadius;
        const imgSize = innerRadius * 2;

        ctx.drawImage(centerImage, imgX, imgY, imgSize, imgSize);
        ctx.restore();
    }

    // Draw the arrow at the top
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(centerX + outerRadius + 5, centerY);
    ctx.lineTo(centerX + outerRadius + 20, centerY - 10);
    ctx.lineTo(centerX + outerRadius + 20, centerY + 10);
    ctx.closePath();
    ctx.fill();
}

function spinWheel(result) {
    isSpinning = true;
    spinSpeed = Math.random() * 0.2 + 0.2;  // Random initial speed between 0.2 and 0.4

    function animate() {
        if (!isSpinning) return;
        
        currentAngle += spinSpeed;
        spinSpeed *= 0.98;  // Gradual deceleration
        if (spinSpeed < 0.005) {
            isSpinning = false;
            showResult(result);
        }

        drawWheel(currentAngle);
        requestAnimationFrame(animate);
    }

    animate();
}

function placeBet(color) {
    // Assume a fixed bet amount for now, say 10 units
    const betAmount = 10;
    
    // Check if player has enough money to place the bet
    if (playerWallet >= betAmount) {
        playerWallet -= betAmount;
        playerBet += betAmount;
        playerBetOn = color;

        // Display current wallet balance and bet amount
        updateWalletDisplay();


    } else {
        alert("Not enough money in your wallet to place this bet.");
    }
}


//functie voor het toevoegen van visuele munten
document.addEventListener('DOMContentLoaded', function() {
    const betButtons = document.querySelectorAll('.betButton');

    // Event listeners for each betting button
    betButtons.forEach(button => {
        button.addEventListener('click', function() {
            placeCoin(button);
        });
    });

});

function toggleBet(button){
    if(currentBets.has(button.id)) {
        currentBets.delete(button.id);
        button.classList.remove('selected');
        removeCoin();
    } 
    else {
        currentBets.add(button.id);
        button.classList.add('selected')
        placeCoin(button);
    }
}

// function toggleBet(button) {
//     const coinContainer = button.querySelector('.coin-container');

//     if (currentBets.has(button.id)) {
//         currentBets.delete(button.id);
//         coinContainer.innerHTML = ''; // Remove coin
//     } else {
//         currentBets.add(button.id);
//         const coinImg = document.createElement('img');
//         coinImg.src = '/static/images/munt_immage.png';
//         coinImg.className = 'coin';
//         coinContainer.appendChild(coinImg); // Add coin
//     }
// }


// // Function to place the coin on the selected button
function placeCoin(button) {
    let coin = document.getElementById('coin');
    const rect = button.getBoundingClientRect();
    coin.style.position = 'absolute';
    coin.style.left = `${rect.left + window.scrollX}px`;
    coin.style.top = `${rect.top + window.scrollY}px`;
    coin.style.width = '10px';
    coin.style.height = '10px';
    coin.style.backgroundImage = 'url(/static/images/munt_immage.png)';
    coin.style.backgroundSize = 'cover';
    coin.style.display = 'block';
    coin.style.pointerEvents = 'none';
    currentBet = button.id;
}


//na een spin het verwijderen van de munten
function removeCoin() {
    // betButtons.forEach(button => {
    //     const coinContainer = button.querySelector('.coin-container');
    //     coinContainer.innerHTML = ''; // Remove all coins
    // }); 
    coin.style.display = 'none';
}


function showResult(result) {
    // Calculate the segment angle where the arrow points
    const finalAngle = currentAngle % (2 * Math.PI);
    const resultSegment = Math.floor((2 * Math.PI - finalAngle) / segmentAngle);
    const resultNumber = wheelNumbers[resultSegment % segments];

    const isRed = (resultNumber % 2 === 0);
    const isBlack = !isRed;

    let winAmount = 0;
    if(isNaN(playerBetOn)) {
        if ((isRed && playerBetOn === 'red') || (isBlack && playerBetOn === 'black')) {     //calculate wether or not win
            winAmount = playerBet * 2;
            playerWallet += winAmount;
        }
    }
    else {
        playerNumber = Number(playerBetOn);
        if(playerNumber === resultNumber) {
            winAmount = playerBet * 36;
            playerWallet += winAmount;
        }
    }
    playerBet = 0;
    playerBetOn = '';

    // Display the result
    document.getElementById('result').innerText = `The ball landed on ${resultNumber}`;
    document.getElementById('walletBalance').innerText = `Wallet Balance: ${playerWallet}`;
    document.getElementById('winAmount').innerText = `Win: ${winAmount}`;
    document.getElementById('betAmount').innerText = `Current Bet: ${playerBet}`;
    removeCoin();

}

function updateWalletDisplay() {
    document.getElementById('walletBalance').innerText = `Wallet Balance: ${playerWallet}`;
    document.getElementById('betAmount').innerText = `Current Bet: ${playerBet}`;
}

//functionaliteit voor het resetten van een bet
function resetBet() {
    playerWallet += playerBet;
    playerBet = 0;
    playerBetOn = '';
    updateWalletDisplay();
    removeCoin();   
    currentBets.clear(); 
}


document.getElementById('spinButton').addEventListener('click', function() {
    if (isSpinning) return;
    
    fetch('/spin', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        const result = data.result;
        spinWheel(result);
    })
    .catch(error => {
        console.error('Error spinning the wheel:', error);
    });
});

// Initial draw
drawWheel();

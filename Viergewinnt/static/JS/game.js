let currentPlayer = 1;
let playerColors = {1: null, 2: null};
let startTime;

function startGame() {
    playerColors[1] = 'red'; // Assuming red for player 1
    playerColors[2] = 'yellow'; // Assuming yellow for player 2
    document.getElementById('whosturn').textContent = "Spieler 1's Zug";
    
    // Initialize board
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 0; i < 42; i++) {
        const cell = document.createElement('ul');
        const cellContent = document.createElement('p');
        cellContent.style.backgroundColor = 'white'; // Initial color for the cell
        cell.appendChild(cellContent);
        cell.addEventListener('click', () => makeMove(i, cellContent));
        board.appendChild(cell);
    }
    startTime = new Date();
}

function makeMove(index, cellContent) {
    if (cellContent.style.backgroundColor === '' || cellContent.style.backgroundColor === 'white') {
        cellContent.style.backgroundColor = playerColors[currentPlayer];
        
        // Save the move to the database
        fetch(`/api/game/move/${index}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({player_id: currentPlayer})
        }).then(response => response.json())
          .then(data => {
              if (data.error) {
                  console.error('Error:', data.error);
              } else {
                  if (checkWin()) {
                      endGame(currentPlayer);
                  } else {
                      currentPlayer = currentPlayer === 1 ? 2 : 1;
                      document.getElementById('whosturn').textContent = `Spieler ${currentPlayer}'s Zug`;
                  }
              }
          }).catch(error => {
              console.error('Error:', error);
          });
    }
}

function resetGame() {
    fetch('/api/game/reset', {
        method: 'POST'
    }).then(response => response.json())
      .then(data => {
          if (data.error) {
              console.error('Error:', data.error);
          } else {
              startGame(); // Restart the game after resetting
          }
      }).catch(error => {
          console.error('Error:', error);
      });
}

function calculatePlaytime() {
    const endTime = new Date();
    const duration = new Date(endTime - startTime);
    return `${duration.getUTCHours()}:${duration.getUTCMinutes()}:${duration.getUTCSeconds()}`;
}

// Ensure the start and reset buttons trigger the appropriate functions
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('resetGame').addEventListener('click', resetGame);

// Function to check the win condition (needs implementation)
function checkWin() {
    // Implement win checking logic here
    return false;
}

// Function to handle end game scenario (needs implementation)
function endGame(winner) {
    // Implement end game logic here
    alert(`Spieler ${winner} hat gewonnen!`);
}

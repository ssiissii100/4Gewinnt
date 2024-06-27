let currentPlayer = 1;
let playerColors = {1: 'red', 2: 'yellow'};
let startTime;
let boardState = Array(42).fill(null);

function startGame() {
    document.getElementById('whosturn').textContent = "Spieler 1's Zug";
    
    // Initialize board
    const board = document.getElementById('board');
    board.innerHTML = '';
    boardState.fill(null); // Reset board state
    for (let i = 0; i < 42; i++) {
        const cell = document.createElement('ul');
        const cellContent = document.createElement('p');
        cellContent.style.backgroundColor = 'white'; // Initial color for the cell
        cell.appendChild(cellContent);
        cell.dataset.index = i;
        cell.addEventListener('click', (event) => makeMove(event, i));
        board.appendChild(cell);
        console.log(`CellIndex: ${cell.dataset.index}`);
    }
    updateGameState(); // Immediately update game state
    setInterval(updateGameState, 1000); // Fetch game state every 1 second
}

function makeMove(event, index) {
    const column = index % 7;
    let cellIndex;

    // Find the lowest available cell in the column
    for (let row = 5; row >= 0; row--) {
        cellIndex = row * 7 + column;
        if (boardState[cellIndex] === null) {
            break;
        }
    }

    console.log(`Column: ${column}, CellIndex: ${cellIndex}, BoardState: ${boardState[cellIndex]}`);

    if (boardState[cellIndex] === null) {
        const cellContent = document.querySelector(`[data-index='${cellIndex}'] p`);
        cellContent.style.backgroundColor = playerColors[currentPlayer];
        boardState[cellIndex] = currentPlayer;

        // Save the move to the database
        fetch(`/api/game/move/${cellIndex}`, {
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

function updateGameState() {
    fetch('/api/game/state')
        .then(response => response.json())
        .then(data => {
            boardState = data.boardState;
            currentPlayer = data.currentPlayer;
            updateBoard();
            document.getElementById('whosturn').textContent = `Spieler ${currentPlayer}'s Zug`;
        })
        .catch(error => {
            console.error('Error fetching game state:', error);
        });
}

function updateBoard() {
    for (let i = 1; i < 42; i++) {
        const cellContent = document.querySelector(`[data-index='${i}'] p`);
        if (boardState[i] === 1) {
            cellContent.style.backgroundColor = playerColors[1];
        } else if (boardState[i] === 2) {
            cellContent.style.backgroundColor = playerColors[2];
        } else {
            cellContent.style.backgroundColor = 'white';
        }
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

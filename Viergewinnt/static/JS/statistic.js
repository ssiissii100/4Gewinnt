document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/statistics')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('statistics-table-body');
            let p1Wins = 0;
            let p2Wins = 0;
            let draws = 0;
            let totalTime = 0;
            let longestGame = 0;

            data.forEach((stat, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${stat.Winner}</td>
                    <td>${stat.Playtime}</td>
                `;
                tableBody.appendChild(row);

                const timeParts = stat.Playtime.split(':');
                const timeInSeconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);

                totalTime += timeInSeconds;
                if (timeInSeconds > longestGame) longestGame = timeInSeconds;

                if (stat.Winner === 'P1') p1Wins++;
                else if (stat.Winner === 'P2') p2Wins++;
                else draws++;
            });

            document.getElementById('p1-wins').textContent = `P1 Wins: ${p1Wins}`;
            document.getElementById('p2-wins').textContent = `P2 Wins: ${p2Wins}`;
            document.getElementById('draws').textContent = `Draw: ${draws}`;

            const averageTime = totalTime / data.length;
            const averageMinutes = Math.floor(averageTime / 60);
            const averageSeconds = Math.floor(averageTime % 60);
            document.getElementById('average-game').textContent = `Durchschnittliche Länge: ${averageMinutes}:${averageSeconds.toString().padStart(2, '0')} Min`;

            const longestMinutes = Math.floor(longestGame / 60);
            const longestSeconds = Math.floor(longestGame % 60);
            document.getElementById('longest-game').textContent = `Längstes Spiel: ${longestMinutes}:${longestSeconds.toString().padStart(2, '0')} Min`;
        })
        .catch(error => console.error('Error fetching statistics:', error));
});

function resetStats() {
    fetch('/api/statistics', { method: 'DELETE' })
        .then(() => location.reload())
        .catch(error => console.error('Error resetting statistics:', error));
}

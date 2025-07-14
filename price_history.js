// === price_history.js ===

// Create floating button
const button = document.createElement('button');
button.id = 'price-history-button';
button.textContent = '📉 Price History';
document.body.appendChild(button);

// Create modal container
const modal = document.createElement('div');
modal.id = 'price-history-modal';
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-button">&times;</span>
    <h2>Price History</h2>
    <canvas id="priceChart" width="400" height="250"></canvas>
  </div>
`;
document.body.appendChild(modal);

// Button + modal styles
const style = document.createElement("style");
style.innerHTML = `
  #price-history-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: #173ff1;
    color: #ffc220;
    border: none;
    padding: 12px 18px;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    z-index: 10000;
  }

  #price-history-modal {
    display: none;
    position: fixed;
    z-index: 10001;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.6);
  }

  .modal-content {
    background-color: white;
    margin: 10% auto;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 10px; right: 20px;
    font-size: 24px;
    cursor: pointer;
  }
`;
document.head.appendChild(style);

// Show modal and draw chart after delay
button.addEventListener('click', () => {
  modal.style.display = 'block';
  setTimeout(drawChart, 200); // Delay ensures canvas is visible
});

// Hide modal on close
modal.querySelector('.close-button').addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) modal.style.display = 'none';
});

// Draw the chart (Chart.js must already be loaded locally via manifest)
function drawChart() {
  const canvas = document.getElementById('priceChart');
  if (!canvas) return console.error("❌ Canvas not found");

  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Price in USD',
        data: [27.98, 25.98, 24.98, 23.98, 25.48, 22.98, 25.73],
        borderColor: '#173ff1',
        backgroundColor: 'rgba(23,63,241,0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#173ff1'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Lay’s 40-Count Variety Pack - Price History'
        },
        tooltip: {
          callbacks: {
            label: ctx => `$${ctx.raw.toFixed(2)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: value => `$${value}`
          }
        }
      }
    }
  });
}

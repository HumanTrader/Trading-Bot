// script.js
async function fetchDashboardData() {
    try {
        // Replace with the actual URL of your backend API
        const response = await fetch('http://localhost:5000/api/dashboard-data'); // Example Flask backend URL
        const data = await response.json();

        // Update Overall Recommendation
        const recommendationText = document.getElementById('recommendation-text');
        recommendationText.textContent = data.overall_recommendation;
        if (data.overall_recommendation.includes('BUY')) {
            recommendationText.style.color = 'green';
        } else if (data.overall_recommendation.includes('SELL')) {
            recommendationText.style.color = 'red';
        } else {
            recommendationText.style.color = 'orange';
        }

        // Update Investment Amount (if you want this dynamic)
        document.getElementById('investment-amount').textContent = `$${data.investment_amount} AUD`;


        // Update Factors Display (example for one factor, you'll loop through all 10)
        // This is a placeholder for how you'd update specific elements
        document.getElementById('iron-ore-value').textContent = data.factors.iron_ore_price.value;
        document.getElementById('iron-ore-score').textContent = data.factors.iron_ore_price.score;
        // You'll need to dynamically create or update the other factor divs based on data.factors

        // Example of how to populate factors dynamically
        const factorListDiv = document.getElementById('factor-list');
        factorListDiv.innerHTML = ''; // Clear existing content
        for (const key in data.factors) {
            const factor = data.factors[key];
            const factorDiv = document.createElement('div');
            factorDiv.classList.add('factor-item');
            factorDiv.innerHTML = `
                <h3>${factor.name}</h3>
                <p>Current: ${factor.value} | Trend: ${factor.trend} | Score: ${factor.score}</p>
            `;
            factorListDiv.appendChild(factorDiv);
        }


        // Update Portfolio Status
        document.getElementById('current-cash').textContent = `$${data.portfolio.current_cash} AUD`;
        document.getElementById('fmg-shares-held').textContent = data.portfolio.fmg_shares_held;
        document.getElementById('total-portfolio-value').textContent = `$${data.portfolio.total_portfolio_value} AUD`;

        // Update Trade History
        const tradeHistoryBody = document.getElementById('trade-history-body');
        tradeHistoryBody.innerHTML = ''; // Clear existing history
        data.trade_history.forEach(trade => {
            const row = tradeHistoryBody.insertRow();
            row.insertCell().textContent = trade.date;
            row.insertCell().textContent = trade.type;
            row.insertCell().textContent = trade.shares;
            row.insertCell().textContent = `$${trade.price}`;
            row.insertCell().textContent = `$${trade.total}`;
        });

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        document.getElementById('recommendation-text').textContent = 'Error loading data.';
    }
}

// Fetch data when the page loads
document.addEventListener('DOMContentLoaded', fetchDashboardData);

// Refresh data every 60 seconds (adjust as needed)
setInterval(fetchDashboardData, 60000);

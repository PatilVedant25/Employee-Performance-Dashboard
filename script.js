// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const currentDateTime = document.getElementById('current-date');
const statElements = {
    totalUsers: document.getElementById('total-users'),
    newUsers: document.getElementById('new-users'),
    activeUsers: document.getElementById('active-users'),
    totalRevenue: document.getElementById('total-revenue')
};

// Charts
let usersChart, revenueChart;

// Initialize the dashboard
function initDashboard() {
    // Set current date and time
    updateCurrentDateTime();
    // Set up theme toggle
    setupThemeToggle();
    // Initialize charts
    initCharts();
    // Set up event listeners
    setupEventListeners();
}

// Update current date and time
function updateCurrentDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    currentDateTime.textContent = now.toLocaleDateString('en-US', options);
}

// Set up theme toggle functionality
function setupThemeToggle() {
    // Check if dark mode is preferred by the user
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        
        if (newTheme === 'dark') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('preferred-theme', 'dark');
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('preferred-theme', 'light');
        }
    });

    // Check localStorage for user's preferred theme
    const preferredTheme = localStorage.getItem('preferred-theme');
    if (preferredTheme) {
        document.documentElement.setAttribute('data-theme', preferredTheme);
        themeToggleBtn.innerHTML = preferredTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// Initialize charts using Chart.js
function initCharts() {
    // Users Chart
    const usersCtx = document.getElementById('users-chart').getContext('2d');
    usersChart = new Chart(usersCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'New Users',
                data: [12, 19, 3, 5, 2, 3, 10],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Revenue Chart
    const revenueCtx = document.getElementById('revenue-chart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Revenue',
                data: [6500, 5900, 8000, 8100, 5600, 5500, 7000],
                backgroundColor: 'rgba(46, 204, 113, 0.7)',
                borderColor: '#2ecc71',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Set up event listeners
function setupEventListeners() {
    // Simulate data refresh every 30 seconds
    setInterval(refreshData, 30000);
    
    // Add hover effects to sidebar items
    document.querySelectorAll('.sidebar nav ul li').forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            document.querySelectorAll('.sidebar nav ul li').forEach(i => {
                i.classList.remove('active');
            });
            // Add active class to clicked item
            item.classList.add('active');
        });
    });
    
    // Add view user functionality
    document.querySelectorAll('.action-btn.view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('View user details functionality would go here');
        });
    });
}

// Refresh data with some random variation
function refreshData() {
    // Update stats with random variations
    statElements.totalUsers.textContent = Math.floor(Math.random() * 1000) + 100;
    statElements.newUsers.textContent = Math.floor(Math.random() * 50) + 5;
    statElements.activeUsers.textContent = Math.floor(Math.random() * 30) + 70 + '%';
    
    const revenueValues = [6500, 5900, 8000, 8100, 5600, 5500, 7000];
    const newRevenue = revenueValues.map(value => {
        const variation = Math.floor(Math.random() * 2000) - 1000; // Random variation between -1000 and +1000
        return Math.max(0, value + variation); // Ensure value doesn't go negative
    });
    
    statElements.totalRevenue.textContent = '$' + (Math.floor(Math.random() * 5000) + 2000);
    
    // Update charts
    usersChart.data.datasets[0].data = usersChart.data.datasets[0].data.map(value => {
        const variation = Math.floor(Math.random() * 10) - 5; // Random variation between -5 and +5
        return Math.max(0, value + variation); // Ensure value doesn't go negative
    });
    usersChart.update();
    
    revenueChart.data.datasets[0].data = newRevenue;
    revenueChart.update();
    
    // Update date and time
    updateCurrentDateTime();
}

// Initialize the dashboard when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initDashboard);
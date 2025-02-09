const app = firebase.initializeApp({ /* Your Firebase Config */ });
const database = firebase.database();

const pages = {
    moisture: { yMin: 30, yMax: 100, yStep: 10 },
    ph: { yMin: 1, yMax: 14, yStep: 1 },
    sunlight: { yMin: 1, yMax: 6, yStep: 1 },
    temperature: { yMin: 10, yMax: 40, yStep: 5 }
};

let currentPage = window.location.pathname.split('/').pop().split('.')[0];
let chart;

function goBack() {
    window.history.back();
}

function fetchData() {
    const dataRange = document.getElementById('data-range-dropdown').value;
    const dateOption = document.getElementById('date-option-dropdown').value;
    const datePickerValue = document.getElementById('date-picker').value;

    const chartData = []; // Fetch from Firebase based on selected filters
    const labels = []; // Time labels corresponding to data points

    const { yMin, yMax, yStep } = pages[currentPage];

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Reading',
                data: chartData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    ticks: {
                        maxTicksLimit: dataRange,
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Reading'
                    },
                    min: yMin,
                    max: yMax,
                    ticks: {
                        stepSize: yStep,
                    }
                }
            }
        }
    });
}

// Event listeners
document.getElementById('data-range-dropdown').addEventListener('change', fetchData);
document.getElementById('date-option-dropdown').addEventListener('change', fetchData);
document.getElementById('date-picker').addEventListener('input', fetchData);

// Initial data fetch
fetchData();
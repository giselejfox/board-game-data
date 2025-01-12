'use client'

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TestBarChart({ rawData, gameTitle, selectedGame }) {
    const [chartData, setChartData] = useState({})
    
    // Function to process data and calculate win percentage for Bananagrams
    function getWinData(rawData) {
        const playerStats = {};

        rawData.forEach(game => {
            if (game.gameTitle === gameTitle) {
                game.players.forEach(player => {
                    if (!playerStats[player]) {
                        playerStats[player] = { wins: 0, totalGames: 0 };
                    }
                    playerStats[player].totalGames++; // Increment the total number of games played by the player
                });

                game.winners.forEach(winner => {
                    if (playerStats[winner]) {
                        playerStats[winner].wins++; // Increment the wins for the player
                    }
                });
            }
        });

        // Calculate win percentage for each player
        const winData = {};
        for (const player in playerStats) {
            const { wins, totalGames } = playerStats[player];
            winData[player] = {
                wins: wins,
                totalGames: totalGames,
                winPercentage: (wins / totalGames) * 100 // Calculate the percentage
            }
        }

        return winData;
    }

    useEffect(() => {
        const winData = getWinData(rawData);

        if (Object.keys(winData).length !== 0) {
            
            // Filter players who have played at least 5 games
            const filteredPlayers = Object.keys(winData).filter(player => {
                console.log(player, winData[player].totalGames)
                return winData[player].totalGames >= 5
            });

            // Sort the players by win percentage in descending order
            const sortedPlayers = filteredPlayers.sort((a, b) => winData[b].winPercentage - winData[a].winPercentage);
    
            // Create sorted data for chart
            const sortedData = sortedPlayers.map(player => winData[player].winPercentage);
    
            setChartData({
                players: sortedPlayers,
                data: sortedData,
                winData: winData, // Store the detailed win data for tooltips
            });
        }

    }, [rawData, gameTitle])

    // Prepare data for the bar chart
    const data = {
        labels: chartData.players, // Player names
        datasets: [
            {
                label: `${gameTitle} Win Percentage`,
                data: chartData.data, // Number of wins for each player
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: `${gameTitle} Win Percentage by Player`
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const player = tooltipItem.label;
                        const winData = chartData.winData[player]; // Get the win data for the player
                        const winPercentage = winData.winPercentage.toFixed(2); // Format win percentage
                        const totalGames = winData.totalGames;
                        return `${winPercentage}% wins | ${totalGames} games played`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    
    return (
        <div>
            <Bar data={data} options={options} />
            {/* <div>{JSON.stringify(chartData)}</div> */}
        </div>
    )
};
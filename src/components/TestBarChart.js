'use client'

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TestBarChart({ rawData }) {
    const [bananagramsData, setBanagramsData] = useState({})
    
    // Function to process data and calculate win percentage for Bananagrams
    function getBananagramsWinPercentage(rawData) {
        const playerStats = {};

        rawData.forEach(game => {
            if (game.gameTitle === "Bananagrams") {
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
        const winPercentage = {};
        for (const player in playerStats) {
            const { wins, totalGames } = playerStats[player];
            winPercentage[player] = (wins / totalGames) * 100; // Calculate the percentage
        }

        return winPercentage;
    }

    useEffect(() => {
        const winPercentage = getBananagramsWinPercentage(rawData);

        // Sort the players by win percentage in descending order
        const sortedPlayers = Object.keys(winPercentage).sort((a, b) => winPercentage[b] - winPercentage[a]);

        // Create sorted data for chart
        const sortedData = sortedPlayers.map(player => winPercentage[player]);

        setBanagramsData({
            players: sortedPlayers,
            data: sortedData,
        });
    }, [rawData])

    // Prepare data for the bar chart
    const data = {
        labels: bananagramsData.players, // Player names
        datasets: [
        {
            label: 'Bananagrams Win Percentage',
            data: bananagramsData.data, // Number of wins for each player
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
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bananagrams Wins by Player'
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
        </div>
    )
};
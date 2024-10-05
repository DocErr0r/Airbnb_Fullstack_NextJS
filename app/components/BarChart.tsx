"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for tree shaking
import { useBookings } from '../Hooks/useBookings';

const BarChart = () => {
  // Get the last 12 months from the current date
 
 
  
  const labels = [];
  const data = [0,0,0,0,0,0,0,0,0,0,0,123];
  const currentDate = new Date();
  for (let i = 0; i < 12; i++) {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    labels.unshift(month.toLocaleString('default', { month: 'long', year: 'numeric' }));
    // data.unshift(Math.floor(Math.random() * 100)); // Replace with your actual data
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Data',
        data,
        backgroundColor: 'rgba(77, 227, 82, 0.9)',
        borderColor: 'rgba(77, 227, 82, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;

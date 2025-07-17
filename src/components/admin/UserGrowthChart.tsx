"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function UserGrowthChart() {
  const data = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Nouveaux utilisateurs",
        data: [12, 19, 15, 25, 22, 30, 35, 28, 40, 45, 38, 42],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
      {
        label: "Utilisateurs actifs",
        data: [45, 52, 48, 61, 58, 67, 72, 65, 78, 82, 75, 85],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Croissance des utilisateurs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}

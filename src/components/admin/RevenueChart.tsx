"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function RevenueChart() {
  const data = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Revenus (€)",
        data: [25, 22.2, 28.3, 75.5, 41, 83, 92.4],
        borderColor: "rgb(245, 158, 11)",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "rgb(245, 158, 11)",
        pointBorderColor: "rgb(245, 158, 11)",
        pointRadius: 5,
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
        ticks: {
          callback: (value: any) => value + "€",
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
        <CardTitle>Évolution des revenus</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}

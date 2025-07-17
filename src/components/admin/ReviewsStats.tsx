"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Clock, CheckCircle } from "lucide-react"

interface ReviewsStatsProps {
  stats: {
    total: number
    en_attente: number
    approuve: number
    rejete: number
    moyenne_notes: number
    total_cette_semaine: number
  }
}

export function ReviewsStats({ stats }: ReviewsStatsProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des avis</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En attente</CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.en_attente}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approuvés</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.approuve}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
          <div className="flex items-center space-x-1">{Number(stats.moyenne).toFixed(1)}/5</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Number(stats.moyenne).toFixed(1)}/5</div>
        </CardContent>
      </Card>
    </div>
  )
}

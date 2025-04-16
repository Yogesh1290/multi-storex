import { ShoppingBag, BarChart, ShoppingCart, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  icon: string
  color: string
}

export function StatsCard({ title, value, icon, color }: StatsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "shopping-bag":
        return <ShoppingBag className="h-6 w-6" />
      case "bar-chart":
        return <BarChart className="h-6 w-6" />
      case "shopping-cart":
        return <ShoppingCart className="h-6 w-6" />
      case "credit-card":
        return <CreditCard className="h-6 w-6" />
      default:
        return <ShoppingBag className="h-6 w-6" />
    }
  }

  const getColorClass = () => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-500"
      case "green":
        return "bg-green-100 text-green-500"
      case "purple":
        return "bg-purple-100 text-purple-500"
      default:
        return "bg-blue-100 text-blue-500"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorClass()}`}>
            {getIcon()}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

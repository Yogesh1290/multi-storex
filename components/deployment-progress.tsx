import { CheckCircle2, Circle, Loader2, AlertCircle } from "lucide-react"

interface DeploymentStep {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "error"
}

interface DeploymentProgressProps {
  steps: DeploymentStep[]
}

export function DeploymentProgress({ steps }: DeploymentProgressProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {step.status === "pending" && <Circle className="h-5 w-5 text-muted-foreground" />}
            {step.status === "in-progress" && <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />}
            {step.status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            {step.status === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">{step.title}</h4>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

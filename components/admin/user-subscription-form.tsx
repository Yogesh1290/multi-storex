"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { updateUserSubscription } from "@/lib/actions/admin-actions"
import { toast } from "@/components/ui/use-toast"

interface User {
  _id: string
  name: string
  email: string
  subscriptionPlan?: string
  billingCycle?: string
  trialActive?: boolean
  trialEndDate?: string
}

interface UserSubscriptionFormProps {
  user: User
}

const formSchema = z.object({
  subscriptionPlan: z.string().optional(),
  billingCycle: z.enum(["monthly", "yearly"]).optional(),
  trialActive: z.boolean().default(false),
  trialEndDate: z.string().optional(),
})

export function UserSubscriptionForm({ user }: UserSubscriptionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Format the trial end date for the input field
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscriptionPlan: user.subscriptionPlan || undefined,
      billingCycle: (user.billingCycle as "monthly" | "yearly") || "monthly",
      trialActive: user.trialActive || false,
      trialEndDate: formatDateForInput(user.trialEndDate),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Convert the trial end date string to a Date object
      const trialEndDate = values.trialEndDate ? new Date(values.trialEndDate) : undefined

      const result = await updateUserSubscription(user._id, {
        subscriptionPlan: values.subscriptionPlan,
        billingCycle: values.billingCycle,
        trialActive: values.trialActive,
        trialEndDate: trialEndDate,
      })

      if (result.success) {
        toast({
          title: "Subscription updated",
          description: "The user's subscription has been updated successfully.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update subscription. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="subscriptionPlan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subscription Plan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="no-plan">No Plan</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The subscription plan for this user.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="billingCycle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Cycle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>How often the user is billed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trialActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Trial Status</FormLabel>
                <FormDescription>Whether the user has an active trial.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("trialActive") && (
          <FormField
            control={form.control}
            name="trialEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trial End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>When the trial period ends.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Subscription"}
        </Button>
      </form>
    </Form>
  )
}

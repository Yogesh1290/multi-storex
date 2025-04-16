"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateUserProfile } from "@/lib/actions/user-actions"
import { toast } from "@/components/ui/use-toast"

// Country code configurations
const countryConfigs = {
  np: {
    code: "+977",
    label: "Nepal",
    phoneLength: 10,
    example: "98XXXXXXXX",
  },
  us: {
    code: "+1",
    label: "USA",
    phoneLength: 10,
    example: "(XXX) XXX-XXXX",
  },
  in: {
    code: "+91",
    label: "India",
    phoneLength: 10,
    example: "XXXXXXXXXX",
  },
}

// Create a schema for form validation
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  countryCode: z.enum(["np", "us", "in"]),
  phoneNumber: z.string().refine(
    (val) => {
      if (!val) return true // Allow empty
      return /^\d+$/.test(val) // Only digits
    },
    { message: "Phone number must contain only digits" },
  ),
  whatsappNumber: z.string().refine(
    (val) => {
      if (!val) return true // Allow empty
      return /^\d+$/.test(val) // Only digits
    },
    { message: "WhatsApp number must contain only digits" },
  ),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps {
  defaultValues: Partial<ProfileFormValues>
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<keyof typeof countryConfigs>(
    (defaultValues.countryCode as keyof typeof countryConfigs) || "np",
  )

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true)
    try {
      const result = await updateUserProfile({
        name: data.name,
        phoneNumber: data.phoneNumber,
        whatsappNumber: data.whatsappNumber,
        countryCode: data.countryCode,
      })

      if (result.success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update profile. Please try again.",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  setSelectedCountry(value as keyof typeof countryConfigs)
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="np">Nepal (+977)</SelectItem>
                  <SelectItem value="us">USA (+1)</SelectItem>
                  <SelectItem value="in">India (+91)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="flex items-center justify-center bg-muted px-3 rounded-l-md border border-r-0 border-input">
                    {countryConfigs[selectedCountry].code}
                  </div>
                  <Input
                    className="rounded-l-none"
                    placeholder={countryConfigs[selectedCountry].example}
                    maxLength={countryConfigs[selectedCountry].phoneLength}
                    {...field}
                    onChange={(e) => {
                      // Only allow digits
                      const value = e.target.value.replace(/\D/g, "")
                      field.onChange(value)
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>Enter your phone number without the country code.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="flex items-center justify-center bg-muted px-3 rounded-l-md border border-r-0 border-input">
                    {countryConfigs[selectedCountry].code}
                  </div>
                  <Input
                    className="rounded-l-none"
                    placeholder={countryConfigs[selectedCountry].example}
                    maxLength={countryConfigs[selectedCountry].phoneLength}
                    {...field}
                    onChange={(e) => {
                      // Only allow digits
                      const value = e.target.value.replace(/\D/g, "")
                      field.onChange(value)
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Enter your WhatsApp number without the country code (leave empty if same as phone number).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  )
}

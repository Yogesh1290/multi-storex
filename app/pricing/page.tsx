"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Minus, HelpCircle, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TrialButton } from "@/components/trial-button"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  // Calculate yearly prices (20% discount)
  const getYearlyPrice = (monthlyPrice: number) => {
    const yearlyPrice = monthlyPrice * 12 * 0.8
    return yearlyPrice.toLocaleString()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-blue-600 py-16 md:py-24 text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Multi-SaaS eCommerce Platform</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
              Choose the plan that fits your needs – from full seller control to managed backend support.
            </p>
          </div>
        </section>

        {/* Free Trial Banner */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 border-y border-blue-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Start with a 7-day free trial</h2>
                  <p className="text-gray-600">Full access to all Basic Plan features. No credit card required.</p>
                </div>
              </div>
              <TrialButton plan="Basic" billingCycle={billingCycle} size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </TrialButton>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pricing Plans</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Transparent, predictable pricing. Cancel anytime.</p>

              {/* Billing Toggle */}
              <div className="mt-8">
                <Tabs defaultValue="monthly" className="w-[400px] mx-auto">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="monthly" onClick={() => setBillingCycle("monthly")}>
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger value="yearly" onClick={() => setBillingCycle("yearly")}>
                      Yearly <span className="ml-1.5 text-xs text-green-600 font-medium">Save 20%</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <Card className="relative border-gray-200 flex flex-col h-full overflow-hidden">
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-1.5 text-sm font-medium">
                  7-Day Free Trial
                </div>
                <CardHeader className="pb-8 pt-10">
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Basic Plan</h3>
                    <div className="text-sm text-gray-500 mb-3">For small businesses</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {billingCycle === "monthly" ? (
                        <>
                          Rs250<span className="text-base font-normal text-gray-500">/month</span>
                        </>
                      ) : (
                        <>
                          Rs{getYearlyPrice(250)}
                          <span className="text-base font-normal text-gray-500">/year</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">after free trial</div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3 text-sm">
                    <PricingItem included>Single store deployment (vercel)</PricingItem>
                    <PricingItem included>
                      Admin dashboard
                      <div className="text-xs text-gray-500 ml-6">Auto setup included in template</div>
                    </PricingItem>
                    <PricingItem included>Custom Domain Setup</PricingItem>
                    <PricingItem included>Theme Customizer / Live Editor</PricingItem>
                    <PricingItem included>Three Templates</PricingItem>
                    <PricingItem included>SEO Optimization Tools</PricingItem>
                    <PricingItem included>
                      Use your own MongoDB (512 MB free tier)*
                      <TooltipInfo content="Approximately 100K products & 50K orders" />
                    </PricingItem>
                    <PricingItem included>
                      Use your own Cloudinary (25 GB free tier)*
                      <TooltipInfo content="Approximately 50K images, max 3 images/product" />
                    </PricingItem>
                    <PricingItem included>
                      Resend Email API integration (your API key)
                      <TooltipInfo content="You'll need to provide your own Resend API key" />
                    </PricingItem>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <TrialButton plan="Basic" billingCycle={billingCycle} className="w-full">
                    Start Free Trial
                  </TrialButton>
                  <div className="text-xs text-center text-gray-500 mt-2">No credit card required for trial</div>
                </CardFooter>
              </Card>

              {/* Professional Plan */}
              <Card className="relative border-gray-200 flex flex-col h-full">
                <div className="absolute -top-4 right-4">
                  <Badge className="bg-amber-500 hover:bg-amber-600">Coming Soon</Badge>
                </div>
                <div className="absolute -top-1 -right-1 -left-1 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-t-lg" />
                <CardHeader className="pb-8 pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Professional Plan</h3>
                    <div className="text-sm text-gray-500 mb-3">Most Popular</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {billingCycle === "monthly" ? (
                        <>
                          Rs999<span className="text-base font-normal text-gray-500">/month</span>
                        </>
                      ) : (
                        <>
                          Rs{getYearlyPrice(999)}
                          <span className="text-base font-normal text-gray-500">/year</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">includes 7-day free trial</div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-sm mb-4">Everything in Basic Plan, plus:</div>
                  <ul className="space-y-3 text-sm">
                    <PricingItem included>Hosted backend with full API support</PricingItem>
                    <PricingItem included>Centralized admin dashboard (hosted by us)</PricingItem>
                    <PricingItem included>Secure API tokens for store communication</PricingItem>
                    <PricingItem included>Custom domain (included)</PricingItem>
                    <PricingItem included>Built in transactional emails</PricingItem>
                    <PricingItem included>Optional SMS alerts</PricingItem>
                    <PricingItem included>Priority support & performance monitoring</PricingItem>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button className="w-full" variant="outline">
                    Join Waitlist
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="relative border-gray-200 flex flex-col h-full">
                <div className="absolute -top-4 right-4">
                  <Badge className="bg-amber-500 hover:bg-amber-600">Coming Soon</Badge>
                </div>
                <CardHeader className="pb-8 pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Enterprise Plan</h3>
                    <div className="text-sm text-gray-500 mb-3">For large businesses</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {billingCycle === "monthly" ? (
                        <>
                          Rs2,999+<span className="text-base font-normal text-gray-500">/month</span>
                        </>
                      ) : (
                        <>
                          Rs{getYearlyPrice(2999)}+<span className="text-base font-normal text-gray-500">/year</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">includes 7-day free trial</div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-sm mb-4">Everything in Professional Plan, plus:</div>
                  <ul className="space-y-3 text-sm">
                    <PricingItem included>Custom feature development & integrations</PricingItem>
                    <PricingItem included>Advanced analytics & reporting dashboard</PricingItem>
                    <PricingItem included>Staff roles & permission controls</PricingItem>
                    <PricingItem included>Bulk importer for products & orders</PricingItem>
                    <PricingItem included>Uptime & performance SLAs</PricingItem>
                    <PricingItem included>Dedicated success manager</PricingItem>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Trial Information */}
            <div className="mt-12 max-w-3xl mx-auto">
              <Alert className="bg-blue-50 border-blue-200">
                <Clock className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Free Trial Information</AlertTitle>
                <AlertDescription className="text-blue-700">
                  <p className="mb-2">
                    All plans include a 7-day free trial with full access to the plan's features. No credit card is
                    required to start your trial.
                  </p>
                  <p>
                    After your trial ends, you'll be prompted to enter payment details to continue using the service.
                    You can cancel anytime during the trial period with no charges.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>

        {/* How the Trial Works */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">How the Free Trial Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Sign Up</h3>
                <p className="text-gray-600">
                  Create your account and start your 7-day free trial with no credit card required.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Explore Features</h3>
                <p className="text-gray-600">
                  Get full access to all features of your selected plan during the trial period.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Subscribe or Cancel</h3>
                <p className="text-gray-600">
                  Choose to continue with a paid plan or cancel anytime before the trial ends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">Feature Comparison & Free-Tier Limits</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-4 px-6 text-left font-medium text-gray-600">Feature</th>
                    <th className="py-4 px-6 text-center font-medium text-gray-600">Basic (Seller Managed)</th>
                    <th className="py-4 px-6 text-center font-medium text-gray-600">Professional</th>
                    <th className="py-4 px-6 text-center font-medium text-gray-600">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRow feature="eCommerce Templates" basic="Included" pro="Included" enterprise="Included" />
                  <TableRow
                    feature="Admin Dashboard"
                    basic="vercel & auto-setup"
                    pro="Hosted & centralized"
                    enterprise="Hosted & centralized"
                  />
                  <TableRow
                    feature="Backend/API Support"
                    basic="Seller-managed"
                    pro="Hosted & managed"
                    enterprise="Hosted & managed"
                  />
                  <TableRow feature="Custom Domain Setup" basic="Included" pro="Included" enterprise="Included" />
                  <TableRow feature="Theme Customizer" basic="Included" pro="Included" enterprise="Included" />
                  <TableRow feature="SEO Optimization Tools" basic="Included" pro="Included" enterprise="Included" />
                  <TableRow
                    feature="MongoDB (Free Tier)"
                    basic={
                      <>
                        512 MB storage
                        <br />
                        <span className="text-xs text-gray-500">~100K products & 50K orders*</span>
                      </>
                    }
                    pro="Seller-managed"
                    enterprise="Seller-managed"
                  />
                  <TableRow
                    feature="Cloudinary (Free Tier)"
                    basic={
                      <>
                        25 GB storage
                        <br />
                        <span className="text-xs text-gray-500">
                          ~50K images*
                          <br />
                          Max 3 images/product
                        </span>
                      </>
                    }
                    pro="Seller-managed"
                    enterprise="Seller-managed"
                  />
                  <TableRow
                    feature="Email Notifications"
                    basic="Resend API (your key)"
                    pro="Built-in (no setup)"
                    enterprise="Built-in (no setup)"
                  />
                  <TableRow
                    feature="SMS Alerts"
                    basic="Optional (seller-managed)"
                    pro="Optional (integrated)"
                    enterprise="Optional (integrated)"
                  />
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              *Estimates based on high-usage scenarios. Actual limits may vary—monitor your usage to stay within free
              tiers.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <FaqCard
                question="What's included in the 7-day free trial?"
                answer="You get full access to all features of your selected plan for 7 days. No credit card required and you can cancel anytime. After the trial period, you'll be prompted to enter your payment details to continue using the service."
              />
              <FaqCard
                question="Will I be charged automatically after the trial?"
                answer="No, we don't require a credit card to start your trial, so there's no automatic charging. When your trial ends, you'll be prompted to enter payment details if you wish to continue using the service."
              />
              <FaqCard
                question="Can I upgrade or downgrade my plan later?"
                answer="Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be immediately available. When downgrading, the changes will take effect at the start of your next billing cycle."
              />
              <FaqCard
                question="Do I need technical skills to use this platform?"
                answer="No technical skills are required. Our platform is designed to be user-friendly and intuitive. You only need to provide your Vercel access token, and our system handles all the technical aspects of deployment."
              />
              <FaqCard
                question="What payment methods do you accept?"
                answer="We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, as well as local payment methods like Khalti and eSewa for customers in Nepal."
              />
              <FaqCard
                question="Is there a long-term contract?"
                answer="No, all our plans are subscription-based with no long-term contracts. You can cancel at any time without any cancellation fees."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to launch your eCommerce store?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              Start your 7-day free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrialButton
                plan="Basic"
                billingCycle={billingCycle}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Free Trial
              </TrialButton>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center">
            <p>© 2025 Multi-SaaS eCommerce Platform. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper Components
function PricingItem({ children, included }: { children: React.ReactNode; included: boolean }) {
  return (
    <li className="flex items-start gap-2">
      {included ? (
        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
      ) : (
        <Minus className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
      )}
      <span>{children}</span>
    </li>
  )
}

function TooltipInfo({ content }: { content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-3.5 w-3.5 text-gray-400 inline-block ml-1 cursor-help" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function TableRow({
  feature,
  basic,
  pro,
  enterprise,
}: {
  feature: string
  basic: React.ReactNode
  pro: React.ReactNode
  enterprise: React.ReactNode
}) {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-4 px-6 font-medium">{feature}</td>
      <td className="py-4 px-6 text-center">{basic}</td>
      <td className="py-4 px-6 text-center">{pro}</td>
      <td className="py-4 px-6 text-center">{enterprise}</td>
    </tr>
  )
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-bold mb-3 flex items-start gap-2">
        <span className="text-blue-600 flex-shrink-0">
          <HelpCircle className="h-5 w-5" />
        </span>
        {question}
      </h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  )
}

"use client"

import { ArrowDown, ArrowUp, BarChart3, LineChart, TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

// Sample data for tracked companies
const trackedCompanies = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    lastClose: 187.42,
    change: +1.23,
    healthScore: "A-",
    healthColor: "text-positive",
  },
  {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    lastClose: 172.63,
    change: -2.85,
    healthScore: "B+",
    healthColor: "text-primary",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    lastClose: 425.27,
    change: +0.89,
    healthScore: "A",
    healthColor: "text-positive",
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    lastClose: 182.15,
    change: -0.45,
    healthScore: "B",
    healthColor: "text-primary",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    lastClose: 165.92,
    change: +1.05,
    healthScore: "A-",
    healthColor: "text-positive",
  },
]

// Sample data for recent analyses
const recentAnalyses = [
  {
    date: "April 20, 2025",
    company: "Tesla, Inc. (TSLA)",
    summary: "Revenue growth exceeded industry average by 3.5%, but profit margins remain below peers.",
  },
  {
    date: "April 18, 2025",
    company: "Apple Inc. (AAPL)",
    summary: "Strong cash position and consistent dividend growth indicate solid financial health.",
  },
  {
    date: "April 15, 2025",
    company: "Microsoft Corp. (MSFT)",
    summary: "Cloud segment growth accelerating, driving overall margin expansion.",
  },
]

// Sample data for macroeconomic indicators
const macroIndicators = [
  {
    name: "GDP Growth",
    value: "3.2%",
    change: "+0.4%",
    changeType: "positive",
    period: "YoY",
    icon: TrendingUp,
  },
  {
    name: "CPI Inflation",
    value: "2.8%",
    change: "-0.2%",
    changeType: "positive",
    period: "MoM",
    icon: TrendingDown,
  },
  {
    name: "Interest Rate",
    value: "4.75%",
    change: "0.0%",
    changeType: "neutral",
    period: "MoM",
    icon: LineChart,
  },
  {
    name: "Unemployment",
    value: "3.6%",
    change: "+0.1%",
    changeType: "negative",
    period: "MoM",
    icon: BarChart3,
  },
]

export default function DashboardHub() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <Header title="Dashboard Hub" />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1: Your Tracked Companies */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Your Tracked Companies</CardTitle>
                <CardDescription>Performance overview of your watchlist</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackedCompanies.map((company) => (
                    <div
                      key={company.ticker}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-montserrat font-bold text-lg">{company.ticker}</span>
                          <span
                            className="font-medium px-3 py-1 rounded-full bg-muted text-xs font-montserrat"
                            className={`font-medium px-3 py-1 rounded-full bg-muted text-xs font-montserrat ${company.healthColor}`}
                          >
                            {company.healthScore}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground font-roboto">{company.name}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-montserrat font-bold">${company.lastClose.toFixed(2)}</span>
                        <div
                          className={`flex items-center text-sm ${company.change > 0 ? "text-positive" : "text-negative"}`}
                        >
                          {company.change > 0 ? (
                            <ArrowUp className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-1" />
                          )}
                          <span>
                            {company.change > 0 ? "+" : ""}
                            {company.change.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Recent Analyses */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Recent Analyses</CardTitle>
                <CardDescription>Your latest company evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnalyses.map((analysis, index) => (
                    <div key={index} className="rounded-xl border border-border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-montserrat font-bold">{analysis.company}</span>
                        <span className="text-xs text-muted-foreground font-roboto">{analysis.date}</span>
                      </div>
                      <p className="text-sm font-roboto">{analysis.summary}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section 3: Key Macroeconomic Indicators */}
          <div className="mt-6">
            <h2 className="text-xl font-bold font-montserrat mb-4">Key Macroeconomic Indicators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {macroIndicators.map((indicator, index) => (
                <Card key={index} className="shadow-md">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground font-roboto">{indicator.name}</p>
                        <p className="text-2xl font-bold font-montserrat mt-1">{indicator.value}</p>
                        <div
                          className={`flex items-center text-sm mt-1 ${
                            indicator.changeType === "positive"
                              ? "text-positive"
                              : indicator.changeType === "negative"
                                ? "text-negative"
                                : "text-muted-foreground"
                          }`}
                        >
                          {indicator.changeType === "positive" ? (
                            <ArrowUp className="h-3 w-3 mr-1" />
                          ) : indicator.changeType === "negative" ? (
                            <ArrowDown className="h-3 w-3 mr-1" />
                          ) : null}
                          <span>
                            {indicator.change} {indicator.period}
                          </span>
                        </div>
                      </div>
                      <div className="bg-muted rounded-full p-2">
                        <indicator.icon className="h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Section: Market Overview */}
          <div className="mt-6">
            <h2 className="text-xl font-bold font-montserrat mb-4">Market Overview</h2>
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground font-roboto">S&P 500</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-montserrat">5,236.42</span>
                      <span className="text-positive text-sm flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        0.87%
                      </span>
                    </div>
                    <div className="h-12 mt-2 bg-muted rounded-md flex items-end">
                      <div className="bg-primary/20 h-8 w-full rounded-md"></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground font-roboto">NASDAQ</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-montserrat">16,428.82</span>
                      <span className="text-positive text-sm flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        1.12%
                      </span>
                    </div>
                    <div className="h-12 mt-2 bg-muted rounded-md flex items-end">
                      <div className="bg-primary/20 h-10 w-full rounded-md"></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground font-roboto">Dow Jones</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-montserrat">38,239.66</span>
                      <span className="text-negative text-sm flex items-center">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        0.23%
                      </span>
                    </div>
                    <div className="h-12 mt-2 bg-muted rounded-md flex items-end">
                      <div className="bg-primary/20 h-6 w-full rounded-md"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

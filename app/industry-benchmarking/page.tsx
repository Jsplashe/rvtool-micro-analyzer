"use client"

import { useState } from "react"
import { Award, ChevronDown, TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample industry data
const industries = [
  { id: "tech", name: "Technology" },
  { id: "energy", name: "Energy" },
  { id: "healthcare", name: "Healthcare" },
  { id: "finance", name: "Financial Services" },
  { id: "consumer", name: "Consumer Goods" },
]

// Sample company data for Technology industry
const technologyCompanies = [
  {
    name: "Apple Inc.",
    ticker: "AAPL",
    pe: 30.5,
    roe: 0.142,
    de: 1.23,
    revenueGrowth: 0.028,
    profitMargin: 0.246,
  },
  {
    name: "Microsoft Corp.",
    ticker: "MSFT",
    pe: 34.8,
    roe: 0.189,
    de: 0.45,
    revenueGrowth: 0.073,
    profitMargin: 0.365,
  },
  {
    name: "Alphabet Inc.",
    ticker: "GOOGL",
    pe: 27.2,
    roe: 0.156,
    de: 0.12,
    revenueGrowth: 0.062,
    profitMargin: 0.254,
  },
  {
    name: "Amazon.com Inc.",
    ticker: "AMZN",
    pe: 42.1,
    roe: 0.112,
    de: 0.89,
    revenueGrowth: 0.094,
    profitMargin: 0.078,
  },
  {
    name: "Meta Platforms Inc.",
    ticker: "META",
    pe: 25.3,
    roe: 0.203,
    de: 0.18,
    revenueGrowth: 0.045,
    profitMargin: 0.321,
  },
  {
    name: "NVIDIA Corp.",
    ticker: "NVDA",
    pe: 68.7,
    roe: 0.254,
    de: 0.32,
    revenueGrowth: 0.126,
    profitMargin: 0.412,
  },
  {
    name: "Intel Corp.",
    ticker: "INTC",
    pe: 18.4,
    roe: 0.087,
    de: 0.67,
    revenueGrowth: -0.014,
    profitMargin: 0.124,
  },
  {
    name: "Adobe Inc.",
    ticker: "ADBE",
    pe: 32.6,
    roe: 0.178,
    de: 0.38,
    revenueGrowth: 0.058,
    profitMargin: 0.287,
  },
  {
    name: "Salesforce Inc.",
    ticker: "CRM",
    pe: 39.2,
    roe: 0.092,
    de: 0.21,
    revenueGrowth: 0.082,
    profitMargin: 0.156,
  },
  {
    name: "Oracle Corp.",
    ticker: "ORCL",
    pe: 29.8,
    roe: 0.134,
    de: 2.14,
    revenueGrowth: 0.032,
    profitMargin: 0.198,
  },
]

// Sample company data for Energy industry
const energyCompanies = [
  {
    name: "ExxonMobil Corp.",
    ticker: "XOM",
    pe: 12.8,
    roe: 0.112,
    de: 0.24,
    revenueGrowth: 0.018,
    profitMargin: 0.092,
  },
  {
    name: "Chevron Corp.",
    ticker: "CVX",
    pe: 13.2,
    roe: 0.098,
    de: 0.18,
    revenueGrowth: 0.012,
    profitMargin: 0.087,
  },
  {
    name: "Shell plc",
    ticker: "SHEL",
    pe: 11.5,
    roe: 0.105,
    de: 0.32,
    revenueGrowth: 0.008,
    profitMargin: 0.078,
  },
  {
    name: "BP plc",
    ticker: "BP",
    pe: 10.8,
    roe: 0.089,
    de: 0.41,
    revenueGrowth: -0.004,
    profitMargin: 0.065,
  },
  {
    name: "TotalEnergies SE",
    ticker: "TTE",
    pe: 11.2,
    roe: 0.094,
    de: 0.28,
    revenueGrowth: 0.015,
    profitMargin: 0.082,
  },
  {
    name: "ConocoPhillips",
    ticker: "COP",
    pe: 14.3,
    roe: 0.118,
    de: 0.22,
    revenueGrowth: 0.022,
    profitMargin: 0.098,
  },
  {
    name: "EOG Resources Inc.",
    ticker: "EOG",
    pe: 15.1,
    roe: 0.124,
    de: 0.19,
    revenueGrowth: 0.028,
    profitMargin: 0.104,
  },
  {
    name: "Schlumberger Ltd.",
    ticker: "SLB",
    pe: 18.7,
    roe: 0.086,
    de: 0.54,
    revenueGrowth: 0.032,
    profitMargin: 0.076,
  },
]

// Sample company data for Healthcare industry
const healthcareCompanies = [
  {
    name: "Johnson & Johnson",
    ticker: "JNJ",
    pe: 24.6,
    roe: 0.132,
    de: 0.45,
    revenueGrowth: 0.042,
    profitMargin: 0.218,
  },
  {
    name: "UnitedHealth Group",
    ticker: "UNH",
    pe: 22.8,
    roe: 0.245,
    de: 0.67,
    revenueGrowth: 0.078,
    profitMargin: 0.056,
  },
  {
    name: "Pfizer Inc.",
    ticker: "PFE",
    pe: 12.4,
    roe: 0.098,
    de: 0.58,
    revenueGrowth: -0.042,
    profitMargin: 0.187,
  },
  {
    name: "Eli Lilly & Co.",
    ticker: "LLY",
    pe: 48.7,
    roe: 0.187,
    de: 1.24,
    revenueGrowth: 0.156,
    profitMargin: 0.245,
  },
  {
    name: "AbbVie Inc.",
    ticker: "ABBV",
    pe: 21.3,
    roe: 0.142,
    de: 3.45,
    revenueGrowth: 0.028,
    profitMargin: 0.198,
  },
  {
    name: "Merck & Co.",
    ticker: "MRK",
    pe: 19.8,
    roe: 0.156,
    de: 0.78,
    revenueGrowth: 0.062,
    profitMargin: 0.212,
  },
  {
    name: "Thermo Fisher Scientific",
    ticker: "TMO",
    pe: 32.4,
    roe: 0.124,
    de: 0.65,
    revenueGrowth: 0.048,
    profitMargin: 0.178,
  },
  {
    name: "Danaher Corp.",
    ticker: "DHR",
    pe: 29.7,
    roe: 0.112,
    de: 0.42,
    revenueGrowth: 0.032,
    profitMargin: 0.165,
  },
]

// Function to get companies based on selected industry
const getCompaniesByIndustry = (industry: string) => {
  switch (industry) {
    case "tech":
      return technologyCompanies
    case "energy":
      return energyCompanies
    case "healthcare":
      return healthcareCompanies
    default:
      return technologyCompanies
  }
}

// Function to determine cell color based on value ranking
const getCellColor = (value: number, values: number[], metric: string) => {
  // Sort values based on whether higher is better or lower is better
  const sortedValues = [...values].sort((a, b) => {
    // For D/E ratio, lower is better
    if (metric === "de") {
      return a - b
    }
    // For all other metrics, higher is better
    return b - a
  })

  const totalItems = sortedValues.length
  const topThreshold = Math.floor(totalItems * 0.2) // Top 20%
  const bottomThreshold = Math.floor(totalItems * 0.8) // Bottom 20%

  const index = sortedValues.indexOf(value)

  if (index < topThreshold) {
    return "text-positive"
  } else if (index >= bottomThreshold) {
    return "text-negative"
  } else {
    return ""
  }
}

// Function to find top performer and underperformer
const findPerformers = (companies: any[]) => {
  // Calculate scores based on multiple metrics
  const companiesWithScores = companies.map((company) => {
    // Higher is better for these metrics
    const roeScore = company.roe * 100
    const revenueGrowthScore = company.revenueGrowth * 100
    const profitMarginScore = company.profitMargin * 100

    // Lower is better for these metrics
    const peScore = 50 - (company.pe > 50 ? 50 : company.pe)
    const deScore = 50 - (company.de * 10 > 50 ? 50 : company.de * 10)

    // Total score
    const totalScore = roeScore + revenueGrowthScore + profitMarginScore + peScore + deScore

    return {
      ...company,
      totalScore,
    }
  })

  // Sort by total score
  const sortedCompanies = [...companiesWithScores].sort((a, b) => b.totalScore - a.totalScore)

  // Get top performer
  const topPerformer = sortedCompanies[0]

  // Get underperformer
  const underperformer = sortedCompanies[sortedCompanies.length - 1]

  // Determine top performer strengths
  const topStrengths = []
  if (topPerformer.roe > 0.15) topStrengths.push("High ROE")
  if (topPerformer.revenueGrowth > 0.05) topStrengths.push("Strong Revenue Growth")
  if (topPerformer.profitMargin > 0.2) topStrengths.push("Excellent Profit Margin")
  if (topPerformer.pe < 20) topStrengths.push("Attractive P/E Ratio")
  if (topPerformer.de < 0.5) topStrengths.push("Low Debt")

  // Determine underperformer weaknesses
  const underperformerWeaknesses = []
  if (underperformer.roe < 0.1) underperformerWeaknesses.push("Low ROE")
  if (underperformer.revenueGrowth < 0.01) underperformerWeaknesses.push("Stagnant Revenue")
  if (underperformer.revenueGrowth < 0) underperformerWeaknesses.push("Declining Revenue")
  if (underperformer.profitMargin < 0.1) underperformerWeaknesses.push("Thin Profit Margin")
  if (underperformer.pe > 30) underperformerWeaknesses.push("High P/E Ratio")
  if (underperformer.de > 1.0) underperformerWeaknesses.push("High Debt")

  return {
    topPerformer: {
      ...topPerformer,
      strengths: topStrengths.length > 0 ? topStrengths : ["Overall Strong Performance"],
    },
    underperformer: {
      ...underperformer,
      weaknesses: underperformerWeaknesses.length > 0 ? underperformerWeaknesses : ["Overall Weak Performance"],
    },
  }
}

export default function IndustryBenchmarking() {
  const [selectedIndustry, setSelectedIndustry] = useState("tech")
  const companies = getCompaniesByIndustry(selectedIndustry)

  // Extract values for each metric for color coding
  const peValues = companies.map((company) => company.pe)
  const roeValues = companies.map((company) => company.roe)
  const deValues = companies.map((company) => company.de)
  const revenueGrowthValues = companies.map((company) => company.revenueGrowth)
  const profitMarginValues = companies.map((company) => company.profitMargin)

  // Find top performer and underperformer
  const { topPerformer, underperformer } = findPerformers(companies)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <Header title="Industry Benchmarking" />
        <main className="flex-1 p-6">
          {/* Industry Selection */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-64">
              <label htmlFor="industry" className="text-sm font-medium mb-2 block font-roboto">
                Select Industry
              </label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger id="industry" className="rounded-full">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id}>
                      {industry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="font-roboto">
                <TrendingUp className="h-4 w-4 mr-1" /> View Trends
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="font-roboto">
                    <ChevronDown className="h-4 w-4 mr-1" /> Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                  <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                  <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Industry Average Card */}
          <Card className="mb-6 shadow-md">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="flex flex-col items-center p-2">
                  <span className="text-xs text-muted-foreground mb-1 font-roboto">Avg. P/E Ratio</span>
                  <span className="text-xl font-bold font-montserrat">
                    {(peValues.reduce((a, b) => a + b, 0) / peValues.length).toFixed(1)}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <span className="text-xs text-muted-foreground mb-1 font-roboto">Avg. ROE</span>
                  <span className="text-xl font-bold font-montserrat">
                    {((roeValues.reduce((a, b) => a + b, 0) / roeValues.length) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <span className="text-xs text-muted-foreground mb-1 font-roboto">Avg. D/E Ratio</span>
                  <span className="text-xl font-bold font-montserrat">
                    {(deValues.reduce((a, b) => a + b, 0) / deValues.length).toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <span className="text-xs text-muted-foreground mb-1 font-roboto">Avg. Revenue Growth</span>
                  <span className="text-xl font-bold font-montserrat">
                    {((revenueGrowthValues.reduce((a, b) => a + b, 0) / revenueGrowthValues.length) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <span className="text-xs text-muted-foreground mb-1 font-roboto">Avg. Profit Margin</span>
                  <span className="text-xl font-bold font-montserrat">
                    {((profitMarginValues.reduce((a, b) => a + b, 0) / profitMarginValues.length) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle>Industry Comparison</CardTitle>
              <CardDescription>
                {industries.find((industry) => industry.id === selectedIndustry)?.name} companies benchmarking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-montserrat">Company</th>
                        <th className="text-right p-3 font-montserrat">P/E</th>
                        <th className="text-right p-3 font-montserrat">ROE</th>
                        <th className="text-right p-3 font-montserrat">D/E</th>
                        <th className="text-right p-3 font-montserrat">Revenue Growth</th>
                        <th className="text-right p-3 font-montserrat">Profit Margin</th>
                      </tr>
                    </thead>
                    <tbody className="font-roboto">
                      {companies.map((company, index) => (
                        <tr key={index} className={index < companies.length - 1 ? "border-b" : ""}>
                          <td className="p-3">
                            <div className="font-medium">{company.name}</div>
                            <div className="text-xs text-muted-foreground">{company.ticker}</div>
                          </td>
                          <td className={`text-right p-3 ${getCellColor(company.pe, peValues, "pe")}`}>
                            {company.pe.toFixed(1)}
                          </td>
                          <td className={`text-right p-3 ${getCellColor(company.roe, roeValues, "roe")}`}>
                            {(company.roe * 100).toFixed(1)}%
                          </td>
                          <td className={`text-right p-3 ${getCellColor(company.de, deValues, "de")}`}>
                            {company.de.toFixed(2)}
                          </td>
                          <td
                            className={`text-right p-3 ${getCellColor(
                              company.revenueGrowth,
                              revenueGrowthValues,
                              "revenueGrowth",
                            )}`}
                          >
                            {company.revenueGrowth >= 0 ? "+" : ""}
                            {(company.revenueGrowth * 100).toFixed(1)}%
                          </td>
                          <td
                            className={`text-right p-3 ${getCellColor(
                              company.profitMargin,
                              profitMarginValues,
                              "profitMargin",
                            )}`}
                          >
                            {(company.profitMargin * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground flex items-center justify-end gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-positive"></div>
                  <span>Top 20%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-negative"></div>
                  <span>Bottom 20%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Performer and Underperformer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Performer */}
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-positive" />
                  <CardTitle>Top Performer</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xl font-bold font-montserrat">{topPerformer.name}</div>
                      <div className="text-sm text-muted-foreground">{topPerformer.ticker}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-lg font-bold font-montserrat">
                        ${(100 * (1 + topPerformer.revenueGrowth)).toFixed(2)}
                      </div>
                      <div className="text-positive text-sm flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {(topPerformer.revenueGrowth * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm font-medium font-montserrat">Key Strengths</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {topPerformer.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2 bg-muted/30 rounded-lg p-2">
                          <div className="w-2 h-2 rounded-full bg-positive"></div>
                          <span className="text-xs">{strength}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="bg-muted/20 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground">P/E Ratio</div>
                        <div className="text-sm font-medium">{topPerformer.pe.toFixed(1)}</div>
                      </div>
                      <div className="bg-muted/20 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground">ROE</div>
                        <div className="text-sm font-medium">{(topPerformer.roe * 100).toFixed(1)}%</div>
                      </div>
                      <div className="bg-muted/20 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground">Profit Margin</div>
                        <div className="text-sm font-medium">{(topPerformer.profitMargin * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Underperformer */}
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-negative" />
                  <CardTitle>Underperformer</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xl font-bold font-montserrat">{underperformer.name}</div>
                      <div className="text-sm text-muted-foreground">{underperformer.ticker}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-lg font-bold font-montserrat">
                        ${(100 * (1 + underperformer.revenueGrowth)).toFixed(2)}
                      </div>
                      <div
                        className={`text-sm flex items-center ${underperformer.revenueGrowth >= 0 ? "text-positive" : "text-negative"}`}
                      >
                        {underperformer.revenueGrowth >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {(underperformer.revenueGrowth * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm font-medium font-montserrat">Key Weaknesses</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {underperformer.weaknesses.map((weakness, index) => (
                        <div key={index} className="flex items-center gap-2 bg-muted/30 rounded-lg p-2">
                          <div className="w-2 h-2 rounded-full bg-negative"></div>
                          <span className="text-xs">{weakness}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="bg-muted/20 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground">P/E Ratio</div>
                        <div className="text-sm font-medium">{underperformer.pe.toFixed(1)}</div>
                      </div>
                      <div className="bg-muted/20 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground">ROE</div>
                        <div className="text-sm font-medium">{(underperformer.roe * 100).toFixed(1)}%</div>
                      </div>
                      <div className="bg-muted/20 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground">Profit Margin</div>
                        <div className="text-sm font-medium">{(underperformer.profitMargin * 100).toFixed(1)}%</div>
                      </div>
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

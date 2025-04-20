"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, BarChart3, ChevronDown, LineChart, TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Sample data for different regions
const regionsData = {
  us: {
    gdp: {
      value: 3.2,
      change: 0.4,
      trend: "positive",
      period: "QoQ",
      description: "Robust growth driven by consumer spending and business investment",
    },
    cpi: {
      value: 3.5,
      change: -0.8,
      trend: "positive",
      period: "YoY",
      description: "Inflation cooling but remains above target",
    },
    interestRate: {
      value: 5.25,
      change: 0.0,
      trend: "neutral",
      period: "Current",
      description: "Fed holding rates steady after aggressive hiking cycle",
    },
    unemployment: {
      value: 3.8,
      change: 0.2,
      trend: "negative",
      period: "YoY",
      description: "Labor market remains tight despite slight uptick",
    },
    impactedIndustries: [
      {
        industry: "Housing",
        impact: "High interest rates slowing housing market activity",
        severity: "high",
      },
      {
        industry: "Consumer Discretionary",
        impact: "Inflation pressuring consumer spending on non-essentials",
        severity: "medium",
      },
      {
        industry: "Banking",
        impact: "Net interest margins benefiting from higher rates",
        severity: "positive",
      },
    ],
    impactedCompanies: [
      {
        ticker: "HD",
        name: "Home Depot",
        impact: "Housing slowdown affecting sales growth",
      },
      {
        ticker: "JPM",
        name: "JPMorgan Chase",
        impact: "Benefiting from higher net interest income",
      },
      {
        ticker: "WMT",
        name: "Walmart",
        impact: "Consumer shift to value offerings boosting sales",
      },
      {
        ticker: "AMZN",
        name: "Amazon",
        impact: "Discretionary spending pressure affecting growth",
      },
    ],
  },
  eu: {
    gdp: {
      value: 1.2,
      change: -0.3,
      trend: "negative",
      period: "QoQ",
      description: "Growth slowing amid energy crisis and manufacturing weakness",
    },
    cpi: {
      value: 2.9,
      change: -1.2,
      trend: "positive",
      period: "YoY",
      description: "Inflation declining but energy prices remain volatile",
    },
    interestRate: {
      value: 4.0,
      change: 0.0,
      trend: "neutral",
      period: "Current",
      description: "ECB pausing after rate hike cycle to assess impact",
    },
    unemployment: {
      value: 6.5,
      change: -0.3,
      trend: "positive",
      period: "YoY",
      description: "Labor market resilient despite economic headwinds",
    },
    impactedIndustries: [
      {
        industry: "Energy",
        impact: "High costs and transition pressures affecting profitability",
        severity: "high",
      },
      {
        industry: "Manufacturing",
        impact: "Weakening demand and high input costs squeezing margins",
        severity: "high",
      },
      {
        industry: "Tourism",
        impact: "Recovery continuing as travel restrictions ease",
        severity: "positive",
      },
    ],
    impactedCompanies: [
      {
        ticker: "EOAN.DE",
        name: "E.ON",
        impact: "Energy price volatility affecting operations",
      },
      {
        ticker: "VOW3.DE",
        name: "Volkswagen",
        impact: "Manufacturing slowdown and EV transition costs",
      },
      {
        ticker: "LVMH.PA",
        name: "LVMH",
        impact: "Luxury demand resilient despite economic concerns",
      },
      {
        ticker: "SAN.MC",
        name: "Banco Santander",
        impact: "Net interest income growth from higher rates",
      },
    ],
  },
  uk: {
    gdp: {
      value: 0.8,
      change: 0.2,
      trend: "positive",
      period: "QoQ",
      description: "Modest growth amid persistent inflation and Brexit effects",
    },
    cpi: {
      value: 4.0,
      change: -2.1,
      trend: "positive",
      period: "YoY",
      description: "Inflation declining but remains above BoE target",
    },
    interestRate: {
      value: 5.25,
      change: 0.0,
      trend: "neutral",
      period: "Current",
      description: "BoE maintaining restrictive policy to combat inflation",
    },
    unemployment: {
      value: 4.2,
      change: 0.3,
      trend: "negative",
      period: "YoY",
      description: "Labor market showing signs of cooling",
    },
    impactedIndustries: [
      {
        industry: "Retail",
        impact: "Consumer spending constrained by cost-of-living crisis",
        severity: "high",
      },
      {
        industry: "Real Estate",
        impact: "Housing market cooling due to higher mortgage rates",
        severity: "medium",
      },
      {
        industry: "Financial Services",
        impact: "Banking sector benefiting from higher interest rates",
        severity: "positive",
      },
    ],
    impactedCompanies: [
      {
        ticker: "TSCO.L",
        name: "Tesco",
        impact: "Value offerings attracting cost-conscious consumers",
      },
      {
        ticker: "BARC.L",
        name: "Barclays",
        impact: "Higher net interest margins improving profitability",
      },
      {
        ticker: "PSN.L",
        name: "Persimmon",
        impact: "Housing market slowdown affecting new build demand",
      },
      {
        ticker: "SBRY.L",
        name: "Sainsbury's",
        impact: "Food inflation pressuring consumer spending patterns",
      },
    ],
  },
  china: {
    gdp: {
      value: 4.7,
      change: -0.8,
      trend: "negative",
      period: "YoY",
      description: "Growth below target amid property sector crisis and weak consumption",
    },
    cpi: {
      value: 0.7,
      change: -1.8,
      trend: "negative",
      period: "YoY",
      description: "Deflationary pressures signaling weak domestic demand",
    },
    interestRate: {
      value: 3.45,
      change: -0.1,
      trend: "negative",
      period: "Current",
      description: "PBOC implementing modest easing to support economy",
    },
    unemployment: {
      value: 5.3,
      change: 0.4,
      trend: "negative",
      period: "YoY",
      description: "Rising unemployment especially among youth",
    },
    impactedIndustries: [
      {
        industry: "Real Estate",
        impact: "Severe crisis with developer defaults and falling prices",
        severity: "high",
      },
      {
        industry: "Consumer",
        impact: "Weak consumer confidence affecting discretionary spending",
        severity: "high",
      },
      {
        industry: "Technology",
        impact: "Government support for strategic tech sectors",
        severity: "positive",
      },
    ],
    impactedCompanies: [
      {
        ticker: "3333.HK",
        name: "Evergrande",
        impact: "Debt crisis and restructuring challenges",
      },
      {
        ticker: "9988.HK",
        name: "Alibaba",
        impact: "E-commerce growth slowing amid consumption weakness",
      },
      {
        ticker: "1211.HK",
        name: "BYD",
        impact: "EV sector growth supported by government policies",
      },
      {
        ticker: "0700.HK",
        name: "Tencent",
        impact: "Gaming regulations and consumer spending affecting growth",
      },
    ],
  },
  australia: {
    gdp: {
      value: 2.1,
      change: -0.5,
      trend: "negative",
      period: "YoY",
      description: "Growth moderating as high interest rates impact consumption",
    },
    cpi: {
      value: 3.4,
      change: -1.2,
      trend: "positive",
      period: "YoY",
      description: "Inflation declining but remains above RBA target band",
    },
    interestRate: {
      value: 4.35,
      change: 0.0,
      trend: "neutral",
      period: "Current",
      description: "RBA holding rates after hiking cycle to combat inflation",
    },
    unemployment: {
      value: 3.9,
      change: 0.3,
      trend: "negative",
      period: "YoY",
      description: "Labor market beginning to loosen from tight conditions",
    },
    impactedIndustries: [
      {
        industry: "Housing",
        impact: "Property market cooling due to higher mortgage rates",
        severity: "medium",
      },
      {
        industry: "Mining",
        impact: "Commodity demand from China affecting export volumes",
        severity: "medium",
      },
      {
        industry: "Banking",
        impact: "Higher interest rates supporting net interest margins",
        severity: "positive",
      },
    ],
    impactedCompanies: [
      {
        ticker: "CBA.AX",
        name: "Commonwealth Bank",
        impact: "Net interest margins improving but mortgage growth slowing",
      },
      {
        ticker: "BHP.AX",
        name: "BHP Group",
        impact: "Iron ore prices affected by China's construction slowdown",
      },
      {
        ticker: "WOW.AX",
        name: "Woolworths",
        impact: "Food inflation affecting consumer shopping behavior",
      },
      {
        ticker: "LLC.AX",
        name: "Lendlease",
        impact: "Property development affected by higher financing costs",
      },
    ],
  },
}

// Available regions
const regions = [
  { id: "us", name: "United States" },
  { id: "eu", name: "European Union" },
  { id: "uk", name: "United Kingdom" },
  { id: "china", name: "China" },
  { id: "australia", name: "Australia" },
]

export default function EconomicIndicators() {
  const [selectedRegion, setSelectedRegion] = useState("us")
  const regionData = regionsData[selectedRegion as keyof typeof regionsData]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <Header title="Economic Indicators" />
        <main className="flex-1 p-6">
          {/* Region Selection */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-64">
              <label htmlFor="region" className="text-sm font-medium mb-2 block font-roboto">
                Select Region
              </label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger id="region" className="rounded-full">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="font-roboto">
                <LineChart className="h-4 w-4 mr-1" /> Historical Trends
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

          {/* Last Updated */}
          <div className="mb-6 text-sm text-muted-foreground font-roboto">
            Last updated: April 20, 2025 | Source: National Economic Data
          </div>

          {/* Economic Indicators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* GDP Growth */}
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>GDP Growth</span>
                  <Badge
                    variant={regionData.gdp.trend === "positive" ? "outline" : "default"}
                    className={`${
                      regionData.gdp.trend === "positive"
                        ? "border-positive text-positive"
                        : regionData.gdp.trend === "negative"
                          ? "bg-negative text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {regionData.gdp.period}
                  </Badge>
                </CardTitle>
                <CardDescription>{regionData.gdp.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold font-montserrat">{regionData.gdp.value}%</span>
                    <div
                      className={`flex items-center text-sm ${
                        regionData.gdp.change > 0 ? "text-positive" : "text-negative"
                      }`}
                    >
                      {regionData.gdp.change > 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {regionData.gdp.change > 0 ? "+" : ""}
                        {regionData.gdp.change}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-full p-3">
                    {regionData.gdp.trend === "positive" ? (
                      <TrendingUp className="h-6 w-6 text-positive" />
                    ) : regionData.gdp.trend === "negative" ? (
                      <TrendingDown className="h-6 w-6 text-negative" />
                    ) : (
                      <LineChart className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Trend visualization */}
                <div className="mt-6 h-12 bg-muted/20 rounded-lg relative">
                  <div className="absolute bottom-0 left-0 h-1/3 w-1/5 bg-muted/30"></div>
                  <div className="absolute bottom-0 left-1/5 h-2/5 w-1/5 bg-muted/30"></div>
                  <div className="absolute bottom-0 left-2/5 h-1/2 w-1/5 bg-muted/30"></div>
                  <div className="absolute bottom-0 left-3/5 h-3/5 w-1/5 bg-muted/30"></div>
                  <div className="absolute bottom-0 left-4/5 h-4/5 w-1/5 bg-primary/40"></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Q1 2024</span>
                  <span>Q2 2024</span>
                  <span>Q3 2024</span>
                  <span>Q4 2024</span>
                  <span>Q1 2025</span>
                </div>
              </CardContent>
            </Card>

            {/* CPI Inflation */}
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>CPI Inflation</span>
                  <Badge
                    variant={regionData.cpi.trend === "positive" ? "outline" : "default"}
                    className={`${
                      regionData.cpi.trend === "positive"
                        ? "border-positive text-positive"
                        : regionData.cpi.trend === "negative"
                          ? "bg-negative text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {regionData.cpi.period}
                  </Badge>
                </CardTitle>
                <CardDescription>{regionData.cpi.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold font-montserrat">{regionData.cpi.value}%</span>
                    <div
                      className={`flex items-center text-sm ${
                        regionData.cpi.change < 0 ? "text-positive" : "text-negative"
                      }`}
                    >
                      {regionData.cpi.change < 0 ? (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {regionData.cpi.change > 0 ? "+" : ""}
                        {regionData.cpi.change}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-full p-3">
                    {regionData.cpi.trend === "positive" ? (
                      <TrendingDown className="h-6 w-6 text-positive" />
                    ) : regionData.cpi.trend === "negative" ? (
                      <TrendingUp className="h-6 w-6 text-negative" />
                    ) : (
                      <LineChart className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Trend visualization */}
                <div className="mt-6 h-12 bg-muted/20 rounded-lg relative">
                  <div className="absolute bottom-0 left-0 h-4/5 w-1/5 bg-negative/40"></div>
                  <div className="absolute bottom-0 left-1/5 h-3/4 w-1/5 bg-negative/40"></div>
                  <div className="absolute bottom-0 left-2/5 h-3/5 w-1/5 bg-negative/30"></div>
                  <div className="absolute bottom-0 left-3/5 h-1/2 w-1/5 bg-muted/40"></div>
                  <div className="absolute bottom-0 left-4/5 h-2/5 w-1/5 bg-muted/40"></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Apr 2024</span>
                  <span>Jul 2024</span>
                  <span>Oct 2024</span>
                  <span>Jan 2025</span>
                  <span>Apr 2025</span>
                </div>
              </CardContent>
            </Card>

            {/* Interest Rate */}
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Interest Rate</span>
                  <Badge
                    variant={regionData.interestRate.trend === "positive" ? "outline" : "default"}
                    className={`${
                      regionData.interestRate.trend === "positive"
                        ? "border-positive text-positive"
                        : regionData.interestRate.trend === "negative"
                          ? "bg-negative text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {regionData.interestRate.period}
                  </Badge>
                </CardTitle>
                <CardDescription>{regionData.interestRate.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold font-montserrat">{regionData.interestRate.value}%</span>
                    <div
                      className={`flex items-center text-sm ${
                        regionData.interestRate.change < 0
                          ? "text-positive"
                          : regionData.interestRate.change > 0
                            ? "text-negative"
                            : "text-muted-foreground"
                      }`}
                    >
                      {regionData.interestRate.change < 0 ? (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      ) : regionData.interestRate.change > 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <span>No change</span>
                      )}
                      {regionData.interestRate.change !== 0 && (
                        <span>
                          {regionData.interestRate.change > 0 ? "+" : ""}
                          {regionData.interestRate.change}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-full p-3">
                    {regionData.interestRate.trend === "positive" ? (
                      <TrendingDown className="h-6 w-6 text-positive" />
                    ) : regionData.interestRate.trend === "negative" ? (
                      <TrendingUp className="h-6 w-6 text-negative" />
                    ) : (
                      <LineChart className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Rate path visualization */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium font-montserrat">Rate Path</span>
                    <span className="text-xs text-muted-foreground">Next 12 months</span>
                  </div>
                  <div className="h-2 bg-muted/20 rounded-full relative">
                    <div className="absolute inset-y-0 left-0 bg-primary rounded-full" style={{ width: "20%" }}></div>
                    <div className="absolute -top-1 left-[20%] w-4 h-4 rounded-full border-2 border-primary bg-background"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-muted-foreground">Lower</span>
                    <span className="font-medium">Hold</span>
                    <span className="text-muted-foreground">Raise</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Unemployment Rate */}
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Unemployment Rate</span>
                  <Badge
                    variant={regionData.unemployment.trend === "positive" ? "outline" : "default"}
                    className={`${
                      regionData.unemployment.trend === "positive"
                        ? "border-positive text-positive"
                        : regionData.unemployment.trend === "negative"
                          ? "bg-negative text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {regionData.unemployment.period}
                  </Badge>
                </CardTitle>
                <CardDescription>{regionData.unemployment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold font-montserrat">{regionData.unemployment.value}%</span>
                    <div
                      className={`flex items-center text-sm ${
                        regionData.unemployment.change < 0 ? "text-positive" : "text-negative"
                      }`}
                    >
                      {regionData.unemployment.change < 0 ? (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {regionData.unemployment.change > 0 ? "+" : ""}
                        {regionData.unemployment.change}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-full p-3">
                    {regionData.unemployment.trend === "positive" ? (
                      <TrendingDown className="h-6 w-6 text-positive" />
                    ) : regionData.unemployment.trend === "negative" ? (
                      <TrendingUp className="h-6 w-6 text-negative" />
                    ) : (
                      <BarChart3 className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Trend visualization */}
                <div className="mt-6 h-12 bg-muted/20 rounded-lg relative">
                  <div className="absolute bottom-0 left-0 h-2/5 w-1/5 bg-muted/30"></div>
                  <div className="absolute bottom-0 left-1/5 h-1/3 w-1/5 bg-muted/30"></div>
                  <div className="absolute bottom-0 left-2/5 h-1/3 w-1/5 bg-muted/30"></div>
                  <div className="absolute bottom-0 left-3/5 h-2/5 w-1/5 bg-muted/30"></div>
                  <div className="absolute bottom-0 left-4/5 h-1/2 w-1/5 bg-muted/30"></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Apr 2024</span>
                  <span>Jul 2024</span>
                  <span>Oct 2024</span>
                  <span>Jan 2025</span>
                  <span>Apr 2025</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Highlights */}
          <div className="mb-6">
            <h2 className="text-xl font-bold font-montserrat mb-4">Impact Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Industry Impact */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Industry Impact</CardTitle>
                  <CardDescription>How economic indicators are affecting key industries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionData.impactedIndustries.map((industry, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0 border-border"
                      >
                        <div
                          className={`w-2 h-2 mt-1.5 rounded-full ${
                            industry.severity === "high"
                              ? "bg-negative"
                              : industry.severity === "medium"
                                ? "bg-primary"
                                : "bg-positive"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <div className="font-medium font-montserrat">{industry.industry}</div>
                          <div className="text-sm text-muted-foreground">{industry.impact}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Company Impact */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Company Impact</CardTitle>
                  <CardDescription>Companies affected by current economic conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionData.impactedCompanies.map((company, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0 border-border"
                      >
                        <div className="bg-muted/30 rounded-md px-2 py-1 text-xs font-medium font-montserrat">
                          {company.ticker}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium font-montserrat">{company.name}</div>
                          <div className="text-sm text-muted-foreground">{company.impact}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Economic Outlook */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Economic Outlook</CardTitle>
              <CardDescription>Forecast and analysis for the next 6-12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-xl bg-muted/20 p-4">
                  <p className="text-sm mb-3">
                    Based on current indicators, the {regions.find((r) => r.id === selectedRegion)?.name} economy is
                    showing{" "}
                    {regionData.gdp.value > 2.5
                      ? "strong growth momentum"
                      : regionData.gdp.value > 1.0
                        ? "moderate growth"
                        : "sluggish performance"}{" "}
                    with{" "}
                    {regionData.cpi.value > 4.0
                      ? "persistent inflation concerns"
                      : regionData.cpi.value > 2.5
                        ? "inflation gradually moderating"
                        : "inflation approaching target levels"}
                    .
                  </p>
                  <p className="text-sm mb-3">
                    The labor market remains{" "}
                    {regionData.unemployment.value < 4.0
                      ? "tight, with potential wage pressures"
                      : regionData.unemployment.value < 5.5
                        ? "relatively balanced"
                        : "under pressure, with signs of weakness"}{" "}
                    while monetary policy is{" "}
                    {regionData.interestRate.value > 5.0
                      ? "restrictive, potentially constraining growth"
                      : regionData.interestRate.value > 3.5
                        ? "moderately tight"
                        : "accommodative, supporting economic activity"}
                    .
                  </p>
                  <p className="text-sm">
                    Key risks include{" "}
                    {selectedRegion === "us"
                      ? "persistent inflation, housing market weakness, and potential fiscal challenges"
                      : selectedRegion === "eu"
                        ? "energy price volatility, manufacturing sector weakness, and divergent economic performance across member states"
                        : selectedRegion === "uk"
                          ? "cost-of-living pressures, Brexit-related trade frictions, and housing market vulnerabilities"
                          : selectedRegion === "china"
                            ? "property sector crisis, weak consumer confidence, and geopolitical tensions affecting trade"
                            : "housing market correction, commodity price fluctuations, and exposure to China's economic slowdown"}
                    .
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Growth Forecast</div>
                    <div className="text-lg font-semibold font-montserrat">
                      {(regionData.gdp.value + (Math.random() * 0.4 - 0.2)).toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Next 12 months</div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Inflation Forecast</div>
                    <div className="text-lg font-semibold font-montserrat">
                      {(regionData.cpi.value + (Math.random() * 0.4 - 0.6)).toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Year-end target</div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Rate Forecast</div>
                    <div className="text-lg font-semibold font-montserrat">
                      {(regionData.interestRate.value + (Math.random() * 0.5 - 0.75)).toFixed(2)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Year-end target</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

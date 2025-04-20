"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Building, ChevronDown, DollarSign, LineChart, PieChart, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample company data
const companyData = {
  name: "Apple Inc.",
  ticker: "AAPL",
  sector: "Technology",
  currentPrice: 187.42,
  change: +1.23,
  changePercent: +0.66,
}

// Sample financial data
const financialData = {
  incomeStatement: [
    { metric: "Revenue", value: "$394.33B", yoy: "+2.8%" },
    { metric: "Gross Profit", value: "$170.78B", yoy: "+1.5%" },
    { metric: "Operating Income", value: "$114.30B", yoy: "-2.1%" },
    { metric: "Net Income", value: "$96.99B", yoy: "-0.7%" },
    { metric: "EPS", value: "$6.14", yoy: "+0.5%" },
  ],
  balanceSheet: [
    { metric: "Total Assets", value: "$335.03B", yoy: "+3.2%" },
    { metric: "Total Liabilities", value: "$290.40B", yoy: "+4.8%" },
    { metric: "Total Equity", value: "$44.63B", yoy: "-5.1%" },
    { metric: "Cash & Equivalents", value: "$29.97B", yoy: "-12.3%" },
    { metric: "Long-term Debt", value: "$95.24B", yoy: "+1.9%" },
  ],
}

// Sample valuation data
const valuationData = {
  peRatio: {
    value: 30.5,
    industryAvg: 25.8,
    comparison: "above",
  },
  dcfValue: {
    value: 198.75,
    currentPrice: 187.42,
    status: "undervalued",
    difference: "+6.0%",
  },
  priceTarget: {
    low: 160.0,
    average: 195.5,
    high: 230.0,
    currentPrice: 187.42,
  },
}

// Sample ownership data
const ownershipData = {
  distribution: [
    { type: "Institutional", percentage: 58.2 },
    { type: "Retail", percentage: 36.5 },
    { type: "Insider", percentage: 5.3 },
  ],
  topHolders: [
    { name: "Vanguard Group Inc.", ownership: "8.42%", type: "Investment Advisor" },
    { name: "BlackRock Inc.", ownership: "6.85%", type: "Investment Advisor" },
    { name: "State Street Corporation", ownership: "4.12%", type: "Investment Advisor" },
    { name: "Berkshire Hathaway Inc.", ownership: "3.98%", type: "Hedge Fund" },
    { name: "FMR LLC", ownership: "2.75%", type: "Investment Advisor" },
  ],
}

export default function CompanyAnalysis() {
  const [activeTab, setActiveTab] = useState("financials")

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <Header title="Company Analysis" />
        <main className="flex-1 p-6">
          {/* Company Header Card */}
          <Card className="mb-6 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold font-montserrat">{companyData.name}</h2>
                    <Badge variant="outline" className="font-roboto">
                      {companyData.sector}
                    </Badge>
                  </div>
                  <span className="text-lg font-montserrat text-muted-foreground">{companyData.ticker}</span>
                </div>
                <div className="flex flex-col items-end mt-4 md:mt-0">
                  <span className="text-2xl font-bold font-montserrat">${companyData.currentPrice.toFixed(2)}</span>
                  <div
                    className={`flex items-center text-sm ${
                      companyData.change > 0 ? "text-positive" : "text-negative"
                    }`}
                  >
                    {companyData.change > 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    <span>
                      {companyData.change > 0 ? "+" : ""}
                      {companyData.change.toFixed(2)} ({companyData.changePercent > 0 ? "+" : ""}
                      {companyData.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm" className="font-roboto">
                  <DollarSign className="h-4 w-4 mr-1" /> Add to Watchlist
                </Button>
                <Button variant="outline" size="sm" className="font-roboto">
                  <LineChart className="h-4 w-4 mr-1" /> Compare
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="font-roboto">
                      <ChevronDown className="h-4 w-4 mr-1" /> More Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Export Data</DropdownMenuItem>
                    <DropdownMenuItem>View News</DropdownMenuItem>
                    <DropdownMenuItem>Set Alert</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* Tab Navigation */}
          <Tabs defaultValue="financials" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="financials" className="font-montserrat">
                Financials
              </TabsTrigger>
              <TabsTrigger value="valuation" className="font-montserrat">
                Valuation
              </TabsTrigger>
              <TabsTrigger value="ownership" className="font-montserrat">
                Ownership
              </TabsTrigger>
            </TabsList>

            {/* Financials Tab */}
            <TabsContent value="financials" className="mt-6">
              <div className="space-y-6">
                {/* Revenue & Net Income Chart */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Revenue & Net Income</CardTitle>
                    <CardDescription>Quarterly results (in billions USD)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-muted/30 rounded-xl flex items-center justify-center relative">
                      {/* Placeholder for chart */}
                      <div className="absolute inset-0 p-6">
                        <div className="h-full w-full relative">
                          {/* X-axis */}
                          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border"></div>

                          {/* Y-axis */}
                          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-border"></div>

                          {/* Revenue line (higher) */}
                          <div className="absolute left-0 right-0 bottom-[30%] h-[2px] bg-primary/70"></div>
                          <div className="absolute left-[20%] right-[60%] bottom-[40%] h-[2px] bg-primary/70"></div>
                          <div className="absolute left-[40%] right-[40%] bottom-[45%] h-[2px] bg-primary/70"></div>
                          <div className="absolute left-[60%] right-[20%] bottom-[50%] h-[2px] bg-primary/70"></div>
                          <div className="absolute left-[80%] right-0 bottom-[55%] h-[2px] bg-primary/70"></div>

                          {/* Net Income line (lower) */}
                          <div className="absolute left-0 right-0 bottom-[15%] h-[2px] bg-positive/70"></div>
                          <div className="absolute left-[20%] right-[60%] bottom-[20%] h-[2px] bg-positive/70"></div>
                          <div className="absolute left-[40%] right-[40%] bottom-[18%] h-[2px] bg-positive/70"></div>
                          <div className="absolute left-[60%] right-[20%] bottom-[25%] h-[2px] bg-positive/70"></div>
                          <div className="absolute left-[80%] right-0 bottom-[22%] h-[2px] bg-positive/70"></div>

                          {/* Labels */}
                          <div className="absolute bottom-[-20px] left-0 text-xs text-muted-foreground">Q1 2024</div>
                          <div className="absolute bottom-[-20px] left-[25%] text-xs text-muted-foreground">
                            Q2 2024
                          </div>
                          <div className="absolute bottom-[-20px] left-[50%] text-xs text-muted-foreground">
                            Q3 2024
                          </div>
                          <div className="absolute bottom-[-20px] left-[75%] text-xs text-muted-foreground">
                            Q4 2024
                          </div>
                          <div className="absolute bottom-[-20px] right-0 text-xs text-muted-foreground">Q1 2025</div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="absolute top-4 right-4 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-primary/70 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-positive/70 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">Net Income</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Tables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Income Statement */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>Income Statement</CardTitle>
                      <CardDescription>Annual, in billions USD</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-xl border border-border">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="text-left p-2 font-montserrat">Metric</th>
                              <th className="text-right p-2 font-montserrat">Value</th>
                              <th className="text-right p-2 font-montserrat">YoY Change</th>
                            </tr>
                          </thead>
                          <tbody className="font-roboto">
                            {financialData.incomeStatement.map((item, index) => (
                              <tr
                                key={index}
                                className={index < financialData.incomeStatement.length - 1 ? "border-b" : ""}
                              >
                                <td className="p-2">{item.metric}</td>
                                <td className="text-right p-2">{item.value}</td>
                                <td
                                  className={`text-right p-2 ${
                                    item.yoy.startsWith("+") ? "text-positive" : "text-negative"
                                  }`}
                                >
                                  {item.yoy}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Balance Sheet */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>Balance Sheet</CardTitle>
                      <CardDescription>Annual, in billions USD</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-xl border border-border">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="text-left p-2 font-montserrat">Metric</th>
                              <th className="text-right p-2 font-montserrat">Value</th>
                              <th className="text-right p-2 font-montserrat">YoY Change</th>
                            </tr>
                          </thead>
                          <tbody className="font-roboto">
                            {financialData.balanceSheet.map((item, index) => (
                              <tr
                                key={index}
                                className={index < financialData.balanceSheet.length - 1 ? "border-b" : ""}
                              >
                                <td className="p-2">{item.metric}</td>
                                <td className="text-right p-2">{item.value}</td>
                                <td
                                  className={`text-right p-2 ${
                                    item.yoy.startsWith("+") ? "text-positive" : "text-negative"
                                  }`}
                                >
                                  {item.yoy}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Valuation Tab */}
            <TabsContent value="valuation" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* P/E Ratio Card */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>P/E Ratio</CardTitle>
                    <CardDescription>Price to Earnings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold font-montserrat mb-2">
                        {valuationData.peRatio.value.toFixed(1)}
                      </div>
                      <div
                        className={`text-sm ${
                          valuationData.peRatio.comparison === "above" ? "text-negative" : "text-positive"
                        }`}
                      >
                        {valuationData.peRatio.comparison === "above" ? "Above" : "Below"} Industry Average (
                        {valuationData.peRatio.industryAvg.toFixed(1)})
                      </div>
                      <div className="mt-4 w-full bg-muted h-2 rounded-full">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(valuationData.peRatio.value / 50) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-full flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">0</span>
                        <span className="text-xs text-muted-foreground">25</span>
                        <span className="text-xs text-muted-foreground">50</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DCF Value Card */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>DCF Estimated Value</CardTitle>
                    <CardDescription>Discounted Cash Flow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold font-montserrat mb-2">
                        ${valuationData.dcfValue.value.toFixed(2)}
                      </div>
                      <div
                        className={`text-sm ${
                          valuationData.dcfValue.status === "undervalued" ? "text-positive" : "text-negative"
                        }`}
                      >
                        {valuationData.dcfValue.status === "undervalued" ? "Undervalued" : "Overvalued"} by{" "}
                        {valuationData.dcfValue.difference}
                      </div>
                      <div className="mt-4 flex items-center gap-2 w-full">
                        <div className="w-2 h-8 bg-primary rounded-full"></div>
                        <div className="flex-1 h-8 bg-muted rounded-xl relative">
                          <div
                            className="absolute top-0 bottom-0 bg-muted/50 rounded-xl"
                            style={{
                              left: `${
                                (valuationData.dcfValue.currentPrice / (valuationData.dcfValue.value * 1.5)) * 100
                              }%`,
                              width: "2px",
                            }}
                          ></div>
                          <div className="absolute -bottom-6 text-xs text-muted-foreground">
                            Current: ${valuationData.dcfValue.currentPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Price Target Card */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Price Target Range</CardTitle>
                    <CardDescription>Analyst Consensus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold font-montserrat mb-2">
                        ${valuationData.priceTarget.average.toFixed(2)}
                      </div>
                      <div className="text-sm">Average Price Target</div>
                      <div className="mt-4 w-full h-8 bg-muted rounded-xl relative">
                        {/* Low marker */}
                        <div
                          className="absolute top-0 bottom-0 w-2 bg-negative rounded-full"
                          style={{
                            left: `${(valuationData.priceTarget.low / (valuationData.priceTarget.high * 1.2)) * 100}%`,
                          }}
                        ></div>
                        <div
                          className="absolute -bottom-6 text-xs text-muted-foreground"
                          style={{
                            left: `${(valuationData.priceTarget.low / (valuationData.priceTarget.high * 1.2)) * 100}%`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          Low: ${valuationData.priceTarget.low.toFixed(2)}
                        </div>

                        {/* High marker */}
                        <div
                          className="absolute top-0 bottom-0 w-2 bg-positive rounded-full"
                          style={{
                            left: `${(valuationData.priceTarget.high / (valuationData.priceTarget.high * 1.2)) * 100}%`,
                          }}
                        ></div>
                        <div
                          className="absolute -bottom-6 text-xs text-muted-foreground"
                          style={{
                            left: `${(valuationData.priceTarget.high / (valuationData.priceTarget.high * 1.2)) * 100}%`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          High: ${valuationData.priceTarget.high.toFixed(2)}
                        </div>

                        {/* Current price marker */}
                        <div
                          className="absolute top-0 bottom-0 w-2 bg-primary rounded-full"
                          style={{
                            left: `${
                              (valuationData.priceTarget.currentPrice / (valuationData.priceTarget.high * 1.2)) * 100
                            }%`,
                          }}
                        ></div>
                        <div
                          className="absolute -top-6 text-xs text-muted-foreground"
                          style={{
                            left: `${
                              (valuationData.priceTarget.currentPrice / (valuationData.priceTarget.high * 1.2)) * 100
                            }%`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          Current
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Ownership Tab */}
            <TabsContent value="ownership" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ownership Distribution */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Ownership Distribution</CardTitle>
                    <CardDescription>By investor type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      {/* Pie chart placeholder */}
                      <div className="relative h-[250px] w-[250px]">
                        <div
                          className="absolute inset-0 rounded-full border-8 border-primary/70"
                          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                        ></div>
                        <div
                          className="absolute inset-0 rounded-full border-8 border-muted/70"
                          style={{ clipPath: "polygon(0 0, 58.2% 0, 58.2% 100%, 0% 100%)" }}
                        ></div>
                        <div
                          className="absolute inset-0 rounded-full border-8 border-positive/70"
                          style={{ clipPath: "polygon(0 0, 94.7% 0, 94.7% 100%, 0% 100%)" }}
                        ></div>

                        <PieChart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-muted-foreground/30" />
                      </div>
                    </div>

                    <div className="flex justify-center gap-6 mt-6">
                      {ownershipData.distribution.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              index === 0 ? "bg-primary/70" : index === 1 ? "bg-muted/70" : "bg-positive/70"
                            }`}
                          ></div>
                          <div>
                            <div className="text-sm font-medium">{item.type}</div>
                            <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Holders */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Top Holders</CardTitle>
                    <CardDescription>Largest shareholders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left p-2 font-montserrat">Name</th>
                            <th className="text-right p-2 font-montserrat">Ownership</th>
                            <th className="text-right p-2 font-montserrat">Type</th>
                          </tr>
                        </thead>
                        <tbody className="font-roboto">
                          {ownershipData.topHolders.map((holder, index) => (
                            <tr key={index} className={index < ownershipData.topHolders.length - 1 ? "border-b" : ""}>
                              <td className="p-2">{holder.name}</td>
                              <td className="text-right p-2">{holder.ownership}</td>
                              <td className="text-right p-2">{holder.type}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Institutional Concentration: High</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Insider Activity: Neutral</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

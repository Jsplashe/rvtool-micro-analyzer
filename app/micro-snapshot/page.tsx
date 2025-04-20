"use client"

import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

export default function MicroSnapshot() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <Header title="Micro Analysis Snapshot" />
        <main className="flex-1 p-6">
          {/* Input Selection Area */}
          <Card className="mb-6 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>Input Selection</CardTitle>
              <CardDescription>Enter company information to begin your analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="ticker" className="text-sm font-medium font-roboto">
                    Enter Company Ticker
                  </label>
                  <input
                    id="ticker"
                    type="text"
                    placeholder="e.g. AAPL, MSFT, GOOGL"
                    className="w-full rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-roboto"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium font-roboto">
                    Select Industry (optional)
                  </label>
                  <Select>
                    <SelectTrigger id="industry" className="rounded-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="telecom">Telecommunications</SelectItem>
                      <SelectItem value="consumer">Consumer Goods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full font-medium">Analyze</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Three Display Sections */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Financial Snapshot */}
            <Card className="col-span-1 shadow-md">
              <CardHeader>
                <CardTitle>Financial Snapshot</CardTitle>
                <CardDescription>Key financial metrics and trends</CardDescription>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="absolute right-4 top-4">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Export Data</DropdownMenuItem>
                    <DropdownMenuItem>Print Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Income Statement Highlights */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 font-montserrat">Income Statement Highlights</h3>
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
                          <tr className="border-b">
                            <td className="p-2">Revenue</td>
                            <td className="text-right p-2">$24.5M</td>
                            <td className="text-right p-2 text-positive">+12.0%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Gross Profit</td>
                            <td className="text-right p-2">$10.2M</td>
                            <td className="text-right p-2 text-positive">+8.5%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Operating Income</td>
                            <td className="text-right p-2">$5.8M</td>
                            <td className="text-right p-2 text-negative">-2.1%</td>
                          </tr>
                          <tr>
                            <td className="p-2">Net Income</td>
                            <td className="text-right p-2">$4.5M</td>
                            <td className="text-right p-2 text-positive">+3.2%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Balance Sheet Highlights */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 font-montserrat">Balance Sheet Highlights</h3>
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
                          <tr className="border-b">
                            <td className="p-2">Total Assets</td>
                            <td className="text-right p-2">$78.3M</td>
                            <td className="text-right p-2 text-positive">+5.7%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Total Liabilities</td>
                            <td className="text-right p-2">$32.1M</td>
                            <td className="text-right p-2 text-negative">+8.2%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Total Equity</td>
                            <td className="text-right p-2">$46.2M</td>
                            <td className="text-right p-2 text-positive">+3.9%</td>
                          </tr>
                          <tr>
                            <td className="p-2">Cash & Equivalents</td>
                            <td className="text-right p-2">$12.5M</td>
                            <td className="text-right p-2 text-positive">+15.3%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Key Financial Ratios */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 font-montserrat">Key Financial Ratios</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-border p-3">
                        <div className="text-xs text-muted-foreground mb-1 font-roboto">Price to Earnings (P/E)</div>
                        <div className="text-xl font-semibold font-montserrat">18.7x</div>
                        <div className="text-xs mt-1 text-muted-foreground font-roboto">Industry Avg: 22.3x</div>
                      </div>
                      <div className="rounded-xl border border-border p-3">
                        <div className="text-xs text-muted-foreground mb-1 font-roboto">Price to Book (P/B)</div>
                        <div className="text-xl font-semibold font-montserrat">2.4x</div>
                        <div className="text-xs mt-1 text-muted-foreground font-roboto">Industry Avg: 3.1x</div>
                      </div>
                      <div className="rounded-xl border border-border p-3">
                        <div className="text-xs text-muted-foreground mb-1 font-roboto">Debt to Equity (D/E)</div>
                        <div className="text-xl font-semibold font-montserrat">0.68</div>
                        <div className="text-xs mt-1 text-muted-foreground font-roboto">Industry Avg: 0.72</div>
                      </div>
                      <div className="rounded-xl border border-border p-3">
                        <div className="text-xs text-muted-foreground mb-1 font-roboto">Return on Equity (ROE)</div>
                        <div className="text-xl font-semibold font-montserrat">14.2%</div>
                        <div className="text-xs mt-1 text-muted-foreground font-roboto">Industry Avg: 12.8%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industry Comparison */}
            <Card className="col-span-1 shadow-md">
              <CardHeader>
                <CardTitle>Industry Comparison</CardTitle>
                <CardDescription>Performance relative to industry peers</CardDescription>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="absolute right-4 top-4">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Change Metrics</DropdownMenuItem>
                    <DropdownMenuItem>Export Data</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium font-montserrat">Acme Corp vs. Technology Industry</h3>
                    <span className="text-xs text-muted-foreground font-roboto">Last 12 months</span>
                  </div>

                  <div className="rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-left p-2 font-montserrat">Metric</th>
                          <th className="text-right p-2 font-montserrat">Company</th>
                          <th className="text-right p-2 font-montserrat">Industry Avg</th>
                          <th className="text-right p-2 font-montserrat">Difference</th>
                        </tr>
                      </thead>
                      <tbody className="font-roboto">
                        <tr className="border-b">
                          <td className="p-2">P/E Ratio</td>
                          <td className="text-right p-2">18.7x</td>
                          <td className="text-right p-2">22.3x</td>
                          <td className="text-right p-2 flex items-center justify-end">
                            <span className="text-positive flex items-center">
                              <ArrowDown className="h-3 w-3 mr-1" />
                              -3.6x
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Revenue Growth</td>
                          <td className="text-right p-2">12.0%</td>
                          <td className="text-right p-2">8.5%</td>
                          <td className="text-right p-2 flex items-center justify-end">
                            <span className="text-positive flex items-center">
                              <ArrowUp className="h-3 w-3 mr-1" />
                              +3.5%
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Profit Margin</td>
                          <td className="text-right p-2">18.3%</td>
                          <td className="text-right p-2">20.1%</td>
                          <td className="text-right p-2 flex items-center justify-end">
                            <span className="text-negative flex items-center">
                              <ArrowDown className="h-3 w-3 mr-1" />
                              -1.8%
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="text-right p-2 flex items-center justify-end">
                            <span className="text-positive flex items-center">
                              <ArrowUp className="h-3 w-3 mr-1" />
                              +1.4%
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">Market Share</td>
                          <td className="text-right p-2">14.2%</td>
                          <td className="text-right p-2">12.5%</td>
                          <td className="text-right p-2 flex items-center justify-end">
                            <span className="text-positive flex items-center">
                              <ArrowUp className="h-3 w-3 mr-1" />
                              +1.7%
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="rounded-xl bg-muted/30 p-4">
                    <p className="text-sm font-medium font-montserrat">Key Insights</p>
                    <ul className="mt-2 text-xs space-y-1 text-muted-foreground font-roboto">
                      <li>• Lower P/E ratio indicates potentially undervalued compared to peers</li>
                      <li>• Revenue growth outperforming industry average by 3.5%</li>
                      <li>• Profit margins slightly below industry average</li>
                      <li>• Strong market position with above-average market share</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Scorecard */}
            <Card className="col-span-1 shadow-md">
              <CardHeader>
                <CardTitle>Health Scorecard</CardTitle>
                <CardDescription>Overall business health assessment</CardDescription>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="absolute right-4 top-4">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Historical Scores</DropdownMenuItem>
                    <DropdownMenuItem>Export Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Company Health Score */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-center font-montserrat">Company Health Score</h3>
                    <div className="flex items-center justify-center">
                      <div className="relative h-36 w-36 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                        <p className="text-7xl font-bold text-white font-montserrat">B+</p>
                      </div>
                    </div>
                    <p className="text-center text-sm mt-3 font-roboto">Strong performance with room for improvement</p>
                  </div>

                  <Separator />

                  {/* Category Scores */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 font-montserrat">Category Ratings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-roboto">Financial Health</span>
                        <span className="font-medium px-3 py-1 rounded-full bg-muted text-primary font-montserrat">
                          B
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-roboto">Operational Efficiency</span>
                        <span className="font-medium px-3 py-1 rounded-full bg-muted text-primary font-montserrat">
                          B+
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-roboto">Market Position</span>
                        <span className="font-medium px-3 py-1 rounded-full bg-muted text-positive font-montserrat">
                          A-
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-roboto">Innovation & Growth</span>
                        <span className="font-medium px-3 py-1 rounded-full bg-muted text-negative font-montserrat">
                          C+
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="rounded-xl bg-muted/30 p-4">
                    <p className="text-sm font-medium font-montserrat">Key Recommendations</p>
                    <ul className="mt-2 text-xs space-y-1 text-muted-foreground font-roboto">
                      <li>• Focus on improving profit margins to strengthen financial health</li>
                      <li>• Maintain strong market position through continued expansion</li>
                      <li>• Increase R&D investment to improve innovation rating</li>
                      <li>• Consider debt restructuring to optimize capital structure</li>
                    </ul>
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

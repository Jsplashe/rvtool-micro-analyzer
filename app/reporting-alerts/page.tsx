"use client"

import { useState } from "react"
import { AlertCircle, Bell, Calendar, Download, Edit, FileText, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"

// Sample data for active alerts
const initialAlerts = [
  {
    id: 1,
    ticker: "AAPL",
    condition: "Health Score drops below B+",
    status: "Active",
    createdAt: "Apr 15, 2025",
  },
  {
    id: 2,
    ticker: "TSLA",
    condition: "P/E above 40",
    status: "Triggered",
    createdAt: "Apr 10, 2025",
  },
  {
    id: 3,
    ticker: "MSFT",
    condition: "Revenue Growth below 5%",
    status: "Active",
    createdAt: "Apr 8, 2025",
  },
  {
    id: 4,
    ticker: "AMZN",
    condition: "Profit Margin below 8%",
    status: "Active",
    createdAt: "Apr 5, 2025",
  },
]

// Sample data for companies and industries
const companies = [
  { value: "aapl", label: "Apple Inc. (AAPL)" },
  { value: "msft", label: "Microsoft Corp. (MSFT)" },
  { value: "googl", label: "Alphabet Inc. (GOOGL)" },
  { value: "amzn", label: "Amazon.com Inc. (AMZN)" },
  { value: "tsla", label: "Tesla Inc. (TSLA)" },
  { value: "nvda", label: "NVIDIA Corp. (NVDA)" },
  { value: "meta", label: "Meta Platforms Inc. (META)" },
]

const industries = [
  { value: "tech", label: "Technology" },
  { value: "finance", label: "Financial Services" },
  { value: "healthcare", label: "Healthcare" },
  { value: "consumer", label: "Consumer Goods" },
  { value: "energy", label: "Energy" },
  { value: "telecom", label: "Telecommunications" },
]

// Alert condition options
const alertConditions = [
  { value: "health-below-b", label: "Health Score drops below B" },
  { value: "health-below-b-plus", label: "Health Score drops below B+" },
  { value: "health-below-a-minus", label: "Health Score drops below A-" },
  { value: "pe-above-30", label: "P/E above 30" },
  { value: "pe-above-40", label: "P/E above 40" },
  { value: "revenue-below-5", label: "Revenue Growth below 5%" },
  { value: "profit-below-10", label: "Profit Margin below 10%" },
  { value: "debt-above-1", label: "Debt-to-Equity above 1.0" },
]

export default function ReportingAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [newTicker, setNewTicker] = useState("")
  const [newCondition, setNewCondition] = useState("")
  const [emailNotification, setEmailNotification] = useState(true)
  const [reportType, setReportType] = useState("company")
  const [reportEntity, setReportEntity] = useState("")
  const [timeRange, setTimeRange] = useState("12m")
  const [reportFormat, setReportFormat] = useState("pdf")
  const [downloadMessage, setDownloadMessage] = useState("")

  // Handle creating a new alert
  const handleCreateAlert = () => {
    if (!newTicker || !newCondition) return

    const selectedCondition = alertConditions.find((c) => c.value === newCondition)

    const newAlert = {
      id: alerts.length + 1,
      ticker: newTicker.toUpperCase(),
      condition: selectedCondition?.label || "",
      status: "Active",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }

    setAlerts([...alerts, newAlert])
    setNewTicker("")
    setNewCondition("")
  }

  // Handle deleting an alert
  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  // Handle downloading a report
  const handleDownloadReport = () => {
    if (!reportEntity || !timeRange || !reportFormat) return

    let entityName = ""
    if (reportType === "company") {
      entityName = companies.find((c) => c.value === reportEntity)?.label || ""
    } else {
      entityName = industries.find((i) => i.value === reportEntity)?.label || ""
    }

    const timeRangeText = timeRange === "12m" ? "Last 12 Months" : timeRange === "ytd" ? "Year to Date" : "Custom Range"

    setDownloadMessage(
      `Your ${reportFormat.toUpperCase()} report for ${entityName} (${timeRangeText}) will download shortly...`,
    )

    // Reset message after 5 seconds
    setTimeout(() => {
      setDownloadMessage("")
    }, 5000)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <Header title="Reporting & Alerts" />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section 1: Custom Alerts */}
            <div className="space-y-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Custom Alerts
                  </CardTitle>
                  <CardDescription>Create custom alerts for companies you track</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ticker">Company Ticker</Label>
                        <Input
                          id="ticker"
                          placeholder="e.g. AAPL, MSFT, GOOGL"
                          className="rounded-full"
                          value={newTicker}
                          onChange={(e) => setNewTicker(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="condition">Alert Condition</Label>
                        <Select value={newCondition} onValueChange={setNewCondition}>
                          <SelectTrigger id="condition" className="rounded-full">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {alertConditions.map((condition) => (
                              <SelectItem key={condition.value} value={condition.value}>
                                {condition.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="email-notification"
                          checked={emailNotification}
                          onCheckedChange={setEmailNotification}
                        />
                        <Label htmlFor="email-notification">Email notification</Label>
                      </div>

                      <Button onClick={handleCreateAlert} className="w-full">
                        Create Alert
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                  <CardDescription>Manage your current alert settings</CardDescription>
                </CardHeader>
                <CardContent>
                  {alerts.length > 0 ? (
                    <div className="rounded-xl border border-border overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="text-left p-3 font-montserrat">Ticker</th>
                              <th className="text-left p-3 font-montserrat">Condition</th>
                              <th className="text-left p-3 font-montserrat">Status</th>
                              <th className="text-right p-3 font-montserrat">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="font-roboto">
                            {alerts.map((alert) => (
                              <tr key={alert.id} className="border-b last:border-0">
                                <td className="p-3 font-medium">{alert.ticker}</td>
                                <td className="p-3">{alert.condition}</td>
                                <td className="p-3">
                                  <Badge
                                    variant={alert.status === "Active" ? "outline" : "default"}
                                    className={`${
                                      alert.status === "Active"
                                        ? "border-positive text-positive"
                                        : "bg-negative text-white"
                                    }`}
                                  >
                                    {alert.status}
                                  </Badge>
                                </td>
                                <td className="p-3 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleDeleteAlert(alert.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">Delete</span>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No active alerts</p>
                      <p className="text-xs text-muted-foreground mt-1">Create an alert above to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Section 2: Download Reports */}
            <div className="space-y-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Download Reports
                  </CardTitle>
                  <CardDescription>Generate and download analysis reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="report-type">Report Type</Label>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="company-report"
                              name="report-type"
                              className="h-4 w-4 accent-primary"
                              checked={reportType === "company"}
                              onChange={() => setReportType("company")}
                            />
                            <Label htmlFor="company-report">Company</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="industry-report"
                              name="report-type"
                              className="h-4 w-4 accent-primary"
                              checked={reportType === "industry"}
                              onChange={() => setReportType("industry")}
                            />
                            <Label htmlFor="industry-report">Industry</Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="entity">
                          {reportType === "company" ? "Select Company" : "Select Industry"}
                        </Label>
                        <Select value={reportEntity} onValueChange={setReportEntity}>
                          <SelectTrigger id="entity" className="rounded-full">
                            <SelectValue
                              placeholder={reportType === "company" ? "Select company" : "Select industry"}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {reportType === "company"
                              ? companies.map((company) => (
                                  <SelectItem key={company.value} value={company.value}>
                                    {company.label}
                                  </SelectItem>
                                ))
                              : industries.map((industry) => (
                                  <SelectItem key={industry.value} value={industry.value}>
                                    {industry.label}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time-range">Time Range</Label>
                        <Select value={timeRange} onValueChange={setTimeRange}>
                          <SelectTrigger id="time-range" className="rounded-full">
                            <SelectValue placeholder="Select time range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12m">Last 12 Months</SelectItem>
                            <SelectItem value="ytd">Year to Date</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {timeRange === "custom" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="start-date">Start Date</Label>
                            <div className="relative">
                              <Input id="start-date" type="date" className="rounded-full" />
                              <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="end-date">End Date</Label>
                            <div className="relative">
                              <Input id="end-date" type="date" className="rounded-full" />
                              <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="format">Format</Label>
                        <Select value={reportFormat} onValueChange={setReportFormat}>
                          <SelectTrigger id="format" className="rounded-full">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF Document</SelectItem>
                            <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                            <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={handleDownloadReport} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>

                    {downloadMessage && (
                      <div className="mt-4 bg-muted/30 rounded-lg p-3 flex items-center justify-between">
                        <p className="text-sm">{downloadMessage}</p>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setDownloadMessage("")}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Dismiss</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Your previously generated reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-md">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium font-montserrat">Apple Inc. (AAPL) Analysis</p>
                          <p className="text-xs text-muted-foreground">PDF • Apr 18, 2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-md">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium font-montserrat">Technology Industry Overview</p>
                          <p className="text-xs text-muted-foreground">PDF • Apr 15, 2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-md">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium font-montserrat">Microsoft Corp. (MSFT) Analysis</p>
                          <p className="text-xs text-muted-foreground">CSV • Apr 10, 2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

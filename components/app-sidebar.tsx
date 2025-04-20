import { BarChart3, Bell, Building2, LayoutDashboard, LineChart, TrendingUp } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Micro Snapshot",
    icon: BarChart3,
    href: "/micro-snapshot",
    isActive: false,
  },
  {
    title: "Dashboard Hub",
    icon: LayoutDashboard,
    href: "/dashboard-hub",
    isActive: false,
  },
  {
    title: "Company Analysis",
    icon: Building2,
    href: "/company-analysis",
    isActive: false,
  },
  {
    title: "Industry Benchmarking",
    icon: LineChart,
    href: "/industry-benchmarking",
    isActive: false,
  },
  {
    title: "Economic Indicators",
    icon: TrendingUp,
    href: "/economic-indicators",
    isActive: false,
  },
  {
    title: "Reporting & Alerts",
    icon: Bell,
    href: "/reporting-alerts",
    isActive: true,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold font-montserrat">MicroEcon</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-montserrat">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.href} className="font-roboto">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

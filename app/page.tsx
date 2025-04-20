"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header title="Microeconomic Analysis Tool" />
        <main className="flex-1 p-6">
          <div className="grid gap-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Welcome to the Microeconomic Analysis Tool</h2>
              <p className="text-muted-foreground">
                Select an analysis tool from the sidebar to get started with your microeconomic analysis.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-medium">Supply & Demand</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze market equilibrium and shifts in supply and demand curves.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-medium">Elasticity Calculator</h3>
                <p className="text-sm text-muted-foreground">
                  Calculate price elasticity of demand and supply for various goods.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-medium">Cost Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Evaluate fixed costs, variable costs, and break-even points.
                </p>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

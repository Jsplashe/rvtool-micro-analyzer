import { SidebarTrigger } from "@/components/ui/sidebar"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-xl font-bold font-montserrat">{title}</h1>
    </header>
  )
}

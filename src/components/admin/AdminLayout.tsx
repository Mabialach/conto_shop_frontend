"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  Tag,
  TrendingUp,
  Percent,
  CreditCard,
  MessageSquare
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: "Tableau de bord", href: "/admin", icon: BarChart3, current: pathname === "/admin" },
    { name: "Catégories", href: "/admin/categories", icon: Tag, current: pathname === "/admin/categories" },
    { name: "Produits", href: "/admin/produits", icon: Package, current: pathname === "/admin/produits" },
    { name: "Commandes", href: "/admin/commandes", icon: ShoppingCart, current: pathname === "/admin/commandes" },
    { name: "Clients", href: "/admin/clients", icon: Users, current: pathname === "/admin/clients" },
    { name: "Avis", href: "/admin/avis", icon: MessageSquare, current: pathname === "/admin/avis" },
    { name: "Codes Promo", href: "/admin/codes-promo", icon: Percent, current: pathname === "/admin/codes-promo" },
    {
      name: "Modes de Paiement",
      href: "/admin/modes-paiement",
      icon: CreditCard,
      current: pathname === "/admin/modes-paiement",
    },
    // {
    //   name: "Statistiques",
    //   href: "/admin/statistiques",
    //   icon: TrendingUp,
    //   current: pathname === "/admin/statistiques",
    // },
    { name: "Paramètres", href: "/admin/parametres", icon: Settings, current: pathname === "/admin/parametres" },
  ]

  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn("flex h-full w-64 flex-col", className)}>
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <Package className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  item.current ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pc */}
      <div className="hidden lg:block">
        <Sidebar className="border-r bg-white" />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Mobile entete */}
        <div className="flex h-16 items-center gap-4 border-b bg-white px-4 lg:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <Link href="/admin" className="flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold">Admin</span>
          </Link>
        </div>

        {/* Page */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

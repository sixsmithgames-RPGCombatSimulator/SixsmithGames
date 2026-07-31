import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BarChart3,
  Boxes,
  ClipboardCheck,
  CreditCard,
  Headphones,
  LayoutDashboard,
  Megaphone,
  ReceiptText,
  Settings,
  ShoppingCart,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  activePrefix: string;
  icon: LucideIcon;
  description: string;
}

export const OPERATIONS_NAVIGATION: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    activePrefix: "/dashboard",
    icon: LayoutDashboard,
    description: "Executive operating snapshot",
  },
  {
    label: "Subscriptions",
    href: "/subscriptions/reconciliation",
    activePrefix: "/subscriptions",
    icon: BadgeCheck,
    description: "Entitlements and reconciliation",
  },
  {
    label: "Orders",
    href: "/orders",
    activePrefix: "/orders",
    icon: ShoppingCart,
    description: "Orders, refunds, and payments",
  },
  {
    label: "CRM",
    href: "/crm",
    activePrefix: "/crm",
    icon: CreditCard,
    description: "Customer relationships and billing",
  },
  {
    label: "Marketing",
    href: "/marketing",
    activePrefix: "/marketing",
    icon: Megaphone,
    description: "Campaign planning and performance",
  },
  {
    label: "Products",
    href: "/products",
    activePrefix: "/products",
    icon: Boxes,
    description: "Product and access catalog",
  },
  {
    label: "Support",
    href: "/support",
    activePrefix: "/support",
    icon: Headphones,
    description: "Cases and customer feedback",
  },
  {
    label: "Accounting",
    href: "/accounting",
    activePrefix: "/accounting",
    icon: ReceiptText,
    description: "Collections, refunds, fees, and costs",
  },
  {
    label: "Tasks & Approvals",
    href: "/approvals",
    activePrefix: "/approvals",
    icon: ClipboardCheck,
    description: "Approval and exception queues",
  },
  {
    label: "Reports",
    href: "/reports",
    activePrefix: "/reports",
    icon: BarChart3,
    description: "Saved reports and exports",
  },
  {
    label: "Settings",
    href: "/settings",
    activePrefix: "/settings",
    icon: Settings,
    description: "Integrations and policies",
  },
];

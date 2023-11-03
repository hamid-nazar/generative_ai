import { Code, FileQuestion, ImageIcon, LayoutDashboard, MessageSquare } from "lucide-react";

export const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      to: '/dashboard',
      color: "text-sky-500"
    },
    {
      label: 'Conversation',
      icon: MessageSquare,
      to: '/conversation',
      color: "text-violet-500",
    },
    {
      label: 'Image Generation',
      icon: ImageIcon,
      color: "text-pink-700",
      to: '/image',
    },
  
    {
      label: 'Code Generation',
      icon: Code,
      color: "text-green-700",
      to: '/code',
    },
  
    {
      label: 'PDF Reader',
      icon: FileQuestion,
      color: "text-green-700",
      to: '/drop',
    },
  
  ];
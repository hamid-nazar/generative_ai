import { Bot, FileQuestion, Sparkle } from "lucide-react";

export const routes = [
    {
      label: 'Conversation',
      icon: Bot,
      to: '/',
      color: "text-violet-500",
    },
    {
      label: 'Image Generation',
      icon: Sparkle,
      color: "text-pink-700",
      to: '/image',
    },
  
    {
      label: 'PDF Reader',
      icon: FileQuestion,
      color: "text-green-700",
      to: '/drop',
    },
  
  ];
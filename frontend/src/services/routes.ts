import { FileQuestion, ImageIcon, MessageSquare } from "lucide-react";

export const routes = [
    {
      label: 'Conversation',
      icon: MessageSquare,
      to: '/',
      color: "text-violet-500",
    },
    {
      label: 'Image Generation',
      icon: ImageIcon,
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
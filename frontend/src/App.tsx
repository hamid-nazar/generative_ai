import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ConversationPage from "./pages/ConversationPage";
import CodeGenerationPage from "./pages/CodeGenerationPage";
import ImageGenerationPage from "./pages/ImageGenerationPage";

import PdfPage from "./pages/PdfPage";


import { Toast } from "./components/ui/toast";
import { ToastProvider } from "./components/ui/toast";
import UploadPage from "./pages/UploadPage";
import ChatPage from "./pages/ChatPage";



export default function App() {
  return (
   
  <BrowserRouter>
   <ToastProvider>
  <Toast />
  </ToastProvider>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/dashboard" element={<DashboardPage/>}/>
    <Route path="/conversation" element={<ConversationPage />} />
    <Route path="/code" element={<CodeGenerationPage />} />
    <Route path="/image" element={<ImageGenerationPage />} />
    <Route path="/pdf/:name" element={<PdfPage/>} />
    <Route path="/drop" element={<UploadPage/>} />
    <Route path="/chat" element={<ChatPage/>} />

   
  </Routes>
  
  </BrowserRouter>
  )
}
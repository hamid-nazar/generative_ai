import {BrowserRouter, Routes, Route} from "react-router-dom";


import ConversationPage from "./pages/ConversationPage";
import ImageGenerationPage from "./pages/ImageGenerationPage";

import PdfPage from "./pages/PdfPage";


import { Toast } from "./components/ui/toast";
import { ToastProvider } from "./components/ui/toast";
import UploadPage from "./pages/UploadPage";



export default function App() {
  return (
   
  <BrowserRouter>
   <ToastProvider>
  <Toast />
  </ToastProvider>
  <Routes>
    <Route path="/" element={<ConversationPage />} />
    <Route path="/image" element={<ImageGenerationPage />} />
    <Route path="/pdf/:name" element={<PdfPage/>} />
    <Route path="/drop" element={<UploadPage/>} />
    
  </Routes>
  
  </BrowserRouter>
  )
}
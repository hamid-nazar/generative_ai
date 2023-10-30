import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ConversationPage from "./pages/ConversationPage";
import CodeGenerationPage from "./pages/CodeGenerationPage";
import ImageGenerationPage from "./pages/ImageGenerationPage";

import PdfPage2 from "./pages/PDFPage2";


import { Toast } from "./components/ui/toast";
import { ToastProvider } from "./components/ui/toast";
import UploadButton from "./pages/UploadButton";
import TestPdf from "./pages/TestPdf";
import TestPage from "./pages/TestPage";


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
    {/* <Route path="/pdf" element={<PDFPage/>} /> */}
    <Route path="/pdf" element={<PdfPage2/>} />
    <Route path="/test" element={<TestPdf/>} />
    <Route path="/drop" element={<UploadButton/>} />
    <Route path="/upload" element={<TestPage/>} />

   
  </Routes>
  
  </BrowserRouter>
  )
}
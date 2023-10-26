import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ConversationPage from "./pages/ConversationPage";
import CodeGenerationPage from "./pages/CodeGenerationPage";
import ImageGenerationPage from "./pages/ImageGenerationPage";

export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/dashboard" element={<DashboardPage/>}/>
    <Route path="/conversation" element={<ConversationPage />} />
    <Route path="/code" element={<CodeGenerationPage />} />
    <Route path="/image" element={<ImageGenerationPage />} />
  </Routes>
  
  </BrowserRouter>
  )
}
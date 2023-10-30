
import { string } from "zod"
import ChatWrapper from "../components/ChatWrapper"
import PDFRenderer from "../components/PDFRenderer"
import { useEffect, useState } from "react";
import axios from "axios";

export default function PDFPage2 (){

  const [pdfUrl, setPdfUrl] = useState("");

  useEffect( function () {

    async function api(){
     
    await axios.get("http://127.0.0.1:5000/file", {
      responseType: 'arraybuffer'
      })
      .then((response) => {
    // handle the response
        console.log(response.data);

        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
         // eslint-disable-next-line react-hooks/exhaustive-deps
         const url = URL.createObjectURL(pdfBlob);

          setPdfUrl(url);

        console.log(url);
        
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  }

  api();

  }, []);

 

  return (
    <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>

      <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
        {/* Left sidebar & main wrapper */}
        <div className='flex-1 xl:flex'>
          <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
            {/* Main area */}
            <PDFRenderer url={pdfUrl} />
          </div>
        </div>

        <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
          <ChatWrapper/>
        </div>
      </div>
      
    </div>
  )
}
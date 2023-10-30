import { useState } from "react";
import UploadButton from "./UploadButton";
import { FileProps } from "../types/globalTypes";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function PDFPage() {

  
    const [files, setFiles] = useState<FileProps[]>([]);


    const navigate = useNavigate();


    function getFiles(){
        
    }

    function deleteFile(id: string){
        // delete file
        try {
            const file : object = { userId:"userId", fileId: id};

            const newFiles = files.filter((file) => file.id !== id);
            
            const response = await axios.delete('/code',  file);
      
      
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
        //     console.log(error);
          } finally {
            //router.refresh();
            navigate("/pdf");
          }
    }

  return (
 
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-5xl text-gray-900'>
          My Files
        </h1>

        <UploadButton/>
      </div>
    </main>
  )
}

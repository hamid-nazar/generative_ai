import axios from 'axios';
import { useEffect, useState } from 'react';
import { Document,  pdfjs } from 'react-pdf';

 pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
// Example path in your PDF viewer component
// pdfjs.GlobalWorkerOptions.workerSrc = `http://localhost:5173/pdf.worker.js`;

export default function TestPdf() {

    const [pdfUrl, setPdfUrl] = useState('');


    useEffect(() => {
        const fetchPDF = async () => {

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
          
        };
    
        fetchPDF();
      }, []);

    return (
        <div>
            <Document file={pdfUrl} />
        </div>
    );

}



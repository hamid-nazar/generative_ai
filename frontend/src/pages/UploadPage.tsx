import { createRef, useEffect, useState } from "react";
import UploadDropzone from "../components/UploadDropzone";
import { Button } from "../components/ui/Button"
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog"



export default function UploadPage() {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const buttonRef = createRef<HTMLButtonElement>();


    
  useEffect(function () {

    buttonRef.current?.click();

  }, []);


  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
      }}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        asChild>
        <Button ref={buttonRef} className="hidden">Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>

        <UploadDropzone/>
  
      </DialogContent>
    </Dialog>
  )
}
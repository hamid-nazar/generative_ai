import { useState } from "react";
import UploadDropzone from "../components/UploadDropzone";
import { Button } from "../components/ui/Button"
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog"



export default function UploadButton() {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v)
        }
      }}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>

        <UploadDropzone/>
  
      </DialogContent>
    </Dialog>
  )
}
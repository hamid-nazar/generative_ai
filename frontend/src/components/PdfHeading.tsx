import PdfSidebar from "./PdfSidebar";
export default function PdfHeading(){


  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
            <PdfSidebar />
          <div className='hidden items-center space-x-4 sm:flex'>
          </div>
        </div>
    </nav>
  )
}


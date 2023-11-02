
import ChatInput from './ChatInput'
import { ChevronLeft, Loader2, XCircle } from 'lucide-react'
import { Link } from "react-router-dom";
import { buttonVariants } from './ui/Button';
import Messages from './Messages';
import { ChatContextProvider } from '../services/ChatContext';

export default function ChatWrapper() {
  
  function fetchData() {
    return "PROCESSING"
  }

  if (fetchData() === 'LOADING') {
  return (
    <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
      <div className='flex-1 flex justify-center items-center flex-col mb-28'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 text-blue-500 animate-spin' />
          <h3 className='font-semibold text-xl'>
            Loading...
          </h3>
          <p className='text-zinc-500 text-sm'>
            We&apos;re preparing your PDF.
          </p>
        </div>
      </div>

      <ChatInput isDisabled />
    </div>
  )
}
  if (fetchData() === 'PROCESSING') {
    return(
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
      <div className='flex-1 flex justify-center items-center flex-col mb-28'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 text-blue-500 animate-spin' />
          <h3 className='font-semibold text-xl'>
            Processing PDF...
          </h3>
          <p className='text-zinc-500 text-sm'>
            This won&apos;t take long.
          </p>
        </div>
      </div>

      <ChatInput isDisabled={false} />
      </div>
    )
    
  }

  if (fetchData() === 'FAILED')
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <XCircle className='h-8 w-8 text-red-500' />
            <h3 className='font-semibold text-xl'>
              Too many pages in PDF
            </h3>
            <Link
              to='/dashboard'
              className={buttonVariants({
                variant: 'secondary',
                className: 'mt-4',
              })}>
              <ChevronLeft className='h-3 w-3 mr-1.5' />
             Go Back
              </Link>
          </div>
        </div>

        <ChatInput isDisabled={false}/>
      </div>
    )
  return (
    <ChatContextProvider fileId={''}>
    <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
    <div className='flex-1 justify-between flex flex-col mb-28'>
      <Messages />
    </div>
    <ChatInput />
  </div>
  </ChatContextProvider>
  )
}

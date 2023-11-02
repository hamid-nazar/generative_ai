import { MessageSquare } from "lucide-react";
import Skeleton from 'react-loading-skeleton'
import { useEffect, useRef, useState } from "react"
import Message from "./Message"


export default function Messages() {

  const [isLoading, setIsLoading] = useState(false);

  const isNextMessageSamePerson = false;

// load messages from the backend
  const messages: any[]= [];



  const lastMessageRef = useRef<HTMLDivElement>(null)





  
  return (
    <div className='flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
    {messages && messages.length > 0 ? (
      messages.map((message, i) => {

        if (i === messages.length - 1) {
          return (
            <Message isNextMessageSamePerson={isNextMessageSamePerson} message={message} key={message.id} />
          )
        } else
          return (
            <Message isNextMessageSamePerson={isNextMessageSamePerson} message={message} key={message.id}/>
          )
      })
    ) : isLoading ? (
      <div className='w-full flex flex-col gap-2'>
        <Skeleton className='h-16' />
        <Skeleton className='h-16' />
        <Skeleton className='h-16' />
        <Skeleton className='h-16' />
      </div>
    ) : (
      <div className='flex-1 flex flex-col items-center justify-center gap-2'>
        <MessageSquare className='h-8 w-8 text-blue-500' />
        <h3 className='font-semibold text-xl'>
          You&apos;re all set!
        </h3>
        <p className='text-zinc-500 text-sm'>
          Ask your first question to get started.
        </p>
      </div>
    )}
  </div>
  )
}

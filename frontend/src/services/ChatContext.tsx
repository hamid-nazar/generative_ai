import {
    ReactNode,
    createContext,
    useState,
  } from 'react'
import { MessageProps } from '../types/globalTypes';
import { generateUniqueId } from './helperFunctions';


interface ChatContextType {
  addMessage: () => void;
  message: string;
  messages: MessageProps[];
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
}


  export const ChatContext = createContext<ChatContextType>({
    addMessage: () => {},
    message: '',  
    messages: [],
    handleInputChange: () => {},
    isLoading: false,

  });


 

  export const ChatContextProvider = ({children}: {children: ReactNode}) => {

    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageProps[]>([]);

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      e.preventDefault();
      console.log(e.target.value);
      
      setMessage(e.target.value);
      
    }

    const aiMessage: MessageProps = {
      id:generateUniqueId(),
      isUserMessage: false,
      text: 'This is an AI message',
      createdAt: new Date().toISOString(),
    
    }
   
  
    function addMessage() {
      setMessages([...messages, aiMessage]);

      const newMessage: MessageProps = {
        id: generateUniqueId(),
        text: message,
        isUserMessage: true,
        createdAt: new Date().toISOString(),
      }
      setMessages([...messages, newMessage]);
      
      console.log("add message");
      setMessage('');
      
    }

    return (
      <ChatContext.Provider
        value={{
          addMessage,
          message,
          messages,
          handleInputChange,
          isLoading,
        }}>
        {children}
      </ChatContext.Provider>
    )
  }



import {
    ReactNode,
    createContext,
    useState,
  } from 'react'
import { MessageProps, UploadStatus } from '../types/globalTypes';
import { generateUniqueId } from './helperFunctions';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


interface ChatContextType {
  addMessage: () => void;
  message: string;
  messages: MessageProps[];
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  state: UploadStatus;
}


  export const ChatContext = createContext<ChatContextType>({
    addMessage: () => {},
    message: '',  
    messages: [],
    handleInputChange: () => {},
    isLoading: false,
    state: UploadStatus.SUCCESS,

  });


 

  export const ChatContextProvider = ({children}: {children: ReactNode}) => {

    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [state, setState] = useState<UploadStatus>(UploadStatus.LOADING);

    async function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {

      e.preventDefault();

      console.log(e.target.value);

      setMessage(e.target.value);
    }

    const pathname = useLocation().pathname.split('/')[2];

    console.log("Pathname: ", pathname);
    

    async function addMessage() {

      const newMessage: MessageProps = {
        id: generateUniqueId(),
        text: message,
        isUserMessage: true,
        createdAt: new Date().toISOString(),
      }
      // setMessages([...messages, newMessage]);

      messages.unshift(newMessage);

    // call the backend
      try {
        setIsLoading(true);
        setState(UploadStatus.LOADING);

        console.log(message);
        

        const response = await axios.post('http://127.0.0.1:5000/search/'+pathname,{"prompt": message},{
          headers: {
            'Content-Type': 'application/json'
          } });

          const data = await response.data;

          console.log(data.message);

          const newMessage: MessageProps = {
            id: generateUniqueId(),
            text: data.message,
            isUserMessage: false,
            createdAt: new Date().toISOString(),
          }

          // setMessages([...messages, newMessage]);

          messages.unshift(newMessage);
          
       
         setState(UploadStatus.SUCCESS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setState(UploadStatus.ERROR);
      } finally {
        setIsLoading(false);
      }


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
          state
        }}>
        {children}
      </ChatContext.Provider>
    )
  }



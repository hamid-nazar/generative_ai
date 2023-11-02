import { useState } from "react";
import { MessageProps, UploadStatus } from "../types/globalTypes";
import axios from "axios";


export function useFetchMessages() {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

   async function fetchData() {
    try {
      setIsLoading(true);
    const reponse = await axios.get('/messages');
    const newMessages = await reponse.data;

    setMessages([...messages, ...newMessages]);

    } catch (error) {
      console.log(error);

    } finally {

      setIsLoading(false);
    }

   }

   fetchData();

    return {
        isLoading,
        messages,
    }
}



export function useSendMessage(message: MessageProps){

    const [response, setResponse] = useState<MessageProps>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<UploadStatus>();

    async function sendMessage() {
        try {

        setIsLoading(true);

        setStatus(UploadStatus.UPLOADING);

     const res =  await axios.post('/message', {
            method:"POST",
            body:JSON.stringify(message),
          })

          const data = await res.data;

          setResponse(data);
          setStatus(UploadStatus.SUCCESS);

        } catch (error) {

          console.log(error);

          setStatus(UploadStatus.ERROR);

        } finally {

          setIsLoading(false);
        }
    }


    sendMessage();

    return {
        response,
        isLoading,
        status
    }


}
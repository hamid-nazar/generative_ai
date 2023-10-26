import { useNavigate } from "react-router-dom";
import { useState } from "react";

import * as z from "zod";
import axios from "axios";

import { Code} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { Heading } from "../components/Heading";
import { useForm } from "react-hook-form";
import { formSchemaText } from "../lib/constants";

import  BotAvatar  from "../components/BotAvatar";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../components/ui/Form";
import { cn } from "../lib/utils";
import  Loader from "../components/Loader";
import  UserAvatar  from "../components/UserAvatar";
import Empty from "../components/Empty";
import ReactMarkdown from "react-markdown";


import { MessageProps } from "../types/globalTypes";


export default function ConversationPage() {


  const navigate = useNavigate();

  const [messages, setMessages] = useState<MessageProps[]>([]);

  const form = useForm<z.infer<typeof formSchemaText>>({
    resolver: zodResolver(formSchemaText),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchemaText>) => {

    try {
      const userMessage: object = { role: "user", content: values.prompt };

      const newMessages = [...messages, userMessage];
      
      const response = await axios.post('/conversation', { messages: newMessages });

      setMessages((current) => [...current, userMessage, response.data]);
      
      form.reset();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
  //     console.log(error);
    } finally {
      //router.refresh();
      navigate("/conversation");
    }
    
  }
  return (
    <DashboardLayout>
        <Heading title="Code Generation" description="Generate code based on your prompt" icon={Code} iconColor="text-green-700" bgColor="bg-green-700/10"/>
        <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="How can I help you?" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div 
                key={message.content} 
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">
                <ReactMarkdown components={{
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  code: ({ node, ...props }) => (
                    <code className="bg-black/10 rounded-lg p-1" {...props} />
                  )
                }} className="text-sm overflow-hidden leading-7">
                  {message.content || ""}
                </ReactMarkdown>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
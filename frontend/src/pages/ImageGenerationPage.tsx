import { useNavigate } from "react-router-dom";
import { useState } from "react";


import * as z from "zod";
import axios from "axios";

import { Download,Sparkle} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { Heading } from "../components/Heading";
import { useForm } from "react-hook-form";
import { amountOptions, formSchemaImage, resolutionOptions } from "../services/constants";


import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../components/ui/Form";

import  Loader from "../components/Loader";


import { Card, CardFooter } from "../components/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { Empty } from "../components/Empty";




export default function ConversationPage() {


  const navigate = useNavigate();

  const [photos, setPhotos] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchemaImage>>({
    resolver: zodResolver(formSchemaImage),
    defaultValues: {
      prompt: "a flying robot",
      amount: "1",
      resolution: '256x256'
    }
  });


  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchemaImage>) => {

    try {
        
        console.log(values);
        

        const response = await axios.post('http://127.0.0.1:5000/image', values,{
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
         const images= await response.data;

        console.log(images);
   
         const  urls = images.map((image: { url: string; }) => image.url);

         console.log(urls);
         

        console.log("values", values);
        
        setPhotos((current)=> [...current, ...urls]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
  //     console.log(error);
    } finally {
      //router.refresh();
      navigate("/image");
    }
    
  }
  return (
    <DashboardLayout>
         <Heading
        title="Generate Images With Your Imagination"
        description=""
        icon={Sparkle}
        iconColor="text-pink-1000"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
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
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading} 
                      placeholder="A picture of a cute cat" 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {photos.length === 0 && !isLoading && (
          <Empty label="No images generated." />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {photos.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <img
                  alt="Generated"
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

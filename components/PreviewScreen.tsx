import React, { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import preview from "@/public/illustration-phone-mockup.svg"
import started from "@/public/illustration-empty.svg"

interface Link{
    id: number,
    platform: string,
    url: string
}

export default function PreviewScreen() {
    const [ links, setLinks ] = useState<Link[]>([]);

    const addLink = () => {
        const newLink: Link = {
            id: Date.now(),
            platform: '',
            url: ''
        };
        setLinks([...links, newLink]);
    }

    const updateLink = (id: number, field: 'platform' | 'url', value: string) => {
        setLinks(links.map(link =>
            link.id === id ? { ...link, [field]: value} : link
        ))
    }

    const removeLink = (id: number) => {
        setLinks(links.filter(link => link.id !== id));
    }
    
    return(
        <div className="flex flex-col gap-6 md:flex-row flex-grow">
          <div className="w-full lg:w-[40%] hidden lg:block">
            <div className="flex flex-col items-center justify-center rounded-[12px] bg-white px-14 py-[100px] h-full">
              <Image
                src={preview}
                width={306}
                height={630}
                alt="Preview Screen"
                className="h-[630px] w-[306px] object-contain"
              />
            </div>
          </div>
          <div className="flex-1 md:items-stretch flex">
            <div className="rounded-[12px] bg-white p-4 sm:p-6 md:p-8 w-full flex flex-col">
              <div className="flex flex-col items-center gap-[30px] py-6 sm:py-8 flex-grow">
                <div className="flex flex-col items-start gap-2 md:px-6 px-6 text-start w-full flex-grow">
                  <h1 className="text-[24px] sm:text-[32px] font-bold text-headings text-left w-full">
                    Customize your links
                  </h1>
                  <h2 className="text-[16px] font-normal text-sub-headings text-left w-full">
                    Add/edit/remove links below and then share all your profiles with the world!
                  </h2>
                  <div className="py-8 flex justify-center w-full">
                    <Button 
                      variant='outline' 
                      className="w-full sm:w-[300px] md:w-[640px] lg:w-full xl:w-[720px] items-center justify-center text-center cursor-pointer whitespace-nowrap rounded-lg font-semibold text-[16px]"
                      onClick={addLink}
                    >
                      + Add new link
                    </Button>
                  </div>
                  {
                    links.length === 0 ? 
                    (
                      <div className="flex flex-col items-center justify-center gap-5 rounded-[12px] bg-add-new px-14 py-16 md:p-5 flex-grow">
                        <Image
                          src={started}
                          width={250}
                          height={160}
                          alt="Let's get started"
                          className="h-[160px] w-[250px] object-contain mt-10"
                        />
                        <h1 className="text-[24px] sm:text-[32px] font-bold text-headings text-center w-full">
                          Let's get you started
                        </h1>
                        <h2 className="text-[16px] font-normal text-sub-headings text-center w-full pb-10">
                          Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!
                        </h2>
                      </div>
                    ) : (
                      links.map((link, index) => (
                        <div key={link.id} className="flex flex-col items-center justify-center gap-5 rounded-[12px] bg-add-new px-14 py-16 md:p-5 flex-grow">
                          
                        </div>
                      ))
                    )}
                </div>
              </div>
              <hr className="h-px mt-1 mb-5 bg-add-new border-1 w-full "/>
              <div className="flex md:justify-end w-full justify-center px-6">
                <Button variant='fill' className="rounded-lg font-semibold text-[16px] opacity-25 w-full sm:w-[300px] md:w-auto md:min-w-[90px] md:px-[26px]">Save</Button>
              </div>
            </div>
          </div>
        </div>
    )
}
'use client'

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { Reorder } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import preview from "@/public/illustration-phone-mockup.svg"
import started from "@/public/illustration-empty.svg"
import sort from "@/public/icon-drag-and-drop.svg"
import copy from "@/public/icon-link.svg"
import right from "@/public/icon-arrow-right.svg"

import { platforms } from "@/data/platform";
import { validURL } from "@/data/validURL";

interface Link{
    id: number;
    platform: string;
    url: string;
    isValid: boolean;
    isTouched: boolean;
    errorMessage: string;
}

export default function PreviewScreen() {
    const [ links, setLinks ] = useState<Link[]>([]);

    const validateUrl = useCallback((url: string): { isValid: boolean, errorMessage: string } => {
      if(url.trim() === '') {
        return {
          isValid: false,
          errorMessage: 'URL is required'
        };
      }
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' + 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' + 
        '(\\#[-a-z\\d_]*)?$','i'
      ); 
      return { 
        isValid: pattern.test(url), 
        errorMessage: pattern.test(url) ? '' : 'Please enter a valid URL'
      };
    }, []);

    const addLink = useCallback(() => {
        const newLink: Link = {
          id: Date.now(),
          platform: '',
          url: '',
          isValid: true,
          isTouched: true,
          errorMessage: ''
        };
        setLinks(prevLinks => [...prevLinks,newLink]);
      }
    ,[]);

    const displayedLinks = links.slice(0, 5);

    const getPlatformColor = (platformName: string) => {
      const platform = platforms.find(p => p.label === platformName);
      return platform ? platform.color : '#EEE';
    }

    const getPlatformIcon = (platformName: string) => {
      const platform = platforms.find(p => p.label === platformName);
      return platform ? platform.icon : ''; 
    }

    const getExampleURL = (platformName: string) => {
      const platform = validURL.find(p => p.platform === platformName);
      return platform ? platform.url : ''
    }

    const updateLink = useCallback((id: number, field: 'platform' | 'url', value: string) => {
      setLinks(prevLinks => prevLinks.map(link => {
          if (link.id === id) {
            const updatedLink = {
              ...link, [field]: value, isTouched: true
            };
            if (field === 'url') {
              const { isValid, errorMessage } = validateUrl(value)
              updatedLink.isValid = isValid;
              updatedLink.errorMessage = errorMessage;
            }
            return updatedLink;
          }
          return link;
        }
      ))
    }, [validateUrl]);

    const removeLink = useCallback((id: number) => {
      setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
      },[]
    );

    const handleReorder = useCallback((newOrder: Link[]) => {
      setLinks(newOrder);
      },[]
    );
    
    useEffect(() => {
    
    }, []);

    return(
        <div className="flex flex-col gap-6 md:flex-row flex-grow">
          <div className="w-full lg:w-[40%] hidden lg:block">
            <div className="flex flex-col items-center justify-center rounded-[12px] bg-white px-24 pt-32 h-full pb-10 mb-10 absolute">
              <div className="sticky top-0 h-[630px] w-[306px]">
                <Image
                  src={preview}
                  width={306}
                  height={630}
                  alt="Preview Screen"
                  className="object-contain flex-1 mx-auto"
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" fill="none" viewBox="0 0 308 632" className="absolute top-0 left-0">
                  <path stroke="none" d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"/>
                  <path fill="none" stroke="none" d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"/>
                  <circle cx="153.5" cy="112" r="48" fill="#EEE"/>
                  <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8"/>
                  <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4"/>
                  {
                    displayedLinks.map((link, index) => (
                      <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                        <g key={link.id} className="cursor-pointer">
                          <rect 
                            width="237" 
                            height="44" 
                            x="35" 
                            y={275 + index * 64} 
                            fill={link.platform ? getPlatformColor(link.platform) : '#EEE'} 
                            rx="8"
                          />
                          <foreignObject x="35" y={275 + index * 64} width="237" height="44">
                            {
                              link.platform ? (
                                <div className="flex items-center justify-between h-full px-4">
                                  <div className="flex items-center space-x-2">
                                    <Image 
                                      src={getPlatformIcon(link.platform)} 
                                      width={16} 
                                      height={16} 
                                      alt={link.platform} 
                                      className="fill-white"
                                    />
                                    <span className="text-white font-normal text-[12px]">{link.platform}</span>
                                  </div>
                                  <Image src={right} className="text-white" height={16} width={16} alt="right-arrow"/>
                              </div>
                              ): (
                                <div></div>
                              )
                            }
                          </foreignObject>
                        </g>
                      </a>
                    ))
                  }
                  {
                    [...Array(Math.max(5-displayedLinks.length, 0))].map((_, index) => (
                      <rect 
                        key={`empty-${index}`}
                        width="237" 
                        height="44" 
                        x="35" 
                        y={278 + (displayedLinks.length + index) * 64} 
                        fill="#EEE" 
                        rx="8"
                      />
                    ))
                  }
                </svg>
              </div>
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
                      className="w-full items-center justify-center text-center cursor-pointer whitespace-nowrap rounded-lg font-semibold text-[16px]"
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
                      <Reorder.Group axis="y" values={links} onReorder={handleReorder} className='flex flex-col gap-3 w-full'>
                      {
                      links.map((link, index) => (
                        <Reorder.Item value={link} key={link.id}>
                          <div key={link.id} className="w-full items-center justify-center gap-2 rounded-[12px] bg-add-new py-5 px-6 flex-grow">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-3">
                                <Image
                                  src={sort}
                                  width={12}
                                  height={6}
                                  alt="Sort Icon"
                                  className="h-[6px] w-[12px] object-contain cursor-move"
                                />
                                <h3 className="font-bold text-[16px] text-sub-headings">Link #{index + 1}</h3>
                              </div>
                              <Button onClick={() => removeLink(link.id)} variant="ghost" className="font-normal text-[16px] text-sub-headings">
                                Remove
                              </Button>
                            </div>
                            <div className="mb-2">
                              <label className="block text-sm font-medium mb-1">Platform</label>
                              <Select onValueChange={(value) => updateLink(link.id, 'platform', value)}>
                                <SelectTrigger>
                                  <SelectValue className="font-normal text-[12px] text-headings" placeholder="Select a platform" />
                                </SelectTrigger>
                                <SelectContent>
                                  {
                                    platforms.map((platform, index) => (
                                      <SelectItem key={index} value={platform.label} className="font-normal text-[16px] text-headings">
                                        <div className="flex items-center gap-3">
                                          <Image
                                            src={platform.icon}
                                            height={16}
                                            width={16}
                                            alt={platform.label}
                                            className={`h-4 w-4`}
                                          />
                                          <span>{platform.label}</span>
                                        </div>
                                      </SelectItem>
                                    ))
                                  }
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Link</label>
                              <Input
                                type="url"
                                placeholder={`${link.platform === 'Email' ? 'eg. johnappleseed@example.com' : 'e.g. https://www.'+getExampleURL(link.platform)+'johnappleseed'}`}
                                value={link.url}
                                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                icon={<Image src={copy} alt="link" height={16} width={16}/>}
                                errorMessage={
                                  `${!link.isValid && link.isTouched ? link.errorMessage : ''}`
                                }
                                className={
                                  `${!link.isValid && link.isTouched ? 'border-red-500 focus:ring-red-500 ring-offset-red-500 focus-within:ring-1 focus-within:ring-red-500 focus-within:ring-offset-0' : ''}`
                                }
                              />
                            </div>
                          </div>
                        </Reorder.Item>
                      ))}
                      </Reorder.Group>
                    )}
                </div>
              </div>
              <hr className="h-px mt-1 mb-5 bg-add-new border-1 w-full "/>
              <div className="flex md:justify-end w-full justify-center px-6">
                {
                  links.length === 0 ? 
                    (
                      <Button variant='fill' className="rounded-lg font-semibold text-[16px] opacity-25 w-full sm:w-[300px] md:w-auto md:min-w-[90px] md:px-[26px]">Save</Button>
                    ) : (
                      <Button variant='fill' className="rounded-lg font-semibold text-[16px] w-full sm:w-[300px] md:w-auto md:min-w-[90px] md:px-[26px]">Save</Button>
                    )
                }
              </div>
            </div>
          </div>
        </div>
    )
}
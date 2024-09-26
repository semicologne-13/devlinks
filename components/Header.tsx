import React from 'react'
import { Button } from './ui/button'
import Image from "next/image";

import logo from '@/public/logo-devlinks-large.svg'
import logo2 from '@/public/logo-devlinks-small.svg'
import Link from 'next/link';
import { navItems } from '@/data/nav';
import { HeaderButton } from './HeaderButton';

export default function Header(){
  return (
    <header className="py-4 flex justify-between items-center bg-white px-6 rounded-[12px]">
        <div className="flex items-center md:px-0 px-4">
            <Link href='/'>
                <Image
                    src={logo}
                    className="h-[32px] w-[146px] object-contain md:inline-block hidden"
                    width={146}
                    height={32}
                    alt="devlinks Logo"
                />
                <Image
                    src={logo2}
                    className="h-[32px] w-[32px] object-contain md:hidden"
                    width={146}
                    height={32}
                    alt="devlinks Logo"
                />
            </Link>
        </div>
        <nav className='mx-auto flex justify-center gap-2 md:w-auto'>
        {
            navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                    <HeaderButton icon={item.icon} href={item.href} className='mr-3 md:px-6 px-7'>
                        <span className="hidden md:inline">{item.label}</span>
                    </HeaderButton>
                </Link>
            ))
        }
        </nav>
        <Button variant="outline" className='hidden md:inline-flex text-[16px] font-semibold px-4 py-2'>
            Preview
        </Button>
        <Button variant="outline" className='md:hidden px-6'>
            <Image 
                src="/icon-preview-header.svg" 
                width={20} 
                height={20} 
                alt="Preview" 
            />
        </Button>
      </header>
  )
}


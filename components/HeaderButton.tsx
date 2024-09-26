'use client'

import { usePathname } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";
import Image from "next/image";

export function HeaderButton({ icon, href, ...props }: ButtonProps & { icon: string; href: string; }) {
    const pathname = usePathname();

    const variant = pathname === href ? "primary" : "secondary";

    return(
        <Button 
            variant={variant}
            className='flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap rounded-lg'
            {...props}
        >
            <Image
                src={icon}
                alt="header-icon"
                width={20}
                height={20}
                className="h-[20px] w-[20px]"
            />
            <span className="md:pl-2 text-[16px] font-semibold">{props.children}</span>
        </Button>
    )
}
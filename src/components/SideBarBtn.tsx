import clsx from "clsx"
import Link from "next/link"
import React, { JSX } from "react"

type Item = {
    icon: JSX.Element
    name: string
    ruta: string
}

export default function SideBarBtn({ item, isActive }: { item: Item, isActive: boolean }) {    
    return(
        <Link
            className={
                clsx(
                    isActive ? 'text-[#4AFF50]' : 'text-white',
                    'flex gap-5 items-center justify-center cursor-pointer p-2 rounded-md transition-all duration-200 hover:bg-[#363636]'
                )
            }
            href={item.ruta}
        >
            {item.icon}
            <p className='font-bold text-xl'>{item.name}</p>
        </Link>
    )
} 
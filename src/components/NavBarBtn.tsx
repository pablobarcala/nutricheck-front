import clsx from "clsx"
import Link from "next/link"
import React, { JSX } from "react"

type Item = {
    icon: JSX.Element
    name: string
    ruta: string
}

export default function NavBarBtn({ item, isActive }: { item: Item, isActive: boolean }) {    
    return(
        <div className="relative group">
            <Link
                className={clsx(`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                    font-medium text-sm
                    `,
                    isActive
                        ? 'text-[#4AFF50] bg-[#4AFF50]/10 border border-[#4AFF50]/30'
                        : 'text-white hover:text-[#4AFF50] hover:bg-[#363636]'
                )}
                href={item.ruta}
            >
                <div className="flex-shrink-0">{item.icon}</div>
            </Link>
            <span className="
                absolute left-1/2 transform -translate-x-1/2 translate-y-3
                mt-2 w-max px-2 py-1 text-xs text-white bg-[#363636]
                rounded shadow-lg hidden md:group-hover:block z-50
            ">
                {item.name}
            </span>
        </div>
    )
} 
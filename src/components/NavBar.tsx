'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Menu, MoonStar, Sun, X } from 'lucide-react';
import NavBarBtn from "./NavBarBtn";
import { useTheme } from "next-themes";

export default function NavBar({items}: {items: any[]}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const handleLogout = () => {
        const response = window.confirm("¿Desea cerrar sesión?")

        if (response) {
            localStorage.removeItem("token")
            router.push('/login')
        }
    }
    
    return(
        <nav className="bg-[#161616] border-b border-[#363636] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto py-4 px-10">
                <div className="flex justify-between items-center h-16">
                
                {/* Logo */}
                <div className="flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <img src="/logo.svg" className="w-[60%]" alt="Logo" />
                        {mounted ? (
                            <button 
                                className="bg-neutral-800 rounded-full p-2 text-white cursor-pointer hover:text-[#4AFF50] transition-colors duration-200" 
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            >
                                {theme === 'dark' ? <Sun size={24} /> : <MoonStar size={24} />}
                            </button>
                        ) : (
                            <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
                        )}
                    </div>
                </div>

                {/* Navegación desktop */}
                <div className="hidden md:block">
                    <div className="flex items-center space-x-4">
                    {items.map((item, index) => {
                        const isActive = pathname === item.ruta;
                        return (
                            <NavBarBtn 
                                key={index}
                                item={item}
                                isActive={isActive}
                            />
                        );
                    })}
                    <button
                        onClick={handleLogout}
                        className="text-sm cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-white hover:text-[#4aff50] hover:bg-[#363636] transition-all duration-200"
                    >
                        <LogOut size={18} />
                        <span>Salir</span>
                    </button>
                    </div>
                </div>

                {/* Botón de menú móvil */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white hover:text-[#4AFF50] transition-colors duration-200 p-2"
                    >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                </div>
            </div>

            {/* Menú móvil */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 bg-[#161616] border-t border-[#363636]">
                    {items.map((item, index) => {
                        const isActive = pathname === item.ruta;
                        return (
                            <a
                                key={index}
                                href={item.ruta}
                                className={`
                                    flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200
                                    ${isActive 
                                    ? 'text-[#4AFF50] bg-[#4AFF50]/10' 
                                    : 'text-white hover:text-[#4AFF50] hover:bg-[#363636]'
                                    }
                                `}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </a>
                        );
                    })}
                    <button
                        onClick={handleLogout}
                        className="text-sm cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-white hover:text-[#4aff50] hover:bg-[#363636] transition-all duration-200"
                    >
                        <LogOut size={18} />
                        <span>Salir</span>
                    </button>
                </div>
                </div>
            )}
        </nav>
    )
}
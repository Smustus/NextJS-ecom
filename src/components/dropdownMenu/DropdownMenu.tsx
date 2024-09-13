"use client"
import { ReactNode, useEffect, useRef } from 'react'

interface DropdownProps {
  children: ReactNode;
  isActive: boolean;
  toggleDropdown: () => void;
}

const DropdownMenu = ({ children, isActive, toggleDropdown }: DropdownProps) => { 

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      toggleDropdown();
    }
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className={`cursor-pointer hover:drop-shadow-lg`}>
        &#9776;
      </button>
      {isActive && 
      (<section className={`absolute flex flex-col top-full -right-full bg-stone-50 text-black shadow-lg rounded z-50 border-solid border-2 border-stone-100 px-2`}>
        {children}
      </section>
      )}
    </div>    
  )
}

export default DropdownMenu;
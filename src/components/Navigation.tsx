"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ComponentProps, ReactNode } from 'react'

interface NavigationProps {
  children: ReactNode;
  className?: string;
}

export const Navigation = ({ children, className }: NavigationProps) => {
  return (
    <nav className={`bg-stone-500 text-white h-auto w-full flex items-center p-3 ${className || ""}`}>
      { children }
    </nav>
  )
}

interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  className?: string;
  disabled?: boolean;
}

const BaseNavLink = ({ className, disabled, isCurrentPath, ...props }: NavLinkProps & { isCurrentPath?: boolean }) => {
  const path = usePathname();
  let commonClasses;
  if(path.startsWith("/admin")){
    commonClasses = `my-1 py-3 px-4 drop-shadow-lg hover:underline ${isCurrentPath ? "text-white bg-gradient-to-br from-stone-300 via-stone-400 to-stone-300 rounded-md" : ""} ${className || ""}`;
  } else {
    commonClasses = `my-1 py-3 px-4 drop-shadow-lg hover:underline ${isCurrentPath ? "text-white bg-gradient-to-b from-slate-700 via-slate-500 to-slate-700 rounded-md" : ""} ${className || ""}`;
  }
  
  
  if (disabled) {
    return (
      <span className={`${commonClasses} cursor-not-allowed text-stone-300`} aria-disabled="true">
        {props.children}
      </span>
    );
  }
  
  return (
    <Link {...props} className={`hover:opacity-70 focus-visible:outline-dotted focus-visible:opacity-70 ${commonClasses}`}>
      {props.children}
    </Link>
  );
}

export const NavLink = (props: NavLinkProps) => {
  const pathname = usePathname();
  return <BaseNavLink {...props} isCurrentPath={pathname === props.href} />;
}

export const DropdownLink = (props: NavLinkProps) => {  
  return <BaseNavLink {...props} />;
}




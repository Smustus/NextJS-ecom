"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = 'button',
  disabled = false,
  href
}) => {

  const path = usePathname();
  
  if(path.startsWith("/admin")){
    if(href) {
      return (
        <Link href={href} className={`text-white inline-block py-3 px-5 m-2 bg-gradient-to-br from-stone-700 via-stone-500 to-stone-700 rounded hover:text-stone-100 hover:bg-gradient-to-br hover:from-stone-500 hover:via-stone-400 hover:to-stone-600 hover:text-focus-visible:outline-dotted focus-visible:text-stone-400 focus-visible:rounded drop-shadow-lg w-fit h-fit font-semibold ${className || ""}`}>
            {children}
        </Link>
      );
    }
  
    return (
      <button type={type} onClick={onClick} className={`text-white inline-block py-3 px-5 m-2 bg-gradient-to-br from-stone-700 via-stone-500 to-stone-700 rounded hover:text-stone-100 hover:bg-gradient-to-br hover:from-stone-500 hover:via-stone-400 hover:to-stone-600 hover:text-focus-visible:outline-dotted focus-visible:text-stone-400 focus-visible:rounded drop-shadow-lg w-fit h-fit font-semibold ${className || ""}`} disabled={disabled}>
        {children}
      </button>
    );
  }
  
  //Outside admin pages
  if(href) {
    return (
      <Link href={href} className={`text-stone-100 inline-block p-3 m-2 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 rounded hover:text-white hover:bg-gradient-to-tr hover:from-slate-700 hover:via-slate-500 hover:to-slate-700 hover:text-focus-visible:outline-dotted focus-visible:text-stone-400 focus-visible:rounded drop-shadow-lg w-fit h-fit font-semibold text-center ${className || ""}`}>
          {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`text-stone-100 inline-block p-3 m-2 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 rounded hover:text-white hover:bg-gradient-to-tr hover:from-slate-700 hover:via-slate-500 hover:to-slate-700 hover:text-focus-visible:outline-dotted focus-visible:text-stone-400 focus-visible:rounded drop-shadow-lg w-fit h-fit font-semibold text-center ${className || ""} ${disabled ? "from-slate-600/50 via-slate-700/50 to-slate-800/50" : ""}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
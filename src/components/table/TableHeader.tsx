import { ReactNode } from "react"

interface TableHeaderProps {
  children?: ReactNode;
  className?: string;
}

const TableHeader = ({children, className}: TableHeaderProps) => {
  return (
    <h3 className={`mx-1 ${className}`}>
      {children}
    </h3>
  )
}

export default TableHeader
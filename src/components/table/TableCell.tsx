import { ReactNode } from "react"

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

const TableCell = ({children, className}: TableCellProps) => {

  return (
    <div className={`mx-1 ${className}`}>
      {children}
    </div>
  )
}

export default TableCell
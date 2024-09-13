"use client"
import React from "react";
import { ReactNode } from "react"

const TableRow = ({children}: {children: ReactNode}) => {
  const childrenArr = React.Children.toArray(children);
  const columns= childrenArr.length;

  const gridCols: { [key: number]: string } = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12'
  };

  const selectedGrid = gridCols[columns];
  
  return (
    <article className={`grid ${selectedGrid} bg-stone-50 rounded m-0.5 p-1 shadow items-center`}>
      {children}
    </article>
    
  )
}

export default TableRow;
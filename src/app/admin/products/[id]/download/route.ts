import prisma from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises'

export async function GET(req: NextRequest, {params: {id}}: {params: {id: string}}){
  const product = await prisma.product.findUnique({
    where: {id},
    select: {filePath: true, title: true}
  });
  if(product == null) return notFound();

  //Download link
  const { size } = await fs.stat(product.filePath); //file statistics
  console.log(size);
  
  const file = await fs.readFile(product.filePath); //contents of the file
  console.log(file);
  
  const extension = product.filePath.split(".").pop();  

  return new NextResponse(file, {headers: {
    "Content-Disposition": `attachment; filename="${product.title}.${extension}`, //specify how the content should be presented (attachment, with the filename composed of the product title and the file extension)
    "Content-Length": size.toString() //specify the size of the content in bytes
  }});
}
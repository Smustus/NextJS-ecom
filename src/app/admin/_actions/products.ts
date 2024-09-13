"use server"
import prisma from "@/db/db";
import { z } from "zod";
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

//https://developer.mozilla.org/en-US/docs/Web/API/FormData
//https://zod.dev/
//https://nodejs.org/api/fs.html

export async function toggleAvailable(id: string, available: boolean){
  await prisma.product.update({where: {id}, data: {available}})

  revalidatePath("/")
  revalidatePath("/products")
}

export async function deleteProduct(id: string){
  const product = await prisma.product.delete({where: {id}});
  if(product == null){
    return notFound();
  }
  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);

  revalidatePath("/")
  revalidatePath("/products")
}

const fileVal = z.instanceof(File, { message: "Instance of File Required"})
const imageVal = fileVal.refine(file => file.size === 0 || file.type.startsWith("image/"));

const inputValidation = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().int().min(1),
  image: imageVal.refine(file => file.size > 0, "Required"),
  file: fileVal.refine(file => file.size > 0, "Required")
})

const addProduct =  async (prevState: unknown, formData: FormData) => {
  console.log(formData);
  const checkForm = inputValidation.safeParse(Object.fromEntries(formData.entries())); //convert to object and validate formdata

  if(checkForm.success === false){
    return checkForm.error.formErrors.fieldErrors
  }
  const data = checkForm.data;
  console.log(data);

  //make directories and save
  await fs.mkdir("public/products", {recursive: true});
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`; //unique path
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

  await fs.mkdir("products", {recursive: true});
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`; //unique path
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
  
  await prisma.product.create({ data: {
    title: data.title,
    description: data.description,
    priceHundredth: data.price,
    filePath,
    imagePath,
    available: false
    } 
  });

  revalidatePath("/")
  revalidatePath("/products")
  redirect("/admin/products")
}

const editValidation = inputValidation.extend({
  file: fileVal.optional(),
  image: imageVal.optional()
});

export const editProduct =  async (id: string, prevState: unknown, formData: FormData) => {
  console.log(formData);
  const checkForm = editValidation.safeParse(Object.fromEntries(formData.entries())); //convert to object and validate formdata

  if(checkForm.success === false){
    return checkForm.error.formErrors.fieldErrors
  }

  const data = checkForm.data;
  const product = await prisma.product.findUnique({where: {id}});
  if(product == null) return notFound();

  //Make directories and save unless already uploaded
  //Image File
  let imagePath = product.imagePath;
  if(data.image != null && data.image.size > 0){
    await fs.unlink(`public${product.imagePath}`)
    imagePath = `/products/${crypto.randomUUID()}-${data.image?.name}`; //unique path
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image!.arrayBuffer()))
  }
 /*  await fs.mkdir("public/products", {recursive: true});
  const imagePath = `/products/${crypto.randomUUID()}-${data.image?.name}`; //unique path
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image!.arrayBuffer())) */

  //Download File
  let filePath = product.filePath;
  if(data.file != null && data.file.size > 0){
    await fs.unlink(product.filePath)
    filePath = `products/${crypto.randomUUID()}-${data.file?.name}`; //unique path
    await fs.writeFile(filePath, Buffer.from(await data.file!.arrayBuffer()))
  }
  /* await fs.mkdir("products", {recursive: true});
  const filePath = `products/${crypto.randomUUID()}-${data.file?.name}`; //unique path
  await fs.writeFile(filePath, Buffer.from(await data.file!.arrayBuffer())) */
  
  await prisma.product.update({where: {id}, data: {
    title: data.title,
    description: data.description,
    priceHundredth: data.price,
    filePath,
    imagePath,
    } 
  });

  revalidatePath("/")
  revalidatePath("/products")
  redirect("/admin/products")
}

export default addProduct
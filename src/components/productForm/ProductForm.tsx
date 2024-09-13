"use client"
import Label from "../Label"
import Input from "../Input"
import Button from "../Button"
import { useState, ChangeEvent, useEffect } from "react"
import { formatSEK } from "@/utilities/formatters"
import addProduct, { editProduct } from "../../app/admin/_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"

const ProductForm = ({product}: {product?: Product | null}) => {
  const [formData, setFormData] = useState<{ [key: string]: string | number }>({
    name: '',
    price: 0,
    description: ''
  });

  const [error, formAction] = useFormState(product == null ? addProduct : editProduct.bind(null, product.id), {});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'price' ? Number(value) : value
    }));
  };
  useEffect(() => {
    console.log(formData);
  });

  function SubmitBtn() {
    const { pending } = useFormStatus();  
    return <Button type="submit" disabled={pending}>
      {pending ? "Sparar" : "Spara" }
    </Button>
  }

  return (
    <>
    <form action={formAction}>
     <fieldset>
      <Label htmlFor="title" text="Produktnamn: " />
      <Input type="text" id="title" name="title" defaultValue={product?.title || ""} onChange={handleChange} required />
      {error.title && <article className="text-red-700">{error.title}</article>}
     </fieldset>

     <fieldset>
      <Label htmlFor="price" text="Pris(öre): " />
      <Input type="number" id="price" name="price" defaultValue={product?.priceHundredth || 0} required onChange={handleChange} />
      {error.price && <article className="text-red-700">{error.price}</article>}
      <div>
        {formatSEK(Number(formData.price) / 100) || 0}
      </div>
      
     </fieldset>

     <fieldset>
      <Label htmlFor="description" text="Produktbeskrivning: " />
      <textarea name="description" id="description" required onChange={handleChange} defaultValue={product?.description || ""} />
      {error.description && <article className="text-red-700">{error.description}</article>}
     </fieldset>

     <fieldset>
     <Label htmlFor="image" text="Bild: " />
     <Input type="file" id="image" name="image" required={product == null} />
     {product != null && (<>
      <div className="">{product.imagePath}</div>
      <Image className="" height="100" width="100" alt="Product picture" src={`${product.imagePath}`} />
      </>
     )}
     {error.image && <article className="text-red-700">{error.image}</article>}
     </fieldset>

     <fieldset>
     <Label htmlFor="file" text="Nedladdningsfil: " />
     <Input type="file" id="file" name="file" required={product == null} />
     {product != null && (
      <div className="">{product.filePath}</div>
     )}
     {error.file && <article className="text-red-700">{error.file}</article>}
     </fieldset>

     <SubmitBtn />
     
    </form>
    </>
  )
}

export default ProductForm
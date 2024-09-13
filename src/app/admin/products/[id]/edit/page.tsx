import PageHeader from "@/components/PageHeader"
import ProductForm from "../../../../../components/productForm/ProductForm"
import prisma from "@/db/db"

const EditProduct = async ({params: {id}}: {params: {id: string}}) => {
  const getProduct = await prisma.product.findUnique({where: {id}});
  return (
    <main className='bg-stone-200 w-full h-screen text-stone-800'>
      <PageHeader>Ändra produkt</PageHeader>
      <ProductForm product={getProduct}/>
    </main>
  )
}

export default EditProduct
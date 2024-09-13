import PageHeader from "@/components/PageHeader"
import ProductForm from "@/components/productForm/ProductForm"

const NewProduct = () => {
  return (
    <main className='bg-stone-200 w-full h-screen text-stone-800'>
      <PageHeader>Lägg till produkt</PageHeader>
      <ProductForm />
    </main>
  )
}

export default NewProduct
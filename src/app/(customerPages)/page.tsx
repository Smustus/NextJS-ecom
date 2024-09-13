import prisma from "@/db/db";
import { Product } from "@prisma/client";
import Button from "@/components/Button";
import CustomerCard, { CustomerCardEmpty } from "@/components/CustomerCard";
import { NavLink } from "@/components/Navigation";
import { Suspense } from "react";
import { caching } from "@/utilities/cache";

const getNewestProducts = caching(() => {
  return prisma.product.findMany({where: {available: true}, orderBy: { addedDate: "desc"}, take: 6});
}, ["/", "getNewestProducts"], {revalidate: 3600})

const getPopularProducts = caching(() => {
  return prisma.product.findMany({where: {available: true}, orderBy: {orders: {_count: "asc"}}, take: 6});
}, ["/", "getPopularProducts"], {revalidate: 86400})

type ProductGridSectionProps = {
  fetchProducts: () => Promise<Product[]>,
  title: string
}

function ProductGridSection({fetchProducts, title}: ProductGridSectionProps){
  return (
  <div className="space-y-4 m-4">
    <section className="flex gap-2 items-center">
      <h2 className="text-xl font-semibold my-2">{title}</h2>
      <Button href="/products" className="space-x-2 flex items-center justify-center bg-gradient-to-b from-transparent via-transparent to-transparent hover:text-slate-300 hover:bg-transparent  hover:text-focus-visible:outline-dotted focus-visible:text-stone-400 focus-visible:rounded py-1 px-3">
        Alla produkter
        <span className="text-lg mx-2">&#10153;</span>
      </Button>
    </section>
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center text-center'>
      <Suspense fallback={<><CustomerCardEmpty /></>}>
        <ProductSuspense fetchProducts={fetchProducts} />
      </Suspense>
    </section>
  </div>
  )
}
async function ProductSuspense({fetchProducts}: {fetchProducts: () => Promise<Product[]>}){
  return (await fetchProducts()).map(product => (
    <CustomerCard key={product.id} {...product}/>
  ))
}



export default function HomePage() {
  return ( 
    <>      
      <ProductGridSection fetchProducts={getNewestProducts} title="Nya produkter" />
      <ProductGridSection fetchProducts={getPopularProducts} title="Favoriter" />
    </> 
  );
}
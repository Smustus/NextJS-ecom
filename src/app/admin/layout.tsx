import { NavLink, Navigation } from '@/components/Navigation';

export const dynamic = "force-dynamic" //Opt out of caching for all data requests in the route segment
//https://nextjs.org/docs/app/building-your-application/caching


function AdminLayout({children,}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <Navigation className='flex justify-evenly bg-gradient-to-br from-stone-700 via-stone-500 to-stone-700 text-stone-100 '>
        <div className='flex items-center justify-center w-full'>
          <NavLink href="/admin">Dashboard</NavLink>
        </div>
        
        <div className='flex items-center justify-center w-full'>
          <NavLink href="/admin/products">Products</NavLink>
        </div>
        
        <div className='flex items-center justify-center w-full'>
          <NavLink href="/admin/users">Customers</NavLink>
        </div>

        <div className='flex items-center justify-center w-full'>
         <NavLink href="/admin/orders">Orders</NavLink>
        </div>  

        <div className='flex items-center justify-center w-full'>
          <NavLink href="/" className='flex items-center justify-center m-4'>Customer Pages</NavLink>
        </div>
      </Navigation>
      <div className="">
        {children}
      </div>
      
    </>
  );
}


export default AdminLayout
import prisma from '@/db/db'
import AdminCard from '@/components/AdminCard'
import Link from 'next/link'
import { formatSEK, formatNumber } from '@/utilities/formatters'
import PageHeader from '@/components/PageHeader'
import { NavLink } from '@/components/Navigation'

async function getSaleData() {
  const data = await prisma?.order.aggregate({
    _sum: { paidHundredth: true },
    _count: true
  })
  return {
    totalAmount: (data._sum.paidHundredth || 0) / 100,
    numberOfSales: data._count
  }
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    prisma?.user.count(),
    prisma?.order.aggregate({
      _sum: { paidHundredth: true },
    })
  ]);

  return {
    userCount, 
    averageSumPerUser: userCount === 0 ? 0 : (orderData._sum.paidHundredth || 0) / userCount / 100
  }
}

async function getProductData() {
  const [activeProd, inactiveProd] = await Promise.all([
    prisma?.product.count({where: {available: true}}),
    prisma?.product.count({where: {available: false}})
  ]);

  return {
    activeProd, 
    inactiveProd
  }
}

const AdminDashboard = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSaleData(),
    getUserData(),
    getProductData()
  ]);

  return (
    <main className='bg-stone-200 w-full h-screen text-stone-800'>
      <PageHeader>AdminDashboard</PageHeader>
    
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6 items-center text-center '>

        <AdminCard title="Försäljning" subtitle={formatNumber(salesData.numberOfSales)} data={formatSEK(salesData.totalAmount)}/>
        <AdminCard title="Användare" subtitle={formatNumber(userData.userCount)} data={`${formatSEK(userData.averageSumPerUser)} / användare`}/>
        <AdminCard title="Produkter" subtitle={formatNumber(productData.activeProd)} data={`${formatNumber(productData.inactiveProd)} Inaktiva`}/>
        
      </section>
      
    </main>
  )
}



export default AdminDashboard
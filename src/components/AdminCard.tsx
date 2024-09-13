import React from 'react'

type AdminDashboardCardProps = {
  title: string,
  subtitle: string,
  data: string
}

const AdminCard = ({title, subtitle, data}: AdminDashboardCardProps) => {
  return (
    <article className='m-1 p-4 border-2 border-stone-400/40 rounded'>
      <header>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </header>
      <section>
        <p>{data}</p>
      </section>
    </article>
  )
}

export default AdminCard
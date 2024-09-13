"use client";
import React, { useState } from 'react';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import TableRow from './TableRow';
import TableCell from './TableCell';
import { DropdownLink } from '@/components/Navigation';
import { formatNumber, formatSEK } from '@/utilities/formatters';
import TableCellInteractive from './TableCellInteractive';
import { DeleteItem, ToggleActiveItem } from '@/app/admin/_actions/productActions';
import MenuItemSeparator from '../dropdownMenu/MenuItemSeparator';
import { Product } from '@/app/admin/products/page';

interface AdminProductTableProps {
  products: Product[];
}

const AdminProductTable: React.FC<AdminProductTableProps> = ({ products }) => {
  console.log(products);
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (productId: string) => {
    setActiveDropdown(prevActiveDropdown => (prevActiveDropdown === productId ? null : productId));
  };

  return (
    <section className="grid">
      {products.map((product: Product) => (
        <TableRow key={product.id}>
          <TableCell>{product.title}</TableCell>
          <TableCell>{formatSEK(product.priceHundredth / 100)}</TableCell>
          <TableCell>{product.available ? <p className="text-green-700">Ja</p> : <p className="text-red-700">Nej</p>}</TableCell>
          <TableCell>{formatNumber(product._count.orders)}</TableCell>
          <TableCellInteractive>
            <div className="cursor-pointer inline-block">
              <DropdownMenu
                isActive={activeDropdown === product.id}
                toggleDropdown={() => handleDropdownToggle(product.id)}>
                <DropdownLink href="/admin" className='' disabled>DashBoard</DropdownLink>
                <MenuItemSeparator />
                <DropdownLink href={`/admin/products/${product.id}/edit`} className=''>Ändra</DropdownLink>
                <MenuItemSeparator />
                <ToggleActiveItem id={product.id} available={product.available} />
                <MenuItemSeparator />
                <DeleteItem id={product.id} disabled={product._count.orders > 0}/>
                <MenuItemSeparator />
                <a download href={`/admin/products/${product.id}/download`} className={`my-1 py-3 px-4 drop-shadow-lg hover:underline hover:opacity-70 focus-visible:outline-dotted focus-visible:opacity-70`}>
                  Ladda ner
                </a>
                {/* <DropdownLink download href={`/admin/products/${product.id}/download`}>Ladda ner</DropdownLink> */}
              </DropdownMenu>
            </div>
          </TableCellInteractive>
        </TableRow>
      ))}
    </section>
  );
};

export default AdminProductTable;
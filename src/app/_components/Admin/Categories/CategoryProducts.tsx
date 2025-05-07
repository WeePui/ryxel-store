'use client';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
} from '../../UI/Table';
import Image from 'next/image';
import NavLink from '../../UI/NavLink';
import { mappingStock } from '@/app/_utils/mappingStock';
import { getTintedColor } from '@/app/_helpers/getTintedColor';
import { Product } from '@/app/_types/product';
import formatMoney from '@/app/_utils/formatMoney';

// const data = [
//   {
//     _id: '1',
//     name: 'Product 1',
//     lowestPrice: 384728434,
//     updatedAt: '2023-1-1',
//     stock: 39848,
//     sold: 983498,
//     imageCover: '/anya-so-cute.jpg',
//   },
// ];

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({ products }: CategoryProductsProps) {
  return (
    <Card
      title="Sản phẩm theo danh mục"
      className="w-full"
      titleAction={<ProductSearchBar />}
    >
      <Table className="w-full font-semibold text-primary-500">
        <TableHeader>
          <TableHeaderRow className="grid-cols-7">
            <TableHeaderCell className="col-span-2">Sản phẩm</TableHeaderCell>
            <TableHeaderCell>Giá tiền</TableHeaderCell>
            <TableHeaderCell>Cập nhật</TableHeaderCell>
            <TableHeaderCell className="text-center">Tồn kho</TableHeaderCell>
            <TableHeaderCell>Đã bán</TableHeaderCell>
            <TableHeaderCell className="text-center">Thao tác</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableBodyRow
              className="grid-cols-7 items-center"
              key={product._id}
            >
              <TableBodyCell className="flex items-center gap-4 col-span-2">
                <div className="relative aspect-square w-16">
                  <Image
                    src={product.imageCover}
                    alt={product.name}
                    fill
                    className="rounded object-cover"
                  />
                </div>
                <p className="text-primary-500">{product.name}</p>
              </TableBodyCell>
              <TableBodyCell label="Giá">
                {formatMoney(product.lowestPrice)}
              </TableBodyCell>
              <TableBodyCell label="Cập nhật">
                {new Date(product.updatedAt).toLocaleDateString('vi-VN')}
              </TableBodyCell>
              <TableBodyCell
                className="flex justify-center md:flex-col"
                label="Tồn kho"
              >
                <div
                  className="py-1 px-2 text-xs w-fit rounded-full"
                  style={{
                    backgroundColor: getTintedColor(
                      mappingStock(product.totalStock).color
                    ),
                  }}
                >
                  <span
                    style={{ color: mappingStock(product.totalStock).color }}
                  >
                    {mappingStock(product.totalStock).text}
                  </span>
                </div>
              </TableBodyCell>
              <TableBodyCell label="Đã bán">{product.sold}</TableBodyCell>
              <TableBodyCell className="flex justify-center md:col-span-2">
                <NavLink
                  href={`/admin/products/${product.slug}`}
                  className="truncate"
                >
                  Xem chi tiết
                </NavLink>
              </TableBodyCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function ProductSearchBar() {
  return (
    <div className="flex items-center gap-4 py-2 h-full">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
      <Button className="truncate" size="small">
        <span>Tìm kiếm</span>
      </Button>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Card from '../../UI/Card';
import SearchBar from '../../Header/SearchBar';
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
import { getTintedColor } from '@/app/_helpers/getTintedColor';
import { mappingStock } from '@/app/_utils/mappingStock';
import NavLink from '../../UI/NavLink';
import { Product } from '@/app/_types/product';
import formatMoney from '@/app/_utils/formatMoney';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../../UI/Pagination';

// const data = [
//   {
//     _id: '1',
//     name: 'Product 1',
//     lowestPrice: 384728434,
//     updatedAt: '2023-1-1',
//     stock: 39848,
//     sold: 983498,
//     imageCover: '/anya-so-cute.jpg',
//     slug: 'product-1',
//   },
// ];

interface ProductsTableProps {
  products: Product[];
  totalProducts: number;
  resultsPerPage: number;
}

export default function ProductsTable({
  products,
  totalProducts,
  resultsPerPage,
}: ProductsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(totalProducts / resultsPerPage);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get('page')) || 1;

    setCurrentPage(page);
  }, [searchParams, products]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page + '');

    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(page);
  };

  return (
    <Card
      title="Sản phẩm theo danh mục"
      className="w-full"
      titleAction={
        <div className="justify-self-end">
          <SearchBar />
        </div>
      }
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
          {products && products.length > 0 ? (
            products.map((product) => (
              <TableBodyRow
                className="grid-cols-7 items-center"
                key={product._id}
              >
                <TableBodyCell className="flex items-center gap-4 col-span-2">
                  <div className="relative aspect-square w-16 flex-shrink-0">
                    <Image
                      src={product.imageCover}
                      alt={product.name}
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <p className="text-primary-500 line-clamp-3">
                    {product.name}
                  </p>
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
            ))
          ) : (
            <div className="col-span-full text-center py-4 text-gray-500">
              Không có sản phẩm nào
            </div>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handleChangePage}
        />
      </div>
    </Card>
  );
}

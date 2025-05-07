'use client';

import { useState } from 'react';
import Card from '../../UI/Card';
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
import TabSelector from '../../UI/TabSelector';
import { mappingStock } from '@/app/_utils/mappingStock';
import { getTintedColor } from '@/app/_helpers/getTintedColor';

const data = [
  {
    _id: 1,
    name: 'Anya so cute 1',
    variant: {
      _id: 1,
      name: 'Variant 1',
      sku: 'SKU123',
      sold: 10,
      stock: 5,
      images: ['/anya-so-cute.jpg'],
    },
  },
  {
    _id: 2,
    name: 'Anya so cute 2',
    variant: {
      _id: 2,
      name: 'Variant 2',
      sku: 'SKU456',
      sold: 20,
      stock: 0,
      images: ['/anya-so-cute.jpg'],
    },
  },
  {
    _id: 3,
    name: 'Anya so cute 3',
    variant: {
      _id: 3,
      name: 'Variant 3',
      sku: 'SKU789',
      sold: 30,
      stock: 15,
      images: ['/anya-so-cute.jpg'],
    },
  },
  {
    _id: 4,
    name: 'Anya so cute 4',
    variant: {
      _id: 4,
      name: 'Variant 4',
      sku: 'SKU101',
      sold: 40,
      stock: 20,
      images: ['/anya-so-cute.jpg'],
    },
  },
  {
    _id: 5,
    name: 'Anya so cute 5',
    variant: {
      _id: 5,
      name: 'Variant 5',
      sku: 'SKU112',
      sold: 50,
      stock: 260,
      images: ['/anya-so-cute.jpg'],
    },
  },
];

export default function TopSellingProducts() {
  const [range, setRange] = useState('day');

  return (
    <Card
      title="Sản phẩm bán chạy"
      className="flex flex-col gap-6 flex-grow pb-10"
      titleAction={
        <TabSelector
          tabLabels={['Theo ngày', 'Theo tuần', 'Theo tháng']}
          tabValues={['day', 'week', 'month']}
          selectedTab={range}
          onTabSelect={setRange}
        />
      }
    >
      <Table>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>STT</TableHeaderCell>
            <TableHeaderCell className="col-span-3">Sản phẩm</TableHeaderCell>
            <TableHeaderCell>Lượt bán</TableHeaderCell>
            <TableHeaderCell className="text-center md:text-right">
              Tồn kho
            </TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.map((product, index) => (
            <TableBodyRow key={product._id}>
              <TableBodyCell
                label="STT :"
                className="flex items-center md:items-start gap-6 md:order-2 md:col-span-6"
              >
                <span className="font-bold">{index + 1}</span>
              </TableBodyCell>
              <TableBodyCell className="flex items-center gap-4 col-span-3 md:justify-between w-full md:flex-col md:order-1">
                <div className="relative aspect-square md:aspect-video w-12 md:w-full">
                  <Image
                    src={product.variant.images[0]}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div>
                  <span className="font-bold text-primary-500">
                    {product.name} - {product.variant.name}
                  </span>
                  <p className="text-sm text-grey-500">{product.variant.sku}</p>
                </div>
              </TableBodyCell>
              <TableBodyCell
                label="Lượt bán"
                className="md:order-3 text-left flex items-center md:flex-col md:items-start"
              >
                <span className="font-bold">{product.variant.sold}</span>
              </TableBodyCell>
              <TableBodyCell
                label="Tồn kho"
                className="md:order-4 flex items-center justify-center md:flex-col md:items-end"
              >
                <div
                  className="flex items-center gap-2 rounded-full text-white w-fit px-2 py-1 justify-center"
                  style={{
                    color: mappingStock(product.variant.stock).color,
                    backgroundColor: getTintedColor(
                      mappingStock(product.variant.stock).color
                    ),
                  }}
                >
                  <span className="font-bold whitespace-nowrap text-xs">
                    {mappingStock(product.variant.stock).text}
                  </span>
                </div>
              </TableBodyCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

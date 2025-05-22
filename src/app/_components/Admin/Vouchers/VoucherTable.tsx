'use client';

import {
  Table,
  TableHeader,
  TableHeaderRow,
  TableBodyCell,
  TableBody,
  TableBodyRow,
  TableHeaderCell,
} from '../../UI/Table';
import formatMoney from '@/app/_utils/formatMoney';
import Button from '../../UI/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../../UI/Pagination';
import { useEffect, useState } from 'react';
import Card from '../../UI/Card';
import SearchBar from '../../Header/SearchBar';
import Modal from '../../UI/Modal';
import AddVoucherForm from './AddVoucherForm';

// Cập nhật interface để khớp với mô hình database
interface Discount {
  _id: string;
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  maxUse: number;
  minOrderValue: number;
  discountPercentage: number;
  discountMaxValue: number;
  maxUsePerUser: number;
  usedUser: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VoucherTableProps {
  data: Discount[];
  totalResults?: number;
  resultsPerPage?: number;
}

export default function VoucherTable({
  data,
  totalResults = 0,
  resultsPerPage = 10,
}: VoucherTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<Discount | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get('page')) || 1;

    setCurrentPage(page);
  }, [searchParams, data]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page + '');

    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(page);
  };

  // Cập nhật cách tính số lượt còn lại
  const getRemainingUses = (voucher: Discount) => {
    return voucher.maxUse - (voucher.usedUser?.length || 0);
  };

  const getStatusBadge = (voucher: Discount) => {
    const now = new Date();
    const startDate = new Date(voucher.startDate);
    const endDate = new Date(voucher.endDate);
    const remainingUses = getRemainingUses(voucher);

    if (!voucher.isActive) {
      return { text: 'Không kích hoạt', color: '#6B7280' }; // gray
    } else if (now < startDate) {
      return { text: 'Chưa bắt đầu', color: '#3B82F6' }; // blue
    } else if (now > endDate) {
      return { text: 'Hết hạn', color: '#EF4444' }; // red
    } else if (remainingUses <= 0) {
      return { text: 'Hết lượt', color: '#F59E0B' }; // amber
    } else {
      return { text: 'Đang hoạt động', color: '#10B981' }; // green
    }
  };

  // Cập nhật cách định dạng giá trị giảm giá
  const formatDiscountValue = (voucher: Discount) => {
    // Server always uses percentage model
    return `${voucher.discountPercentage}%`;
  };

  return (
    <Card
      className="w-full"
      title="Danh sách mã giảm giá"
      titleAction={
        <div className="justify-self-end flex items-center gap-2">
          <Button size="small" onClick={() => setOpenModal(true)}>
            Thêm mã giảm giá
          </Button>
          <SearchBar />
        </div>
      }
    >
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <AddVoucherForm />
        </Modal>
      )}
      {data && data.length > 0 ? (
        <div className="flex flex-col">
          <Table className="w-full">
            <TableHeader className="w-full">
              <TableHeaderRow className="grid-cols-7">
                <TableHeaderCell className="col-span-1">
                  Mã voucher
                </TableHeaderCell>
                <TableHeaderCell className="col-span-2">Tên</TableHeaderCell>
                <TableHeaderCell className="col-span-1">
                  Giá trị
                </TableHeaderCell>
                <TableHeaderCell className="col-span-1 text-center">
                  Trạng thái
                </TableHeaderCell>
                <TableHeaderCell className="col-span-1">
                  Thời hạn
                </TableHeaderCell>
                <TableHeaderCell className="col-span-1 flex items-center justify-center">
                  Thao tác
                </TableHeaderCell>
              </TableHeaderRow>
            </TableHeader>
            <TableBody>
              {data.map((voucher) => (
                <TableBodyRow
                  key={voucher._id}
                  className="hover:bg-gray-100 grid-cols-7"
                >
                  <TableBodyCell className="col-span-1 flex items-center gap-2 md:col-span-1 md:gap-4">
                    <span className="font-bold">{voucher.code}</span>
                  </TableBodyCell>
                  <TableBodyCell
                    className="col-span-2 flex items-center justify-between"
                    label="Tên"
                  >
                    <div>
                      <p>{voucher.name}</p>
                      <p className="text-sm text-gray-500">
                        Còn lại: {getRemainingUses(voucher)}/{voucher.maxUse}{' '}
                        lượt
                      </p>
                    </div>
                  </TableBodyCell>
                  <TableBodyCell
                    className="col-span-1 flex items-center justify-between"
                    label="Giá trị"
                  >
                    <div>
                      <p className="font-semibold">
                        {formatDiscountValue(voucher)}
                      </p>
                      {voucher.minOrderValue > 0 && (
                        <p className="text-xs text-gray-500">
                          Tối thiểu: {formatMoney(voucher.minOrderValue)}
                        </p>
                      )}
                      {voucher.discountMaxValue && (
                        <p className="text-xs text-gray-500">
                          Giảm tối đa: {formatMoney(voucher.discountMaxValue)}
                        </p>
                      )}
                    </div>
                  </TableBodyCell>
                  <TableBodyCell
                    className="col-span-1 flex items-center justify-center md:justify-between"
                    label="Trạng thái"
                  >
                    {
                      <div
                        className="flex items-center justify-center w-28 rounded-full text-white font-semibold p-1 text-xs"
                        style={{
                          backgroundColor: getStatusBadge(voucher).color,
                        }}
                      >
                        <span className="whitespace-nowrap">
                          {getStatusBadge(voucher).text}
                        </span>
                      </div>
                    }
                  </TableBodyCell>
                  <TableBodyCell
                    className="col-span-1 flex flex-col items-start"
                    label="Thời hạn"
                  >
                    <span className="text-sm">
                      Từ:{' '}
                      {new Date(voucher.startDate).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="text-sm">
                      Đến:{' '}
                      {new Date(voucher.endDate).toLocaleDateString('vi-VN')}
                    </span>
                  </TableBodyCell>
                  <TableBodyCell className="col-span-1 flex items-center justify-center">
                    <Button
                      size="small"
                      onClick={() => setEditingVoucher(voucher)}
                    >
                      Chi tiết
                    </Button>
                  </TableBodyCell>
                </TableBodyRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handleChangePage}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-96 text-gray-500">
          <p className="text-lg">Không có mã giảm giá nào</p>
        </div>
      )}
      {editingVoucher && (
        <Modal
          onClose={() => setEditingVoucher(null)}
          closeOnOutsideClick={false}
        >
          <AddVoucherForm discount={editingVoucher} />
        </Modal>
      )}
    </Card>
  );
}

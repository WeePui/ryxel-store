import React from 'react';
import NavLink from '../_components/UI/NavLink';
import { FaChevronRight } from 'react-icons/fa6';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Liên hệ với Ryzel Store.',
};

export default function page() {
  return (
    <div className="mx-auto mt-14 lg:mt-4  flex w-full max-w-7xl flex-col gap-10 xl:px-6">
      <div>
        <h1 className="font-title text-3xl font-semibold text-primary-500">
          Liên hệ
        </h1>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400">
          <NavLink href="/">
            <span className="text-grey-400">Trang chủ</span>
          </NavLink>
          <FaChevronRight className="text-xs" />
          <span className="text-primary-500">Liên hệ</span>
        </div>
      </div>
      <div className="max-w-4xl mx-auto text-left flex flex-col gap-6 text-grey-700">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-4xl font-title tracking-wide text-primary-500">
            Liên hệ với chúng tôi!
          </h2>
          <p className="font-semibold">
            Tại Ryxel Store, chúng tôi luôn đặt khách hàng lên hàng đầu và cam
            kết mang đến dịch vụ hỗ trợ khách hàng tốt nhất. Chúng tôi tự hào
            khi nhận được nhiều lời khen về sự chuyên nghiệp và tận tâm của đội
            ngũ hỗ trợ. Với chúng tôi, chất lượng dịch vụ luôn phải đạt tiêu
            chuẩn cao nhất. Dù bạn gặp vấn đề kỹ thuật, muốn đặt trước sản phẩm,
            kiểm tra tình trạng hàng hay cần tư vấn mua sắm, chúng tôi luôn sẵn
            sàng giúp đỡ.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-2xl ">Cách liên hệ với chúng tôi</h3>
          <p className="font-medium">
            Đừng ngần ngại liên hệ với chúng tôi qua email hoặc số điện thoại.
            Chúng tôi cung cấp nhiều kênh hỗ trợ khác nhau để bạn có thể nhận
            được sự trợ giúp theo cách thuận tiện nhất. Thời gian làm việc của
            bộ phận chăm sóc khách hàng là{' '}
            <strong className="text-primary-500">
              cả tuần, 08:00 - 17:00 (Giờ Việt Nam - ICT: UTC+07:00)
            </strong>
            . Dưới đây là các địa chỉ email để bạn liên hệ với đúng bộ phận nhằm
            được hỗ trợ nhanh nhất.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-2xl">
            Câu hỏi chung hoặc liên quan đến đơn hàng
          </h3>
          <p className="font-medium">
            Nếu bạn có thắc mắc về sản phẩm hoặc các vấn đề chung, vui lòng liên
            hệ{' '}
            <NavLink type="mainNavInline" href="mailto:info@ryxelstore.com">
              <span className="border-b-[1px]">
                <strong>info@ryxelstore.com</strong>
              </span>
            </NavLink>
            . Chúng tôi sẽ hỗ trợ bạn trong mọi trường hợp, từ thay đổi sản
            phẩm, hủy đơn hàng cho đến các câu hỏi khác. Khi gửi email về đơn
            hàng, vui lòng cung cấp Mã đơn hàng hoặc Số khách hàng để chúng tôi
            có thể xử lý nhanh chóng.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-2xl">Hỗ trợ kỹ thuật & đổi trả</h3>
          <p className="font-medium">
            Sau khi nhận hàng, nếu bạn cần hỗ trợ về cách sử dụng sản phẩm hoặc
            muốn đổi/trả hàng, vui lòng liên hệ{' '}
            <NavLink type="mainNavInline" href="tel:+8491282383">
              <span className="border-b-[1px]">
                <strong>(+84) 912 823 83</strong>
              </span>
            </NavLink>{' '}
            hoặc email{' '}
            <NavLink type="mainNavInline" href="mailto:support@ryxelstore.com">
              <span className="border-b-[1px]">
                <strong>support@ryxelstore.com</strong>
              </span>
            </NavLink>
            . Chúng tôi sẽ hướng dẫn bạn các bước tiếp theo sau khi nhận được
            yêu cầu. Khi gửi email về đổi/trả hàng hoặc bảo hành, hãy ghi rõ Mã
            đơn hàng trong tiêu đề email để chúng tôi xử lý nhanh nhất.
          </p>
        </div>
      </div>
    </div>
  );
}

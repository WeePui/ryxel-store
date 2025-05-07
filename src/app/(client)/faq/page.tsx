import { Metadata } from 'next';
import React from 'react';
import NavLink from '../../_components/UI/NavLink';
import { FaChevronRight } from 'react-icons/fa6';
import FAQItem from '../../_components/FAQ/FAQItem';

export const metadata: Metadata = {
  title: 'Câu hỏi thường gặp',
  description: 'Câu hỏi thường gặp của Ryzel Store.',
};

const faqs = [
  {
    question: 'Ryxel Store là gì?',
    answer:
      'Ryxel Store là cửa hàng chuyên cung cấp gaming gear và phụ kiện PC, bao gồm chuột, bàn phím, tai nghe, ghế gaming, bàn gaming và nhiều sản phẩm khác dành cho game thủ.',
  },
  {
    question: 'Tôi có thể thanh toán bằng những phương thức nào?',
    answer: (
      <span>
        Bạn có thể thanh toán bằng{' '}
        <strong>thẻ tín dụng, chuyển khoản ngân hàng, hoặc ví điện tử</strong>.
      </span>
    ),
  },
  {
    question: 'Tôi có thể đặt hàng tại Ryxel Store như thế nào?',
    answer:
      'Bạn có thể đặt hàng trực tiếp trên website bằng cách chọn sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán theo hướng dẫn.',
  },
  {
    question: 'Tôi có thể đổi trả sản phẩm không?',
    answer: (
      <span>
        Có. Nếu sản phẩm bị lỗi hoặc không đúng như mô tả, bạn có thể liên hệ{' '}
        <NavLink type="mainNavInline" href="mailto:support@ryxelstore.com">
          <strong>support@ryxelstore.com</strong>
        </NavLink>{' '}
        trong vòng 7 ngày kể từ khi nhận hàng để được hướng dẫn đổi/trả.
      </span>
    ),
  },
  {
    question: 'Có cách nào để theo dõi đơn hàng không?',
    answer:
      'Có. Sau khi đặt hàng, bạn sẽ nhận được email xác nhận có chứa thông tin theo dõi đơn hàng của mình.',
  },
];

export default function page() {
  return (
    <div className="mx-auto mt-14 lg:mt-4  flex w-full max-w-7xl flex-col gap-10 xl:px-6">
      <div>
        <h1 className="font-title text-3xl font-semibold text-primary-500">
          Câu hỏi thường gặp
        </h1>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400">
          <NavLink href="/">
            <span className="text-grey-400">Trang chủ</span>
          </NavLink>
          <FaChevronRight className="text-xs" />
          <span className="text-primary-500">Câu hỏi thường gặp</span>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="max-w-3xl flex flex-col gap-6 text-grey-700 w-full">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import NavLink from '../../_components/UI/NavLink';
import { FaChevronRight } from 'react-icons/fa6';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều khoản và Dịch vụ',
  description: 'Điều khoản và Dịch vụ của Ryxel Store.',
};

export default function Page() {
  return (
    <div className="mx-auto mt-14 lg:mt-4 flex w-full max-w-7xl flex-col gap-10 xl:px-6">
      <div>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400">
          <NavLink href="/">
            <span className="text-grey-400">Trang chủ</span>
          </NavLink>
          <FaChevronRight className="text-xs" />
          <span className="text-primary-500">Điều khoản và Dịch vụ</span>
        </div>
      </div>
      <div className="max-w-4xl mx-auto text-left flex flex-col gap-6 text-grey-700">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-4xl font-title tracking-wide text-primary-500">
            Điều khoản và Dịch vụ
          </h2>
          <p className="italic">Ngày có hiệu lực: 24/02/2025</p>
          <p className="font-medium">
            Chào mừng bạn đến với Ryxel! Trước khi sử dụng ứng dụng của chúng
            tôi, vui lòng đọc kỹ các điều khoản và dịch vụ dưới đây. Bằng cách
            sử dụng ứng dụng của chúng tôi, bạn đồng ý tuân thủ và bị ràng buộc
            bởi các điều khoản này.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl ">1. Chấp nhận Điều khoản</h3>
          <p className="font-medium">
            Bằng cách truy cập và sử dụng Ryxel, bạn đồng ý tuân thủ các điều
            khoản và dịch vụ này. Nếu bạn không đồng ý với bất kỳ phần nào của
            các điều khoản này, vui lòng không sử dụng ứng dụng của chúng tôi.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl ">2. Sửa đổi Điều khoản</h3>
          <p className="font-medium">
            Chúng tôi có quyền sửa đổi các điều khoản này bất kỳ lúc nào. Mọi
            thay đổi sẽ được thông báo trên trang web hoặc trong ứng dụng và có
            hiệu lực ngay lập tức sau khi đăng. Việc bạn tiếp tục sử dụng ứng
            dụng sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều
            khoản mới.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl ">3. Quyền riêng tư</h3>
          <p className="font-medium">
            Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Vui lòng xem Chính
            sách Quyền riêng tư của chúng tôi để biết thêm chi tiết về cách
            chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl ">4. Sử dụng Ứng dụng</h3>
          <p className="font-medium">
            Bạn đồng ý sử dụng Ryxel chỉ cho các mục đích hợp pháp và tuân thủ
            tất cả các quy định pháp luật hiện hành. Bạn không được sử dụng ứng
            dụng của chúng tôi để:
          </p>
          <ul className="font-medium list-disc ml-10">
            <li>
              Phát tán bất kỳ nội dung trái pháp luật, khiêu dâm, hoặc vi phạm
              quyền sở hữu trí tuệ.
            </li>
            <li>Thực hiện bất kỳ hành vi lừa đảo hoặc gian lận nào.</li>
            <li>
              Can thiệp vào hoạt động của ứng dụng hoặc phá hoại hệ thống của
              chúng tôi.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl ">5. Sản phẩm và Dịch vụ</h3>
          <p className="font-medium">
            Ryxel cung cấp các sản phẩm và dịch vụ liên quan đến gaming, bao gồm
            nhưng không giới hạn ở các sản phẩm phần cứng, phần mềm, và phụ kiện
            chơi game. Chúng tôi cam kết cung cấp sản phẩm và dịch vụ chất lượng
            cao, nhưng không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh
            từ việc sử dụng sản phẩm và dịch vụ của chúng tôi.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl ">6. Thanh toán và Hoàn tiền</h3>
          <p className="font-medium">
            Các chính sách thanh toán và hoàn tiền được áp dụng cụ thể cho từng
            sản phẩm và dịch vụ. Vui lòng xem thông tin chi tiết về chính sách
            thanh toán và hoàn tiền trên trang sản phẩm hoặc liên hệ với bộ phận
            hỗ trợ khách hàng của chúng tôi.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl ">7. Sở hữu trí tuệ</h3>
          <p className="font-medium">
            Toàn bộ nội dung trên Ryxel, bao gồm nhưng không giới hạn ở văn bản,
            đồ họa, logo, biểu tượng, hình ảnh và phần mềm, là tài sản của chúng
            tôi hoặc các nhà cung cấp của chúng tôi và được bảo vệ bởi luật sở
            hữu trí tuệ.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">8. Giới hạn Trách nhiệm</h3>
          <p className="font-medium">
            Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh
            từ việc sử dụng hoặc không thể sử dụng Ryxel. Bạn đồng ý rằng việc
            sử dụng ứng dụng là hoàn toàn tự nguyện và tại rủi ro của bạn.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">9. Liên hệ</h3>
          <p className="font-medium">
            Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về các điều khoản này,
            vui lòng liên hệ với chúng tôi qua email:{' '}
            <NavLink type="mainNavInline" href="mailto:support@ryxelstore.com">
              <span className="border-b-[1px]">
                <strong>support@ryxelstore.com</strong>
              </span>
            </NavLink>{' '}
            hoặc số điện thoại{' '}
            <NavLink type="mainNavInline" href="tel:+8491282383">
              <span className="border-b-[1px]">
                <strong>(+84) 912 823 83</strong>
              </span>
            </NavLink>{' '}
            .
          </p>
        </div>
      </div>
    </div>
  );
}

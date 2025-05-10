import NavLink from '@/app/_components/UI/NavLink';
import { Metadata } from 'next';
import { FaChevronRight } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'Chính sách Quyền riêng tư',
  description: 'Chính sách Quyền riêng tư của Ryxel Store.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto mt-14 lg:mt-4 flex w-full max-w-7xl flex-col gap-10 xl:px-6">
      <div>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400">
          <NavLink href="/">
            <span className="text-grey-400">Trang chủ</span>
          </NavLink>
          <FaChevronRight className="text-xs" />
          <span className="text-primary-500">Chính sách Quyền riêng tư</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-left flex flex-col gap-6 text-grey-700">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-4xl font-title tracking-wide text-primary-500">
            Chính sách Quyền riêng tư
          </h2>
          <p className="italic">Ngày có hiệu lực: 24/04/2025</p>
          <p className="font-medium">
            Tại Ryxel Store, chúng tôi coi trọng sự riêng tư và bảo mật của
            khách hàng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và
            bảo vệ thông tin cá nhân của bạn khi sử dụng trang web và ứng dụng
            Ryxel.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">1. Thông tin Chúng tôi Thu thập</h3>
          <p className="font-medium">
            Chúng tôi có thể thu thập các loại thông tin sau:
          </p>
          <ul className="font-medium list-disc ml-10">
            <li>
              Thông tin cá nhân như tên, email, số điện thoại, địa chỉ giao
              hàng.
            </li>
            <li>Thông tin thanh toán và lịch sử đơn hàng.</li>
            <li>
              Dữ liệu sử dụng, chẳng hạn như trang bạn truy cập và thời gian sử
              dụng.
            </li>
            <li>
              Thông tin thiết bị (bao gồm iPhone, iPad hoặc thiết bị Android) để
              tối ưu trải nghiệm.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">2. Mục đích Sử dụng Thông tin</h3>
          <p className="font-medium">Thông tin của bạn được dùng để:</p>
          <ul className="font-medium list-disc ml-10">
            <li>Xử lý đơn hàng và cung cấp dịch vụ khách hàng.</li>
            <li>
              Phân tích hành vi để cải thiện UI/UX, bao gồm cả trên mobile app
              và website.
            </li>
            <li>
              Gửi thông báo khuyến mãi, cập nhật sản phẩm mới (nếu bạn đồng ý).
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">3. Bảo mật Dữ liệu</h3>
          <p className="font-medium">
            Chúng tôi sử dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo
            vệ thông tin cá nhân khỏi truy cập trái phép, mất mát hoặc sử dụng
            sai mục đích. Tất cả dữ liệu được lưu trữ an toàn trên hệ thống được
            mã hóa và tuân thủ các quy định bảo mật hiện hành.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">4. Chia sẻ Thông tin</h3>
          <p className="font-medium">
            Chúng tôi không bán hoặc chia sẻ thông tin cá nhân cho bên thứ ba
            ngoại trừ các trường hợp:
          </p>
          <ul className="font-medium list-disc ml-10">
            <li>
              Phục vụ giao hàng hoặc xử lý thanh toán thông qua bên cung cấp
              dịch vụ đáng tin cậy.
            </li>
            <li>Tuân thủ yêu cầu pháp lý từ cơ quan có thẩm quyền.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">5. Quyền của Người dùng</h3>
          <p className="font-medium">
            Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân
            của mình bất kỳ lúc nào bằng cách liên hệ với chúng tôi. Ngoài ra,
            bạn có thể từ chối nhận email marketing bất kỳ lúc nào.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">6. Cookies và Tracking</h3>
          <p className="font-medium">
            Chúng tôi sử dụng cookies để cải thiện hiệu năng và cá nhân hóa trải
            nghiệm người dùng. Bạn có thể điều chỉnh cài đặt cookies trong trình
            duyệt hoặc trong phần cài đặt của ứng dụng.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">7. Liên hệ</h3>
          <p className="font-medium">
            Nếu bạn có bất kỳ câu hỏi nào liên quan đến chính sách này, vui lòng
            liên hệ với chúng tôi qua email:{' '}
            <NavLink type="mainNavInline" href="mailto:support@ryxelstore.com">
              <span className="border-b-[1px] font-semibold">
                support@ryxelstore.com
              </span>
            </NavLink>{' '}
            hoặc gọi cho chúng tôi theo số:{' '}
            <NavLink type="mainNavInline" href="tel:+8491282383">
              <span className="border-b-[1px] font-semibold">
                (+84) 912 823 83
              </span>
            </NavLink>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

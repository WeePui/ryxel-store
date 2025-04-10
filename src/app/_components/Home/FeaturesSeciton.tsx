import React from 'react';
import {
  FaCreditCard,
  FaHeadset,
  FaShieldHeart,
  FaThumbsUp,
  FaTruck,
} from 'react-icons/fa6';

export default function FeaturesSeciton() {
  return (
    <section className="flex max-w-7xl mx-auto px-4 py-20 gap-24">
      <div className="flex-[3] tracking-wider text-gray-700 flex flex-col justify-start gap-4">
        <p className="font-title text-5xl">Lí do để mua hàng tại Ryxel.com</p>
        <p>
          Tại Ryxel, chúng tôi không chỉ cung cấp thiết bị gaming cao cấp, mà
          còn mang đến trải nghiệm mua sắm chuyên nghiệp, nhanh chóng và tận
          tâm.
        </p>
      </div>
      <div className="flex-[7] grid grid-cols-3 gap-12">
        <div className="flex items-start flex-col">
          <FaTruck className="text-5xl" />
          <span className="font-bold mt-4">Giao hàng hoả tốc</span>
          <span className="text-sm text-gray-500 mt-2 font-semibold max-w-48">
            Nhận hàng trong ngày tại TP.HCM và Hà Nội. Tối đa 2 ngày cho các
            tỉnh thành khác.
          </span>
        </div>
        <div className="flex items-start flex-col">
          <FaShieldHeart className="text-5xl" />
          <span className="font-bold mt-4">Đổi trả dễ dàng</span>
          <span className="text-sm text-gray-500 mt-2 font-semibold max-w-48">
            Mua sắm không âu lo với chính sách đổi trả trong vòng 7 ngày. Hoàn
            tiền 100% nếu sản phẩm không đúng như mô tả.
          </span>
        </div>
        <div className="flex items-start flex-col">
          <FaCreditCard className="text-5xl" />
          <span className="font-bold mt-4">Thanh toán linh hoạt</span>
          <span className="text-sm text-gray-500 mt-2 font-semibold max-w-48">
            Hỗ trợ nhiều hình thức thanh toán như chuyển khoản, thẻ tín dụng, ví
            điện tử và thanh toán khi nhận hàng (COD).
          </span>
        </div>
        <div className="flex items-start flex-col">
          <FaHeadset className="text-5xl" />
          <span className="font-bold mt-4">Hỗ trợ khách hàng 24/7</span>
          <span className="text-sm text-gray-500 mt-2 font-semibold max-w-48">
            Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn
            mọi lúc, mọi nơi.
          </span>
        </div>
        <div className="flex items-start flex-col">
          <FaThumbsUp className="text-5xl" />
          <span className="font-bold mt-4">Sản phẩm cao cấp</span>
          <span className="text-sm text-gray-500 mt-2 font-semibold max-w-48">
            Cam kết cung cấp các sản phẩm chính hãng, chất lượng cao từ các
            thương hiệu nổi tiếng trong ngành gaming.
          </span>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Huy Bùi - CEO, Co-Founder Ryxel',
    image: '/testimonials/testimonial-huy-bui.jpg',
    text: 'Không biết nói gì, Anya dễ thương vãi ò. 10 điểm không nhưng. Anyaaaaaaaaa!!!!!!!!',
  },
  {
    name: 'Danila "PixelWitch" - Streamer',
    image: '/testimonials/testimonial-danila-perevoshchikov.jpg',
    text: 'Gear xịn, đẹp lung linh lên sóng. Mô tả sản phẩm như kể chuyện, giao diện mượt, tìm kiếm dễ. Sắm chuột RGB và tai nghe đỉnh, giao hàng cẩn thận, thơm mùi mới. 10/10!',
  },
  {
    name: 'Khang "Kaiser" - CEO, Co-Founder Ryxel',
    image: '/testimonials/testimonial-an-khang.jpg',
    text: 'Tôi cùng mấy "fen" lập cái store này vì deadline, mà giờ mê luôn việc ship đồ cho mấy chế game thủ! Quả là một quyết định chính xác khi bán mẹ nhà đầu tư vào cái store này.',
  },
  {
    name: '"Wee" - Quán quân The Lake Village Tournament',
    image: '/testimonials/testimonial-wee.jpg',
    text: 'Store này kinh nha "bro". Vãi ò tôi cầm con chuột nhẹ như không, bàn phím gõ đã tay. Dùng gear ở đây tôi đố thằng nào có thể bắn trượt. Đa dạng mà món nào cũng "trất" nha, tôi mua hẳn 365 con chuột mỗi ngày 1 con xài tới mãn kiếp.',
  },
  {
    name: 'Mateo "Cherrez" - Streamer',
    image: '/testimonials/testimonial-mateo-cherrez.jpg',
    text: 'Website này là thiên đường cho gear high-end! Chuột nhẹ, chính xác, bàn phím gõ sướng, mô tả chi tiết kèm video unbox. Giao hàng nhanh, mở hộp như nhận kho báu. Headshot giờ chuẩn hơn bao giờ hết!',
  },
  {
    name: 'Khá Bảnh - Bảnh Khá',
    image: '/testimonials/testimonial-kha-banh.jpg',
    text: 'Bảnh ưng!',
  },
  {
    name: `7I-I@o||G00- Cái Bang IGL`,
    text: 'Với người giàu có như tui, việc mua gear xịn là chuyện nhỏ. Store xịn cỡ này bán con chuột 10 tỷ tui cũng mua. Tui nghĩ sốp nên lấn sân sang bán xe hơi, bất động sản, hay thậm chí là máy bay riêng. Tui sẽ mua hết!',
    image: '/testimonials/testimonial-virus.jpg',
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getTestimonialAt = (offset: number) => {
    const index =
      (activeIndex + offset + testimonials.length) % testimonials.length;
    return testimonials[index];
  };

  // Cấu hình hiệu ứng cho từng vị trí card
  const getCardStyle = (offset: number) => {
    const styles = {
      '-2': {
        scale: 0.75,
        y: 48, // tương đương translate-y-12
        opacity: 0.1,
        blur: 'blur(4px)',
        zIndex: 0,
      },
      '-1': {
        scale: 0.9,
        y: 24, // tương đương translate-y-6
        opacity: 0.3,
        blur: 'none',
        zIndex: 1,
      },
      '0': {
        scale: 1,
        y: 0,
        opacity: 1,
        blur: 'none',
        zIndex: 10,
      },
      '1': {
        scale: 0.9,
        y: 24,
        opacity: 0.3,
        blur: 'none',
        zIndex: 1,
      },
      '2': {
        scale: 0.75,
        y: 48,
        opacity: 0.1,
        blur: 'blur(4px)',
        zIndex: 0,
      },
    };

    return styles[offset.toString() as keyof typeof styles];
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-slate-50 border-t">
      <p className="text-center text-3xl font-title font-bold">
        Khách hàng nói gì về chúng tôi
      </p>

      <div className="flex items-end justify-center gap-4 relative h-[24rem]">
        {[-2, -1, 0, 1, 2].map((offset) => {
          const testimonial = getTestimonialAt(offset);
          const style = getCardStyle(offset);

          return (
            <motion.div
              key={testimonial.name}
              className="w-[26rem] p-6 rounded-xl bg-white shadow-md overflow-hidden absolute transition-all duration-500 flex flex-col justify-between items-center text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                scale: style.scale,
                y: style.y,
                opacity: style.opacity,
                x: '-50%', // Thêm hiệu ứng căn giữa theo chiều ngang
                filter: style.blur,
              }}
              transition={{ type: 'spring', stiffness: 100 }}
              style={{
                left: `calc(50% + ${offset * 22}%)`, // Điều chỉnh khoảng cách giữa các card
                zIndex: style.zIndex,
              }}
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-full shadow-md mb-4 mx-auto"
              />

              <div className="px-6 py-4">
                <p className="text-sm sm:text-base line-clamp-4 font-medium">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="mt-4 font-semibold text-primary">
                  {testimonial.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dot Pagination */}
      <div className="mt-12 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-primary-default scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Xem testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

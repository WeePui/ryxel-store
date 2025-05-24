"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/_contexts/LanguageContext";

const testimonials = {
  vi: [
    {
      name: "Huy Bùi - CEO, Co-Founder Ryxel",
      image: "/testimonials/testimonial-huy-bui.jpg",
      text: "Không biết nói gì, Anya dễ thương vãi ò. 10 điểm không nhưng. Anyaaaaaaaaa!!!!!!!!",
    },
    {
      name: 'Danila "PixelWitch" - Streamer',
      image: "/testimonials/testimonial-danila-perevoshchikov.jpg",
      text: "Gear xịn, đẹp lung linh lên sóng. Mô tả sản phẩm như kể chuyện, giao diện mượt, tìm kiếm dễ. Sắm chuột RGB và tai nghe đỉnh, giao hàng cẩn thận, thơm mùi mới. 10/10!",
    },
    {
      name: 'Khang "Kaiser" - CEO, Co-Founder Ryxel',
      image: "/testimonials/testimonial-an-khang.jpg",
      text: 'Tôi cùng mấy "fen" lập cái store này vì deadline, mà giờ mê luôn việc ship đồ cho mấy chế game thủ! Quả là một quyết định chính xác khi bán mẹ nhà đầu tư vào cái store này.',
    },
    {
      name: '"Wee" - Quán quân The Lake Village Tournament',
      image: "/testimonials/testimonial-wee.jpg",
      text: 'Store này kinh nha "bro". Vãi ò tôi cầm con chuột nhẹ như không, bàn phím gõ đã tay. Dùng gear ở đây tôi đố thằng nào có thể bắn trượt. Đa dạng mà món nào cũng "trất" nha, tôi mua hẳn 365 con chuột mỗi ngày 1 con xài tới mãn kiếp.',
    },
    {
      name: 'Mateo "Cherrez" - Streamer',
      image: "/testimonials/testimonial-mateo-cherrez.jpg",
      text: "Website này là thiên đường cho gear high-end! Chuột nhẹ, chính xác, bàn phím gõ sướng, mô tả chi tiết kèm video unbox. Giao hàng nhanh, mở hộp như nhận kho báu. Headshot giờ chuẩn hơn bao giờ hết!",
    },
    {
      name: "Khá Bảnh - Bảnh Khá",
      image: "/testimonials/testimonial-kha-banh.jpg",
      text: "Bảnh ưng!",
    },
    {
      name: `7I-I@o||G00- Cái Bang IGL`,
      text: "Với người giàu có như tui, việc mua gear xịn là chuyện nhỏ. Store xịn cỡ này bán con chuột 10 tỷ tui cũng mua. Tui nghĩ sốp nên lấn sân sang bán xe hơi, bất động sản, hay thậm chí là máy bay riêng. Tui sẽ mua hết!",
      image: "/testimonials/testimonial-virus.jpg",
    },
  ],
  en: [
    {
      name: "Huy Bùi - CEO, Co-Founder Ryxel",
      image: "/testimonials/testimonial-huy-bui.jpg",
      text: "I'm speechless, Anya is so cute. 10 points without a doubt. Anyaaaaaaaaa!!!!!!!!",
    },
    {
      name: 'Danila "PixelWitch" - Streamer',
      image: "/testimonials/testimonial-danila-perevoshchikov.jpg",
      text: "Premium gear, looks stunning on stream. Product descriptions read like stories, UI is smooth, search is easy. Got an RGB mouse and top-notch headphones, carefully delivered, smelling brand new. 10/10!",
    },
    {
      name: 'Khang "Kaiser" - CEO, Co-Founder Ryxel',
      image: "/testimonials/testimonial-an-khang.jpg",
      text: 'I created this store with my "buddies" because of a deadline, but now I\'m addicted to shipping gear to gamers! It was definitely the right decision to sell out our investors for this store.',
    },
    {
      name: '"Wee" - The Lake Village Tournament Champion',
      image: "/testimonials/testimonial-wee.jpg",
      text: 'This store is amazing, "bro". The mouse feels incredibly lightweight, and the keyboard feels great to type on. Using gear from here, I bet no one can miss a shot. Everything is diverse and high quality - I bought 365 mice to use one each day for the rest of my life.',
    },
    {
      name: 'Mateo "Cherrez" - Streamer',
      image: "/testimonials/testimonial-mateo-cherrez.jpg",
      text: "This website is paradise for high-end gear! Lightweight and precise mice, satisfying keyboards, detailed descriptions with unboxing videos. Fast shipping, opening the package feels like receiving treasure. My headshots are more accurate than ever!",
    },
    {
      name: "Khá Bảnh - Internet Celebrity",
      image: "/testimonials/testimonial-kha-banh.jpg",
      text: "Approved!",
    },
    {
      name: `7I-I@o||G00- Cái Bang IGL`,
      text: "For someone wealthy like me, buying premium gear is no big deal. A high-end store like this could sell a $430,000 mouse and I'd still buy it. I think the shop should expand into selling cars, real estate, or even private jets. I'll buy it all!",
      image: "/testimonials/testimonial-virus.jpg",
    },
  ],
};

export default function TestimonialSection() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const currentTestimonials =
    language === "vi" ? testimonials.vi : testimonials.en;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % currentTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTestimonials]);

  const getTestimonialAt = (offset: number) => {
    const index =
      (activeIndex + offset + currentTestimonials.length) %
      currentTestimonials.length;
    return currentTestimonials[index];
  };

  // Cấu hình hiệu ứng cho từng vị trí card
  const getCardStyle = (offset: number) => {
    const styles = {
      "-2": {
        scale: 0.75,
        y: 48, // tương đương translate-y-12
        opacity: 0.1,
        blur: "blur(4px)",
        zIndex: 0,
      },
      "-1": {
        scale: 0.9,
        y: 24, // tương đương translate-y-6
        opacity: 0.3,
        blur: "none",
        zIndex: 1,
      },
      "0": {
        scale: 1,
        y: 0,
        opacity: 1,
        blur: "none",
        zIndex: 10,
      },
      "1": {
        scale: 0.9,
        y: 24,
        opacity: 0.3,
        blur: "none",
        zIndex: 1,
      },
      "2": {
        scale: 0.75,
        y: 48,
        opacity: 0.1,
        blur: "blur(4px)",
        zIndex: 0,
      },
    };

    return styles[offset.toString() as keyof typeof styles];
  };

  return (
    <section className="mx-auto w-full max-w-7xl overflow-x-hidden border-t bg-slate-50 px-4 py-16">
      <p className="text-center font-title text-3xl font-bold">
        Khách hàng nói gì về chúng tôi
      </p>

      <div className="relative flex h-[24rem] items-end justify-center gap-4">
        {[-2, -1, 0, 1, 2].map((offset) => {
          const testimonial = getTestimonialAt(offset);
          const style = getCardStyle(offset);

          return (
            <motion.div
              key={testimonial.name}
              className="absolute flex w-[26rem] flex-col items-center justify-between overflow-hidden rounded-xl bg-white p-6 text-center shadow-md transition-all duration-500 lg:w-[24rem] sm:w-[22rem]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                scale: style.scale,
                y: style.y,
                opacity: style.opacity,
                x: "-50%", // Thêm hiệu ứng căn giữa theo chiều ngang
                filter: style.blur,
              }}
              transition={{ type: "spring", stiffness: 100 }}
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
                className="mx-auto mb-4 h-24 w-24 rounded-full object-cover shadow-md"
              />

              <div className="px-6 py-4">
                <p className="line-clamp-4 text-sm font-medium sm:text-base">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="text-primary mt-4 font-semibold">
                  {testimonial.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dot Pagination */}
      <div className="mt-12 flex justify-center gap-2">
        {testimonials[language].map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "scale-125 bg-primary-default"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Xem testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

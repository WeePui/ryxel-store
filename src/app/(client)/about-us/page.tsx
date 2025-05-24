"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaUsers,
  FaTrophy,
  FaRocket,
  FaRegSmile,
} from "react-icons/fa";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const milestones = [
    {
      year: "2021",
      title: "Ý tưởng ra đời",
      description:
        "Ba anh em gặp nhau tại một giải đấu và quyết định tạo ra thay đổi cho làng game Việt.",
    },
    {
      year: "2022",
      title: "Mở cửa hàng online",
      description:
        "Cửa hàng trực tuyến đầu tiên ra mắt với doanh số khiêm tốn nhưng đầy triển vọng.",
    },
    {
      year: "2023",
      title: "Mở rộng quy mô",
      description:
        "Khai trương cửa hàng vật lý đầu tiên tại Quận 1, TP.HCM với đầy đủ các sản phẩm cao cấp.",
    },
    {
      year: "2024",
      title: "Tài trợ giải đấu",
      description:
        "Bắt đầu đồng hành cùng các giải đấu Esports lớn của Việt Nam như VCS và VCL.",
    },
    {
      year: "2025",
      title: "Phát triển quốc tế",
      description:
        "Mở rộng hoạt động ra thị trường Đông Nam Á và trở thành nhà phân phối độc quyền nhiều thương hiệu.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-us/esport-competition.jpg"
            alt="Esports Competition"
            fill
            className="object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-white opacity-30"></div>
        <div className="container relative z-20 mx-auto flex h-full flex-col items-center justify-center px-4">
          {" "}
          <motion.h1
            className="mb-8 bg-gradient-to-r from-primary-300 to-primary-600 bg-clip-text text-center text-7xl font-bold text-transparent md:text-5xl"
            initial={{ opacity: 0, y: -50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Câu Chuyện Ryxel Store
          </motion.h1>
          <motion.p
            className="max-w-3xl text-center text-xl text-gray-800"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Nơi đam mê gaming gặp gỡ công nghệ đỉnh cao và trở thành huyền thoại
          </motion.p>
        </div>
      </div>{" "}
      {/* Our Story */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="flex items-center gap-10 md:flex-col"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="w-1/2 md:w-full" variants={fadeIn}>
              {" "}
              <h2 className="mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-4xl font-bold text-transparent md:text-3xl">
                Từ Những Buổi Chơi Game Đêm Khuya
              </h2>{" "}
              <p className="mb-6 text-gray-600">
                Ryxel Store bắt đầu từ những trải nghiệm không mấy dễ chịu của
                ba người bạn - Bùi Quang Huy, Đường Nguyễn An Khang và Đoàn Văn
                Hiếu - khi sử dụng các thiết bị gaming không đạt chất lượng
                trong các trận đấu quan trọng.
              </p>{" "}
              <p className="mb-6 text-gray-600">
                Có lần, trong một giải đấu quan trọng, chuột của Huy đột nhiên
                ngừng hoạt động giữa ván đấu quyết định, Khang thì liên tục phải
                chịu đựng với bàn phím không nhận phím và Hiếu thì được
                &quot;phục vụ&quot; bằng một tai nghe có âm thanh delay đến nửa
                giây.
              </p>{" "}
              <p className="text-gray-600">
                Cả ba đã thốt lên: &quot;Tại sao game thủ Việt Nam phải chấp
                nhận điều này?&quot; - Và đó là lúc Ryxel Store ra đời với sứ
                mệnh mang đến những thiết bị gaming chất lượng cao với giá thành
                hợp lý cho game thủ Việt Nam.
              </p>
            </motion.div>
            <motion.div
              className="relative h-[400px] w-1/2 overflow-hidden rounded-lg shadow-xl md:w-full"
              variants={fadeIn}
            >
              <Image
                src="/about-us/a-guy-playing-game.jpg"
                alt="Gaming Passion"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>{" "}
      {/* Our Values */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4">
          {" "}
          <motion.h2
            className="mb-16 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Giá Trị Cốt Lõi
          </motion.h2>
          <motion.div
            className="grid grid-cols-3 gap-8 md:grid-cols-1"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              {" "}
              <div className="mb-4 text-4xl text-primary-400">
                <FaGamepad />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800">
                Chất Lượng Không Thỏa Hiệp
              </h3>{" "}
              <p className="text-gray-600">
                Chúng tôi chỉ cung cấp những thiết bị gaming đã được kiểm nghiệm
                kỹ càng, từ những thương hiệu uy tín toàn cầu, đảm bảo trải
                nghiệm chơi game tốt nhất.
              </p>
            </motion.div>{" "}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-purple-500/20"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              {" "}
              <div className="mb-4 text-4xl text-primary-400">
                <FaUsers />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800">
                Cộng Đồng Là Trên Hết
              </h3>{" "}
              <p className="text-gray-600">
                Ryxel Store không đơn thuần là cửa hàng, mà là nơi gắn kết cộng
                đồng game thủ, tổ chức các sự kiện, giải đấu và chia sẻ kiến
                thức gaming.
              </p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-pink-500/20"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              {" "}
              <div className="mb-4 text-4xl text-primary-400">
                <FaTrophy />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800">
                Hỗ Trợ Nền Esports
              </h3>{" "}
              <p className="text-gray-600">
                Chúng tôi cam kết đóng góp một phần lợi nhuận để phát triển nền
                Esports Việt Nam, tài trợ cho các đội tuyển trẻ và tổ chức các
                giải đấu chuyên nghiệp.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>{" "}
      {/* Meet the Founders */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          {" "}
          <motion.h2
            className="mb-16 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-3xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Gặp Gỡ Đội Ngũ Sáng Lập
          </motion.h2>
          <motion.div
            className="grid grid-cols-3 gap-8 md:grid-cols-1"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Founder 1 - Bùi Quang Huy */}
            <motion.div
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <Image
                  src="/about-us/huy-bui.jpg"
                  alt="Bùi Quang Huy"
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-col">
                  <h3 className="mb-1 text-xl font-bold text-gray-800">
                    Bùi Quang Huy
                  </h3>{" "}
                  <span className="w-fit rounded-full bg-gradient-to-r from-primary-400 to-primary-600 px-3 py-1 text-sm font-medium text-white">
                    CEO & Co-founder
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Cựu game thủ chuyên nghiệp với 8 năm kinh nghiệm trong lĩnh
                  vực phát triển phần cứng gaming. Huy có niềm đam mê bất tận
                  với chuột gaming và luôn đi đầu trong việc tìm kiếm công nghệ
                  mới.
                </p>
              </div>
            </motion.div>

            {/* Founder 2 - Đường Nguyễn An Khang */}
            <motion.div
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <Image
                  src="/about-us/an-khang.jpg"
                  alt="Đường Nguyễn An Khang"
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-col">
                  <h3 className="mb-1 text-xl font-bold text-gray-800">
                    Đường Nguyễn An Khang
                  </h3>{" "}
                  <span className="w-fit rounded-full bg-gradient-to-r from-primary-300 to-primary-500 px-3 py-1 text-sm font-medium text-white">
                    COO & Co-founder
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Chuyên gia marketing và tổ chức sự kiện Esports với hơn 5 năm
                  kinh nghiệm. Khang từng là nhà sản xuất nội dung cho một số
                  đội tuyển Esports hàng đầu Việt Nam trước khi đồng sáng lập
                  Ryxel.
                </p>
              </div>
            </motion.div>

            {/* Founder 3 - Đoàn Văn Hiếu */}
            <motion.div
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <Image
                  src="/about-us/ryxel-store-office.jpg"
                  alt="Đoàn Văn Hiếu"
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-col">
                  <h3 className="mb-1 text-xl font-bold text-gray-800">
                    Đoàn Văn Hiếu
                  </h3>{" "}
                  <span className="w-fit rounded-full bg-gradient-to-r from-primary-400 to-primary-600 px-3 py-1 text-sm font-medium text-white">
                    CTO & Co-founder
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Kỹ sư phần cứng với chuyên môn sâu về bàn phím cơ và tai nghe
                  gaming. Hiếu có 7 năm kinh nghiệm làm việc tại các công ty
                  công nghệ lớn trước khi quyết định theo đuổi đam mê với Ryxel
                  Store.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>{" "}
      {/* Timeline */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4">
          {" "}
          <motion.h2
            className="mb-16 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-3xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Hành Trình Phát Triển
          </motion.h2>{" "}
          <div className="relative">
            {" "}
            {/* Vertical line - only visible on desktop */}
            <div className="absolute left-1/2 z-0 h-full w-1 -translate-x-1/2 transform bg-gradient-to-b from-primary-300 to-primary-600"></div>
            {/* Timeline content */}
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative z-10 mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {" "}
                {/* Desktop layout - alternating left-right - shown only on large screens */}
                <div className="md:hidden">
                  <div className="flex flex-row items-center">
                    {/* Left side */}
                    <div
                      className={`w-1/2 pr-8 ${index % 2 === 0 ? "text-right" : ""}`}
                      style={{ paddingLeft: index % 2 === 0 ? "0" : "8rem" }}
                    >
                      {index % 2 === 0 && (
                        <div className="ml-auto rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                          <h3 className="mb-2 text-xl font-bold text-primary-500">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-700">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center circle */}
                    <div className="absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center">
                      <div className="z-20 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary-400 bg-white shadow-lg">
                        <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-2xl font-bold text-transparent">
                          {milestone.year}
                        </span>
                      </div>
                    </div>

                    {/* Right side */}
                    <div
                      className={`w-1/2 pl-8 ${index % 2 === 1 ? "text-left" : ""}`}
                      style={{ paddingRight: index % 2 === 1 ? "0" : "8rem" }}
                    >
                      {index % 2 === 1 && (
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                          <h3 className="mb-2 text-xl font-bold text-primary-500">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-700">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Mobile layout - vertical with year on top - shown only on small screens */}
                <div className="hidden flex-col items-center sm:flex">
                  {/* Year bubble at the top */}
                  <div className="mb-4 flex items-center justify-center">
                    <div className="z-20 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary-400 bg-white shadow-lg">
                      <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-2xl font-bold text-transparent">
                        {milestone.year}
                      </span>
                    </div>
                  </div>

                  {/* Content below */}
                  <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                    <h3 className="mb-2 text-xl font-bold text-primary-500">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* Location */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="flex items-center gap-10 md:flex-col"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="relative h-[400px] w-1/2 overflow-hidden rounded-lg shadow-2xl md:w-full"
              variants={fadeIn}
            >
              <Image
                src="/about-us/ho-chi-minh-city.jpg"
                alt="Ho Chi Minh City"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            <motion.div className="w-1/2 md:w-full" variants={fadeIn}>
              {" "}
              <h2 className="mb-6 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-4xl font-bold text-transparent md:text-3xl">
                Trụ Sở Chính Tại TP.HCM
              </h2>{" "}
              <p className="mb-6 text-lg text-gray-600">
                Đặt tại trung tâm thành phố sôi động, Ryxel Store không chỉ là
                nơi bán sản phẩm mà còn là điểm đến của cộng đồng game thủ với
                không gian trải nghiệm thiết bị, khu vực giải trí và cà phê
                gaming.
              </p>{" "}
              <p className="mb-6 text-lg text-gray-600">
                Với diện tích hơn 500m², Ryxel Store mang đến không gian hiện
                đại, được thiết kế với concept futuristic gaming, tái hiện không
                khí của các giải đấu Esports đỉnh cao.
              </p>
              <div className="flex items-center gap-2 text-lg">
                {" "}
                <FaRocket className="text-primary-400" />
                <span className="text-gray-700">
                  1 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức, TP.HCM
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>{" "}
      {/* Fun Facts */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4">
          {" "}
          <motion.h2
            className="mb-16 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Những Điều Thú Vị Về Ryxel
          </motion.h2>
          <motion.div
            className="grid gap-8 lg:grid-cols-2 lg:grid-cols-3 md:grid-cols-1"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-purple-500/20"
              variants={fadeIn}
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-4 flex items-center gap-3">
                {" "}
                <FaRegSmile className="text-2xl text-primary-400" />
                <h3 className="text-xl font-bold text-gray-800">
                  Tên Ryxel ra đời như thế nào?
                </h3>
              </div>{" "}
              <p className="text-gray-600">
                Tên &quot;Ryxel&quot; đến từ việc kết hợp &quot;Ry&quot; (viết
                tắt của &quot;Ryzen&quot; - là CPU yêu thích của Huy) và
                &quot;xel&quot; (từ &quot;pixel&quot; - đơn vị hình ảnh nhỏ
                nhất, biểu thị cho sự chi tiết và chất lượng). Ban đầu là tên
                nickname của Huy trong game, sau trở thành tên thương hiệu.
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20"
              variants={fadeIn}
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-4 flex items-center gap-3">
                {" "}
                <FaRegSmile className="text-2xl text-primary-400" />
                <h3 className="text-xl font-bold text-gray-800">
                  Mascot đặc biệt
                </h3>
              </div>{" "}
              <p className="text-gray-600">
                Mascot của Ryxel là một chú mèo tên &quot;Pixel&quot; luôn đeo
                tai nghe gaming. Mỗi lần khách hàng đến cửa hàng đều có thể gặp
                Pixel đang &quot;test&quot; các thiết bị mới - thực ra là nằm
                ngủ trên bàn phím mechanical đắt tiền! Pixel còn có tài khoản
                Instagram riêng với hơn 50.000 followers.
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-pink-500/20"
              variants={fadeIn}
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-4 flex items-center gap-3">
                {" "}
                <FaRegSmile className="text-2xl text-primary-400" />
                <h3 className="text-xl font-bold text-gray-800">
                  Đơn hàng đặc biệt nhất
                </h3>
              </div>{" "}
              <p className="text-gray-600">
                Đơn hàng lớn nhất từng được đặt tại Ryxel là setup gaming trị
                giá 500 triệu đồng cho một streamer nổi tiếng. Lúc giao hàng, cả
                ba anh em founder đều tự tay mang đến và lắp đặt, nhưng sau đó
                phát hiện ra nhà streamer ở... tầng 30 mà thang máy lại hỏng!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>{" "}
      {/* Product Showcase */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          {" "}
          <motion.h2
            className="mb-16 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Gaming Gear Đỉnh Cao
          </motion.h2>
          <motion.div
            className="relative h-[500px] w-full overflow-hidden rounded-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {" "}
            <Image
              src="/about-us/xbox-controller.jpg"
              alt="Gaming Gear"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
            <div className="absolute bottom-0 left-0 w-1/2 p-8 md:w-full">
              <h3 className="mb-4 text-2xl font-bold text-white">
                Thiết Bị Gaming Chính Hãng
              </h3>{" "}
              <p className="mb-6 max-w-2xl text-lg text-white">
                Ryxel Store tự hào là đối tác chính thức của các thương hiệu
                gaming hàng đầu thế giới như Logitech G, Razer, SteelSeries, và
                nhiều thương hiệu cao cấp khác.
              </p>{" "}
              <button className="rounded-lg bg-gradient-to-r from-primary-400 to-primary-600 px-6 py-3 font-bold text-white transition-all duration-300 hover:from-primary-500 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/50">
                Khám Phá Sản Phẩm
              </button>
            </div>
          </motion.div>
        </div>
      </section>{" "}
      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-3xl">
              Sẵn Sàng Nâng Cấp Trải Nghiệm Gaming?
            </h2>{" "}
            <p className="mx-auto mb-10 max-w-4xl text-xl text-gray-600">
              Đến với Ryxel Store để khám phá thiết bị gaming chất lượng cao cấp
              và trở thành một phần của cộng đồng game thủ chuyên nghiệp.
            </p>
            <div className="flex flex-row justify-center gap-4 sm:flex-col">
              {" "}
              <button className="rounded-lg bg-gradient-to-r from-primary-400 to-primary-600 px-8 py-3 font-bold text-white transition-all duration-300 hover:from-primary-500 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/50">
                Ghé Thăm Cửa Hàng
              </button>
              <button className="rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-3 font-bold text-white transition-all duration-300 hover:from-gray-600 hover:to-gray-700 hover:shadow-lg">
                Liên Hệ Với Chúng Tôi
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

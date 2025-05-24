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
import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function AboutUsTranslated() {
  const { t } = useLanguage();
  const [, setIsVisible] = useState(false);

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

  // Helper function to access founder name directly from the context
  const getFounderName = (founderNumber: number): string => {
    // Names are stored directly as strings in the context
    switch (founderNumber) {
      case 1:
        return "Bùi Quang Huy";
      case 2:
        return "Đường Nguyễn An Khang";
      case 3:
        return "Đoàn Văn Hiếu";
      default:
        return "";
    }
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

  // Get milestones from translations
  const milestones = [
    {
      year: "2021",
      title: t("aboutUs.milestones.m2021.title"),
      description: t("aboutUs.milestones.m2021.description"),
    },
    {
      year: "2022",
      title: t("aboutUs.milestones.m2022.title"),
      description: t("aboutUs.milestones.m2022.description"),
    },
    {
      year: "2023",
      title: t("aboutUs.milestones.m2023.title"),
      description: t("aboutUs.milestones.m2023.description"),
    },
    {
      year: "2024",
      title: t("aboutUs.milestones.m2024.title"),
      description: t("aboutUs.milestones.m2024.description"),
    },
    {
      year: "2025",
      title: t("aboutUs.milestones.m2025.title"),
      description: t("aboutUs.milestones.m2025.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section is handled by the parent component */}

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
              <h2 className="mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-4xl font-bold text-transparent md:text-3xl">
                {t("aboutUs.ourStory.title")}
              </h2>
              <p className="mb-6 text-gray-600">
                {t("aboutUs.ourStory.paragraph1")}
              </p>
              <p className="mb-6 text-gray-600">
                {t("aboutUs.ourStory.paragraph2")}
              </p>
              <p className="text-gray-600">
                {t("aboutUs.ourStory.paragraph3")}
              </p>
            </motion.div>
            <motion.div
              className="relative h-[400px] w-1/2 overflow-hidden rounded-lg shadow-xl md:w-full"
              variants={fadeIn}
            >
              <Image
                src="/about-us/a-guy-playing-game.jpg"
                alt={t("aboutUs.ourStory.imageAlt")}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.h2
            className="mb-16 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t("aboutUs.ourValues")}
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
              <div className="mb-4 text-4xl text-primary-400">
                <FaGamepad />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800">
                {t("aboutUs.valueQuality")}
              </h3>
              <p className="text-gray-600">{t("aboutUs.valueQualityDesc")}</p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-purple-500/20"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="mb-4 text-4xl text-primary-400">
                <FaUsers />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800">
                {t("aboutUs.valueCommunity")}
              </h3>
              <p className="text-gray-600">{t("aboutUs.valueCommunityDesc")}</p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-pink-500/20"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="mb-4 text-4xl text-primary-400">
                <FaTrophy />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800">
                {t("aboutUs.valueInnovation")}
              </h3>
              <p className="text-gray-600">
                {t("aboutUs.valueInnovationDesc")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.h2
            className="mb-16 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-3xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t("aboutUs.teamSection.title")}
          </motion.h2>
          <motion.div
            className="grid grid-cols-3 gap-8 md:grid-cols-1"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Founder 1 */}
            <motion.div
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <Image
                  src="/about-us/huy-bui.jpg"
                  alt={getFounderName(1)}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-col">
                  <h3 className="mb-1 text-xl font-bold text-gray-800">
                    {getFounderName(1)}
                  </h3>
                  <span className="w-fit rounded-full bg-gradient-to-r from-primary-400 to-primary-600 px-3 py-1 text-sm font-medium text-white">
                    {t("aboutUs.teamSection.founder1.role")}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {t("aboutUs.teamSection.founder1.bio")}
                </p>
              </div>
            </motion.div>

            {/* Founder 2 */}
            <motion.div
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <Image
                  src="/about-us/an-khang.jpg"
                  alt={getFounderName(2)}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-col">
                  <h3 className="mb-1 text-xl font-bold text-gray-800">
                    {getFounderName(2)}
                  </h3>
                  <span className="w-fit rounded-full bg-gradient-to-r from-primary-300 to-primary-500 px-3 py-1 text-sm font-medium text-white">
                    {t("aboutUs.teamSection.founder2.role")}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {t("aboutUs.teamSection.founder2.bio")}
                </p>
              </div>
            </motion.div>

            {/* Founder 3 */}
            <motion.div
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <Image
                  src="/about-us/ryxel-store-office.jpg"
                  alt={getFounderName(3)}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-col">
                  <h3 className="mb-1 text-xl font-bold text-gray-800">
                    {getFounderName(3)}
                  </h3>
                  <span className="w-fit rounded-full bg-gradient-to-r from-primary-400 to-primary-600 px-3 py-1 text-sm font-medium text-white">
                    {t("aboutUs.teamSection.founder3.role")}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {t("aboutUs.teamSection.founder3.bio")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.h2
            className="mb-16 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-3xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t("aboutUs.milestones.title")}
          </motion.h2>
          <div className="relative">
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
      </section>

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
                alt={t("aboutUs.location.imageAlt")}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            <motion.div className="w-1/2 md:w-full" variants={fadeIn}>
              <h2 className="mb-6 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-4xl font-bold text-transparent md:text-3xl">
                {t("aboutUs.location.title")}
              </h2>
              <p className="mb-6 text-lg text-gray-600">
                {t("aboutUs.location.description1")}
              </p>
              <p className="mb-6 text-lg text-gray-600">
                {t("aboutUs.location.description2")}
              </p>
              <div className="flex items-center gap-2 text-lg">
                <FaRocket className="text-primary-400" />
                <span className="text-gray-700">
                  {t("aboutUs.location.address")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.h2
            className="mb-16 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t("aboutUs.funFacts.title")}
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
                <FaRegSmile className="text-2xl text-primary-400" />
                <h3 className="text-xl font-bold text-gray-800">
                  {t("aboutUs.funFacts.fact1.title")}
                </h3>
              </div>
              <p className="text-gray-600">
                {t("aboutUs.funFacts.fact1.description")}
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20"
              variants={fadeIn}
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <FaRegSmile className="text-2xl text-primary-400" />
                <h3 className="text-xl font-bold text-gray-800">
                  {t("aboutUs.funFacts.fact2.title")}
                </h3>
              </div>
              <p className="text-gray-600">
                {t("aboutUs.funFacts.fact2.description")}
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-pink-500/20"
              variants={fadeIn}
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <FaRegSmile className="text-2xl text-primary-400" />
                <h3 className="text-xl font-bold text-gray-800">
                  {t("aboutUs.funFacts.fact3.title")}
                </h3>
              </div>
              <p className="text-gray-600">
                {t("aboutUs.funFacts.fact3.description")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.h2
            className="mb-16 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t("aboutUs.productShowcase.title")}
          </motion.h2>
          <motion.div
            className="relative h-[500px] w-full overflow-hidden rounded-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/about-us/xbox-controller.jpg"
              alt={t("aboutUs.productShowcase.imageAlt")}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
            <div className="absolute bottom-0 left-0 w-1/2 p-8 md:w-full">
              <h3 className="mb-4 text-2xl font-bold text-white">
                {t("aboutUs.productShowcase.subtitle")}
              </h3>
              <p className="mb-6 max-w-2xl text-lg text-white">
                {t("aboutUs.productShowcase.description")}
              </p>
              <button className="rounded-lg bg-gradient-to-r from-primary-400 to-primary-600 px-6 py-3 font-bold text-white transition-all duration-300 hover:from-primary-500 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/50">
                {t("aboutUs.productShowcase.buttonText")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

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
              {t("aboutUs.cta.title")}
            </h2>
            <p className="mx-auto mb-10 max-w-4xl text-xl text-gray-600">
              {t("aboutUs.cta.description")}
            </p>
            <div className="flex flex-row justify-center gap-4 sm:flex-col">
              <button className="rounded-lg bg-gradient-to-r from-primary-400 to-primary-600 px-8 py-3 font-bold text-white transition-all duration-300 hover:from-primary-500 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/50">
                {t("aboutUs.cta.primaryButton")}
              </button>
              <button className="rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-3 font-bold text-white transition-all duration-300 hover:from-gray-600 hover:to-gray-700 hover:shadow-lg">
                {t("aboutUs.cta.secondaryButton")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

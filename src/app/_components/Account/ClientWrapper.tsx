"use client";

import { User } from "@/app/_types/user";
import Image from "next/image";
import { useState } from "react";
import SideNavList from "./SideNavList";
import { FaChevronDown } from "react-icons/fa6";
import Button from "../UI/Button";

interface ClientWrapperProps {
  user: User;
}

export default function ClientWrapper({ user }: ClientWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-10 pl-2 sticky lg:static top-0 max-h-[calc(100vh-2rem)] h-fit">
      <div className="lg:flex lg:justify-between">
        <div className="flex items-center gap-6 lg:gap-4">
          <div className="relative aspect-square w-1/4 lg:w-12 overflow-hidden rounded-full ring-2 ring-primary-default">
            <Image src={user.photo.url} alt={user.name} fill />
          </div>
          <span className="text-lg font-bold text-grey-300">{user.name}</span>
        </div>
        <Button
          className="hidden lg:block"
          onClick={() => setIsOpen(!isOpen)}
          size="small"
        >
          <span className="flex items-center gap-2">
            {isOpen ? "Ẩn menu" : "Hiện menu"}{" "}
            <FaChevronDown
              className={`transition-all duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </Button>
      </div>
      <div
        className={`lg:hidden block ${
          isOpen ? "lg:!block" : "lg:!hidden"
        } px-4 lg:px-0`}
      >
        <SideNavList />
      </div>
    </div>
  );
}

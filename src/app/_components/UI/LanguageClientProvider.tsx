"use client";

import React from "react";
import { LanguageProvider } from "../../_contexts/LanguageContext";

export default function LanguageClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

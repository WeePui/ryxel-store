'use client';

import { createContext, useContext, useState } from 'react';

const ToggleAdminSidebarContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpen: false,
  toggle: () => {},
  setIsOpen: () => {},
});

function ToggleAdminSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ToggleAdminSidebarContext.Provider value={{ isOpen, toggle, setIsOpen }}>
      {children}
    </ToggleAdminSidebarContext.Provider>
  );
}

function useToggleAdminSidebar() {
  const context = useContext(ToggleAdminSidebarContext);
  if (!context) {
    throw new Error(
      'useToggleAdminSidebar must be used within a ToggleAdminSidebarProvider'
    );
  }
  return context;
}

export { ToggleAdminSidebarProvider, useToggleAdminSidebar };

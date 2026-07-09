import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const SidebarContext =
  createContext(null);

function SidebarProvider({
  children,
}) {
  const [collapsed, setCollapsed] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "sidebarCollapsed"
        );

      return saved === "true";
    });

  useEffect(() => {
    localStorage.setItem(
      "sidebarCollapsed",
      collapsed
    );
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed(
      (previous) => !previous
    );
  };

  const value = useMemo(
    () => ({
      collapsed,
      toggleSidebar,
    }),
    [collapsed]
  );

  return (
    <SidebarContext.Provider
      value={value}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context =
    useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar must be used inside SidebarProvider."
    );
  }

  return context;
}

export {
  SidebarProvider,
  useSidebar,
};
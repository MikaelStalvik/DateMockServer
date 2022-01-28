import { ReactNode } from "react";

import "./Header.css";

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return <header className="Header">{children}</header>;
}

export default Header;

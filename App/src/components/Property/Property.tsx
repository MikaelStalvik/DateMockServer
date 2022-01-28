import { ReactNode } from "react";

import "./Property.css";

interface PropertyProps {
  label: string;
  children: ReactNode;
}

function Property({ label, children }: PropertyProps) {
  return (
    <div className="Property">
      <p className="Property-label">{label}</p>
      <p className="Property-value">{children}</p>
    </div>
  );
}

export default Property;

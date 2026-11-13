import Link from "next/link";
import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";

export function BrandCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`brand-card ${className}`}>{children}</div>;
}

export function BrandEyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`brand-eyebrow${light ? " brand-eyebrow--light" : ""}`}>{children}</p>;
}

export function BrandButton({ href, children, variant = "primary", className = "" }: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "quiet";
  className?: string;
}) {
  return <Link href={href} className={`brand-button brand-button--${variant} ${className}`}>{children}</Link>;
}

export function BrandStat({ icon, value, label, href }: { icon: IconName; value: string | number; label: string; href?: string }) {
  const content = (
    <div className="brand-stat">
      <span className="brand-stat-icon"><Icon name={icon} size={20} /></span>
      <div className="min-w-0">
        <p className="brand-stat-value">{value}</p>
        <p className="brand-stat-label">{label}</p>
      </div>
    </div>
  );
  return href
    ? <Link href={href} className="brand-stat-link" aria-label={`${value} ${label}. Open streak details.`}>{content}</Link>
    : content;
}

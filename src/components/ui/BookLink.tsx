import clsx from "clsx";
import type { ReactNode } from "react";
import { site, telHref } from "@/data/site";

export function Arrow() {
  return (
    <svg className="btnArrow" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type Props = {
  /** Nazwa sekcji do zdarzenia analitycznego */
  section: string;
  children?: ReactNode;
  variant?: "primary" | "ghost";
  small?: boolean;
  detail?: string;
  className?: string;
};

/** Główne CTA - zawsze prowadzi do profilu Booksy w nowej karcie. */
export function BookLink({
  section,
  children = "Zarezerwuj termin",
  variant = "primary",
  small,
  detail,
  className,
}: Props) {
  return (
    <a
      href={site.linki.booksy}
      target="_blank"
      rel="noopener"
      className={clsx("btn", variant === "ghost" && "btn--ghost", small && "btn--small", className)}
      data-track="rezerwacja"
      data-section={section}
      data-detail={detail}
    >
      <span>{children}</span>
      <Arrow />
      <span className="srOnly"> (otwiera Booksy w nowej karcie)</span>
    </a>
  );
}

export function PhoneLink({
  section,
  children,
  className,
}: {
  section: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a href={telHref} className={className} data-track="telefon" data-section={section}>
      {children ?? site.kontakt.telefon}
    </a>
  );
}

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  activeClassName?: string;
};

const normalizeHref = (href: NavLinkProps["href"]) => {
  if (typeof href === "string") return href.split("?")[0];
  return (href.pathname ?? "").toString();
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, href, children, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === normalizeHref(href);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };

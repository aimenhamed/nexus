import Link from "next/link";

import { cn } from "@/lib/utils";

type NavbarProps = React.HTMLAttributes<HTMLElement> & { tabName: string };

function getClass(tab: string, tabName: string) {
  return tabName === tab
    ? "text-sm font-medium transition-colors hover:text-primary"
    : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary";
}

export default function Navbar({ className, tabName, ...props }: NavbarProps) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/" className={getClass("Nexus", tabName)}>
        Nexus
      </Link>
      <Link href="/teams" className={getClass("Teams", tabName)}>
        Teams
      </Link>
      <Link
        href="/services"
        className={getClass("Services", tabName)}
      >
        Services
      </Link>
    </nav>
  );
}

"use client";

import type React from "react";
import Link from "next/link";
import { Home, Plus, User } from "lucide-react";
import { UserDropdownMenu } from "@/components/user-dropdown-menu";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  as?: React.ElementType;
  href?: string;
  className?: string;
}

function NavButton({
  icon,
  label,
  onClick,
  as,
  href,
  className,
  ...props
}: NavButtonProps) {
  const Component = as || "button";
  return (
    <Component
      className={`flex flex-col items-center justify-center h-full w-full hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground transition-colors ${
        className || ""
      }`}
      onClick={onClick}
      href={href}
      {...props}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Component>
  );
}

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <nav className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavButton
            icon={<Home className="h-6 w-6" />}
            label="Home"
            as={Link}
            href="/dashboard"
          />
          <NavButton
            icon={<Plus className="h-6 w-6" />}
            label="Create"
            as={Link}
            href="/create"
          />
          <UserDropdownMenu>
            <NavButton
              icon={<User className="h-6 w-6" />}
              label="Profile"
              as="div"
            />
          </UserDropdownMenu>
        </div>
      </nav>
    </div>
  );
}

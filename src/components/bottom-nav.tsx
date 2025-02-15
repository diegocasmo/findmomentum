"use client";

import { Button } from "@/components/ui/button";
import { Home, ActivityIcon, User } from "lucide-react";
import { UpsertActivityDialog } from "@/components/upsert-activity-dialog";
import { UserDropdownMenu } from "@/components/user-dropdown-menu";
import type React from "react";
import Link from "next/link";

type NavButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  as?: React.ElementType;
};

function NavButton({ icon, label, onClick, as }: NavButtonProps) {
  const Component = as || "button";
  return (
    <Component
      className="flex flex-col items-center justify-center h-full w-full hover:bg-accent hover:text-accent-foreground"
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Component>
  );
}

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="w-full bg-background border-t border-border">
        <nav className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" passHref legacyBehavior>
              <NavButton icon={<Home className="h-6 w-6" />} label="Home" />
            </Link>
            <UpsertActivityDialog>
              <NavButton
                icon={<ActivityIcon className="h-6 w-6" />}
                label="Create"
              />
            </UpsertActivityDialog>
            <UserDropdownMenu>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center h-full w-full hover:bg-accent hover:text-accent-foreground"
              >
                <User className="h-6 w-6" />
                <span className="text-xs mt-1">Profile</span>
              </Button>
            </UserDropdownMenu>
          </div>
        </nav>
      </div>
    </div>
  );
}

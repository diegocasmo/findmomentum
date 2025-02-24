import type React from "react";

export const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-6 text-center text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Momentum. All rights reserved.</p>
    </footer>
  );
};

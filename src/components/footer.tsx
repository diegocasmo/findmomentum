export const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Momentum. All rights reserved.
      </p>
    </footer>
  );
};

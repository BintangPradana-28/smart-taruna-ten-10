import type { ReactNode } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

// WHY this layout is separate from the root layout: (auth) and
// (dashboard) route groups need different chrome (a centered card,
// a sidebar) — keeping Navbar/Footer scoped to (public) means adding
// those later never means ripping chrome out of a shared root file.
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/themeProvider";
import Link from "next/link";
import NavSearch from "./_components/navSearch";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HunterBuilds :: Super Vive Strategy Guide Tool",
  description: "HunterBuilds is a tool for creating and sharing strategy guides for the game Super Vive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange={true}
          >
            <NavBar />
            <div className="max-w-6xl w-full mx-auto mt-8 mb-24">
              {children}
            </div>
          </ThemeProvider>
        </body>
        <Analytics/>
    </html>
  );
}

const NavBar = () => {

  const pages = [
    { name: "Home", url: "/" },
    { name: "Hunters", url: "/hunters" },
    { name: "Leaderboards", url: "/leaderboards", disabled: true },
  ]

  return (
    <div className="bg-slate-900 min-h-14 shadow flex items-center justify-center">
    <div className="max-w-6xl flex justify-between items-center w-full mx-3 md:mx-5">
      <nav>
        <ul className="flex gap-8">
          {pages.map((page) => (
            <li key={page.url} >
              <Link href={page.url} data-disabled={page.disabled} className="flex items-center gap-2 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-default data-[disabled=true]:pointer-events-none">
                <p>
                  {page.name}
                </p>
                {page.disabled && (
                  <p className="text-xs bg-purple-200/50 rounded-sm px-1 py-0.5 text-white">Coming soon</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <NavSearch />
    </div>
  </div>
  )
}
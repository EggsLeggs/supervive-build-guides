"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function HunterSearch() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    router.push(pathname + '?' + createQueryString('name', query))
  }

  return (
    <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow pr-2">
      <Input
        type="text"
        placeholder="Search Hunters..."
        className="text-gray-900 dark:text-white bg-transparent border-none focus-visible:ring-0"
        onChange={handleSearch}
        defaultValue={searchParams.get('name') || ""}
      />
      <Search className="w-6 h-6 text-slate-400 dark:text-slate-300" />
    </div>
  )
}
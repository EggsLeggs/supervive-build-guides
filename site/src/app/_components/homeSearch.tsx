"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import React from "react";
import { GlobalCommandDialog } from "./globalSearch";

export default function HomeSearch() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer flex items-center bg-white dark:bg-gray-800 rounded-lg shadow max-w-xl py-2 pl-4 pr-6"
      >
        <Input
          onClick={() => setOpen(true)}
          type="text"
          placeholder="Search SUPERVIVE..."
          className="cursor-pointer text-gray-900 dark:text-white bg-transparent border-none focus-visible:ring-0"
        />
        <Search className="w-6 h-6 text-slate-400 dark:text-slate-300" />
      </div>
      <GlobalCommandDialog open={open} setOpen={setOpen} />
    </>
  )
}
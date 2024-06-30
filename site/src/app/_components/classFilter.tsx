"use client"

import { Asterisk, DiamondIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ClassFilter() {

  const classes = ["Fighter", "Controller", "Protector"]

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

  const handleClick = (value: string | undefined) => {
    router.push(pathname + '?' + createQueryString('class', value || ""))
  }

  return (
    <div
      className="
      rounded-md dark:bg-gray-800 flex items-center
      [&>*:not(:last-child)]:border-r [&>*]:border-slate-600 [&>*:last-child]:rounded-r-md [&>*:first-child]:rounded-l-md
      "
    >
      <button
        className="
        h-full py-2 px-3 border-r 
        hover:bg-gray-700 hover:border-gray-700
        data-[selected=true]:border-purple-600 data-[selected=true]:border"
        onClick={() => handleClick(undefined)}
        data-selected={!searchParams.get('class')}
      >
        <p className="hidden 2xl:block">All Classes</p>
        <Asterisk className="w-5 h-5 inline-block 2xl:hidden" />
      </button>
      {classes.map((classItem) => {
        return (
          <button
            data-selected={searchParams.get('class') === classItem}
            key={classItem}
            className="h-full py-2 px-3 flex items-center gap-2
            hover:bg-gray-700 hover:border-gray-700
            data-[selected=true]:border-purple-600 data-[selected=true]:border"
            onClick={() => handleClick(classItem)}
          >
            <p className="">
              {classItem}
            </p>
          </button>
        );
      })}
    </div>
  )
}
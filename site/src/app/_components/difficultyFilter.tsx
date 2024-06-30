"use client"

import { Asterisk, DiamondIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function DifficultyFilter() {

  const difficultyMap: { [key: number]: string } = {
    1: "Easy",
    2: "Medium",
    3: "Hard",
    4: "Very Hard",
  };

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

  const handleClick = (value: number | undefined) => {
  router.push(pathname + '?' + createQueryString('difficulty', value?.toString() || ""))
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
        data-selected={!searchParams.get('difficulty')}
      >
        <p className="hidden 2xl:block">Any Difficulty</p>
        <Asterisk className="w-5 h-5 inline-block 2xl:hidden" />
      </button>
      {Object.keys(difficultyMap).map((difficulty) => (
        <button
          data-selected={searchParams.get('difficulty') === difficulty}
          key={difficulty}
          className="h-full py-2 px-3 flex items-center gap-2
          hover:bg-gray-700 hover:border-gray-700
          data-[selected=true]:border-purple-600 data-[selected=true]:border"
          onClick={() => handleClick(parseInt(difficulty))}
        >
          <DiamondIcon
            data-difficulty={difficultyMap[parseInt(difficulty)]}
            className="w-4 h-4 inline-block data-[difficulty=Easy]:text-green-500 data-[difficulty=Medium]:text-yellow-500 data-[difficulty=Hard]:text-red-500 data-[difficulty='Very_Hard']:text-red-700" 
          />
          <p className="hidden 2xl:block">{difficultyMap[parseInt(difficulty)]}</p>
        </button>
      ))}
    </div>
  )
}
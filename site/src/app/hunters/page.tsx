import Image from "next/image";
import { directus } from "../_lib/directus";
import { readItems } from "@directus/sdk";
import { env } from "@/env";
import Link from "next/link";
import { HunterCard } from "../_components/hunterCard";
import HunterSearch from "../_components/hunterSearch";
import DifficultyFilter from "../_components/difficultyFilter";
import ClassFilter from "../_components/classFilter";

type HomeProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function HuntersPage({searchParams}:HomeProps) {

  const generateFilter = () => {
    let filter = {}
    if (searchParams?.name) {
      filter = {
        Name: {
          _contains: `%${searchParams.name}%`
        }
      }
    }
    if (searchParams?.class) {
      filter = {
        ...filter,
        Class: {
          _eq: searchParams.class
        }
      }
    }
    if (searchParams?.difficulty) {
      filter = {
        ...filter,
        Difficulty: {
          _eq: searchParams.difficulty
        }
      }
    }
    return filter
  }

  const hunters = await directus.request(
    readItems('Hunters',
      {
        filter: generateFilter(),
      }
    )
  )

  return (
    <main className="">
      <h1 className="font-semibold text-3xl mb-8">
        Hunters
      </h1>
      <div className="flex gap-5 mb-4 flex-wrap">
        <HunterSearch />
        <DifficultyFilter />
        <ClassFilter />
      </div>
      <div className="grid gap-5 auto-rows-max grid-cols-[repeat(auto-fill,_minmax(14rem,_1fr))]">
        {
          hunters.map((hunter) => (
            <HunterCard
              hunter={{
                Name: hunter.Name,
                ConceptURL: `${env.DIRECTUS_URL}/assets/${hunter.Concept}`,
                Difficulty: hunter.Difficulty,
                Class: hunter.Class,
                Title: hunter.Title,
              }}
              key={hunter.Name}
            />
          ))
        }
      </div>
      { hunters.length === 0 && (
        <p className="mt-2 text-slate-400">
          Oh oh! No hunters match your search criteria.
        </p>
      )}
    </main>
  );
}

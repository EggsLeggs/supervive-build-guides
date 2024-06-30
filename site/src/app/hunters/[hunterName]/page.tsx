import Image from "next/image";
import { env } from "@/env";
import { Metadata, ResolvingMetadata } from "next";
import { readItem } from "@directus/sdk";
import { directus } from "@/app/_lib/directus";
import { Sword, DiamondIcon } from "lucide-react";
import { HunterAbilities } from "@/types/directus";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type HunterPageProps = {
  params: {
    hunterName: string;
  };
};

export default async function HunterPage({ params }: HunterPageProps) {

  const hunter = await directus.request(
    readItem('Hunters', params.hunterName, {
      fields: ["*", {
        Abilities: ["*"]
      }]
    })
  )

  
  const difficultyMap: { [key: number]: string } = {
    1: "Easy",
    2: "Medium",
    3: "Hard",
    4: "Very Hard",
  };

  const difficulty = hunter.Difficulty ? difficultyMap[hunter.Difficulty] : "Unknown";

  const abilityOrder = [
    "Passive",
    "LMB",
    "RMB",
    "L Shift",
    "E",
    "R"
  ]

  // order abilities by the order in abilityOrders and any other abilities that are not in the list will be at the end
    const orderedAbilities: HunterAbilities[] = hunter.Abilities?.sort((a, b) => {
      return abilityOrder.indexOf(a.Button) - abilityOrder.indexOf(b.Button);
    }) || [];

  return (
    <main className="mx-3 md:mx-5">
      <div className="flex gap-8">
        <Image
          src={`${env.DIRECTUS_URL}/assets/${hunter.Concept}`}
          width={200}
          height={400}
          alt={hunter.Name}
        />
        <div className="flex gap-2 flex-col">
          <h1 className="font-semibold text-3xl leading-7">
            {params.hunterName}
          </h1>
          <p className="text-slate-400">
            {hunter.Title}
          </p>
          <div className="flex items-center text-sm text-slate-400 gap-5">
            <div className="flex items-center gap-1.5">
              <Sword className="w-4 h-4 inline-block" />
              <p>
                {hunter.Class}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <DiamondIcon
                data-difficulty={difficulty}
                className="w-4 h-4 inline-block data-[difficulty=Easy]:text-green-500 data-[difficulty=Medium]:text-yellow-500 data-[difficulty=Hard]:text-red-500 data-[difficulty='Very_Hard']:text-red-700" 
              />
              <p>
                {difficulty}
              </p>
            </div>
          </div>
          { orderedAbilities && orderedAbilities.length > 0 && (
            <div className="flex gap-1">
            {orderedAbilities.map((ability) => (
              <TooltipProvider key={ability.Name} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <AbilityIcon ability={ability}  />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-sm text-sm">
                    <p className="text-purple-300 font-medium pb-0.5">{ability.Name}</p>
                    <p className="pb-2 text-xs text-slate-400">{ability.Button}</p>
                    <p className="whitespace-break-spaces">{ability.Description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            </div>
          )}
        </div>
      </div>
      {/* <p>
        Insert tabs here for guides, abilities and stats
      </p> */}
    </main>
  );
}

const AbilityIcon = ({ ability }: { ability: HunterAbilities }) => {
  // if there is an ability icon, set it as the bg image, otherwise use the ability name, and if not then a question mark
  return (
    <div
      className="relative w-12 h-12 rounded-md bg-slate-800 text-slate-400 flex items-center justify-center text-xs bg-cover"
      style={{
        backgroundImage: ability.Icon ? `url(${env.DIRECTUS_URL}/assets/${ability.Icon})` : undefined
      }}
    >
      {!ability.Icon && ability.Button}
      {ability.Icon && 
        <div className="
          absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2
         text-white bg-slate-800 border border-slate-400 rounded-full p-0.5
        ">
          {ability.Button?.slice(0, 3)}
        </div>
      }
    </div>
  ); 
}
// Stats
// https://supervive.io/api/statistics/BRDuos.json?sort=wr1&order=desc
// https://supervive.io/api/statistics/BRSquad.json?sort=wr1&order=desc
// https://supervive.io/api/statistics/DM.json?sort=wr1&order=desc
// Some cool stuff for player info:
// https://supervive.io/api/player/Amory.json?sort=gamesPlayed&order=desc
// Worth trying to figure out how this works

export async function generateMetadata(
  { params }: HunterPageProps
): Promise<Metadata> {
  return {
    title: `${params.hunterName} Build Guides :: Super Vive Strategy Guide Tool`,
  }
}
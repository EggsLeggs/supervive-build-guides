import Image from "next/image";
import { env } from "@/env";
import { Metadata, ResolvingMetadata } from "next";
import { readItem } from "@directus/sdk";
import { directus } from "@/app/_lib/directus";

type HunterPageProps = {
  params: {
    playerId: string;
  };
};

export default async function PlayerPage({ params }: HunterPageProps) {

  return (
    <main className="p-24">
      <h1 className="font-semibold text-xl">
        {params.playerId}
      </h1>
      <p>
        Players are coming soon, but for now, check out the hunters!
      </p>
    </main>
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
    title: `${params.playerId} :: Super Vive Strategy Guide Tool`,
  }
}
import { DiamondIcon, Sword } from "lucide-react";
import Link from "next/link";

type HunterCardProps = {
  hunter: {
    Name: string;
    ConceptURL: string;
    Difficulty: number | null | undefined;
    Class: string | null | undefined;
    Title: string | null | undefined;
  };
};

export const HunterCard = ({ hunter }: HunterCardProps) => {

  const difficultyMap: { [key: number]: string } = {
    1: "Easy",
    2: "Medium",
    3: "Hard",
    4: "Very Hard",
  };

  const difficulty = hunter.Difficulty ? difficultyMap[hunter.Difficulty] : "Unknown";

  return (
    <Link href={`/hunters/${hunter.Name}`} key={hunter.Name}>
      <div
        className="relative h-56 min-w-56 rounded-md overflow-hidden bg-slate-700 text-white group"
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full 
          bg-no-repeat bg-top bg-[size:auto_150%] group-hover:bg-[size:auto_160%] transition-all duration-300"
          style={{
            backgroundImage: `url(${hunter.ConceptURL})`,
          }}
        >
          <div
            className="w-full h-full bg-gradient-to-t from-slate-700 to-slate-700/20"
          />
        </div>
        <div className="absolute bottom-0 text-center p-4 w-full">
          <h2 className="font-semibold text-lg">
            {hunter.Name}
          </h2>
          <p className="text-sm text-slate-400 mb-1">
            {hunter.Title}
          </p>
          <div className="flex items-center justify-center text-sm text-slate-400 gap-5">
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
        </div>
      </div>
    </Link>
  );
}
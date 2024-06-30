import bg from "assets/SV_KEYART.jpg";
import HuntersPage from "./hunters/page";
import HomeSearch from "./_components/homeSearch";

type HomeProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Home({searchParams}:HomeProps) {


  return (
    <main className="mx-3 md:mx-5">
      <div
        className="absolute top-[56px] left-0 w-full h-[20rem]
          bg-no-repeat bg-center bg-cover -z-10"
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      >
        <div
          className="w-full h-full bg-gradient-to-t from-background to-background/30"
        />
      </div>
      <div className="min-h-[calc(20rem-56px+2rem)] mb-8">
        <h1 className="text-4xl font-bold mt-16 mb-6">
          SUPERVIVE builds, guides, and more
        </h1>
        <HomeSearch />
      </div>
      <HuntersPage searchParams={searchParams} />
    </main>
  );
}

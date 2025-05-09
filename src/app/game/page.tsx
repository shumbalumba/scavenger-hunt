import { Game } from "./game";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const songs = (await searchParams).song;

  return <Game songs={songs} />;
}

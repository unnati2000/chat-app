import ProfileCard from "../components/profile-card/ProfileCard.component";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center my-3">
      <h1 className="text-blue-500 text-5xl font-semibold">
        Chit Chat application
      </h1>
      <div className="grid grid-cols-4 my-5 space-x-4 my-4 mx-2">
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </div>
  );
}

import ProfileCard from "../components/profile-card/ProfileCard.component";
import { dehydrate } from "react-query/hydration";
import baseURL from "../utils/baseURL.utils";
import cookie from "js-cookie";
import { useQuery, QueryClient } from "react-query";
import { parseCookies } from "nookies";
import axios from "axios";

const getUsers = async (token) => {
  const { data } = await axios.get(`${baseURL}/api/profile`, {
    headers: { Authorization: token },
  });
  return data;
};

export default function Home() {
  const { data, error, isError, isLoading } = useQuery("posts", () =>
    getUsers(cookie.get("token"))
  );

  console.log(data);
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

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();

  const { token } = parseCookies(ctx);

  await queryClient.prefetchInfiniteQuery(["posts"], () => getUsers(token));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

import Test from "@/components/test";
import { api } from "~/utils/api";

export default function TestPage() {
  const { data, isFetching, refetch } = api.post.getData.useQuery();

  return (
    <div className="w-2/3">
      <button onClick={() => refetch()}>refetch</button>
      {data && !isFetching && <Test data={data} />}
    </div>
  );
}

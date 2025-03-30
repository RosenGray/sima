import { config } from "@/utils/config";
import { ServiceCategoryMapping } from "../(private)/publish-ad/professionals/_lib/types";

const { API_URL } = config;

const url = `${API_URL}/api/professionals/service-categories/mapping`;

export default async function Dummypage() {
  const b = await fetch(url);
  const data = (await b.json()) as ServiceCategoryMapping;
  return (
    <div>
      <h1>Dummy Page</h1>
      {data["67a4ff1fe474c3020a84b980"].subCategories.map((item) => (
        <p key={item.id}>
          {item.displayName}
          <br />
          {item.description}
        </p>
      ))}
    </div>
  );
}

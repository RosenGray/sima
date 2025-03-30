import { ServiceCategoryMapping } from "../(private)/publish-ad/professionals/_lib/types";
import { staticFetch } from "@/fetch/static";


const url = `/api/professionals/service-categories/mapping`;

export default async function Dummypage() {
  const b = await staticFetch<ServiceCategoryMapping, Error>(url, {});
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

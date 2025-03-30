import { getServiceCategoriesMapping } from "../(private)/publish-ad/professionals/_lib/actions";

export default async function Dummypage() {
  const b = await getServiceCategoriesMapping();

  return (
    <div>
      <h1>Dummy Page</h1>
      {b["67a4ff1fe474c3020a84b980"].subCategories.map((item) => (
        <p key={item.id}>
          {item.displayName}
          <br />
          {item.description}
        </p>
      ))}
    </div>
  );
}

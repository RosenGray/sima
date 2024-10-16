import { HouseForRent } from "../HouseForRent";

it("implements optimistic concurrency control", async () => {
  const houseForRent = new HouseForRent({
    title: "test house",
    userId: "1234",
  });

  await houseForRent.save();

  const firstInstance = await HouseForRent.findById(houseForRent.id);
  const secondInstance = await HouseForRent.findById(houseForRent.id);

  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  await firstInstance!.save();

  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error("SHould not reach this point");
});


it("increments the version number on multiple saves", async () => {
    const houseForRent = new HouseForRent({
      title: "test house",
      userId: "1234",
    });
  
    await houseForRent.save();
    expect(houseForRent.version).toEqual(0);
    await houseForRent.save();
    expect(houseForRent.version).toEqual(1);
    await houseForRent.save();
    expect(houseForRent.version).toEqual(2);
    await houseForRent.save();
    console.log(houseForRent)
    expect(houseForRent.version).toEqual(3);
  });
  
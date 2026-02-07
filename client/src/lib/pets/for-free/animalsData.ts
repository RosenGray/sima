import type { Animal, AnimalId } from "@/lib/pets/animals/types/animal.schema";

/**
 * Animals data for the pets for-free flow.
 * Edit this file to change animal/kind options only for for-free;
 * for-sale and accessories use their own data.
 */
export const animals: Record<AnimalId, Animal> = {
  dog: {
    id: "dog",
    russianName: "Собака",
    kinds: [
      { id: "labrador", russianName: "Лабрадор" },
      { id: "german-shepherd", russianName: "Немецкая овчарка" },
      { id: "golden-retriever", russianName: "Золотистый ретривер" },
      { id: "bulldog", russianName: "Бульдог" },
      { id: "beagle", russianName: "Бигль" },
      { id: "poodle", russianName: "Пудель" },
      { id: "rottweiler", russianName: "Ротвейлер" },
      { id: "yorkshire-terrier", russianName: "Йоркширский терьер" },
      { id: "dachshund", russianName: "Такса" },
      { id: "siberian-husky", russianName: "Сибирский хаски" },
    ],
  },
  cat: {
    id: "cat",
    russianName: "Кошка",
    kinds: [
      { id: "persian", russianName: "Персидская" },
      { id: "siamese", russianName: "Сиамская" },
      { id: "maine-coon", russianName: "Мейн-кун" },
      { id: "british-shorthair", russianName: "Британская короткошерстная" },
      { id: "ragdoll", russianName: "Рэгдолл" },
      { id: "bengal", russianName: "Бенгальская" },
      { id: "russian-blue", russianName: "Русская голубая" },
      { id: "scottish-fold", russianName: "Шотландская вислоухая" },
      { id: "sphynx", russianName: "Сфинкс" },
      { id: "norwegian-forest", russianName: "Норвежская лесная" },
    ],
  },
  bird: {
    id: "bird",
    russianName: "Птица",
    kinds: [
      { id: "parrot", russianName: "Попугай" },
      { id: "canary", russianName: "Канарейка" },
      { id: "budgerigar", russianName: "Волнистый попугайчик" },
      { id: "cockatiel", russianName: "Корелла" },
      { id: "lovebird", russianName: "Неразлучник" },
      { id: "finch", russianName: "Зяблик" },
      { id: "cockatoo", russianName: "Какаду" },
      { id: "macaw", russianName: "Ара" },
      { id: "african-grey", russianName: "Жако" },
      { id: "conure", russianName: "Корелла-конур" },
    ],
  },
  rabbit: {
    id: "rabbit",
    russianName: "Кролик",
    kinds: [
      { id: "holland-lop", russianName: "Голландский вислоухий" },
      { id: "mini-rex", russianName: "Мини рекс" },
      { id: "lionhead", russianName: "Львиноголовый" },
      { id: "angora", russianName: "Ангорский" },
      { id: "flemish-giant", russianName: "Фламандский гигант" },
      { id: "netherland-dwarf", russianName: "Нидерландский карлик" },
      { id: "californian", russianName: "Калифорнийский" },
      { id: "new-zealand", russianName: "Новозеландский" },
      { id: "rex", russianName: "Рекс" },
      { id: "mini-lop", russianName: "Мини лоп" },
    ],
  },
  hamster: {
    id: "hamster",
    russianName: "Хомяк",
    kinds: [
      { id: "syrian", russianName: "Сирийский" },
      { id: "roborovski", russianName: "Роборовского" },
      { id: "winter-white", russianName: "Джунгарский" },
      { id: "chinese", russianName: "Китайский" },
      { id: "european", russianName: "Европейский" },
      { id: "campbell", russianName: "Кэмпбелла" },
      { id: "teddy-bear", russianName: "Тедди-медведь" },
      { id: "long-haired", russianName: "Длинношерстный" },
      { id: "short-haired", russianName: "Короткошерстный" },
      { id: "dwarf", russianName: "Карликовый" },
    ],
  },
};

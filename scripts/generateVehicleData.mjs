import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_DATA_PATH = '/Users/vladislaviokhim/.cursor/projects/Users-vladislaviokhim-Desktop-archive-sima/agent-tools/41ac55fe-6a5a-4124-afb3-e2a7057496ab.txt';
const OUTPUT_PATH = path.resolve(__dirname, '../client/src/lib/vehicles/vehicleManufacturers/data.ts');

const HEBREW_REGEX = /[\u0590-\u05FF]/;
const TRANSLATION_DELAY = 120;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CUSTOM_TRANSLATIONS = new Map([
  ['ב.מ.וו', 'БМВ'],
  ['אל.אי.וי.סי', 'ЛЕВСИ'],
  ['ג`י.איי.סי', 'Джи Эй Си'],
  ['אקספנג', 'Икспенг'],
  ['צ`רי', 'Чери'],
  ['סאנשיין', 'Саншайн'],
  ['אריזו 8', 'Аризо 8'],
  ['קליאו Ex Pack Plus', 'Клио Ex Pack Plus'],
]);

const decodeHtmlEntities = (text) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

const translateText = async (text) => {
  const manual = CUSTOM_TRANSLATIONS.get(text);
  if (manual) {
    return manual;
  }

  if (!HEBREW_REGEX.test(text)) {
    return text;
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=ru&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to translate text '${text}': ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const translated = payload?.[0]?.[0]?.[0];

  if (!translated) {
    throw new Error(`Unexpected translation payload for '${text}': ${JSON.stringify(payload)}`);
  }

  return decodeHtmlEntities(translated).replace(/\s+/g, ' ').trim();
};

const readRawData = async () => {
  const rawContent = await fs.readFile(RAW_DATA_PATH, 'utf-8');
  const cutoffIndex = rawContent.indexOf('\nCode:');
  const jsonPayload = cutoffIndex >= 0 ? rawContent.slice(0, cutoffIndex) : rawContent;
  return JSON.parse(jsonPayload.trim());
};

const collectTextsNeedingTranslation = (rawEntries) => {
  const seen = new Set();

  rawEntries.forEach((entry) => {
    if (entry.manufacturerName && HEBREW_REGEX.test(entry.manufacturerName)) {
      seen.add(entry.manufacturerName.trim());
    }

    entry.models.forEach((model) => {
      if (model.name && HEBREW_REGEX.test(model.name)) {
        seen.add(model.name.trim());
      }
    });
  });

  return Array.from(seen);
};

const buildTranslationMap = async (texts) => {
  const map = new Map();

  for (const text of texts) {
    try {
      const translated = await translateText(text);
      map.set(text, translated);
    } catch (error) {
      console.warn(error.message);
      map.set(text, text);
    }

    await sleep(TRANSLATION_DELAY);
  }

  return map;
};

const composeDataRecord = (rawEntries, translationMap) => {
  const record = {};

  rawEntries.forEach((entry) => {
    const manufacturerName = entry.manufacturerName.trim();
    const manufacturerRussian = translationMap.get(manufacturerName) ?? manufacturerName;

    const models = entry.models.map((model) => {
      const name = model.name.trim();
      const russianName = translationMap.get(name) ?? name;

      return {
        id: model.id,
        name,
        russianName,
      };
    });

    record[entry.manufacturerId] = {
      id: entry.manufacturerId,
      name: manufacturerName,
      russianName: manufacturerRussian,
      models,
    };
  });

  return record;
};

const emitTypeScript = async (record) => {
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });

  const serialized = JSON.stringify(record, null, 2);
  const banner = `import { VehicleManufacturer } from "./types/vehicleManufacturer.schema";\n\n`;
  const body = `export const vehicleManufacturers = ${serialized} satisfies Record<string, VehicleManufacturer>;\n`;

  await fs.writeFile(OUTPUT_PATH, `${banner}${body}`);
};

const main = async () => {
  const rawEntries = await readRawData();
  const texts = collectTextsNeedingTranslation(rawEntries);
  const translationMap = await buildTranslationMap(texts);
  const record = composeDataRecord(rawEntries, translationMap);
  await emitTypeScript(record);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

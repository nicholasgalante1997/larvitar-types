import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const CARDS_ENDPOINT = 'https://api.pokemontcg.io/v2/cards';
const SETS_ENDPOINT = 'https://api.pokemontcg.io/v2/sets';

async function getSets() {
  try {
    const axiosOptions = {
      responseType: 'json',
      responseEncoding: 'utf-8',
      headers: {
        'X-Api-Key': process.env.POKEMON_TCG_API_KEY,
      },
    };

    const { data, status } = await axios.get(SETS_ENDPOINT, axiosOptions);

    if (status < 200 || status > 299) {
      throw new Error(JSON.stringify(data));
    }

    return data.data;
  } catch (e) {
    console.error(e.message);

    throw e;
  }
}

async function getSet() {
  try {
    const axiosOptions = {
      responseType: 'json',
      responseEncoding: 'utf-8',
      headers: {
        'X-Api-Key': process.env.POKEMON_TCG_API_KEY,
      },
    };

    const { data, status } = await axios.get(
      SETS_ENDPOINT + '/sv1',
      axiosOptions
    );

    if (status < 200 || status > 299) {
      throw new Error(JSON.stringify(data));
    }

    return data.data;
  } catch (e) {
    console.error(e.message);

    throw e;
  }
}

async function getCard() {
  try {
    const axiosOptions = {
      responseType: 'json',
      responseEncoding: 'utf-8',
      headers: {
        'X-Api-Key': process.env.POKEMON_TCG_API_KEY,
      },
    };

    const { data, status } = await axios.get(
      CARDS_ENDPOINT + '/sv1-162',
      axiosOptions
    );

    if (status < 200 || status > 299) {
      throw new Error(JSON.stringify(data));
    }

    return data.data;
  } catch (e) {
    console.error(e.message);

    throw e;
  }
}

async function runScrape() {
  try {
    console.info('Beginning scrape operation of PokemonTCG API...');
    console.info('Pulling sets...');
    const sets = await getSets();
    console.info('Creating Set type...');
    const set = await getSet();
    console.info('Pulling Cards...');
    console.info('Creating Card type...');
    const card = await getCard();

    let jsonFile = {
      sets,
      set,
      card,
      setIds: sets.map((set) => ({ name: set.name, id: set.id })),
    };

    console.info('Writing out to file "src/json/pokedex.json"...');
    fs.writeFileSync(
      path.resolve(process.cwd(), 'src', 'json', 'pokedex.json'),
      JSON.stringify(jsonFile),
      { encoding: 'utf-8' }
    );
    console.info('Op completed.');
  } catch (e) {
    console.error(e.message);
    throw e;
  }
}

await runScrape();

export type Card = {
    id: string;
    name: string;
    supertype: string;
    subtypes?: string[];
    level?: string;
    hp: string;
    types: string[];
    evolvesFrom?: string;
    evolvesTo?: string[];
    rules?: string[];
    abilities?: Ability[];
    attacks: Attack[];
    weaknesses?: Weakness[];
    resistances?: Resistance[];
    retreatCost: string[];
    set: TCGSet;
    number: string;
    artist: string;
    rarity: string;
    nationalPokedexNumbers: number[];
    images: {
        small: string;
        large: string;
    };
    tcgplayer: TCGPlayerObject;
};

type TCGPlayerObject = {
    url: string;
    updatedAt: string;
    prices: Price[];
};

type Price = {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow: number;
};

type Ability = {
    name: string;
    text: string;
    type: string;
};

type Attack = {
    cost: string[];
    name: string;
    text: string;
    damage: string;
    convertedEnergyCost: number;
};

type Weakness = {
    type: string;
    value: string;
};

type Resistance = {
    type: string;
    value: string;
};

type TCGSet = {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
        symbol: string;
        logo: string;
    }
};

export const CARD_ENDPOINT = 'https://api.pokemontcg.io/v2/cards/%id%' as const;
export const CARDS_ENDPOINT = 'https://api.pokemontcg.io/v2/cards' as const;

export type SwordAndShieldSet = `swsh${number}-${number}` | `swsh${number}tg-TG${number}`;

/** Query string to match cards against: See https://docs.pokemontcg.io/api-reference/cards/search-cards#query-parameters */
export type CARDS_ENDPOINT_OPTIONS = {
    /** Query string to match cards against: See https://docs.pokemontcg.io/api-reference/cards/search-cards#query-parameters */
    q: string;
    
};


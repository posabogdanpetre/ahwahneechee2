// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        product_id: 'ceas-garmin-fenix-9-pro-amoled-inreach-47-mm',
        name: 'Ceas Garmin Fenix 9 PRO AMOLED inReach - 47 mm',
        brand: 'Garmin',
        category: 'Ceasuri & GPS-uri',
        sport: 'Multisport',
        kit_role: 'optional',
        selection_reason: 'Premium multisport GPS smartwatch with AMOLED display and inReach satellite communication.',
        price: 'De la 6.299,00 Lei',
        availability: 'In stock',
        image_url: 'https://media.sportguru.ro/media/catalog/product/0/1/010-04336-01-112_1.jpg',
        product_url: 'https://www.sportguru.ro/ceas-garmin-fenix-9-pro-amoled-inreach-47-mm',
    },
    {
        product_id: 'pantofi-alergare-dama-asics-gel-kayano-32-sunny-sizzle-ss-2026',
        name: 'Pantofi alergare dama Asics Gel-Kayano 32 Sunny Sizzle SS 2026',
        brand: 'Asics',
        category: 'Pantofi alergare',
        sport: 'Alergare',
        kit_role: 'essential',
        selection_reason: "Women's stability road-running shoe with maximal cushioning for long-distance comfort.",
        price: 'De la 714,00 Lei',
        availability: 'In stock',
        image_url: 'https://media.sportguru.ro/media/catalog/product/1/0/1012c045._8_i9.jpg',
        available_sizes: ['37', '37 1/2', '38', '39', '39 1/2', '40', '40 1/2'],
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-dama-asics-gel-kayano-32-sunny-sizzle-ss-2026',
    },
    {
        product_id: 'pantofi-alergare-dama-on-cloudmonster-3-ss-2026',
        name: 'Pantofi alergare dama ON Cloudmonster 3 SS 2026',
        brand: 'ON',
        category: 'Pantofi alergare',
        sport: 'Alergare',
        kit_role: 'useful',
        selection_reason: "Women's max-cushion road-running shoe engineered for energetic, plush rides.",
        price: 'De la 765,00 Lei',
        availability: 'In stock',
        image_url: 'https://media.sportguru.ro/media/catalog/product/0/0/000000_on-cloudmonster-3-wmns_limelight-seedling_3wg10034859_img0-1000x1000_1.jpg',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-dama-on-cloudmonster-3-ss-2026',
    },
    {
        product_id: 'pantofi-alergare-barbati-hoka-skyward-x-2',
        name: 'Pantofi alergare barbati Hoka Skyward X 2',
        brand: 'Hoka',
        category: 'Pantofi alergare',
        sport: 'Alergare',
        kit_role: 'essential',
        selection_reason: "Men's highly-cushioned road-running shoe with a responsive plate for long runs.",
        price: 'De la 964,00 Lei',
        availability: 'In stock',
        image_url: 'https://media.sportguru.ro/media/catalog/product/1/1/1171925-gtcb_1_1_2.jpg',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-barbati-hoka-skyward-x-2',
    },
    {
        product_id: 'pantofi-alergare-barbati-adidas-supernova-rise-3-ss-2026',
        name: 'Pantofi alergare barbati Adidas Supernova Rise 3 SS 2026',
        brand: 'Adidas',
        category: 'Pantofi alergare',
        sport: 'Alergare',
        kit_role: 'useful',
        selection_reason: "Men's everyday cushioned road-running shoe for training and easy miles.",
        price: 'De la 570,00 Lei',
        availability: 'In stock',
        image_url: 'https://media.sportguru.ro/media/catalog/product/j/p/jp8689_b2b012_plp_1.jpg',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-barbati-adidas-supernova-rise-3-ss-2026',
    },
    {
        product_id: 'bicicleta-pliabila-dahon-k9-16',
        name: 'Bicicleta pliabila Dahon K9 16"',
        brand: 'Dahon',
        category: 'Biciclete',
        sport: 'Ciclism',
        kit_role: 'optional',
        selection_reason: 'Compact 16-inch folding bicycle for city commuting and easy storage.',
        price: 'De la 5.295,00 Lei',
        availability: 'In stock',
        image_url: 'https://media.sportguru.ro/media/catalog/product/5/_/5_141bf4e4-76cd-451c-befd-19075bba9605_1.jpg',
        product_url: 'https://www.sportguru.ro/sporturi/ciclism/biciclete/biciclete-pentru-oras-si-imprejurimi/bicicleta-pliabila-dahon-k9-16',
    },
    {
        product_id: 'ceas-garmin-forerunner-970-amoled',
        name: 'Ceas Garmin Forerunner 970 AMOLED',
        brand: 'Garmin',
        category: 'Ceasuri & GPS-uri',
        sport: 'Alergare',
        kit_role: 'useful',
        selection_reason: 'Premium running and triathlon GPS smartwatch with AMOLED display and training metrics.',
        price: 'De la 3.399,00 Lei',
        availability: 'In stock',
        image_url: 'https://media.sportguru.ro/media/catalog/product/i/m/imageedit_25_83188919822.jpg',
        product_url: 'https://www.sportguru.ro/ceas-garmin-forerunner-970-amoled',
    },
    {
        product_id: 'ceas-garmin-instinct-3-45-mm-solar-tactical-edition',
        name: 'Ceas Garmin Instinct 3 - 45 mm, Solar, Tactical Edition',
        brand: 'Garmin',
        category: 'Ceasuri & GPS-uri',
        sport: 'Outdoor',
        kit_role: 'optional',
        selection_reason: 'Rugged solar-charging GPS smartwatch with tactical features and long battery life.',
        price: '1.949,00 Lei',
        availability: 'In stock',
        image_url: 'https://media.sportguru.ro/media/catalog/product/0/1/010-02934-501.jpg',
        product_url: 'https://www.sportguru.ro/ceas-garmin-instinct-3-45-mm-solar-tactical-edition',
    },
    {
        product_id: 'pantofi-alergare-barbati-puma-deviate-nitro-elite-4-showtime-ss-2026',
        name: 'Pantofi alergare barbati Puma Deviate Nitro Elite 4 Showtime SS 2026',
        brand: 'Puma',
        category: 'Pantofi alergare',
        sport: 'Alergare',
        kit_role: 'useful',
        selection_reason: "Men's carbon-plated racing shoe built for fast road racing and tempo efforts.",
        price: 'De la 875,00 Lei',
        availability: 'In stock',
        image_url: 'https://media.sportguru.ro/media/catalog/product/d/e/deviate-nitro_-elite-4-showtime-_1_5.jpg',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-barbati-puma-deviate-nitro-elite-4-showtime-ss-2026',
    },
];

// SportGuru catalogs sports in Romanian; shoppers ask in English. Map common
// English activity names onto the catalog's `sport` values so a query matches.
const SPORT_SYNONYMS = {
    running: 'alergare',
    run: 'alergare',
    jogging: 'alergare',
    cycling: 'ciclism',
    biking: 'ciclism',
    bike: 'ciclism',
    hiking: 'outdoor',
    trekking: 'outdoor',
    outdoor: 'outdoor',
    triathlon: 'multisport',
    multisport: 'multisport',
};

// Parses a Romanian-formatted price string ("De la 1.949,00 Lei") into a number.
function parsePrice(price) {
    if (typeof price === 'number') return price;
    if (typeof price !== 'string') return NaN;
    const match = price.replace(/\s/g, '').match(/([\d.]+,\d{2}|[\d.]+)/);
    if (!match) return NaN;
    const normalized = match[1].replace(/\./g, '').replace(',', '.');
    const value = parseFloat(normalized);
    return Number.isFinite(value) ? value : NaN;
}

module.exports = async ({
    sport = '',
    experience_level = '',
    budget_max_ron,
    environment = '',
    owned_items = [],
    preferences = [],
} = {}) => {
    if (!sport || typeof sport !== 'string' || !sport.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a sport or activity to build a kit for.' }],
            // structuredContent.products — derived from action name "build_activity_gear_kit" (bare array outputSchema rule)
            structuredContent: { products: [] },
        };
    }
    if (!experience_level || typeof experience_level !== 'string' || !experience_level.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide an experience_level (e.g. beginner, advanced).' }],
            structuredContent: { products: [] },
        };
    }
    if (typeof budget_max_ron !== 'number' || !(budget_max_ron > 0)) {
        return {
            content: [{ type: 'text', text: 'Please provide a valid budget_max_ron (a positive number in Romanian lei).' }],
            structuredContent: { products: [] },
        };
    }

    const rawQuery = sport.trim().toLowerCase();
    const sportQuery = SPORT_SYNONYMS[rawQuery] || rawQuery;
    const ownedSet = new Set((Array.isArray(owned_items) ? owned_items : []).map((s) => String(s).toLowerCase()));

    const matched = MOCK_DATA.filter((item) => {
        const itemSport = String(item.sport || '').toLowerCase();
        const sportOk = itemSport === sportQuery
            || itemSport.includes(sportQuery)
            || sportQuery.includes(itemSport)
            || itemSport === 'multisport';
        if (!sportOk) return false;
        // Exclude anything the shopper already owns (by name or category match).
        const owned = [...ownedSet].some((o) => o && (String(item.name).toLowerCase().includes(o) || String(item.category).toLowerCase().includes(o)));
        if (owned) return false;
        const priceValue = parsePrice(item.price);
        if (Number.isFinite(priceValue) && priceValue > budget_max_ron) return false;
        return true;
    });

    // kit_role order so essentials surface first in the widget.
    const roleRank = { essential: 0, useful: 1, optional: 2 };
    const results = matched.slice().sort((a, b) => (roleRank[a.kit_role] ?? 3) - (roleRank[b.kit_role] ?? 3));

    if (results.length === 0) {
        return {
            content: [{ type: 'text', text: `No SportGuru items fit a ${sport} kit within ${budget_max_ron} lei. Try raising the budget or broadening the activity.` }],
            structuredContent: { products: [] },
        };
    }

    const essentials = results.filter((r) => r.kit_role === 'essential');
    const total = results.reduce((sum, r) => {
        const p = parsePrice(r.price);
        return sum + (Number.isFinite(p) ? p : 0);
    }, 0);
    const lead = essentials[0] || results[0];
    const hasFootwear = results.some((r) => String(r.category).toLowerCase().includes('pantofi'));

    let summary = `Assembled a ${results.length}-item ${sport} kit for a ${experience_level}`;
    if (environment && environment.trim()) summary += ` (${environment.trim()})`;
    summary += `, roughly ${Math.round(total)} lei against a ${budget_max_ron} lei budget.`;
    summary += ` The kit covers ${essentials.length} essential item(s) plus useful and optional add-ons; the most important piece is ${lead.name}.`;
    if (!hasFootwear) summary += ' Note: no running footwear fit these constraints — that essential category may still need to be filled.';

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.products — derived from action name "build_activity_gear_kit" (bare array outputSchema rule)
        structuredContent: { products: results },
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/catalog?sport=${sport}&budget=${budget_max_ron}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/catalog?sport=${encodeURIComponent(sport)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */

// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Ceas Garmin Fenix 9 PRO AMOLED inReach - 47 mm',
        description: 'Premium multisport GPS smartwatch with AMOLED display and inReach satellite communication.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/0/1/010-04336-01-112_1.jpg',
        price: 'De la 6.299,00 Lei',
        category: 'Ceasuri & GPS-uri',
        brand: 'Garmin',
        sport: 'Multisport',
        gender: 'Unisex',
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/ceas-garmin-fenix-9-pro-amoled-inreach-47-mm',
        product_id: 'ceas-garmin-fenix-9-pro-amoled-inreach-47-mm',
    },
    {
        name: 'Pantofi alergare dama Asics Gel-Kayano 32 Sunny Sizzle SS 2026',
        description: "Women's stability road-running shoe with maximal cushioning for long-distance comfort.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/1/0/1012c045._8_i9.jpg',
        price: 'De la 714,00 Lei',
        original_price: '1.020,00 Lei',
        category: 'Pantofi alergare',
        brand: 'Asics',
        sport: 'Alergare',
        gender: 'Femei',
        size: '37,37.5,38,39,39.5,40,40.5',
        available_sizes: ['37', '37 1/2', '38', '39', '39 1/2', '40', '40 1/2'],
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-dama-asics-gel-kayano-32-sunny-sizzle-ss-2026',
        product_id: 'pantofi-alergare-dama-asics-gel-kayano-32-sunny-sizzle-ss-2026',
    },
    {
        name: 'Pantofi alergare dama ON Cloudmonster 3 SS 2026',
        description: "Women's max-cushion road-running shoe engineered for energetic, plush rides.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/0/0/000000_on-cloudmonster-3-wmns_limelight-seedling_3wg10034859_img0-1000x1000_1.jpg',
        price: 'De la 765,00 Lei',
        original_price: '1.020,00 Lei',
        category: 'Pantofi alergare',
        brand: 'ON',
        sport: 'Alergare',
        gender: 'Femei',
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-dama-on-cloudmonster-3-ss-2026',
        product_id: 'pantofi-alergare-dama-on-cloudmonster-3-ss-2026',
    },
    {
        name: 'Pantofi alergare barbati Hoka Skyward X 2',
        description: "Men's highly-cushioned road-running shoe with a responsive plate for long runs.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/1/1/1171925-gtcb_1_1_2.jpg',
        price: 'De la 964,00 Lei',
        original_price: '1.205,00 Lei',
        category: 'Pantofi alergare',
        brand: 'Hoka',
        sport: 'Alergare',
        gender: 'Barbati',
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-barbati-hoka-skyward-x-2',
        product_id: 'pantofi-alergare-barbati-hoka-skyward-x-2',
    },
    {
        name: 'Pantofi alergare barbati Adidas Supernova Rise 3 SS 2026',
        description: "Men's everyday cushioned road-running shoe for training and easy miles.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/j/p/jp8689_b2b012_plp_1.jpg',
        price: 'De la 570,00 Lei',
        original_price: '750,00 Lei',
        category: 'Pantofi alergare',
        brand: 'Adidas',
        sport: 'Alergare',
        gender: 'Barbati',
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-barbati-adidas-supernova-rise-3-ss-2026',
        product_id: 'pantofi-alergare-barbati-adidas-supernova-rise-3-ss-2026',
    },
    {
        name: 'Bicicleta pliabila Dahon K9 16"',
        description: 'Compact 16-inch folding bicycle for city commuting and easy storage.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/5/_/5_141bf4e4-76cd-451c-befd-19075bba9605_1.jpg',
        price: 'De la 5.295,00 Lei',
        category: 'Biciclete',
        brand: 'Dahon',
        sport: 'Ciclism',
        gender: 'Unisex',
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/sporturi/ciclism/biciclete/biciclete-pentru-oras-si-imprejurimi/bicicleta-pliabila-dahon-k9-16',
        product_id: 'bicicleta-pliabila-dahon-k9-16',
    },
    {
        name: 'Ceas Garmin Forerunner 970 AMOLED',
        description: 'Premium running and triathlon GPS smartwatch with AMOLED display and training metrics.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/i/m/imageedit_25_83188919822.jpg',
        price: 'De la 3.399,00 Lei',
        original_price: '3.781,00 Lei',
        discount_percentage: '10% OFF',
        category: 'Ceasuri & GPS-uri',
        brand: 'Garmin',
        sport: 'Alergare',
        gender: 'Unisex',
        availability: 'In stock',
        is_deal: true,
        product_url: 'https://www.sportguru.ro/ceas-garmin-forerunner-970-amoled',
        product_id: 'ceas-garmin-forerunner-970-amoled',
    },
    {
        name: 'Ceas Garmin Instinct 3 - 45 mm, Solar, Tactical Edition',
        description: 'Rugged solar-charging GPS smartwatch with tactical features and long battery life.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/0/1/010-02934-501.jpg',
        price: '1.949,00 Lei',
        original_price: '2.279,00 Lei',
        discount_percentage: '14% OFF',
        category: 'Ceasuri & GPS-uri',
        brand: 'Garmin',
        sport: 'Outdoor',
        gender: 'Unisex',
        availability: 'In stock',
        is_deal: true,
        product_url: 'https://www.sportguru.ro/ceas-garmin-instinct-3-45-mm-solar-tactical-edition',
        product_id: 'ceas-garmin-instinct-3-45-mm-solar-tactical-edition',
    },
    {
        name: 'Pantofi alergare barbati Puma Deviate Nitro Elite 4 Showtime SS 2026',
        description: "Men's carbon-plated racing shoe built for fast road racing and tempo efforts.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/d/e/deviate-nitro_-elite-4-showtime-_1_5.jpg',
        price: 'De la 875,00 Lei',
        original_price: '1.249,00 Lei',
        discount_percentage: '30% OFF',
        category: 'Pantofi alergare',
        brand: 'Puma',
        sport: 'Alergare',
        gender: 'Barbati',
        availability: 'In stock',
        is_deal: true,
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-barbati-puma-deviate-nitro-elite-4-showtime-ss-2026',
        product_id: 'pantofi-alergare-barbati-puma-deviate-nitro-elite-4-showtime-ss-2026',
    },
];

// Parse a Romanian-formatted price string ("De la 1.020,00 Lei") into a number (1020).
function parsePriceRon(raw) {
    if (typeof raw === 'number') return raw;
    if (typeof raw !== 'string') return null;
    const m = raw.match(/([\d.]+,\d{2}|\d[\d.]*)/);
    if (!m) return null;
    const normalized = m[1].replace(/\./g, '').replace(',', '.');
    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
}

// Parse a discount label ("30% OFF") into a number (30).
function parseDiscountPercent(item) {
    if (typeof item.discount_percentage === 'string') {
        const m = item.discount_percentage.match(/(\d+(?:\.\d+)?)/);
        if (m) return Number(m[1]);
    }
    const cur = parsePriceRon(item.price);
    const orig = parsePriceRon(item.original_price);
    if (cur !== null && orig !== null && orig > 0 && cur < orig) {
        return Math.round(((orig - cur) / orig) * 100);
    }
    return 0;
}

// Map a raw MOCK_DATA entry to the outputSchema-shaped deal object the widget reads.
function toDeal(item) {
    return {
        product_id: item.product_id || null,
        name: item.name || null,
        brand: item.brand || null,
        category: item.category || null,
        current_price: parsePriceRon(item.price),
        original_price: parsePriceRon(item.original_price),
        discount_percent: parseDiscountPercent(item),
        offer_description: item.discount_percentage || item.description || null,
        offer_end: item.offer_end || null,
        availability: item.availability || null,
        image_url: item.image_url || null,
        product_url: item.product_url || null,
    };
}

module.exports = async ({
    sport = '',
    category = '',
    brand = '',
    size = '',
    budget_max_ron = null,
    minimum_discount_percent = null,
    sort_by = 'relevance',
} = {}) => {
    const norm = (s) => String(s || '').trim().toLowerCase();

    // Only genuine promotions are "current deals": a published discount label or a
    // current price below the reference price.
    let results = MOCK_DATA.filter((item) => parseDiscountPercent(item) > 0).map(toDeal);

    if (sport) {
        const q = norm(sport);
        results = results.filter((d) => {
            const src = MOCK_DATA.find((m) => m.product_id === d.product_id);
            return src && norm(src.sport).includes(q);
        });
    }
    if (category) {
        const q = norm(category);
        results = results.filter((d) => norm(d.category).includes(q));
    }
    if (brand) {
        const q = norm(brand);
        results = results.filter((d) => norm(d.brand).includes(q));
    }
    if (size) {
        const q = norm(size);
        results = results.filter((d) => {
            const src = MOCK_DATA.find((m) => m.product_id === d.product_id);
            if (!src || !src.size) return false;
            return String(src.size).split(',').map((s) => norm(s)).includes(q);
        });
    }
    if (typeof budget_max_ron === 'number' && budget_max_ron > 0) {
        results = results.filter((d) => d.current_price !== null && d.current_price <= budget_max_ron);
    }
    if (typeof minimum_discount_percent === 'number' && minimum_discount_percent > 0) {
        results = results.filter((d) => (d.discount_percent || 0) >= minimum_discount_percent);
    }

    if (sort_by === 'largest_discount' || sort_by === 'discount') {
        results.sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0));
    } else if (sort_by === 'lowest_price' || sort_by === 'price') {
        results.sort((a, b) => (a.current_price || Infinity) - (b.current_price || Infinity));
    } else {
        results.sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0));
    }

    if (results.length === 0) {
        return {
            content: [{ type: 'text', text: 'No current deals matched those filters. Try widening your budget, discount, or category.' }],
            // structuredContent.deals — derived from action name "find_current_deals" (bare array outputSchema rule)
            structuredContent: { deals: [] },
        };
    }

    const top = results[0];
    return {
        content: [{ type: 'text', text: `Found ${results.length} current SportGuru deal(s) — the strongest is ${top.name} at ${top.discount_percent}% off. Verify the final price and stock on the product page before you check out.` }],
        // structuredContent.deals — derived from action name "find_current_deals" (bare array outputSchema rule)
        structuredContent: { deals: results },
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/deals?sport=${sport}&category=${category}&brand=${brand}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/deals?category=${encodeURIComponent(category)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */

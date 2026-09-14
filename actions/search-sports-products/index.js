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

// Parse a Romanian-formatted price string ("De la 6.299,00 Lei") into a number of lei.
function parsePriceRon(priceStr) {
    if (typeof priceStr !== 'string') return null;
    const match = priceStr.replace(/\./g, '').replace(/,/g, '.').match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : null;
}

module.exports = async ({
    query = '',
    sport = '',
    category = '',
    budget_max_ron = null,
    gender = '',
    size = '',
    brand = '',
    sort_by = '',
} = {}) => {
    if (!query || typeof query !== 'string' || !query.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a query describing the product, sport, brand, or need you want to explore.' }],
            // structuredContent.products — bare array outputSchema; key derived from actionName "search_sports_products"
            structuredContent: { products: [] },
        };
    }

    const q = query.trim().toLowerCase();
    const wantSport = String(sport || '').trim().toLowerCase();
    const wantCategory = String(category || '').trim().toLowerCase();
    const wantGender = String(gender || '').trim().toLowerCase();
    const wantSize = String(size || '').trim().toLowerCase();
    const wantBrand = String(brand || '').trim().toLowerCase();
    const maxBudget = typeof budget_max_ron === 'number' && budget_max_ron > 0 ? budget_max_ron : null;

    let results = MOCK_DATA.filter((item) => {
        const haystack = [item.name, item.brand, item.sport, item.category, item.description, item.gender]
            .filter(Boolean).join(' ').toLowerCase();
        if (q && !haystack.includes(q)) {
            // fall back to token match so multi-word queries still match
            const tokens = q.split(/\s+/).filter((t) => t.length > 2);
            const anyToken = tokens.some((t) => haystack.includes(t));
            if (tokens.length && !anyToken) return false;
        }
        if (wantSport && String(item.sport || '').toLowerCase() !== wantSport) return false;
        if (wantCategory && !String(item.category || '').toLowerCase().includes(wantCategory)) return false;
        if (wantGender && String(item.gender || '').toLowerCase() !== wantGender) return false;
        if (wantBrand && String(item.brand || '').toLowerCase() !== wantBrand) return false;
        if (wantSize) {
            const sizes = Array.isArray(item.available_sizes) ? item.available_sizes.map((s) => String(s).toLowerCase()) : [];
            if (!sizes.includes(wantSize)) return false;
        }
        if (maxBudget !== null) {
            const price = parsePriceRon(item.price);
            if (price !== null && price > maxBudget) return false;
        }
        return true;
    });

    if (sort_by) {
        const key = String(sort_by).trim().toLowerCase();
        if (key === 'lowest price') {
            results = results.slice().sort((a, b) => (parsePriceRon(a.price) ?? Infinity) - (parsePriceRon(b.price) ?? Infinity));
        } else if (key === 'highest price') {
            results = results.slice().sort((a, b) => (parsePriceRon(b.price) ?? -Infinity) - (parsePriceRon(a.price) ?? -Infinity));
        } else if (key === 'largest discount') {
            const disc = (it) => parseInt(String(it.discount_percentage || '0').replace(/[^\d]/g, ''), 10) || 0;
            results = results.slice().sort((a, b) => disc(b) - disc(a));
        }
    }

    if (results.length === 0) {
        return {
            content: [{ type: 'text', text: `No products found matching "${query}". Try broadening the sport, brand, or budget.` }],
            // structuredContent.products — bare array outputSchema; key derived from actionName "search_sports_products"
            structuredContent: { products: [] },
        };
    }

    return {
        content: [{ type: 'text', text: `Found ${results.length} SportGuru product${results.length === 1 ? '' : 's'} matching "${query}" — the leading options best fit the sport, budget, and preferences you described. Price and availability can change, so confirm both on the product page before purchase.` }],
        // structuredContent.products — bare array outputSchema; key derived from actionName "search_sports_products"
        structuredContent: { products: results },
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/catalog/search?q=${query}&sport=${sport}&max_price=${budget_max_ron}
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
 *     `${process.env.API_BASE_URL}/catalog/search?q=${encodeURIComponent(query)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */

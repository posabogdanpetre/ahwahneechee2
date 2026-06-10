/**
 * get_product_details — Retrieves detailed information about a specific Patagonia product by name
 */

// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block at the bottom of this file for endpoint details.
const MOCK_DATA = [
    {
        name: "Better Sweater™ Fleece Jacket",
        description: "Warm 100% recycled polyester full-zip jacket with sweater-knit aesthetic and Fair Trade Certified construction.",
        price: "£130",
        materials: "100% recycled polyester fleece with sweater-knit face",
        weight: "13.4 oz (380 g)",
        colors: ["Black", "New Navy", "Stonewash", "Industrial Green", "Classic Tan"],
        rating: 4.7,
        review_count: 1243,
        features: [
            "Fair Trade Certified™ sewn",
            "Micro-polyester fleece with sweater-knit face",
            "Full-zip with stand-up collar",
            "Zippered handwarmer pockets",
            "Raglan sleeves for pack-wearing comfort"
        ],
        care_instructions: "Machine wash cold, tumble dry low. Do not bleach or iron.",
        image_url: "https://www.patagonia.com/dw/image/v2/products/better-sweater-fleece-jacket.jpg"
    },
    {
        name: "Black Hole® Duffel 55L",
        description: "Legendary 55-liter duffel with weather-resistant 100% recycled fabric and removable backpack straps.",
        price: "£160",
        materials: "100% recycled polyester ripstop with TPU-film laminate",
        weight: "1 lb 9 oz (709 g)",
        colors: ["Black", "Smolder Blue", "Lagom Blue", "Forge Grey"],
        rating: 4.8,
        review_count: 892,
        features: [
            "Weather-resistant recycled fabric",
            "Removable padded shoulder straps convert to backpack carry",
            "Multiple exterior pockets for organization",
            "Padded base for durability",
            "Daisy chains for lashing extra gear"
        ],
        care_instructions: "Wipe clean with damp cloth. Air dry.",
        image_url: "https://www.patagonia.com/dw/image/v2/products/black-hole-duffel-55l.jpg"
    },
    {
        name: "Nano Puff® Jacket",
        description: "Lightweight, windproof insulated jacket with 60g PrimaLoft Gold Eco insulation and recycled shell.",
        price: "£230",
        materials: "100% recycled polyester shell with 60g PrimaLoft® Gold Insulation Eco",
        weight: "11.8 oz (335 g)",
        colors: ["Black", "Navy Blue", "Basin Green", "Forge Grey", "Classic Red"],
        rating: 4.9,
        review_count: 2156,
        features: [
            "PrimaLoft® Gold Insulation Eco for warmth",
            "Brick quilting pattern stabilizes insulation",
            "Windproof and water-resistant shell",
            "Two zippered handwarmer pockets",
            "Packs into its own internal chest pocket"
        ],
        care_instructions: "Machine wash cold, tumble dry low. Do not bleach.",
        image_url: "https://www.patagonia.com/dw/image/v2/products/nano-puff-jacket.jpg"
    },
    {
        name: "Baggies™ Shorts 5\"",
        description: "Quick-drying multifunctional shorts with a DWR finish, perfect for water and land.",
        price: "£55",
        materials: "100% recycled nylon with DWR (durable water repellent) finish",
        weight: "5 oz (142 g)",
        colors: ["Navy Blue", "Nouveau Green", "Fire Red", "Black", "Stone Blue"],
        rating: 4.6,
        review_count: 1574,
        features: [
            "Quick-drying recycled nylon",
            "DWR finish sheds moisture",
            "Elastic waistband with internal drawcord",
            "Mesh liner for comfort",
            "Back snap-closure pocket"
        ],
        care_instructions: "Machine wash warm, tumble dry low.",
        image_url: "https://www.patagonia.com/dw/image/v2/products/baggies-shorts-5.jpg"
    },
    {
        name: "Capilene® Cool Daily Shirt",
        description: "Lightweight moisture-wicking tee with HeiQ Fresh odor control and Fair Trade Certified.",
        price: "£40",
        materials: "50–100% recycled polyester with HeiQ® Fresh odor control",
        weight: "3.5 oz (99 g)",
        colors: ["White", "Black", "Feather Grey", "Basin Green", "Viking Blue"],
        rating: 4.5,
        review_count: 687,
        features: [
            "HeiQ Fresh odor control",
            "Moisture-wicking fabric",
            "Polygiene® permanent odor control",
            "Fair Trade Certified™ sewn",
            "Offset shoulder seams for comfort with pack straps"
        ],
        care_instructions: "Machine wash cold, tumble dry low. Do not use fabric softener.",
        image_url: "https://www.patagonia.com/dw/image/v2/products/capilene-cool-daily-shirt.jpg"
    }
];

module.exports = async ({ product_name = '' }) => {
    // Validate required parameter
    if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }],
            structuredContent: { product: null }
        };
    }

    const query = product_name.trim();

    // Look up the product by name (case-insensitive partial match)
    const product = MOCK_DATA.find(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (!product) {
        return {
            content: [{ type: 'text', text: `No product found matching: ${product_name}` }],
            structuredContent: { product: null }
        };
    }

    // Return detailed product information
    return {
        content: [{
            type: 'text',
            text: `Found product: ${product.name} - ${product.price}. ${product.description} Available in ${product.colors.length} colors. Rated ${product.rating}/5 based on ${product.review_count} reviews.`
        }],
        // structuredContent.product — detail outputSchema; key derived from concept "product-detail"
        structuredContent: {
            product: {
                name: product.name,
                price: product.price,
                description: product.description,
                materials: product.materials,
                weight: product.weight,
                colors: product.colors,
                rating: product.rating,
                review_count: product.review_count,
                features: product.features,
                care_instructions: product.care_instructions,
                image_url: product.image_url
            }
        }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products/${product_id}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API (e.g., https://www.patagonia.com/api)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check Patagonia's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.products[0] || null
 */

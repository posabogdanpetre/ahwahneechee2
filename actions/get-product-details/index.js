// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: "Men's Micro D Fleece Jacket",
        description: "Made with 100% recycled polyester, feels unbelievably soft, provides continual warmth, and dries quickly.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwe09856fd/images/hi-res/26171_ELGR.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        price: "£63",
        category: "Men's Fleece",
        materials: "100% recycled polyester",
        weight: "310g",
        colors: ["Evergreen", "Navy Blue", "Black"],
        rating: 4.7,
        review_count: 189,
        certifications: ["Fair Trade Certified", "bluesign approved"]
    },
    {
        name: "Women's Retro Pile Fleece Jacket",
        description: "Heritage-inspired with 100% recycled polyester double-sided shearling fleece for ultimate softness and warmth.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw7c2512d9/images/hi-res/22795_NAT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        price: "£140",
        category: "Women's Fleece",
        materials: "100% recycled polyester double-sided shearling fleece",
        weight: "455g",
        colors: ["Natural", "Stone Blue", "Black"],
        rating: 4.9,
        review_count: 312,
        certifications: ["Fair Trade Certified", "bluesign approved"]
    },
    {
        name: "Men's Classic Retro-X Fleece Jacket",
        description: "Iconic windproof quarter-inch pile fleece made with 100% REPREVE recycled polyester sourced from coastal communities.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw443a7d6d/images/hi-res/23057_DNBA.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        price: "£220",
        category: "Men's Fleece",
        materials: "100% REPREVE recycled polyester fleece with windproof nylon chest overlay",
        weight: "595g",
        colors: ["Dark Natural w/ Barn Red", "Pelican w/ Navy Blue", "Black w/ Smolder Blue"],
        rating: 4.8,
        review_count: 527,
        certifications: ["Fair Trade Certified", "bluesign approved", "NetPlus"]
    },
    {
        name: "Airfarer Cap",
        description: "Five-panel organic cotton hat with brim built from fully traceable NetPlus 100% recycled fishing nets.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf95efc62/images/hi-res/37996_STSA.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        price: "£40",
        category: "Hats & Accessories",
        materials: "Organic cotton crown, NetPlus 100% recycled fishing net brim",
        weight: "85g",
        colors: ["Stone Blue", "Basin Green", "Black"],
        rating: 4.6,
        review_count: 143,
        certifications: ["Organic Content Standard", "NetPlus", "Fair Trade Certified"]
    },
    {
        name: "Friction Belt",
        description: "Low-profile 100% recycled nylon web belt with anticorrosive aluminum buckle that doubles as an emergency lash strap.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw15ced377/images/hi-res/59179_BLK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        price: "£28",
        category: "Accessories",
        materials: "100% recycled nylon webbing, aluminum buckle",
        weight: "60g",
        colors: ["Black", "Forge Grey", "Navy Blue"],
        rating: 4.5,
        review_count: 98,
        certifications: ["bluesign approved"]
    }
]

module.exports = async ({ product_name = '' }) => {
    if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }]
        }
    }

    const query = product_name.trim()
    const item = MOCK_DATA.find(p => p.name.toLowerCase() === query.toLowerCase())

    if (!item) {
        return {
            content: [{ type: 'text', text: `No product found matching: ${product_name}` }]
        }
    }

    // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
    return {
        content: [{ type: 'text', text: `Found product: ${item.name} — ${item.price}. ${item.description}` }],
        structuredContent: {
            name: item.name,
            price: item.price,
            description: item.description,
            materials: item.materials,
            weight: item.weight,
            colors: item.colors,
            rating: item.rating,
            review_count: item.review_count,
            certifications: item.certifications,
            image_url: item.image_url
        }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products/${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products/${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data
 */

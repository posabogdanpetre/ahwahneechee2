// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        "name": "Men's Boulder Fork Rain Jacket",
        "description": "Low-profile 3-layer shell with exceptional waterproof/breathable protection.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwe30ba363/images/hi-res/85140_SMDB.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": 250,
        "category": "Men's Jackets",
        "materials": "3-layer H2No Performance Standard shell with 100% recycled nylon face fabric",
        "available_colors": ["Smolder Blue", "Black"],
        "available_sizes": ["S", "M", "L", "XL", "XXL"],
        "sustainability": "Made with 100% recycled nylon face fabric. Fair Trade Certified sewn."
    },
    {
        "name": "Men's Triolet Alpine Jacket",
        "description": "Alpine climbing workhorse built to thrive in cold, snowy conditions with 3-layer waterproof fabric.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw95d91ca9/images/hi-res/83403_CPRG.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": 370,
        "category": "Men's Jackets",
        "materials": "3-layer GORE-TEX Pro with 70D 100% recycled nylon face fabric",
        "available_colors": ["Copper Ore", "Black"],
        "available_sizes": ["S", "M", "L", "XL"],
        "sustainability": "Made with 100% recycled GORE-TEX Pro fabric. Fair Trade Certified sewn."
    },
    {
        "name": "Men's Windsweep Lightweight Windbreaker Jacket",
        "description": "Lightweight, packable windbreaker made of 100% organic cotton, Fair Trade Certified.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3ae01c29/images/hi-res/20320_INBK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": 210,
        "category": "Men's Jackets",
        "materials": "100% organic cotton with DWR finish",
        "available_colors": ["Industrial Black", "Nouveau Green"],
        "available_sizes": ["S", "M", "L", "XL", "XXL"],
        "sustainability": "Made with 100% organic cotton. Fair Trade Certified sewn."
    },
    {
        "name": "Women's Better Sweater Fleece Jacket",
        "description": "Warm full-zip jacket made of 100% recycled polyester with sweater-knit aesthetic.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwb74b05e1/images/hi-res/25543_NENA.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": 130,
        "category": "Women's Fleece",
        "materials": "100% recycled polyester sweater-knit fleece",
        "available_colors": ["Navy", "Birch White", "Black"],
        "available_sizes": ["XS", "S", "M", "L", "XL"],
        "sustainability": "Made with 100% recycled polyester. Fair Trade Certified sewn."
    },
    {
        "name": "Women's R1 Air Fleece Midlayer Zip-Neck",
        "description": "Lightweight, highly breathable, quick-drying technical fleece for cool conditions.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw2ade861d/images/hi-res/40251_QVLT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": 120,
        "category": "Women's Fleece",
        "materials": "51% recycled polyester, 49% polyester R1 Air fleece",
        "available_colors": ["Quartz Violet", "Black"],
        "available_sizes": ["XS", "S", "M", "L"],
        "sustainability": "Made with 51% recycled polyester. Fair Trade Certified sewn."
    },
    {
        "name": "Women's Retro Pile Fleece Jacket",
        "description": "Heritage-inspired jacket made with 100% recycled polyester offering ultimate softness.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw7c2512d9/images/hi-res/22795_NAT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": 140,
        "category": "Women's Fleece",
        "materials": "100% recycled polyester high-pile fleece",
        "available_colors": ["Natural", "Black", "Basin Green"],
        "available_sizes": ["XS", "S", "M", "L", "XL"],
        "sustainability": "Made with 100% recycled polyester. Fair Trade Certified sewn."
    },
    {
        "name": "Women's Lightweight Synchilla Snap-T Fleece Pullover",
        "description": "Classic pullover providing everyday warmth with soft recycled polyester fleece.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw437708c0/images/hi-res/25455_KALB.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": 120,
        "category": "Women's Fleece",
        "materials": "100% recycled polyester double-sided fleece",
        "available_colors": ["Kelp Forest", "Black"],
        "available_sizes": ["XS", "S", "M", "L", "XL"],
        "sustainability": "Made with 100% recycled polyester. Fair Trade Certified sewn."
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
            content: [{ type: 'text', text: `No results found for: ${product_name}` }]
        }
    }

    return {
        content: [{ type: 'text', text: `Found product: ${item.name} - ${item.description} Price: £${item.price}. Available in ${item.available_colors.join(', ')}. ${item.sustainability}` }],
        // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
        structuredContent: {
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image_url: item.image_url,
            materials: item.materials,
            available_colors: item.available_colors,
            available_sizes: item.available_sizes,
            sustainability: item.sustainability
        }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or GET ${process.env.API_BASE_URL}/products/${productId}
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
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data
 */
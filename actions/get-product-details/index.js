module.exports = async ({ product_name = '' }) => {
    // Validate required parameter
    if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_name to retrieve details for.' }],
            structuredContent: { item: null }
        }
    }

    const query = product_name.trim()

    // TODO: Replace MOCK_DATA with a real API call.
    // See the TODO block below the handler for endpoint details.
    const MOCK_DATA = [
        {
            name: "Men's Nano Puff Packable Insulated Jacket",
            description: "Weather-resistant, lightweight and packable synthetic insulation layer that stays warm when wet.",
            image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
            price: "£170",
            category: "Insulated Jackets"
        },
        {
            name: "Men's Down Sweater Insulated Jacket",
            description: "Lightweight, windproof jacket with recycled nylon shell and 800-fill-power down insulation.",
            image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3c83e113/images/hi-res/84675_CLOR.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
            price: "£230",
            category: "Insulated Jackets"
        },
        {
            name: "Men's Torrentshell 3L Rain Jacket",
            description: "Waterproof and breathable 3-layer rain jacket providing excellent performance and durability.",
            image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3f39aea6/images/hi-res/85241_LMST.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
            price: "£180",
            category: "Rain Jackets"
        },
        {
            name: "Women's M10 Storm Waterproof Alpine Jacket",
            description: "Cleanly designed waterproof and breathable shell built for fast-forward alpine climbing in harsh conditions.",
            image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw138c7520/images/hi-res/85915_SMDB.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
            price: "£360",
            category: "Alpine Jackets"
        },
        {
            name: "Men's Houdini Windbreaker Jacket",
            description: "Packable, featherweight windproof shell made from recycled nylon for running, riding and climbing.",
            image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwa687f184/images/hi-res/24142_AQST.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
            price: "£100",
            category: "Windbreakers"
        }
    ]

    // Look up product by name (case-insensitive partial match)
    const item = MOCK_DATA.find(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    )

    if (!item) {
        return {
            content: [{ type: 'text', text: `No product found matching: ${product_name}` }],
            structuredContent: { item: null }
        }
    }

    // Return detailed product information
    return {
        content: [{
            type: 'text',
            text: `Found product: ${item.name}. ${item.description} Price: ${item.price}.`
        }],
        structuredContent: {
            name: item.name,
            description: item.description,
            price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[£,]/g, '')) : item.price,
            category: item.category,
            image_url: item.image_url,
            materials: item.materials || '',
            features: item.features || [],
            colors: item.colors || [],
            sizes: item.sizes || []
        }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products/${product_id}
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
 *   return data.products[0] // adjust based on actual response shape
 */
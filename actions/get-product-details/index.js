module.exports = async ({ product_name = '' }) => {
    if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_name to retrieve details for.' }]
        }
    }

    const query = product_name.trim()

    // TODO: Replace MOCK_DATA with a real API call.
    // See the TODO block below the handler for endpoint details.
    const MOCK_DATA = [
        {
            "name": "Men's Textured Fleece Jacket",
            "description": "Soft, quick-drying jacket in 100% recycled fabric with pebbled texture, built for warmth and everyday wear.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw52d6c1f7/images/hi-res/23310_WSTO.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": "£150",
            "category": "Men's Fleece"
        },
        {
            "name": "Women's Down Sweater Insulated Jacket",
            "description": "Lightweight, windproof jacket with recycled nylon shell and 800-fill-power recycled down for versatile warmth.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw4729f37a/images/hi-res/84684_BNLB.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": "£230",
            "category": "Women's Insulated Jackets"
        },
        {
            "name": "Black Hole Micro MLC Carry-On Backpack 22L",
            "description": "Soft-sided convertible backpack designed for strictest travel requirements, can be carried three ways.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw0eb0f7af/images/hi-res/49260_BCW.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": "£140",
            "category": "Backpacks & Travel"
        },
        {
            "name": "Men's Downdrift Insulated Jacket",
            "description": "Retro-inspired down jacket with 600-fill-power recycled down providing warmth for mountains and beyond.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwaed79869/images/hi-res/20600_OLGG.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": "£224",
            "category": "Men's Down Jackets"
        },
        {
            "name": "Women's Untracked Ski/Snowboard Jacket",
            "description": "Waterproof storm protection for big-mountain descents with supple 3-layer GORE-TEX ePE Performance fabric.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf20a5a24/images/hi-res/29879_TNGO.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": "£441",
            "category": "Women's Ski & Snowboard"
        },
        {
            "name": "Men's Better Sweater 1/4-Zip Fleece Pullover",
            "description": "Warm, 100% recycled polyester quarter-zip combining sweater-knit aesthetic with easy-care fleece performance.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw1e3ab535/images/hi-res/25523_CLOR.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": "£120",
            "category": "Men's Fleece"
        }
    ]

    const item = MOCK_DATA.find(p => p.name.toLowerCase() === query.toLowerCase())

    if (!item) {
        return {
            content: [{ type: 'text', text: `No product found for: ${product_name}` }]
        }
    }

    return {
        content: [{ type: 'text', text: `Found product: ${item.name} - ${item.description} Price: ${item.price}` }],
        // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
        structuredContent: { ...item }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products/${productId}
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
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data
 */
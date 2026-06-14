const MOCK_DATA = [
    {
        name: "Men's Textured Fleece Jacket",
        description: "Soft, quick-drying jacket in 100% recycled fabric with pebbled texture, built for warmth and everyday wear.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw52d6c1f7/images/hi-res/23310_WSTO.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
        price: 150,
        category: "Fleece",
        product_url: "https://eu.patagonia.com/products/mens-textured-fleece-jacket-23310"
    },
    {
        name: "Women's Down Sweater Insulated Jacket",
        description: "Lightweight, windproof jacket with recycled nylon shell and 800-fill-power recycled down for versatile warmth.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw4729f37a/images/hi-res/84684_BNLB.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
        price: 230,
        category: "Jackets & Vests",
        product_url: "https://eu.patagonia.com/products/womens-down-sweater-84684"
    },
    {
        name: "Black Hole Micro MLC Carry-On Backpack 22L",
        description: "Soft-sided convertible backpack designed for strictest travel requirements, can be carried three ways.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw0eb0f7af/images/hi-res/49260_BCW.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
        price: 140,
        category: "Backpacks",
        product_url: "https://eu.patagonia.com/products/black-hole-micro-mlc-49260"
    },
    {
        name: "Men's Downdrift Insulated Jacket",
        description: "Retro-inspired down jacket with 600-fill-power recycled down providing warmth for mountains and beyond.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwaed79869/images/hi-res/20600_OLGG.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
        price: 224,
        category: "Jackets & Vests",
        product_url: "https://eu.patagonia.com/products/mens-downdrift-jacket-20600"
    },
    {
        name: "Women's Untracked Ski/Snowboard Jacket",
        description: "Waterproof storm protection for big-mountain descents with supple 3-layer GORE-TEX ePE Performance fabric.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf20a5a24/images/hi-res/29879_TNGO.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
        price: 441,
        category: "Jackets & Vests",
        product_url: "https://eu.patagonia.com/products/womens-untracked-jacket-29879"
    },
    {
        name: "Men's Better Sweater 1/4-Zip Fleece Pullover",
        description: "Warm, 100% recycled polyester quarter-zip combining sweater-knit aesthetic with easy-care fleece performance.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw1e3ab535/images/hi-res/25523_CLOR.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f3f4ef",
        price: 120,
        category: "Fleece",
        product_url: "https://eu.patagonia.com/products/mens-better-sweater-quarter-zip-25523"
    }
]

module.exports = async ({ query = '', category = '' }) => {
    const results = MOCK_DATA.filter(item => {
        if (category && item.category !== category) return false
        if (query && !item.name.toLowerCase().includes(query.toLowerCase())) return false
        return true
    })

    const count = results.length
    let summaryText = `Found ${count} product${count === 1 ? '' : 's'}`
    if (query && category) {
        summaryText += ` matching "${query}" in category "${category}".`
    } else if (query) {
        summaryText += ` matching "${query}".`
    } else if (category) {
        summaryText += ` in category "${category}".`
    } else {
        summaryText += ' in the Patagonia catalog.'
    }

    return {
        content: [{ type: 'text', text: summaryText }],
        // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
        structuredContent: { products: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?q=${query}&category=${category}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
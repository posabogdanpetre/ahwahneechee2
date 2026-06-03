module.exports = async ({ category, gender, sport }) => {
    // TODO: Replace MOCK_DATA with a real API call.
    // See the TODO block below for endpoint details.
    const MOCK_DATA = [
        {
            name: "Men's Down Sweater™ Insulated Jacket",
            description: "Lightweight, windproof jacket with recycled nylon shell and 800-fill-power down.",
            image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3c83e113/images/hi-res/84675_CLOR.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
            price: "£230",
            category: "Jackets & Vests"
        },
        {
            name: "Men's Better Sweater™ Fleece Jacket",
            description: "Warm, low-bulk full-zip jacket made of sweater-knit 100% recycled polyester fleece.",
            image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw05e3f3df/images/hi-res/25528_NENA.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
            price: "£130",
            category: "Fleece"
        },
        {
            name: "Men's Nano Puff® Packable Insulated Jacket",
            description: "Weather-resistant, lightweight and packable synthetic insulation layer that stays warm when wet.",
            image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
            price: "£170",
            category: "Jackets & Vests"
        },
        {
            name: "Men's Torrentshell 3L Rain Jacket",
            description: "Waterproof and breathable 3-layer rain jacket for excellent performance and durability.",
            image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3f39aea6/images/hi-res/85241_LMST.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
            price: "£180",
            category: "Jackets & Vests"
        }
    ]

    const results = MOCK_DATA.filter(product => {
        if (category && product.category !== category) return false
        if (gender) {
            const nameLC = product.name.toLowerCase()
            if (gender === 'mens' && !nameLC.includes("men's")) return false
            if (gender === 'womens' && !nameLC.includes("women's")) return false
            if (gender === 'kids' && !nameLC.includes("kid")) return false
        }
        if (sport) {
            const descLC = product.description?.toLowerCase() || ''
            const nameLC = product.name.toLowerCase()
            const sportLC = sport.toLowerCase()
            if (!descLC.includes(sportLC) && !nameLC.includes(sportLC)) return false
        }
        return true
    })

    const textSummary = results.length === 0
        ? 'No products found matching your criteria.'
        : `Found ${results.length} product${results.length === 1 ? '' : 's'}${category ? ` in ${category}` : ''}${gender ? ` for ${gender}` : ''}${sport ? ` for ${sport}` : ''}.`

    return {
        content: [
            { type: 'text', text: textSummary }
        ],
        structuredContent: {
            products: results
        }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?category=${category}&gender=${gender}&sport=${sport}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams()
 *   if (category) params.append('category', category)
 *   if (gender) params.append('gender', gender)
 *   if (sport) params.append('sport', sport)
 *   
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
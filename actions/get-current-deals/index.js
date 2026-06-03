const MOCK_DATA = [
    {
        "name": "Men's Nano Puff Insulated Jacket",
        "description": "Lightweight, packable synthetic insulation jacket that stays warm when wet, made with recycled materials.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": "£170",
        "category": "Jackets"
    },
    {
        "name": "Men's Triolet Alpine Jacket",
        "description": "Alpine workhorse with 3-layer GORE-TEX waterproof/breathable fabric, built for cold and snowy conditions.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3898a537/images/hi-res/84213_SMDB.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": "£380",
        "category": "Jackets"
    },
    {
        "name": "Women's Better Sweater 1/4-Zip Fleece",
        "description": "Sweater-knit aesthetic with 100% recycled polyester fleece, a versatile everyday mid-layer.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw86f4117a/images/hi-res/84213_OLGG.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": "£110",
        "category": "Fleece"
    },
    {
        "name": "Men's Houdini Windbreaker Jacket",
        "description": "Ultralight 100% recycled nylon windbreaker with weather-resistant protection, highly packable.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwc92431d5/images/hi-res/84213_FGE.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": "£120",
        "category": "Jackets"
    },
    {
        "name": "Men's Jackson Glacier Down Jacket",
        "description": "Waterproof down jacket with 700-fill recycled down and 100% recycled polyester shell for rain and wind protection.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwd54245bb/images/hi-res/84213_BLK.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": "£350",
        "category": "Jackets"
    }
]

module.exports = async ({ category = '' }) => {
    // Parse price strings from samplePayload into numeric values for output
    const parsedData = MOCK_DATA.map(item => {
        const priceMatch = item.price.match(/[\d.]+/)
        const originalPrice = priceMatch ? parseFloat(priceMatch[0]) : 0
        
        // Generate synthetic sale pricing (30-50% off for deal items)
        const discountPercent = Math.floor(Math.random() * 20) + 30 // 30-50%
        const salePrice = parseFloat((originalPrice * (1 - discountPercent / 100)).toFixed(2))
        
        return {
            name: item.name,
            original_price: originalPrice,
            sale_price: salePrice,
            discount_percentage: `${discountPercent}%`,
            category: item.category,
            image_url: item.image_url
        }
    })

    // Apply category filter if provided
    const results = category 
        ? parsedData.filter(item => item.category === category)
        : parsedData

    const contentText = category
        ? `Found ${results.length} deals in ${category} category.`
        : `Found ${results.length} past-season deals currently available.`

    return {
        content: [
            { type: 'text', text: contentText }
        ],
        structuredContent: {
            deals: results
        }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/deals?category=${category}
 *   or GET ${process.env.API_BASE_URL}/products?on_sale=true&category=${category}
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

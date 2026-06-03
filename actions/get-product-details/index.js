const MOCK_DATA = [
    {
        name: 'Men\'s Better Sweater Fleece Jacket',
        description: 'A warm, low-bulk full-zip jacket made of sweater-knit, 100% recycled polyester fleece.',
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf4894a9f/images/hi-res/25528_BLK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef',
        price: '$169',
        category: 'Fleece'
    },
    {
        name: 'Men\'s Micro D Fleece Jacket',
        description: 'Feels unbelievably soft, provides continual warmth, and dries quickly. Made with 100% recycled polyester.',
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw661a4bc1/images/hi-res/26171_NENA.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef',
        price: '$109',
        category: 'Fleece'
    },
    {
        name: 'Men\'s Textured Fleece Jacket',
        description: 'A warm full-zip fleece jacket with a pebbled texture and relaxed fit for everyday comfort.',
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwc8ce1ac9/images/hi-res/25528_NAUT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef',
        price: '$149',
        category: 'Fleece'
    },
    {
        name: 'Black Hole Duffel Bag 55L',
        description: 'A burly, weather-resistant duffel that converts to a backpack for easy hauling on trips.',
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw7c827d5d/images/hi-res/26171_AQT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef',
        price: '$179',
        category: 'Bags'
    }
]

module.exports = async ({ product_name = '' }) => {
    if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }],
            structuredContent: { product: null }
        }
    }

    const query = product_name.trim().toLowerCase()
    const product = MOCK_DATA.find(p => p.name.toLowerCase().includes(query))

    if (!product) {
        return {
            content: [{ type: 'text', text: `No product found matching: ${product_name}` }],
            structuredContent: { product: null }
        }
    }

    // Parse price for output schema (remove $ and convert to number)
    const priceNumber = parseFloat(product.price.replace(/[$,]/g, ''))

    const result = {
        name: product.name,
        description: product.description,
        price: priceNumber,
        category: product.category,
        materials: product.description.match(/made (?:of|with) ([^.]+)/i)?.[1] || 'See product page for materials',
        colors: ['Black', 'Navy', 'Grey'], // placeholder - actual colors not in sample data
        image_url: product.image_url
    }

    const contentText = `Found product: ${result.name}. ${result.description} Price: $${result.price}. Category: ${result.category}.`

    return {
        content: [{ type: 'text', text: contentText }],
        structuredContent: { product: result }
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

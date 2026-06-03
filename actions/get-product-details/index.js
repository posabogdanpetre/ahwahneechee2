// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Men\'s Nano Puff Jacket',
        description: 'Warm, windproof, water-resistant—the Nano Puff Jacket uses incredibly lightweight and highly compressible 60-g PrimaLoft Gold Insulation Eco 100% postconsumer recycled polyester with P.U.R.E. technology, wrapped in a 100% recycled polyester shell and lining.',
        price: '£199.00',
        category: 'Men\'s Jackets',
        colors: ['Black', 'Navy Blue', 'Forge Grey', 'Classic Tan'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw123456/images/hi-res/84212_BLK.jpg',
        materials: 'Shell: 100% recycled polyester ripstop. Insulation: 60-g PrimaLoft Gold Insulation Eco 100% postconsumer recycled polyester with P.U.R.E. technology. Lining: 100% recycled polyester.'
    },
    {
        name: 'Women\'s Better Sweater Fleece Jacket',
        description: 'A versatile jacket with the look of hand-knit wool, made of soft, dyed-to-match sweater-knit polyester fleece with a fleece interior for additional warmth. Fair Trade Certified sewn.',
        price: '£125.00',
        category: 'Women\'s Jackets',
        colors: ['Stonewash', 'Black', 'Navy Blue', 'Birch White'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw234567/images/hi-res/25542_STWH.jpg',
        materials: 'Body: 9.5-oz 100% polyester fleece (51% recycled) with a sweater-knit face and fleece interior. Fair Trade Certified sewn.'
    },
    {
        name: 'Men\'s Torrentshell 3L Jacket',
        description: 'A simple, lightweight, waterproof/breathable storm shell for all-around rain protection, made with 3-layer H2No Performance Standard technology and a PFC-free DWR finish.',
        price: '£149.00',
        category: 'Men\'s Jackets',
        colors: ['Smolder Blue', 'Black', 'Classic Red', 'Basin Green'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw345678/images/hi-res/85241_SMDB.jpg',
        materials: 'Shell: 3-layer 100% recycled nylon ripstop with H2No Performance Standard and a PFC-free DWR finish. Fair Trade Certified sewn.'
    }
]

module.exports = async ({ product_name }) => {
    if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }],
            structuredContent: { item: null }
        }
    }

    const query = product_name.trim().toLowerCase()
    const item = MOCK_DATA.find(p => p.name.toLowerCase().includes(query))

    if (!item) {
        return {
            content: [{ type: 'text', text: `No product found matching: ${product_name}` }],
            structuredContent: { item: null }
        }
    }

    const contentText = `${item.name} - ${item.price}. ${item.description} Available in ${item.colors.length} colors and ${item.sizes.length} sizes.`

    return {
        content: [{ type: 'text', text: contentText }],
        structuredContent: { item }
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
 *   return data.product || data
 */
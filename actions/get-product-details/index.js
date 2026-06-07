const MOCK_DATA = [
    {
        "name": "Men's Down Sweater Jacket",
        "description": "Lightweight, windproof jacket with 800-fill-power recycled down insulation and a recycled nylon ripstop shell.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3c83e113/images/hi-res/84675_CLOR.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": "£230",
        "category": "Insulated Jackets"
    },
    {
        "name": "Women's Better Sweater Fleece Jacket",
        "description": "Warm 100% recycled polyester full-zip fleece jacket with a sweater-knit aesthetic.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwb74b05e1/images/hi-res/25543_NENA.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": "£130",
        "category": "Fleece"
    },
    {
        "name": "Men's Torrentshell 3L Rain Jacket",
        "description": "Waterproof/breathable 3-layer rain jacket with H2No Performance Standard shell, made without PFAS.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3f39aea6/images/hi-res/85241_LMST.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": "£180",
        "category": "Rain Jackets"
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

    // Parse price to number (remove £ symbol)
    const priceValue = parseFloat(product.price.replace(/[^0-9.]/g, ''))

    const detailedProduct = {
        name: product.name,
        price: priceValue,
        description: product.description,
        materials: "Recycled materials (details vary by product)",
        weight: "Not specified in sample data",
        fit: "Regular",
        colors: ["See website for available colors"],
        rating: 4.5,
        review_count: 127,
        image_url: product.image_url
    }

    return {
        content: [{
            type: 'text',
            text: `Found product: ${detailedProduct.name}. Price: £${detailedProduct.price}. ${detailedProduct.description}`
        }],
        // structuredContent.product — named wrapper in outputSchema
        structuredContent: { product: detailedProduct }
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
 *   API_BASE_URL   Base URL of the Patagonia API (e.g., https://api.patagonia.com)
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
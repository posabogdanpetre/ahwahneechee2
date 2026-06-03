// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        "name": "Men's Nano Puff Insulated Jacket",
        "description": "Lightweight, packable synthetic insulation jacket that stays warm when wet, made with recycled materials.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": 170,
        "category": "Jackets",
        "materials": "100% recycled polyester with 60-g PrimaLoft® Gold Insulation Eco",
        "colors": ["Black", "Classic Navy", "Forge Grey"],
        "certifications": "Fair Trade Certified™ sewn, bluesign® approved fabric, made with recycled content"
    },
    {
        "name": "Men's Triolet Alpine Jacket",
        "description": "Alpine workhorse with 3-layer GORE-TEX waterproof/breathable fabric, built for cold and snowy conditions.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3898a537/images/hi-res/84213_SMDB.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": 380,
        "category": "Jackets",
        "materials": "3-layer GORE-TEX® Pro fabric with 100% recycled face fabric",
        "colors": ["Smolder Blue", "Black"],
        "certifications": "Fair Trade Certified™ sewn, bluesign® approved fabric"
    },
    {
        "name": "Women's Better Sweater 1/4-Zip Fleece",
        "description": "Sweater-knit aesthetic with 100% recycled polyester fleece, a versatile everyday mid-layer.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw86f4117a/images/hi-res/84213_OLGG.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": 110,
        "category": "Fleece",
        "materials": "100% recycled polyester fleece with sweater-knit face",
        "colors": ["Olive Grey", "Industrial Green", "Black"],
        "certifications": "Fair Trade Certified™ sewn, made with 100% recycled content"
    },
    {
        "name": "Men's Houdini Windbreaker Jacket",
        "description": "Ultralight 100% recycled nylon windbreaker with weather-resistant protection, highly packable.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwc92431d5/images/hi-res/84213_FGE.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": 120,
        "category": "Jackets",
        "materials": "100% recycled nylon ripstop with DWR finish",
        "colors": ["Forge Grey", "Black", "Viking Blue"],
        "certifications": "Fair Trade Certified™ sewn, bluesign® approved fabric, made with recycled content"
    },
    {
        "name": "Men's Jackson Glacier Down Jacket",
        "description": "Waterproof down jacket with 700-fill recycled down and 100% recycled polyester shell for rain and wind protection.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwd54245bb/images/hi-res/84213_BLK.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
        "price": 350,
        "category": "Jackets",
        "materials": "2-layer H2No® Performance Standard shell with 700-fill Recycled Down",
        "colors": ["Black", "Classic Navy"],
        "certifications": "Fair Trade Certified™ sewn, bluesign® approved fabric, Responsible Down Standard certified"
    }
];

module.exports = async ({ product_name = '' }) => {
    // Validate required parameter
    if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }],
            structuredContent: { item: null }
        };
    }

    const query = product_name.trim().toLowerCase();

    // Look up product by name (case-insensitive, partial match)
    const product = MOCK_DATA.find(p => p.name.toLowerCase().includes(query));

    if (!product) {
        return {
            content: [{ type: 'text', text: `No product found matching: ${product_name}` }],
            structuredContent: { item: null }
        };
    }

    // Format price for display
    const priceDisplay = typeof product.price === 'number' ? `£${product.price}` : product.price;

    // Build content text
    const contentText = `Found product: ${product.name}. ${product.description} Price: ${priceDisplay}. Available in ${product.colors.length} colors.`;

    return {
        content: [{ type: 'text', text: contentText }],
        structuredContent: {
            item: {
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                image_url: product.image_url,
                materials: product.materials,
                colors: product.colors,
                certifications: product.certifications
            }
        }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/products?search=${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products/${productId}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API (e.g., https://eu.patagonia.com/api)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?search=${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const data = await res.json();
 *   return data.products && data.products.length > 0 ? data.products[0] : null;
 */
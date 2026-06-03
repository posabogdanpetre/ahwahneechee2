// search_products action handler
// Searches Patagonia's outdoor clothing and gear catalog using optional filters for category, gender, and sport,
// returning an array of matching product objects with name, price, image, and category.

// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        "name": "Men's Nano Puff Packable Insulated Jacket",
        "description": "Weather-resistant, lightweight and packable synthetic insulation layer that stays warm when wet.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£170",
        "category": "Insulated Jackets"
    },
    {
        "name": "Men's Down Sweater Insulated Jacket",
        "description": "Lightweight, windproof jacket with recycled nylon shell and 800-fill-power down insulation.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3c83e113/images/hi-res/84675_CLOR.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£230",
        "category": "Insulated Jackets"
    },
    {
        "name": "Men's Torrentshell 3L Rain Jacket",
        "description": "Waterproof and breathable 3-layer rain jacket providing excellent performance and durability.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3f39aea6/images/hi-res/85241_LMST.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£180",
        "category": "Rain Jackets"
    },
    {
        "name": "Women's M10 Storm Waterproof Alpine Jacket",
        "description": "Cleanly designed waterproof and breathable shell built for fast-forward alpine climbing in harsh conditions.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw138c7520/images/hi-res/85915_SMDB.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£360",
        "category": "Alpine Jackets"
    },
    {
        "name": "Men's Houdini Windbreaker Jacket",
        "description": "Packable, featherweight windproof shell made from recycled nylon for running, riding and climbing.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwa687f184/images/hi-res/24142_AQST.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£100",
        "category": "Windbreakers"
    }
];

module.exports = async ({ query = '', category = '', gender = '' }) => {
    // Filter products by optional query, category, and gender
    let results = MOCK_DATA.filter(product => {
        // Free-text query filter (search in name and description)
        if (query && query.trim()) {
            const q = query.toLowerCase();
            const matchesName = product.name.toLowerCase().includes(q);
            const matchesDesc = product.description && product.description.toLowerCase().includes(q);
            if (!matchesName && !matchesDesc) {
                return false;
            }
        }

        // Category filter
        if (category && category.trim()) {
            if (product.category !== category) {
                return false;
            }
        }

        // Gender filter (check if product name starts with gender prefix)
        if (gender && gender.trim()) {
            const genderPrefix = gender.toLowerCase() === 'mens' ? "men's" :
                                 gender.toLowerCase() === 'womens' ? "women's" :
                                 gender.toLowerCase() === 'kids' ? "kids" : null;
            if (genderPrefix) {
                if (!product.name.toLowerCase().startsWith(genderPrefix)) {
                    return false;
                }
            }
        }

        return true;
    });

    // Parse numeric price from string format (e.g., "£170" -> 170)
    const productsWithNumericPrice = results.map(p => {
        const priceMatch = p.price.match(/[\d.]+/);
        return {
            name: p.name,
            price: priceMatch ? parseFloat(priceMatch[0]) : 0,
            category: p.category,
            image_url: p.image_url,
            product_url: p.product_url || ''
        };
    });

    // Generate content text
    let contentText = '';
    if (productsWithNumericPrice.length === 0) {
        contentText = 'No products found matching your search criteria.';
    } else if (query && query.trim()) {
        contentText = `Found ${productsWithNumericPrice.length} product${productsWithNumericPrice.length === 1 ? '' : 's'} matching "${query}".`;
    } else if (category || gender) {
        contentText = `Found ${productsWithNumericPrice.length} product${productsWithNumericPrice.length === 1 ? '' : 's'} in the selected filters.`;
    } else {
        contentText = `Found ${productsWithNumericPrice.length} product${productsWithNumericPrice.length === 1 ? '' : 's'}.`;
    }

    return {
        content: [
            { type: 'text', text: contentText }
        ],
        structuredContent: {
            items: productsWithNumericPrice
        }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia site API):
 *   GET ${process.env.API_BASE_URL}/products/search?q=${query}&category=${category}&gender=${gender}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams();
 *   if (query) params.append('q', query);
 *   if (category) params.append('category', category);
 *   if (gender) params.append('gender', gender);
 *   
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products/search?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */
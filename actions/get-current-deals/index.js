/**
 * get_current_deals handler
 * 
 * Retrieves current web specials and sale items from Patagonia's deals section,
 * returning discounted products with original and sale prices across all categories.
 */

// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: "Men's Better Sweater Fleece Jacket",
        original_price: 199,
        sale_price: 169,
        discount_percentage: "15%",
        category: "Men's",
        image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf4894a9f/images/hi-res/25528_BLK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef"
    },
    {
        name: "Men's Micro D Fleece Jacket",
        original_price: 129,
        sale_price: 109,
        discount_percentage: "16%",
        category: "Men's",
        image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw661a4bc1/images/hi-res/26171_NENA.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef"
    },
    {
        name: "Men's Textured Fleece Jacket",
        original_price: 179,
        sale_price: 149,
        discount_percentage: "17%",
        category: "Men's",
        image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwc8ce1ac9/images/hi-res/25528_NAUT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef"
    },
    {
        name: "Black Hole Duffel Bag 55L",
        original_price: 209,
        sale_price: 179,
        discount_percentage: "14%",
        category: "Packs & Gear",
        image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw7c827d5d/images/hi-res/26171_AQT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef"
    }
];

module.exports = async (args) => {
    const { category = '' } = args;

    // Filter deals by category if specified
    const filteredDeals = MOCK_DATA.filter(deal => {
        if (category && deal.category !== category) return false;
        return true;
    });

    // Build text summary
    let summaryText;
    if (filteredDeals.length === 0) {
        summaryText = category 
            ? `No current deals found in the ${category} category.`
            : 'No current deals available.';
    } else {
        const categoryNote = category ? ` in the ${category} category` : '';
        summaryText = `Found ${filteredDeals.length} deal${filteredDeals.length === 1 ? '' : 's'}${categoryNote}. `;
        summaryText += filteredDeals.map(deal => 
            `${deal.name}: $${deal.sale_price} (was $${deal.original_price}, save ${deal.discount_percentage})`
        ).join('; ');
    }

    return {
        content: [
            { type: 'text', text: summaryText }
        ],
        structuredContent: {
            items: filteredDeals
        }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/deals?category=${encodeURIComponent(category)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/deals`);
 *   if (category) url.searchParams.set('category', category);
 *   
 *   const res = await fetch(url.toString(), {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   });
 *   
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const deals = await res.json();
 *   
 *   return deals.map(deal => ({
 *     name: deal.name,
 *     original_price: deal.original_price,
 *     sale_price: deal.sale_price,
 *     discount_percentage: deal.discount_percentage,
 *     category: deal.category,
 *     image_url: deal.image_url
 *   }));
 */
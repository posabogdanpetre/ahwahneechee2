// actions/search-products/index.js

// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: "Men's Torrentshell 3L Rain Jacket",
    price: 179,
    category: "Jackets & Vests",
    rating: 4.5,
    num_reviews: 234,
    colors_available: 8,
    image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw123abc/images/hi-res/85240_BLK.jpg",
    product_url: "https://www.patagonia.com/product/mens-torrentshell-3l-rain-jacket/85240.html"
  },
  {
    name: "Women's Better Sweater Fleece Jacket",
    price: 139,
    category: "Fleece",
    rating: 4.8,
    num_reviews: 512,
    colors_available: 12,
    image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw456def/images/hi-res/25542_SMDB.jpg",
    product_url: "https://www.patagonia.com/product/womens-better-sweater-fleece-jacket/25542.html"
  },
  {
    name: "Men's Quandary Hiking Pants",
    price: 89,
    category: "Pants & Jeans",
    rating: 4.6,
    num_reviews: 387,
    colors_available: 6,
    image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw789ghi/images/hi-res/55186_FGE.jpg",
    product_url: "https://www.patagonia.com/product/mens-quandary-pants-regular/55186.html"
  }
];

module.exports = async (args) => {
  const { query = '', category = null, gender = null, sport = null } = args;

  // TODO: Replace mock data with real API call
  // Example integration:
  // const response = await fetch('https://api.patagonia.com/v1/products/search', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${process.env.PATAGONIA_API_KEY}`
  //   },
  //   body: JSON.stringify({ query, category, gender, sport })
  // });
  // const products = await response.json();

  let results = [...MOCK_DATA];

  // Filter by query (search in product name)
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(product =>
      product.name.toLowerCase().includes(lowerQuery)
    );
  }

  // Filter by category
  if (category) {
    results = results.filter(product => product.category === category);
  }

  // Filter by gender (check if product name contains gender indicator)
  if (gender) {
    const genderMap = {
      'mens': "Men's",
      'womens': "Women's",
      'kids': "Kids'"
    };
    const genderPrefix = genderMap[gender];
    if (genderPrefix) {
      results = results.filter(product =>
        product.name.startsWith(genderPrefix)
      );
    }
  }

  // Filter by sport (note: mock data doesn't have sport attribute,
  // so this would need real API data to work properly)
  if (sport) {
    // In real implementation, filter by sport attribute
    // results = results.filter(product => product.sport === sport);
  }

  // Generate text summary
  const content = results.length > 0
    ? `Found ${results.length} product${results.length === 1 ? '' : 's'}:\n\n` +
      results.map(p =>
        `• ${p.name} - $${p.price} (${p.rating}★, ${p.num_reviews} reviews, ${p.colors_available} colors)`
      ).join('\n')
    : 'No products found matching your search criteria.';

  return {
    content,
    structuredContent: {
      products: results,
      total: results.length
    }
  };
};

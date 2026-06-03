/**
 * search_products
 *
 * Searches the Patagonia product catalog using optional keyword queries and category filters,
 * returning an array of matching products with names, prices, images, and categories.
 */

const MOCK_DATA = [
  {
    "name": "Men's Better Sweater Fleece Jacket",
    "description": "A warm, low-bulk full-zip jacket made of sweater-knit, 100% recycled polyester fleece.",
    "image_url": "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf4894a9f/images/hi-res/25528_BLK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
    "price": 169,
    "category": "Fleece",
    "product_url": "https://www.patagonia.com/product/mens-better-sweater-fleece-jacket/25528.html"
  },
  {
    "name": "Men's Micro D Fleece Jacket",
    "description": "Feels unbelievably soft, provides continual warmth, and dries quickly. Made with 100% recycled polyester.",
    "image_url": "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw661a4bc1/images/hi-res/26171_NENA.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
    "price": 109,
    "category": "Fleece",
    "product_url": "https://www.patagonia.com/product/mens-micro-d-fleece-jacket/26171.html"
  },
  {
    "name": "Men's Textured Fleece Jacket",
    "description": "A warm full-zip fleece jacket with a pebbled texture and relaxed fit for everyday comfort.",
    "image_url": "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwc8ce1ac9/images/hi-res/25528_NAUT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
    "price": 149,
    "category": "Fleece",
    "product_url": "https://www.patagonia.com/product/mens-textured-fleece-jacket/25528.html"
  },
  {
    "name": "Black Hole Duffel Bag 55L",
    "description": "A burly, weather-resistant duffel that converts to a backpack for easy hauling on trips.",
    "image_url": "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw7c827d5d/images/hi-res/26171_AQT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
    "price": 179,
    "category": "Bags",
    "product_url": "https://www.patagonia.com/product/black-hole-duffel-bag-55l/49341.html"
  }
];

module.exports = async (args) => {
  const { query = '', category = '' } = args;

  // TODO: Replace with real API call
  // const response = await fetch(`https://api.patagonia.com/products?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`, {
  //   headers: { 'Authorization': `Bearer ${process.env.PATAGONIA_API_KEY}` }
  // });
  // const products = await response.json();

  // Filter mock data based on input parameters
  let results = MOCK_DATA;

  if (category) {
    results = results.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    const queryLower = query.toLowerCase();
    results = results.filter(product =>
      product.name.toLowerCase().includes(queryLower) ||
      (product.description && product.description.toLowerCase().includes(queryLower))
    );
  }

  // Prepare output matching outputSchema (name, price, category, image_url, product_url)
  const outputItems = results.map(product => ({
    name: product.name,
    price: product.price,
    category: product.category,
    image_url: product.image_url,
    product_url: product.product_url
  }));

  // Generate text summary
  const content = outputItems.length > 0
    ? `Found ${outputItems.length} product${outputItems.length !== 1 ? 's' : ''}:\n${outputItems.map(p => `• ${p.name} - $${p.price} (${p.category})`).join('\n')}`
    : 'No products found matching your criteria.';

  return {
    content,
    structuredContent: {
      products: outputItems
    }
  };
};

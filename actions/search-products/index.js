module.exports = async (args) => {
  const { category, gender, sport } = args;

  // synthetic fixture — no sample data available from Action Planner
  const MOCK_DATA = [
    {
      name: "Men's Torrentshell 3L Rain Jacket",
      price: "£150.00",
      category: "Jackets & Vests",
      image_url: "https://www.patagonia.com/dw/image/v2/productimages/torrentshell-jacket.jpg",
      url: "https://www.patagonia.com/product/mens-torrentshell-3l-rain-jacket"
    },
    {
      name: "Women's Nano Puff Jacket",
      price: "£200.00",
      category: "Jackets & Vests",
      image_url: "https://www.patagonia.com/dw/image/v2/productimages/nano-puff-jacket.jpg",
      url: "https://www.patagonia.com/product/womens-nano-puff-jacket"
    },
    {
      name: "Better Sweater Fleece Jacket",
      price: "£125.00",
      category: "Fleece",
      image_url: "https://www.patagonia.com/dw/image/v2/productimages/better-sweater.jpg",
      url: "https://www.patagonia.com/product/better-sweater-fleece-jacket"
    }
  ];

  // TODO: Replace MOCK_DATA with real Patagonia API integration
  // const response = await fetch(`https://api.patagonia.com/products?category=${encodeURIComponent(category)}&gender=${gender}&sport=${sport}`, {
  //   headers: { 'Authorization': `Bearer ${process.env.PATAGONIA_API_KEY}` }
  // });
  // const products = await response.json();

  let filteredProducts = [...MOCK_DATA];

  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (gender) {
    // In a real implementation, products would have gender metadata
    // For mock data, we're inferring from product names
    filteredProducts = filteredProducts.filter(p => {
      const nameLower = p.name.toLowerCase();
      if (gender === 'mens') return nameLower.includes("men's");
      if (gender === 'womens') return nameLower.includes("women's");
      if (gender === 'kids') return nameLower.includes("kid") || nameLower.includes("youth");
      return true;
    });
  }

  if (sport) {
    // In a real implementation, products would be tagged with sports
    // For mock data, we're using basic heuristics
    filteredProducts = filteredProducts.filter(p => {
      const searchText = (p.name + ' ' + p.category).toLowerCase();
      return searchText.includes(sport.toLowerCase().replace('-', ' '));
    });
  }

  const content = filteredProducts.length > 0
    ? `Found ${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}:\n\n` +
      filteredProducts.map(p => `- ${p.name} (${p.price})`).join('\n')
    : 'No products found matching the specified filters.';

  return {
    content,
    structuredContent: {
      products: filteredProducts
    }
  };
};

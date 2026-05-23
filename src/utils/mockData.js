export const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Food', 'Furniture', 'Farm', 'Beauty', 'Vehicles'];

export const MOCK_PRODUCTS = [
  { id: 1, name: 'Tecno Spark 10', price: 75000, location: 'Lilongwe, Area 18', emoji: '📱', category: 'Electronics', seller: 'John Phiri', sellerId: 'u2', sellerBadge: 'trusted', rating: 4.8, reviews: 34, desc: 'Brand new Tecno Spark 10, 6.6" screen, 128GB, 5000mAh battery. Sealed box with receipt.', delivery: 'Airtel Money or TNM Mpamba accepted', inEscrow: true },
  { id: 2, name: 'Chitenje Fabric (5m)', price: 8500, location: 'Blantyre, Limbe', emoji: '🧣', category: 'Clothing', seller: 'Amina Shop', sellerId: 'u3', sellerBadge: 'verified', rating: 4.5, reviews: 12, desc: 'Premium Malawian chitenje fabric, 5 metres. Various patterns available.', delivery: 'Delivery available MK 500', inEscrow: true },
  { id: 3, name: 'Fresh Tomatoes 1kg', price: 1500, location: 'Mzuzu, Area 2', emoji: '🍅', category: 'Food', seller: 'Grace Mbewe', sellerId: 'u4', sellerBadge: 'basic', rating: 3.9, reviews: 7, desc: 'Fresh farm tomatoes, 1kg bag. Picked daily. Contact for bulk.', delivery: 'Pick up or delivery in Mzuzu', inEscrow: false },
  { id: 4, name: 'Wooden Dining Table', price: 95000, location: 'Lilongwe, Area 3', emoji: '🪑', category: 'Furniture', seller: 'Tiwonge Crafts', sellerId: 'u5', sellerBadge: 'trusted', rating: 4.9, reviews: 56, desc: 'Handcrafted solid mahogany dining table, seats 6. Delivery included Lilongwe.', delivery: 'Free delivery in Lilongwe', inEscrow: true },
  { id: 5, name: 'Maize Flour 25kg', price: 18000, location: 'Kasungu', emoji: '🌽', category: 'Farm', seller: 'Farm Direct MW', sellerId: 'u6', sellerBadge: 'verified', rating: 4.6, reviews: 23, desc: 'Pure ufa woyera, 25kg bag. Directly from our farm. Freshly milled.', delivery: 'Transport available', inEscrow: true },
  { id: 6, name: 'Solar Panel Kit 100W', price: 125000, location: 'Lilongwe, Area 47', emoji: '⚡', category: 'Electronics', seller: 'Solar Malawi', sellerId: 'u7', sellerBadge: 'trusted', rating: 4.7, reviews: 41, desc: 'Complete 100W solar kit with panel, battery, inverter and cables.', delivery: 'Installation service available', inEscrow: true },
  { id: 7, name: 'Leather Handbag', price: 22000, location: 'Blantyre, City Centre', emoji: '👜', category: 'Clothing', seller: 'Blantyre Boutique', sellerId: 'u8', sellerBadge: 'verified', rating: 4.3, reviews: 19, desc: 'Genuine leather handbag, multiple compartments.', delivery: 'Delivery nationwide', inEscrow: true },
  { id: 8, name: 'Bicycle (Mountain)', price: 85000, location: 'Lilongwe, Area 25', emoji: '🚲', category: 'Vehicles', seller: 'Kondwani Bikes', sellerId: 'u9', sellerBadge: 'basic', rating: 4.1, reviews: 5, desc: '21-speed mountain bike, good condition, slight scratches.', delivery: 'Pick up only', inEscrow: false },
];

export const MOCK_ORDERS = [
  { id: 'ORD-2847', product: 'Tecno Spark 10', price: 75000, status: 'In Escrow', step: 2, seller: 'John Phiri', date: 'May 20, 2026', emoji: '📱', canConfirm: false },
  { id: 'ORD-2831', product: 'Chitenje Fabric', price: 8500, status: 'Delivered', step: 4, seller: 'Amina Shop', date: 'May 18, 2026', emoji: '🧣', canConfirm: true },
  { id: 'ORD-2819', product: 'Maize Flour 25kg', price: 18000, status: 'Completed', step: 5, seller: 'Farm Direct MW', date: 'May 15, 2026', emoji: '🌽', canConfirm: false },
];

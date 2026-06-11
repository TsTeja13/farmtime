import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Trash2, 
  DollarSign, 
  Tag, 
  Briefcase, 
  Phone,
  FileText,
  CreditCard,
  Truck,
  Loader
} from 'lucide-react';

const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    name: 'Certified Organic Basmati Rice',
    category: 'Grains',
    price: 95, // per kg
    quantity: 450, // kg
    unit: 'kg',
    description: 'Long grain aromatic basmati rice, cultivated using Jeevamrutha microbial fertilizer. Zero pesticides, certified organic.',
    cert: 'Certified Organic',
    sellerName: 'Rajesh Farmer',
    sellerContact: '9876543210'
  },
  {
    id: 'p2',
    name: 'Fresh Roma Tomatoes',
    category: 'Vegetables',
    price: 35,
    quantity: 80,
    unit: 'kg',
    description: 'Fresh, red Roma tomatoes harvested this morning. Treated with sour buttermilk spray for blight prevention.',
    cert: 'Certified Organic',
    sellerName: 'Rajesh Farmer',
    sellerContact: '9876543210'
  },
  {
    id: 'p3',
    name: 'Rich Vermicompost (Premium Grade)',
    category: 'Fertilizers',
    price: 12,
    quantity: 1200,
    unit: 'kg',
    description: 'High-quality vermicompost enriched with neem cake powder. Excellent for soil structure and microbial boosting.',
    cert: '100% Bio-Natural',
    sellerName: 'Karan Singh',
    sellerContact: '8765432109'
  },
  {
    id: 'p4',
    name: 'Organic Long-Staple Cotton',
    category: 'Crops',
    price: 78,
    quantity: 350,
    unit: 'kg',
    description: 'Premium quality organic long-staple cotton, harvested from deep black clay soils.',
    cert: 'Transitioning to Organic',
    sellerName: 'Rajesh Farmer',
    sellerContact: '9876543210'
  }
];

export default function Marketplace({ currentUser }) {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'list-item'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Cart & Order State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'shipping', 'payment', 'receipt'
  
  // Checkout Form Details
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'cod', 'card'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [latestOrder, setLatestOrder] = useState(null);

  // New Listing Form Details (Farmers)
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Vegetables');
  const [newPrice, setNewPrice] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState('kg');
  const [newCert, setNewCert] = useState('Certified Organic');
  const [newDesc, setNewDesc] = useState('');
  const [newContact, setNewContact] = useState(currentUser.email === 'farmer@farm.com' ? '9876543210' : '');

  // Load Marketplace Listings
  useEffect(() => {
    const stored = localStorage.getItem('farmtime_marketplace');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      localStorage.setItem('farmtime_marketplace', JSON.stringify(DEFAULT_PRODUCTS));
      setProducts(DEFAULT_PRODUCTS);
    }
  }, []);

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('farmtime_marketplace', JSON.stringify(updatedProducts));
  };

  // Farmer Add New Listing
  const handleAddListing = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice || !newQuantity || !newContact.trim()) return;

    const newProd = {
      id: 'p_' + Date.now().toString(),
      name: newName.trim(),
      category: newCategory,
      price: parseFloat(newPrice),
      quantity: parseFloat(newQuantity),
      unit: newUnit,
      description: newDesc.trim() || 'Fresh farm inputs/produce.',
      cert: newCert,
      sellerName: currentUser.name,
      sellerContact: newContact.trim()
    };

    const updated = [newProd, ...products];
    saveProducts(updated);

    // Reset Form
    setNewName('');
    setNewPrice('');
    setNewQuantity('');
    setNewDesc('');
    setActiveTab('browse');
  };

  // Buyer Delete own Listing (if they registered as a seller)
  const handleDeleteListing = (id) => {
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
  };

  // Cart Management
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.orderQty >= product.quantity) return;
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, orderQty: item.orderQty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, orderQty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    const prod = products.find(p => p.id === id);
    if (prod && newQty > prod.quantity) return; // caps at stock
    setCart(cart.map(item => 
      item.id === id ? { ...item, orderQty: newQty } : item
    ));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (checkoutStep === 'cart') {
      setCheckoutStep('shipping');
    } else if (checkoutStep === 'shipping') {
      if (!shippingAddress.trim()) return;
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      // Process order
      const orderId = 'ORD_' + Math.floor(100000 + Math.random() * 900000).toString();
      const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.orderQty), 0);
      
      // Deduct stock quantities from products
      const updatedProducts = products.map(p => {
        const cartItem = cart.find(item => item.id === p.id);
        if (cartItem) {
          return { ...p, quantity: Math.max(0, p.quantity - cartItem.orderQty) };
        }
        return p;
      });
      saveProducts(updatedProducts);

      const newOrder = {
        orderId,
        buyerName: currentUser.name,
        buyerEmail: currentUser.email,
        items: cart,
        total: orderTotal,
        shipping: shippingAddress,
        payment: paymentMethod === 'upi' ? `UPI (${upiId})` : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card',
        date: new Date().toLocaleDateString()
      };

      // Save order to history
      const storedOrders = JSON.parse(localStorage.getItem('farmtime_orders') || '[]');
      storedOrders.push(newOrder);
      localStorage.setItem('farmtime_orders', JSON.stringify(storedOrders));

      setLatestOrder(newOrder);
      setCart([]);
      setCheckoutStep('receipt');
    }
  };

  const categories = ['all', 'Vegetables', 'Grains', 'Fruits', 'Fertilizers', 'Seeds', 'Crops'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fade-in">
      {/* Marketplace Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="h1 flex items-center gap-2">
            <ShoppingBag className="text-primary" /> Farm Marketplace
          </h1>
          <p className="text-sm text-muted">Direct exchange trading platform: farmers sell, anyone buys. Transparent prices, zero middlemen.</p>
        </div>
        
        <div className="flex gap-2">
          {currentUser.role === 'farmer' && (
            <button 
              className={`btn btn-sm ${activeTab === 'list-item' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab(activeTab === 'list-item' ? 'browse' : 'list-item')}
            >
              <Plus className="btn-icon" /> List Produce for Sale
            </button>
          )}
          {currentUser.role === 'buyer' && (
            <button className="btn btn-primary btn-sm relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="btn-icon" /> View Basket
              {cart.length > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-danger text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold">
                  {cart.reduce((sum, item) => sum + item.orderQty, 0)}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {activeTab === 'list-item' && currentUser.role === 'farmer' ? (
        /* Farmer ADD LISTING view */
        <div className="glass-card p-6 max-w-xl mx-auto fade-in">
          <h2 className="h3 border-b pb-3 mb-4 flex items-center gap-2">
            <Plus className="text-primary" /> Create New Product Listing
          </h2>
          
          <form onSubmit={handleAddListing} className="flex-col gap-4">
            <div>
              <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Product Title</label>
              <input 
                type="text" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Fresh Organic Turmeric"
                className="form-input text-xs"
                required
              />
            </div>

            <div className="grid grid-2 gap-3">
              <div>
                <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Category</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="form-input text-xs bg-glass"
                >
                  {categories.filter(c => c !== 'all').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Organic Certificate Level</label>
                <select 
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  className="form-input text-xs bg-glass"
                >
                  <option value="Certified Organic">Certified Organic</option>
                  <option value="100% Bio-Natural">100% Bio-Natural</option>
                  <option value="Transitioning to Organic">Transitioning to Organic</option>
                  <option value="Traditional/Default">Traditional/Default</option>
                </select>
              </div>
            </div>

            <div className="grid grid-3 gap-3">
              <div>
                <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Price (₹)</label>
                <input 
                  type="number" 
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="e.g. 80"
                  className="form-input text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Quantity</label>
                <input 
                  type="number" 
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  placeholder="e.g. 200"
                  className="form-input text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Unit</label>
                <select 
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  className="form-input text-xs bg-glass"
                >
                  <option value="kg">kg (Kilogram)</option>
                  <option value="Quintal">Quintal (100kg)</option>
                  <option value="Bag">Bag (25kg)</option>
                  <option value="Packet">Packet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Contact Phone Number</label>
              <input 
                type="text" 
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                placeholder="e.g. 9876543210"
                className="form-input text-xs"
                required
              />
            </div>

            <div>
              <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Product Description</label>
              <textarea 
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Describe crop cultivation methods, soil inputs used (e.g. Jeevamrutha)..."
                className="form-input text-xs min-h-[80px]"
              />
            </div>

            <div className="flex gap-3 mt-2">
              <button type="submit" className="btn btn-primary flex-1">
                List Product Now
              </button>
              <button type="button" className="btn btn-outline" onClick={() => setActiveTab('browse')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* BROWSE PRODUCT CATALOG */
        <div>
          {/* Filters Dashboard */}
          <div className="glass-card p-4 mb-6 flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 text-muted icon-xs" />
              <input 
                type="text" 
                placeholder="Search crops, inputs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-8 py-1.5 text-xs w-full"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 pr-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn btn-xs capitalize ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(prod => (
                <div key={prod.id} className="glass-card p-5 flex-col flex-between h-[360px]">
                  <div className="flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <span className="badge badge-primary text-[9px]">{prod.category}</span>
                      <span className="badge badge-success text-[8px]">{prod.cert}</span>
                    </div>
                    <h3 className="h4 text-secondary-deep font-semibold line-clamp-1 mt-1">{prod.name}</h3>
                    <p className="text-xs text-muted line-clamp-3 leading-relaxed mt-1">{prod.description}</p>
                    
                    {/* Seller details */}
                    <div className="mt-3 flex-col gap-1 text-[10px] text-muted-dark bg-primary-5 p-2.5 rounded-lg border-l-2 border-primary">
                      <span className="font-semibold block">👨‍🌾 Seller Profile:</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Tag className="icon-xs" /> {prod.sellerName}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Phone className="icon-xs" /> {prod.sellerContact}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center mt-4 shrink-0">
                    <div>
                      <span className="text-[10px] text-muted block uppercase font-semibold">Price per {prod.unit}</span>
                      <span className="font-bold text-base text-success">₹{prod.price}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-muted block uppercase font-semibold">In Stock</span>
                      <span className="font-semibold text-xs text-secondary-deep">{prod.quantity} {prod.unit}</span>
                    </div>
                  </div>

                  {/* Actions depending on Roles */}
                  <div className="mt-4 shrink-0">
                    {currentUser.role === 'buyer' ? (
                      <button 
                        className="btn btn-primary btn-sm w-full"
                        onClick={() => addToCart(prod)}
                        disabled={prod.quantity <= 0}
                      >
                        {prod.quantity <= 0 ? 'Out of Stock' : 'Add to Basket'}
                      </button>
                    ) : (
                      currentUser.name === prod.sellerName && (
                        <button 
                          className="btn btn-outline btn-sm w-full text-danger hover:bg-danger-10"
                          onClick={() => handleDeleteListing(prod.id)}
                        >
                          <Trash2 className="btn-icon" /> Delete Listing
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center p-8 text-muted text-xs">
                No items listed in the marketplace matching your search options.
              </div>
            )}
          </div>
        </div>
      )}

      {/* CART SLIDE-OVER MODAL PANEL */}
      {isCartOpen && currentUser.role === 'buyer' && (
        <div className="fixed inset-0 z-[2000] flex justify-end">
          {/* Overlay backdrop */}
          <div className="absolute inset-0 bg-dark-50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          
          {/* Drawer sheet */}
          <div className="relative w-full max-w-md bg-sidebar border-l border-card h-full p-6 flex-col flex-between shadow-2xl fade-in z-10">
            {/* Drawer Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="h3 flex items-center gap-2">
                <ShoppingBag className="text-primary" /> Basket Checkout
              </h3>
              <button className="btn btn-outline btn-sm p-1 rounded-full" onClick={() => setIsCartOpen(false)}>×</button>
            </div>

            {checkoutStep === 'receipt' && latestOrder ? (
              /* ORDER RECEIPT STEP */
              <div className="flex-1 overflow-y-auto flex-col gap-4 items-center justify-center p-4 text-center">
                <CheckCircle className="text-success icon-lg mb-2 animate-bounce" />
                <h4 className="font-bold text-success text-base">Order Placed Successfully!</h4>
                <p className="text-xs text-muted">Thank you for supporting sustainable farmers directly.</p>
                
                <div className="w-full text-left bg-muted-5 p-4 rounded-xl border mt-4 text-xs flex-col gap-2">
                  <div className="flex justify-between border-b pb-1 font-semibold">
                    <span>Order Receipt</span>
                    <span className="text-primary">{latestOrder.orderId}</span>
                  </div>
                  <div><strong>Buyer Name:</strong> {latestOrder.buyerName}</div>
                  <div><strong>Date:</strong> {latestOrder.date}</div>
                  <div><strong>Shipping:</strong> {latestOrder.shipping}</div>
                  <div><strong>Payment:</strong> {latestOrder.payment}</div>
                  <div className="border-t pt-2 mt-2 flex-col gap-1.5">
                    <strong>Purchased Items:</strong>
                    {latestOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-muted text-[11px]">
                        <span>{item.name} (x{item.orderQty})</span>
                        <span>₹{item.price * item.orderQty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold text-success text-sm">
                    <span>Grand Total:</span>
                    <span>₹{latestOrder.total}</span>
                  </div>
                </div>

                <button 
                  className="btn btn-primary btn-sm mt-6 w-full"
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutStep('cart');
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              /* MAIN CART VIEW */
              <div className="flex-1 min-h-0 flex-col justify-between">
                {/* Scrollable list */}
                <div className="flex-1 overflow-y-auto flex-col gap-3 pr-1">
                  {checkoutStep === 'cart' && (
                    cart.length > 0 ? (
                      cart.map(item => (
                        <div key={item.id} className="p-3 bg-glass border rounded-xl flex justify-between items-center gap-3">
                          <div className="flex-1">
                            <span className="text-[10px] text-muted uppercase font-semibold">{item.category}</span>
                            <h4 className="font-semibold text-xs text-secondary-deep line-clamp-1">{item.name}</h4>
                            <span className="font-bold text-xs text-success block mt-1">₹{item.price}</span>
                          </div>
                          
                          {/* Qty edit */}
                          <div className="flex items-center gap-1.5">
                            <button 
                              className="btn btn-outline btn-xs p-1 h-6 w-6"
                              onClick={() => updateCartQty(item.id, item.orderQty - 1)}
                            >
                              -
                            </button>
                            <span className="text-xs font-semibold w-4 text-center">{item.orderQty}</span>
                            <button 
                              className="btn btn-outline btn-xs p-1 h-6 w-6"
                              onClick={() => updateCartQty(item.id, item.orderQty + 1)}
                            >
                              +
                            </button>
                            <button 
                              className="btn btn-outline btn-xs text-danger border-danger-20 ml-2"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="icon-xs" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-6 text-muted text-xs flex-col items-center justify-center h-48">
                        Your basket is empty. Add crops from the catalog to purchase.
                      </div>
                    )
                  )}

                  {checkoutStep === 'shipping' && (
                    /* SHIPPING FORM */
                    <form onSubmit={handleCheckout} className="flex-col gap-3 p-1 fade-in">
                      <h4 className="font-semibold text-xs text-secondary uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Truck className="icon-xs" /> Shipping & Delivery Details
                      </h4>
                      <div>
                        <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Delivery Address</label>
                        <textarea 
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          placeholder="Enter house no, street address, village/city, pin code..."
                          className="form-input text-xs min-h-[100px]"
                          required
                        />
                      </div>
                    </form>
                  )}

                  {checkoutStep === 'payment' && (
                    /* PAYMENT FORM */
                    <form onSubmit={handleCheckout} className="flex-col gap-4 p-1 fade-in">
                      <h4 className="font-semibold text-xs text-secondary uppercase tracking-wider mb-2 flex items-center gap-1">
                        <CreditCard className="icon-xs" /> Choose Payment Option
                      </h4>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-xs cursor-pointer p-3 border rounded-lg bg-glass">
                          <input 
                            type="radio" 
                            name="pay" 
                            value="upi" 
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                            className="accent-primary"
                          />
                          <span>Unified Payments Interface (UPI)</span>
                        </label>
                        {paymentMethod === 'upi' && (
                          <input 
                            type="text" 
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. farmer@upi"
                            className="form-input text-xs mt-1 ml-6 w-[calc(100%-24px)]"
                            required
                          />
                        )}

                        <label className="flex items-center gap-2 text-xs cursor-pointer p-3 border rounded-lg bg-glass">
                          <input 
                            type="radio" 
                            name="pay" 
                            value="cod" 
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            className="accent-primary"
                          />
                          <span>Cash on Delivery (COD)</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs cursor-pointer p-3 border rounded-lg bg-glass">
                          <input 
                            type="radio" 
                            name="pay" 
                            value="card" 
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="accent-primary"
                          />
                          <span>Credit or Debit Card</span>
                        </label>
                        {paymentMethod === 'card' && (
                          <input 
                            type="text" 
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="e.g. 4321 0987 6543 2109"
                            className="form-input text-xs mt-1 ml-6 w-[calc(100%-24px)]"
                            required
                          />
                        )}
                      </div>
                    </form>
                  )}
                </div>

                {/* Bottom Total & Button */}
                <div className="border-t pt-4 mt-4 bg-sidebar">
                  <div className="flex justify-between items-center font-bold text-sm mb-4">
                    <span>Grand Total:</span>
                    <span className="text-success text-base">
                      ₹{cart.reduce((sum, item) => sum + (item.price * item.orderQty), 0)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {checkoutStep === 'cart' && (
                      <button 
                        className="btn btn-primary flex-1"
                        onClick={() => setCheckoutStep('shipping')}
                        disabled={cart.length === 0}
                      >
                        Proceed to Shipping
                      </button>
                    )}

                    {checkoutStep === 'shipping' && (
                      <>
                        <button 
                          className="btn btn-outline"
                          onClick={() => setCheckoutStep('cart')}
                        >
                          Back
                        </button>
                        <button 
                          className="btn btn-primary flex-1"
                          onClick={() => setCheckoutStep('payment')}
                          disabled={!shippingAddress.trim()}
                        >
                          Proceed to Payment
                        </button>
                      </>
                    )}

                    {checkoutStep === 'payment' && (
                      <>
                        <button 
                          className="btn btn-outline"
                          onClick={() => setCheckoutStep('shipping')}
                        >
                          Back
                        </button>
                        <button 
                          className="btn btn-primary flex-1"
                          onClick={handleCheckout}
                          disabled={paymentMethod === 'upi' ? !upiId.trim() : paymentMethod === 'card' ? !cardNumber.trim() : false}
                        >
                          Submit Payment & Buy
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

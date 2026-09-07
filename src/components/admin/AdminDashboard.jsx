import React, { useState, useEffect } from 'react';
import { categories, getProducts, saveProducts } from '../../data/products';
import { Plus, Edit, Trash2, ChevronLeft, Image, Package, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [viewers, setViewers] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0]?.id || '',
    price: '',
    originalPrice: '',
    showDiscountBadge: true,
    description: '',
    photoUrl: '',
    material: '',
    dimensions: '',
    warranty: '',
    assembly: '',
    features: '',
    stockStatus: 'available'
  });
  
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // Calculate dynamic discount for preview
  const currentPrice = parseFloat(formData.price) || 0;
  const currentOriginalPrice = parseFloat(formData.originalPrice) || 0;
  const calculatedDiscount = currentOriginalPrice > currentPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100) 
    : 0;

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: categories[0]?.id || '',
      price: '',
      originalPrice: '',
      discount: '',
      showDiscountBadge: true,
      description: '',
      photoUrl: '',
      material: '',
      dimensions: '',
      warranty: '',
      assembly: '',
      features: '',
      stockStatus: 'available'
    });
    setView('form');
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || '',
      category: product.category || categories[0]?.id,
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      discount: product.discount || '',
      showDiscountBadge: product.showDiscountBadge !== false,
      description: product.description || '',
      photoUrl: product.image || (product.images && product.images[0]) || '',
      material: product.specifications?.material || '',
      dimensions: product.specifications?.dimensions || '',
      warranty: product.specifications?.warranty || '',
      assembly: product.specifications?.assembly || '',
      features: product.features ? product.features.join('\n') : '',
      stockStatus: product.stockStatus || (product.isOutOfStock ? 'out_of_stock' : 'available')
    });
    setView('form');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    // Validation
    const priceNum = parseFloat(formData.price);
    const origPriceNum = parseFloat(formData.originalPrice);

    if (priceNum < 0) {
      setErrorMsg('Selling price cannot be negative.');
      return;
    }
    if (origPriceNum && origPriceNum < 0) {
      setErrorMsg('Original price cannot be negative.');
      return;
    }
    if (origPriceNum && priceNum > origPriceNum) {
      setErrorMsg('Selling price cannot be greater than original price.');
      return;
    }

    const featuresList = formData.features
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const productData = {
      id: editingId || `${formData.category}-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: priceNum,
      originalPrice: origPriceNum || null,
      discount: formData.discount ? parseInt(formData.discount) : null,
      showDiscountBadge: formData.showDiscountBadge,
      stockStatus: formData.stockStatus,
      isOutOfStock: formData.stockStatus === 'out_of_stock',
      isSoldOut: formData.stockStatus === 'sold_out',
      rating: editingId ? products.find(p => p.id === editingId)?.rating : 5.0,
      reviews: editingId ? products.find(p => p.id === editingId)?.reviews : 0,
      description: formData.description,
      features: featuresList,
      specifications: {
        material: formData.material,
        dimensions: formData.dimensions,
        warranty: formData.warranty,
        assembly: formData.assembly
      },
      colors: editingId ? products.find(p => p.id === editingId)?.colors : [],
      image: formData.photoUrl,
      images: [formData.photoUrl]
    };

    let updatedProducts;
    if (editingId) {
      updatedProducts = products.map(p => p.id === editingId ? productData : p);
    } else {
      updatedProducts = [...products, productData];
    }

    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    
    setSuccessMsg(editingId ? 'Product updated successfully!' : 'Product added successfully!');
    
    setTimeout(() => {
      setSuccessMsg('');
      setView('list');
    }, 1500);
  };

  return (
    <div style={styles.dashboardLayout}>
      {/* Sidebar Menu */}
      <div style={styles.sidebar}>
        <div 
          style={{...styles.sidebarItem, ...(activeTab === 'products' ? styles.sidebarItemActive : {})}}
          onClick={() => { setActiveTab('products'); setView('list'); }}
        >
          <Package size={20} />
          <span>Products Management</span>
        </div>
        <div 
          style={{...styles.sidebarItem, ...(activeTab === 'viewers' ? styles.sidebarItemActive : {})}}
          onClick={() => setActiveTab('viewers')}
        >
          <Eye size={20} />
          <span>Product Viewers</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        {activeTab === 'viewers' ? (
          <div style={styles.card}>
            <div style={styles.header}>
              <div>
                <h1 style={styles.title}>Recent Viewers</h1>
                <p style={styles.subtitle}>Track which clients and visitors are looking at your products.</p>
              </div>
            </div>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>EMAIL / CLIENT</th>
                    <th style={styles.th}>PRODUCT VIEWED</th>
                    <th style={styles.th}>TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {viewers.map((v, i) => (
                    <tr key={i} style={styles.tr}>
                      <td style={styles.td}><strong>{v.email}</strong></td>
                      <td style={styles.td}>{v.product}</td>
                      <td style={styles.td}><span style={styles.dateText}>{v.date}</span></td>
                    </tr>
                  ))}
                  {viewers.length === 0 && (
                    <tr><td colSpan="3" style={{textAlign:'center', padding:'2rem'}}>No viewers recorded yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : view === 'list' ? (
          <div style={styles.card}>
            <div style={styles.header}>
              <div>
                <h1 style={styles.title}>Products Management</h1>
                <p style={styles.subtitle}>Manage your store catalog and discounts.</p>
              </div>
              <button onClick={handleAddNew} style={styles.primaryBtn}>
                <Plus size={18} /> Add Product
              </button>
            </div>

            {successMsg && <div style={styles.successBanner}>{successMsg}</div>}

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>PRODUCT</th>
                    <th style={styles.th}>CATEGORY</th>
                    <th style={styles.th}>PRICE</th>
                    <th style={styles.th}>DISCOUNT</th>
                    <th style={styles.th}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => {
                    const discount = product.originalPrice && product.originalPrice > product.price 
                      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                      : 0;
                      
                    return (
                      <tr key={product.id} style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.productCell}>
                            {product.image || (product.images && product.images[0]) ? (
                              <img src={product.image || product.images[0]} alt={product.name} style={styles.thumbImage} className="admin-thumb-image" />
                            ) : (
                              <div style={styles.imagePlaceholder}><Image size={20} color="#ccc" /></div>
                            )}
                            <span style={styles.productName}>{product.name}</span>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.categoryBadge}>
                            {categories.find(c => c.id === product.category)?.name || product.category}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.priceContainer}>
                            <span style={styles.currentPrice}>₹{product.price.toLocaleString('en-IN')}</span>
                            {product.originalPrice && (
                              <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                            )}
                          </div>
                        </td>
                        <td style={styles.td}>
                          {product.discount || discount > 0 ? (
                            <span style={{
                              ...styles.discountTag,
                              backgroundColor: product.showDiscountBadge !== false ? '#e8f5e9' : '#f5f5f5',
                              color: product.showDiscountBadge !== false ? '#2e7d32' : '#9e9e9e'
                            }}>
                              {product.discount || discount}% {product.showDiscountBadge === false && '(Hidden)'}
                            </span>
                          ) : (
                            <span style={styles.noDiscount}>-</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          <div style={styles.actions}>
                            <button onClick={() => handleEdit(product)} style={styles.iconBtn} title="Edit">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(product.id)} style={{...styles.iconBtn, color: '#d32f2f'}} title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" style={styles.emptyState}>
                        No products found. Add your first product!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={styles.card}>
            <div style={styles.header}>
              <div>
                <h1 style={styles.title}>{editingId ? 'Edit Product' : 'Add New Product'}</h1>
                <p style={styles.subtitle}>Fill in the details below.</p>
              </div>
              <button onClick={() => setView('list')} style={styles.secondaryBtn}>
                Cancel
              </button>
            </div>

            {errorMsg && <div style={styles.errorBanner}>{errorMsg}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGrid}>
                {/* Basic Info */}
                <div style={styles.formSection}>
                  <h3 style={styles.sectionTitle}>Basic Information</h3>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Product Name *</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleChange}
                      required style={styles.input} placeholder="e.g. Somnus King Size Bed"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Category *</label>
                    <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Availability</label>
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                      <label style={styles.checkboxLabel}>
                        <input 
                          type="radio" 
                          name="stockStatus" 
                          checked={formData.stockStatus === 'available'} 
                          onChange={() => setFormData(prev => ({ ...prev, stockStatus: 'available' }))}
                        />
                        Available
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input 
                          type="radio" 
                          name="stockStatus" 
                          checked={formData.stockStatus === 'out_of_stock'} 
                          onChange={() => setFormData(prev => ({ ...prev, stockStatus: 'out_of_stock' }))}
                        />
                        Out of Stock
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input 
                          type="radio" 
                          name="stockStatus" 
                          checked={formData.stockStatus === 'sold_out'} 
                          onChange={() => setFormData(prev => ({ ...prev, stockStatus: 'sold_out' }))}
                        />
                        Sold Out
                      </label>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Description *</label>
                    <textarea 
                      name="description" value={formData.description} onChange={handleChange}
                      required style={styles.textarea} rows="4"
                      placeholder="Brief description of the product..."
                    />
                  </div>
                </div>

                {/* Pricing & Image */}
                <div style={styles.formSection}>
                  <h3 style={styles.sectionTitle}>Pricing & Media</h3>
                  
                  <div style={styles.priceRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Selling Price (₹) *</label>
                      <input 
                        type="number" name="price" value={formData.price} onChange={handleChange}
                        required min="0" style={styles.input} placeholder="e.g. 14999"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Original Price (₹)</label>
                      <input 
                        type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange}
                        min="0" style={styles.input} placeholder="e.g. 19999"
                      />
                    </div>
                  </div>

                  <div style={styles.discountSummary}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Custom Discount Percentage (%)</label>
                      <input 
                        type="number" name="discount" value={formData.discount} 
                        onChange={handleChange} style={styles.input} placeholder={`Auto-calculated: ${calculatedDiscount}%`}
                      />
                      <small style={styles.hint}>Leave empty to auto-calculate based on original & selling price.</small>
                    </div>
                    <label style={styles.checkboxLabel}>
                      <input 
                        type="checkbox" name="showDiscountBadge" 
                        checked={formData.showDiscountBadge} onChange={handleChange}
                      />
                      Show discount badge on product card
                    </label>
                  </div>

                  <div style={styles.formGroupFull}>
                    <label style={styles.label}>Product Image URL or Path {editingId ? '' : '*'}</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <input 
                        type="text" name="photoUrl" value={formData.photoUrl} onChange={handleChange}
                        placeholder="e.g. /VIEW-1 (7).png or http://..."
                        required={!formData.photoUrl} style={{ ...styles.input, flex: 1 }} 
                      />
                      <span>OR</span>
                      <input 
                        type="file" accept="image/png, image/jpeg, image/webp"
                        onChange={handleImageUpload} style={{ ...styles.input, flex: 1 }} 
                      />
                    </div>
                    {formData.photoUrl && (
                      <div style={styles.previewContainer}>
                        <img src={formData.photoUrl} alt="Preview" style={styles.previewImage} onError={(e) => e.target.style.display = 'none'} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Specifications */}
                <div style={styles.formSectionFull}>
                  <h3 style={styles.sectionTitle}>Specifications & Features</h3>
                  
                  <div style={styles.specGrid}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Material</label>
                      <input type="text" name="material" value={formData.material} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Dimensions</label>
                      <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Warranty</label>
                      <input type="text" name="warranty" value={formData.warranty} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Assembly</label>
                      <input type="text" name="assembly" value={formData.assembly} onChange={handleChange} style={styles.input} />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Key Features (One per line)</label>
                    <textarea 
                      name="features" value={formData.features} onChange={handleChange}
                      style={styles.textarea} rows="4"
                      placeholder="Sturdy wooden frame&#10;Premium finish&#10;Easy to assemble..."
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formActions}>
                <button type="submit" style={styles.submitBtn}>
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  dashboardLayout: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flexShrink: 0,
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#666',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  sidebarItemActive: {
    backgroundColor: '#121212',
    color: '#fff',
  },
  mainContent: {
    flex: 1,
    minWidth: 0,
  },
  dateText: {
    color: '#888',
    fontSize: '0.85rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '1.5rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#121212',
    marginBottom: '0.25rem',
  },
  subtitle: {
    color: '#666',
    fontSize: '0.9rem',
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#121212',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  secondaryBtn: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '1rem',
    borderBottom: '2px solid #eee',
    color: '#666',
    fontWeight: '600',
    fontSize: '0.85rem',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '1rem',
    verticalAlign: 'middle',
  },
  productCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  thumbImage: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    objectFit: 'cover',
    border: '1px solid #eee',
  },
  imagePlaceholder: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productName: {
    fontWeight: '500',
    color: '#121212',
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    fontSize: '0.8rem',
    color: '#555',
    textTransform: 'capitalize'
  },
  priceText: {
    fontWeight: '600',
    color: '#121212'
  },
  origPriceText: {
    fontSize: '0.8rem',
    color: '#999',
    textDecoration: 'line-through'
  },
  discountTag: {
    padding: '0.3rem 0.6rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  noDiscount: {
    color: '#999'
  },
  actionCell: {
    display: 'flex',
    gap: '0.5rem'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    padding: '0.4rem',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
  },
  successAlert: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontWeight: '500',
  },
  errorAlert: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  formGroupFull: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#333',
  },
  hint: {
    fontSize: '0.8rem',
    color: '#888'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    color: '#121212',
    margin: '1rem 0 0 0',
    borderBottom: '1px solid #eaeaea',
    paddingBottom: '0.5rem'
  },
  pricingBox: {
    backgroundColor: '#fafafa',
    border: '1px solid #eaeaea',
    borderRadius: '8px',
    padding: '1.5rem',
  },
  discountSummary: {
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #eaeaea',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  discountCalculation: {
    fontSize: '0.95rem',
    color: '#555',
  },
  discountValue: {
    fontWeight: '700',
    color: '#2e7d32',
    fontSize: '1.1rem',
    marginLeft: '0.5rem'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.95rem',
    cursor: 'pointer',
    color: '#333'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  specGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    backgroundColor: '#fafafa',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #eaeaea',
  },
  previewContainer: {
    marginTop: '1rem',
  },
  previewImage: {
    maxWidth: '200px',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #eaeaea',
  },
  submitBtn: {
    backgroundColor: '#121212',
    color: '#fff',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    transition: 'background-color 0.2s',
  }
};

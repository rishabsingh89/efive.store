import React, { useState, useEffect } from 'react';
import { categories, getProducts, saveProducts } from '../../data/products';
import { Plus, Edit2, Trash2, ChevronLeft, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [editingId, setEditingId] = useState(null);
  
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
    features: ''
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
      showDiscountBadge: true,
      description: '',
      photoUrl: '',
      material: '',
      dimensions: '',
      warranty: '',
      assembly: '',
      features: ''
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
      showDiscountBadge: product.showDiscountBadge !== false,
      description: product.description || '',
      photoUrl: product.image || '',
      material: product.specifications?.material || '',
      dimensions: product.specifications?.dimensions || '',
      warranty: product.specifications?.warranty || '',
      assembly: product.specifications?.assembly || '',
      features: product.features ? product.features.join('\n') : ''
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
      showDiscountBadge: formData.showDiscountBadge,
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
      image: formData.photoUrl
    };

    let updatedProducts;
    if (editingId) {
      updatedProducts = products.map(p => p.id === editingId ? productData : p);
    } else {
      updatedProducts = [productData, ...products];
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
    <div style={styles.container}>
      {view === 'list' ? (
        <>
          <div style={styles.header}>
            <div>
              <h2 style={styles.title}>Products Management</h2>
              <p style={styles.subtitle}>Manage your store catalog and discounts.</p>
            </div>
            <button onClick={handleAddNew} style={styles.primaryBtn}>
              <Plus size={18} /> Add Product
            </button>
          </div>

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Discount</th>
                  <th style={styles.th}>Actions</th>
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
                          {product.image ? (
                            <img src={product.image} alt={product.name} style={styles.thumbImage} />
                          ) : (
                            <div style={styles.thumbPlaceholder}><ImageIcon size={16} /></div>
                          )}
                          <span style={styles.productName}>{product.name}</span>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.categoryBadge}>{product.category}</span>
                      </td>
                      <td style={styles.td}>
                        <div>
                          <span style={styles.priceText}>₹{product.price?.toLocaleString()}</span>
                          {product.originalPrice && (
                            <div style={styles.origPriceText}>₹{product.originalPrice?.toLocaleString()}</div>
                          )}
                        </div>
                      </td>
                      <td style={styles.td}>
                        {discount > 0 ? (
                          <span style={{
                            ...styles.discountTag,
                            backgroundColor: product.showDiscountBadge !== false ? '#e8f5e9' : '#f5f5f5',
                            color: product.showDiscountBadge !== false ? '#2e7d32' : '#9e9e9e'
                          }}>
                            {discount}% {product.showDiscountBadge === false && '(Hidden)'}
                          </span>
                        ) : (
                          <span style={styles.noDiscount}>-</span>
                        )}
                      </td>
                      <td style={styles.td}>
                        <div style={styles.actionCell}>
                          <button onClick={() => handleEdit(product)} style={styles.iconBtn} title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} style={{...styles.iconBtn, color: '#d32f2f'}} title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div style={styles.header}>
            <button onClick={() => setView('list')} style={styles.backBtn}>
              <ChevronLeft size={20} /> Back to Products
            </button>
            <h2 style={styles.title}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          </div>

          {successMsg && <div style={styles.successAlert}>{successMsg}</div>}
          {errorMsg && <div style={styles.errorAlert}>{errorMsg}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.grid}>
              
              <div style={styles.formGroupFull}>
                <h3 style={styles.sectionTitle}>Basic Information</h3>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Product Name / Title *</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} 
                  required style={styles.input} 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Category *</label>
                <select 
                  name="category" value={formData.category} onChange={handleChange} 
                  required style={styles.input}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Pricing & Discount Section */}
              <div style={styles.formGroupFull}>
                <h3 style={styles.sectionTitle}>Pricing & Discounts</h3>
                <div style={styles.pricingBox}>
                  <div style={styles.grid}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Original Price (₹)</label>
                      <input 
                        type="number" name="originalPrice" value={formData.originalPrice} 
                        onChange={handleChange} style={styles.input} placeholder="e.g. 30000"
                      />
                      <small style={styles.hint}>Leave empty if no discount.</small>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Selling Price (₹) *</label>
                      <input 
                        type="number" name="price" value={formData.price} 
                        onChange={handleChange} required style={styles.input} placeholder="e.g. 23100"
                      />
                    </div>
                  </div>

                  <div style={styles.discountSummary}>
                    <div style={styles.discountCalculation}>
                      Calculated Discount: <span style={styles.discountValue}>{calculatedDiscount}%</span>
                    </div>
                    <label style={styles.checkboxLabel}>
                      <input 
                        type="checkbox" 
                        name="showDiscountBadge" 
                        checked={formData.showDiscountBadge} 
                        onChange={handleChange} 
                        style={styles.checkbox}
                      />
                      Show discount badge on product card
                    </label>
                  </div>
                </div>
              </div>

              <div style={styles.formGroupFull}>
                <h3 style={styles.sectionTitle}>Media & Details</h3>
              </div>

              <div style={styles.formGroupFull}>
                <label style={styles.label}>Product Image (PNG, JPG) {editingId ? '' : '*'}</label>
                <input 
                  type="file" accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageUpload} required={!formData.photoUrl} style={styles.input} 
                />
                {formData.photoUrl && (
                  <div style={styles.previewContainer}>
                    <img src={formData.photoUrl} alt="Preview" style={styles.previewImage} onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
              </div>

              <div style={styles.formGroupFull}>
                <label style={styles.label}>Description *</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleChange} 
                  required style={styles.textarea} rows={4}
                />
              </div>

              <div style={styles.formGroupFull}>
                <h3 style={styles.sectionTitle}>Specifications</h3>
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
              </div>

              <div style={styles.formGroupFull}>
                <label style={styles.label}>Features (One per line)</label>
                <textarea 
                  name="features" value={formData.features} onChange={handleChange} 
                  style={styles.textarea} rows={5}
                  placeholder="100% Solid Teak Wood structure&#10;Scratch-resistant top"
                />
              </div>

            </div>

            <button type="submit" style={styles.submitBtn}>
              {editingId ? 'Save Changes' : 'Add Product'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  header: {
    marginBottom: '2rem',
    borderBottom: '1px solid #eaeaea',
    paddingBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.5rem',
    color: '#121212',
    marginBottom: '0.2rem',
  },
  subtitle: {
    color: '#666',
    fontSize: '0.9rem',
  },
  primaryBtn: {
    backgroundColor: '#121212',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.2rem',
    color: '#666',
    cursor: 'pointer',
    padding: 0,
    marginBottom: '1rem',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    padding: '1rem',
    borderBottom: '2px solid #eaeaea',
    color: '#666',
    fontWeight: '600',
    fontSize: '0.85rem',
    textTransform: 'uppercase'
  },
  tr: {
    borderBottom: '1px solid #eaeaea',
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
    objectFit: 'cover',
    borderRadius: '6px',
    backgroundColor: '#f5f5f5'
  },
  thumbPlaceholder: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa'
  },
  productName: {
    fontWeight: '500',
    color: '#121212',
    maxWidth: '250px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    padding: '0.3rem 0.6rem',
    borderRadius: '20px',
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

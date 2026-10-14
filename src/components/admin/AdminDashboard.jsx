import React, { useState, useEffect } from 'react';
import { 
  getCategories, 
  saveCategories, 
  getProducts, 
  saveProducts, 
  getHeroCMS, 
  saveHeroCMS, 
  syncAllCMS 
} from '../../data/products';
import { Plus, Edit, Trash2, ChevronLeft, Image, Package, Eye, Layout, Sparkles, Layers } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [heroCMS, setHeroCMSState] = useState(getHeroCMS());
  
  // Product state
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
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

  // Category state
  const [catEditingId, setCatEditingId] = useState(null);
  const [catFormData, setCatFormData] = useState({ id: '', name: '', image: '' });
  const [showCatForm, setShowCatForm] = useState(false);

  // Notifications
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [syncStatus, setSyncStatus] = useState('');
  const [viewers, setViewers] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
    setCategoriesList(getCategories());
    setHeroCMSState(getHeroCMS());

    const handleUpdate = () => {
      setProducts(getProducts());
      setCategoriesList(getCategories());
      setHeroCMSState(getHeroCMS());
    };

    window.addEventListener('efive_products_updated', handleUpdate);
    window.addEventListener('efive_categories_updated', handleUpdate);
    window.addEventListener('efive_hero_updated', handleUpdate);
    window.addEventListener('efive_cms_updated', handleUpdate);

    return () => {
      window.removeEventListener('efive_products_updated', handleUpdate);
      window.removeEventListener('efive_categories_updated', handleUpdate);
      window.removeEventListener('efive_hero_updated', handleUpdate);
      window.removeEventListener('efive_cms_updated', handleUpdate);
    };
  }, []);

  // Sync initial category for product form
  useEffect(() => {
    if (categoriesList.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: categoriesList[0].id }));
    }
  }, [categoriesList]);

  // Calculate dynamic discount for preview
  const currentPrice = parseFloat(formData.price) || 0;
  const currentOriginalPrice = parseFloat(formData.originalPrice) || 0;
  const calculatedDiscount = currentOriginalPrice > currentPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100) 
    : 0;

  // ----------------------------------------------------
  // PRODUCT HANDLERS
  // ----------------------------------------------------
  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: categoriesList[0]?.id || '',
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
      category: product.category || categoriesList[0]?.id,
      price: product.price ?? '',
      originalPrice: product.originalPrice ?? '',
      discount: product.discount ?? '',
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
      setSuccessMsg('Product deleted successfully!');
      setTimeout(() => setSuccessMsg(''), 2500);
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
    
    const priceNum = parseFloat(formData.price);
    const origPriceNum = parseFloat(formData.originalPrice);

    if (priceNum < 0) {
      setErrorMsg('Selling price cannot be negative.');
      return;
    }

    const featuresList = formData.features
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const existingProduct = editingId ? products.find(p => p.id === editingId) : null;
    const photo = formData.photoUrl || existingProduct?.image || (existingProduct?.images && existingProduct.images[0]) || '';
    const imagesList = formData.photoUrl 
      ? [formData.photoUrl, ...(existingProduct?.images?.filter(img => img !== formData.photoUrl) || [])]
      : (existingProduct?.images && existingProduct.images.length > 0 ? existingProduct.images : (photo ? [photo] : []));

    const productData = {
      id: editingId || `${formData.category || 'prod'}-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: priceNum,
      originalPrice: origPriceNum || null,
      discount: formData.discount ? parseInt(formData.discount) : (origPriceNum && origPriceNum > priceNum ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : null),
      showDiscountBadge: formData.showDiscountBadge,
      stockStatus: formData.stockStatus,
      isOutOfStock: formData.stockStatus === 'out_of_stock',
      isSoldOut: formData.stockStatus === 'sold_out',
      rating: existingProduct?.rating || 5.0,
      reviews: existingProduct?.reviews || 0,
      description: formData.description,
      features: featuresList,
      specifications: {
        material: formData.material,
        dimensions: formData.dimensions,
        warranty: formData.warranty,
        assembly: formData.assembly
      },
      colors: existingProduct?.colors || [],
      image: photo,
      images: imagesList
    };

    let updatedProducts;
    if (editingId) {
      updatedProducts = products.map(p => p.id === editingId ? productData : p);
    } else {
      updatedProducts = [...products, productData];
    }

    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    
    setSuccessMsg(editingId ? 'Product updated and synced live!' : 'Product added and synced live!');
    setTimeout(() => {
      setSuccessMsg('');
      setView('list');
    }, 1500);
  };

  // ----------------------------------------------------
  // CATEGORY HANDLERS
  // ----------------------------------------------------
  const handleAddNewCategory = () => {
    setCatEditingId(null);
    setCatFormData({ id: '', name: '', image: '' });
    setShowCatForm(true);
  };

  const handleEditCategory = (cat) => {
    setCatEditingId(cat.id);
    setCatFormData({ id: cat.id, name: cat.name, image: cat.image });
    setShowCatForm(true);
  };

  const handleDeleteCategory = (catId) => {
    if (window.confirm(`Are you sure you want to delete category "${catId}"?`)) {
      const updated = categoriesList.filter(c => c.id !== catId);
      setCategoriesList(updated);
      saveCategories(updated);
      setSuccessMsg('Category deleted successfully!');
      setTimeout(() => setSuccessMsg(''), 2500);
    }
  };

  const handleCatImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCatFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!catFormData.name.trim()) return;

    const catId = catEditingId || catFormData.id.trim().toLowerCase().replace(/\s+/g, '-') || `cat-${Date.now()}`;
    const categoryData = {
      id: catId,
      name: catFormData.name.trim(),
      image: catFormData.image.trim() || '/hero_bed_2.jpg'
    };

    let updated;
    if (catEditingId) {
      updated = categoriesList.map(c => c.id === catEditingId ? categoryData : c);
    } else {
      updated = [...categoriesList, categoryData];
    }

    setCategoriesList(updated);
    saveCategories(updated);
    setShowCatForm(false);
    setSuccessMsg(catEditingId ? 'Category updated successfully!' : 'Category added successfully!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // ----------------------------------------------------
  // HERO BANNER CMS HANDLERS
  // ----------------------------------------------------
  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHeroCMSState(prev => ({ ...prev, [name]: value }));
  };

  const handleSlideChange = (index, field, value) => {
    setHeroCMSState(prev => {
      const newSlides = [...(prev.slides || [])];
      newSlides[index] = { ...newSlides[index], [field]: value };
      return { ...prev, slides: newSlides };
    });
  };

  const handleSlideImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSlideChange(index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveHeroCMS = (e) => {
    e.preventDefault();
    saveHeroCMS(heroCMS);
    setSuccessMsg('Homepage & Hero CMS updated and synced live!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // ----------------------------------------------------
  // SYNC ALL CMS TO CODEBASE
  // ----------------------------------------------------
  const handleSyncAll = async () => {
    setSyncStatus('Syncing full CMS data to codebase (products.js)...');
    const res = await syncAllCMS(products, categoriesList, heroCMS);
    if (res.success) {
      setSyncStatus('⚡ All CMS data synced permanently to src/data/products.js on disk!');
    } else {
      setSyncStatus('Synced to browser storage & ready for commit!');
    }
    setTimeout(() => setSyncStatus(''), 4500);
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
          <span>Products ({products.length})</span>
        </div>

        <div 
          style={{...styles.sidebarItem, ...(activeTab === 'categories' ? styles.sidebarItemActive : {})}}
          onClick={() => setActiveTab('categories')}
        >
          <Layers size={20} />
          <span>Categories ({categoriesList.length})</span>
        </div>

        <div 
          style={{...styles.sidebarItem, ...(activeTab === 'hero' ? styles.sidebarItemActive : {})}}
          onClick={() => setActiveTab('hero')}
        >
          <Layout size={20} />
          <span>Homepage Hero CMS</span>
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
        {/* Global Action Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              EFIVE Dynamic CMS Engine
            </span>
          </div>
          <button 
            onClick={handleSyncAll} 
            style={styles.syncGlobalBtn}
            title="Persist all products, categories, and banner CMS data directly into src/data/products.js for Vercel & GitHub"
          >
            ⚡ Sync All CMS to Codebase (`products.js`)
          </button>
        </div>

        {syncStatus && <div style={styles.successBanner}>{syncStatus}</div>}
        {successMsg && <div style={styles.successBanner}>{successMsg}</div>}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div style={styles.card}>
            <div style={styles.header}>
              <div>
                <h1 style={styles.title}>Categories Management</h1>
                <p style={styles.subtitle}>Add, edit, or replace shop category titles and thumbnail images.</p>
              </div>
              <button onClick={handleAddNewCategory} style={styles.primaryBtn}>
                <Plus size={18} /> Add Category
              </button>
            </div>

            {showCatForm && (
              <form onSubmit={handleSaveCategory} style={{ ...styles.form, backgroundColor: '#fafafa', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #eee' }}>
                <h3 style={styles.sectionTitle}>{catEditingId ? 'Edit Category' : 'Create New Category'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Category Name *</label>
                    <input 
                      type="text" value={catFormData.name} 
                      onChange={e => setCatFormData(prev => ({ ...prev, name: e.target.value }))}
                      required style={styles.input} placeholder="e.g. Shelves or Accent Chairs"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Category Image URL / Upload</label>
                    <input 
                      type="text" value={catFormData.image} 
                      onChange={e => setCatFormData(prev => ({ ...prev, image: e.target.value }))}
                      style={styles.input} placeholder="/shelve deck-1 (1).png or http://..."
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Or Upload File</label>
                    <input type="file" accept="image/*" onChange={handleCatImageUpload} style={styles.input} />
                  </div>
                </div>
                {catFormData.image && (
                  <div style={{ marginBottom: '1rem' }}>
                    <img src={catFormData.image} alt="Category preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" style={styles.submitBtn}>{catEditingId ? 'Save Category' : 'Create Category'}</button>
                  <button type="button" onClick={() => setShowCatForm(false)} style={styles.secondaryBtn}>Cancel</button>
                </div>
              </form>
            )}

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>CATEGORY</th>
                    <th style={styles.th}>SLUG ID</th>
                    <th style={styles.th}>PRODUCTS COUNT</th>
                    <th style={styles.th}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesList.map(cat => {
                    const count = products.filter(p => p.category === cat.id).length;
                    return (
                      <tr key={cat.id} style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.productCell}>
                            <img src={cat.image} alt={cat.name} style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px' }} />
                            <strong style={{ fontSize: '0.95rem' }}>{cat.name}</strong>
                          </div>
                        </td>
                        <td style={styles.td}><span style={styles.categoryBadge}>{cat.id}</span></td>
                        <td style={styles.td}>{count} items</td>
                        <td style={styles.td}>
                          <div style={styles.actions}>
                            <button onClick={() => handleEditCategory(cat)} style={styles.iconBtn} title="Edit Category">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDeleteCategory(cat.id)} style={{...styles.iconBtn, color: '#d32f2f'}} title="Delete Category">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* HOMEPAGE HERO CMS TAB */}
        {activeTab === 'hero' && (
          <div style={styles.card}>
            <div style={styles.header}>
              <div>
                <h1 style={styles.title}>Homepage Hero Banner CMS</h1>
                <p style={styles.subtitle}>Control main headlines, promotional offer text, and slider images live on the homepage.</p>
              </div>
            </div>

            <form onSubmit={handleSaveHeroCMS} style={styles.form}>
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Main Hero Texts</h3>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Badge Text (Top Pill)</label>
                  <input type="text" name="badgeText" value={heroCMS.badgeText || ''} onChange={handleHeroChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Main Headline (H1)</label>
                  <input type="text" name="headline" value={heroCMS.headline || ''} onChange={handleHeroChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Sub-headline</label>
                  <textarea name="subheadline" value={heroCMS.subheadline || ''} onChange={handleHeroChange} style={styles.textarea} rows="2" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Promotional Offer Banner Text</label>
                  <input type="text" name="offerText" value={heroCMS.offerText || ''} onChange={handleHeroChange} style={styles.input} />
                </div>
              </div>

              <div style={styles.formSectionFull}>
                <h3 style={styles.sectionTitle}>Hero Slider Slides</h3>
                {(heroCMS.slides || []).map((slide, idx) => (
                  <div key={idx} style={{ backgroundColor: '#f9f9f9', padding: '1.25rem', borderRadius: '10px', marginBottom: '1.25rem', border: '1px solid #eee' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: 'hsl(var(--primary-color))' }}>Slide #{idx + 1}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Slide Title</label>
                        <input type="text" value={slide.title || ''} onChange={e => handleSlideChange(idx, 'title', e.target.value)} style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Slide Subtitle</label>
                        <input type="text" value={slide.subtitle || ''} onChange={e => handleSlideChange(idx, 'subtitle', e.target.value)} style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Slide Image URL / Upload</label>
                        <input type="text" value={slide.image || ''} onChange={e => handleSlideChange(idx, 'image', e.target.value)} style={styles.input} />
                        <input type="file" accept="image/*" onChange={e => handleSlideImageUpload(idx, e)} style={{ marginTop: '0.5rem', ...styles.input }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.formActions}>
                <button type="submit" style={styles.submitBtn}>
                  <Sparkles size={18} /> Save & Live Update Homepage Hero
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VIEWERS TAB */}
        {activeTab === 'viewers' && (
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
        )}

        {/* PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (view === 'list' ? (
          <div style={styles.card}>
            <div style={styles.header}>
              <div>
                <h1 style={styles.title}>Products Management</h1>
                <p style={styles.subtitle}>Manage your store catalog, images, prices, and availability.</p>
              </div>
              <button onClick={handleAddNew} style={styles.primaryBtn}>
                <Plus size={18} /> Add Product
              </button>
            </div>

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
                              <img src={product.image || product.images[0]} alt={product.name} style={styles.thumbImage} />
                            ) : (
                              <div style={styles.imagePlaceholder}><Image size={20} color="#ccc" /></div>
                            )}
                            <span style={styles.productName}>{product.name}</span>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.categoryBadge}>
                            {categoriesList.find(c => c.id === product.category)?.name || product.category}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.priceContainer}>
                            <span style={styles.currentPrice}>₹{product.price?.toLocaleString('en-IN')}</span>
                            {product.originalPrice && (
                              <span style={styles.origPrice}>₹{product.originalPrice?.toLocaleString('en-IN')}</span>
                            )}
                          </div>
                        </td>
                        <td style={styles.td}>
                          {discount > 0 ? (
                            <span style={styles.discountBadge}>
                              {discount}%
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
                <p style={styles.subtitle}>Fill in the product details below.</p>
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
                      {categoriesList.map(c => (
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
                    <label style={styles.label}>Product Image URL or File Upload</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input 
                        type="text" name="photoUrl" value={formData.photoUrl} onChange={handleChange}
                        placeholder="e.g. /shelve deck-1 (1).png or http://..."
                        style={{ ...styles.input, flex: '1 1 min(100%, 250px)' }} 
                      />
                      <span>OR</span>
                      <input 
                        type="file" accept="image/*"
                        onChange={handleImageUpload} style={{ ...styles.input, flex: '1 1 min(100%, 250px)' }} 
                      />
                    </div>
                    {formData.photoUrl && (
                      <div style={styles.previewContainer}>
                        <img src={formData.photoUrl} alt="Preview" style={styles.previewImage} />
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
                      placeholder="Sturdy wooden frame&#10;Premium finish..."
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
        ))}
      </div>
    </div>
  );
}

const styles = {
  dashboardLayout: {
    display: 'flex',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 80px)',
    fontFamily: 'var(--font-main)'
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '1.25rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    height: 'fit-content'
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '0.85rem 1rem',
    borderRadius: '10px',
    cursor: 'pointer',
    color: '#666',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },
  sidebarItemActive: {
    backgroundColor: 'hsl(var(--primary-color))',
    color: '#fff',
    fontWeight: '600'
  },
  mainContent: {
    flex: 1
  },
  syncGlobalBtn: {
    backgroundColor: '#2e7d32',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '0.75rem 1.25rem',
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(46,125,50,0.25)',
    transition: 'all 0.2s ease'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#111',
    margin: 0
  },
  subtitle: {
    color: '#666',
    fontSize: '0.95rem',
    marginTop: '0.25rem'
  },
  primaryBtn: {
    backgroundColor: 'hsl(var(--primary-color))',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  secondaryBtn: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '0.75rem 1.5rem',
    fontWeight: '600',
    cursor: 'pointer'
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
    borderBottom: '2px solid #eee',
    color: '#888',
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  tr: {
    borderBottom: '1px solid #eee'
  },
  td: {
    padding: '1.25rem 1rem',
    verticalAlign: 'middle'
  },
  productCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  thumbImage: {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  imagePlaceholder: {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productName: {
    fontWeight: '600',
    color: '#222'
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    color: '#555',
    padding: '0.35rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  currentPrice: {
    fontWeight: '700',
    color: '#111'
  },
  origPrice: {
    fontSize: '0.85rem',
    color: '#999',
    textDecoration: 'line-through'
  },
  discountBadge: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontWeight: '700'
  },
  noDiscount: {
    color: '#ccc'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem'
  },
  iconBtn: {
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '6px',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#555'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#888'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
    gap: '2rem'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  formSectionFull: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#333',
    margin: 0,
    borderBottom: '1px solid #eee',
    paddingBottom: '0.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  formGroupFull: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    gridColumn: '1 / -1'
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#555'
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  textarea: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '0.95rem',
    outline: 'none',
    resize: 'vertical',
    width: '100%',
    boxSizing: 'border-box'
  },
  priceRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
    gap: '1rem'
  },
  discountSummary: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#444',
    cursor: 'pointer'
  },
  previewContainer: {
    marginTop: '1rem',
    width: '120px',
    height: '90px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #ddd'
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  specGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
    gap: '1rem'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem'
  },
  submitBtn: {
    backgroundColor: 'hsl(var(--primary-color))',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '0.85rem 2rem',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  successBanner: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1.5rem',
    fontWeight: '600'
  },
  errorBanner: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1.5rem',
    fontWeight: '600'
  },
  dateText: {
    fontSize: '0.85rem',
    color: '#888'
  }
};

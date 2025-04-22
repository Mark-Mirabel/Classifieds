export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercentage = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
};

export const formatDate = (date) => {
  if (!date) return 'Not set';
  return new Date(date).toLocaleDateString();
};

export const getRateTypeIcon = (type) => {
  const icons = {
    flat: '🧾',
    word: '📏',
    line: '🧱',
    modular: '📐',
    columnInch: '📰',
    tiered: '📊',
    performance: '🎯',
    custom: '⚙️'
  };
  return icons[type] || '💰';
};

export const getAddOnIcon = (addOnId) => {
  const icons = {
    'premium-placement': '⭐',
    'image-gallery': '🖼️',
    'video-inclusion': '🎥',
    'social-links': '🔗',
    'contact-form': '📝',
    'map-integration': '🗺️'
  };
  return icons[addOnId] || '➕';
}; 
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
  ENDPOINTS: {
    PUBLICATIONS: '/publications',
    PUBLICATIONS_SEARCH: '/publications/search',
    PUBLICATIONS_BY_TYPE: '/publications/type',
    ACTIVE_PUBLICATIONS: '/publications/active'
  },
  HEADERS: {
    'Content-Type': 'application/json',
    // Add any additional headers here
  }
};

export default API_CONFIG; 
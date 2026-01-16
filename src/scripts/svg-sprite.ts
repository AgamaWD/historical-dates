const req = require.context('../assets/svg', false, /\.svg$/);
req.keys().forEach(req);
export default req;
export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3002,
  redis: {
    host: 'localhost',
    port: '6379',
  },
  compress: {
    threshold: 2048,
  },
};

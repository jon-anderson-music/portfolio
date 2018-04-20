module.exports = {
  extends: 'airbnb-base',
  plugins: ['ejs'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'class-methods-use-this': 0,
  }
};

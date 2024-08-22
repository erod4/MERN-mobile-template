const generate_reset_code = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};
module.exports = generate_reset_code;

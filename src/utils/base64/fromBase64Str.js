export default (base64EncodedStr) => {
  return new Buffer(base64EncodedStr, 'base64');
};
export default (data) => {
  return new Buffer(data).toString('base64');
};
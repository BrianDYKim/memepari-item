
function sanitizeObject(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined) {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

const buildResponse = (data, errorMessage) => {
  return {
    error: errorMessage ?? null,
    data: data,
  };
};

module.exports = {
  buildResponse,
  sanitizeObject
};

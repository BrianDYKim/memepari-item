const buildResponse = (data, errorMessage) => {
  return {
    error: errorMessage ?? null,
    data: data,
  };
};

module.exports = {
  buildResponse,
};

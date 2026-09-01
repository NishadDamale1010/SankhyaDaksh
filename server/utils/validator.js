module.exports = {
  getMissingFields: (body, requiredFields) => {
    return requiredFields.filter(field => !body[field]);
  }
};

class AppError extends Error {
  constructor(error) {
    super(error.message);
    this.statusCode = error.statusCode;
  }
}
function handleErrors(res, error) {
  const statusCode = error.statusCode || 500;
  console.error(error);
  res.status(statusCode).send({ message: error.message });
  
}
module.exports = {
  AppError,
  handleErrors,
};

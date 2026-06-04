class AppError extends Error {
  statusCode;
  constructor(error) {
    super(error.message);
    this.statusCode = error.statusCode;
  }
}
function handleErrors(res, error) {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({ message: error.messsage });
  console.log(error.message);
}
module.exports = {
  AppError,
  handleErrors,
};

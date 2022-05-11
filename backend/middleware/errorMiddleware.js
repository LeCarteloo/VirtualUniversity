const errorHandler = (err, req, res, next) => {
  /* If status is not provided then 
    there is problem with server (status - 500) */
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorHandler;

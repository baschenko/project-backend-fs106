export const notFoundHandler = (req, res) => {
  res.status(400).json({
    message: `${req.url} not found`,
  });
};

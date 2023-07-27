export default () => (req, res, next) => {
  const allowedDomains = [
    "https://movieofday.com",
    "https://www.movieofday.com",
    "https://movie-of-day-front.vercel.app/",
    process.env.APP_PUBLIC_URL,
  ];
  const requestOrigin = req.headers.origin;

  if (allowedDomains.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
  }
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Max-Age", "10");
  next();
};

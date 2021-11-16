// for redirects
// this is 1 of 3 configs for redirects in this project
// this one is for our local development (localhost) that is for the Express server

module.exports = app => {
  app.get(/^\/$/, (_req, res) => res.redirect('/discover'))
}

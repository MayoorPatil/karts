
const config = {
  apiOrigins: {
    development: 'http://localhost:4741',
    production: 'https://mayoor-capstone-rails-api.herokuapp.com/'
  }
}

const apiOrigin = function () {
  if (process.env.NODE_ENV === 'development') {
    return config.apiOrigins.development
  } else {
    return config.apiOrigins.production
  }
}

module.exports = apiOrigin

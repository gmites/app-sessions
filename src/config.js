const config = {
  session: {
    secret: 'loquesea',
    db: {
      uri: 'mongodb+srv://kenshin:passpass@cluster0.eyjj0.mongodb.net/sessions?retryWrites=true&w=majority',
      collection: 'data'
    }
  }
}

module.exports = config
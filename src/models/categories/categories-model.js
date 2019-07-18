const Model = require('../model-main.js');
const schema = require('./categories-schema.js');


class Categories extends Model {

  constructor() {
    super();
    this.schema = schema;
  }


}

module.exports = Categories;
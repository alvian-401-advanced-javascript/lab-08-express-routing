'use strict';

class Model {

  constructor() {
    
  }

  get(_id) {
    if (_id) {
      return this.schema.findOne({ _id });
    }
    else { return this.schema.find({}); }
  }

  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new: true});

  }

  delete(_id) {
    return this.schema.findOneAndDelete(_id);
  }
}

module.exports = Model;
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

  update(id, record) {
    return this.schema.findOneAndUpdate({_id: id}, record, {new: true});

  }

  delete(id) {
    return this.schema.findOneAndDelete({_id: id});
  }

  
}

module.exports = Model;
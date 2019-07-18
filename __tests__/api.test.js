const { server } = require('../src/server.js');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);

let endpath;

beforeEach(() => {
  let arr = ['categories'];
  arr.forEach(path => {
    endpath = path;
    console.log(endpath);
  });
});

describe('All APIs', () => {
  it('can post() a new category or product', () => {
    let obj = { name: 'John', description: 'teacher' };
    return mockRequest.post(`/api/v1/${endpath}`)
      .send(obj)
      .then(entry => {
        let record = entry.body;
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() a single category or product', () => {
    let obj = { name: 'John', description: 'teacher' };
    return mockRequest.post(`/api/v1/${endpath}`)
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/${endpath}/${data.body._id}`)
          .then(response => {
            response = response.body;
            Object.keys(obj).forEach(key => {
              expect(response[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can get() a all categories or products', () => {
    let obj = { name: 'Ryan', description: 'TA' };

    return mockRequest.post(`/api/v1/${endpath}`)
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/${endpath}`)
          .then(response => {
            response = response.body;
            expect(response.count).toEqual(3);

          });
      });
  });

  xit('can delete() a category or product', () => {

    let obj = { name: 'delete me', description: 'deleted' };
    return mockRequest.post(`/api/v1/${endpath}`)
      .send(obj)
      .then(createdObj => {
        console.log('created object', createdObj.body);
        return mockRequest.delete(`/api/v1/${endpath}/${createdObj.body._id}`)
          .then(deltedRecord => {
            console.log('this is the delted record', deltedRecord.text);
            expect(deltedRecord.text.name).toEqual(obj.name);

          });
      });
  });

});
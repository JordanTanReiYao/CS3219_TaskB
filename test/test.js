let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let app = require("../index");
let Contact = require('../contactModel');
//Our parent block

describe("RestHub", () => {
describe("GET Contacts", () => {
     it("it should GET contacts", (done) => {
     chai.request(app)
         .get("/contacts")
         .end((err, res) => {
               (res).should.have.status(200);
               (res.body).should.be.a("object");
               done();
            });
         });
     });
describe('POST Contact', () => {
   it('it should POST a contact', (done) => {
      let contact = {
          name: "Jeremy Tay",
          email: "JeremyTay@gmail.com",
          gender: "Male",
          phone: "56789012"
      }
        chai.request(app)
        .post('/contacts')
        .send(contact)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              //res.body.should.have.property('message').eql('Book successfully added!');
              res.body.data.should.have.property('name');
              res.body.data.should.have.property('email');
              res.body.data.should.have.property('gender');
              res.body.data.should.have.property('phone');
          done();
        });
  });
});
describe('PUT Contact', () => {
   it('it should UPDATE a contact given the id', (done) => {
      let contact = new Contact({name: "Natasha Lim",
      email: "NatashaLim@gmail.com",
      gender: "Female",
      phone: "56789012"})
      contact.save((err, contact) => {
          chai.request(app)
           .put('/contacts/' + contact._id)
           .send({name: "Timothy Toh",
           email: "TimothyToh@gmail.com",
           gender: "Male",
           phone: "09876543"})
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('message').eql('Contact Info updated');
               res.body.data.should.have.property('name').eql("Timothy Toh");
             done();
           });
      });
   });
});
describe('DELETE Contact', () => {
   it('it should DELETE a contact given the id', (done) => {
      let contact = new Contact({name: "Dominic Toh",
      email: "DominicToh@gmail.com",
      gender: "Male",
      phone: "12345678"})
      contact.save((err, contact) => {
         chai.request(app)
           .delete('/contacts/' + contact._id)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('message').eql('Contact deleted');
             done();
           });
      });
   });
});

});
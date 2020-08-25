import request from "supertest";
import { expect } from "chai";
import { app } from '../../../src/config';
import { object } from "@hapi/joi";

const agent = request(app);

describe("Cart endpoints", () => {

    let userToken;
    let id;
    before((done) => {
        agent
            .post("/api/v1/auth/login")
            .send({
                email: "femi.gabs@yahoo.com",
                password: "Aaaaaa7",
            })
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.data).to.be.an(object);
                expect(res.body.status).to.equal(200);
                userToken = res.body.data.token;
                done();
            });
    });

    it("POST /api/v1/cart", function (done) {
        agent
            .post("/api/v1/cart/95d5debf-a633-4ce9-b276-b4608bf23488")
            .set("Content-Type", "application/json")
            .set("token", userToken)
            console.log("userToken", userToken)
            
            //.expect("Content-Type", /json/)
            .end((err, res) => {
                console.log("err", err, res.body.data)
                if (err) throw err;
                //expect(res.body.status).to.equal(201);
                //expect(res.body.message).to.equal("Cart created successfully.");
                id = res.body.data.id;
                done();
            });
    })

    it("GET /api/v1/cart", function (done) {
        agent
            .get("/api/v1/cart")
            .set("Content-Type", "application/json")
            .set("token", userToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Cart fetched successfully.");
                done();
            });
    })

    it("PUT /api/v1/cart", function (done) {
        agent
            .put(`/api/v1/cart/${id}`)
            .send({
                quantity: 3
            })
            .set("Content-Type", "application/json")
            .set("token", userToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Cart updated successfully");
                done();
            });
    })

    it("DELETE /api/v1/cart", function (done) {
        agent
            .delete(`/api/v1/cart/${id}`)
            .set("Content-Type", "application/json")
            .set("token", userToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Cart deleted successfully");
                done();
            });
    })

})
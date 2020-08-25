import request from "supertest";
import { expect } from "chai";
import { app } from '../../../src/config';
import { object } from "@hapi/joi";

const agent = request(app);

describe("Order Details endpoints", () => {
    const order = {
        first_name: "femi",
        last_name: "babayemi",
        address: "11, babayemi street",
        state: "lagos",
        city: "alagbado",
        phone_number: "08139151116"
    }
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

    it("POST /api/v1/order_details", function (done) {
        agent
            .post("/api/v1/order_details")
            .send(order)
            .set("Content-Type", "application/json")
            .set("token", userToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(201);
                expect(res.body.message).to.equal("Order Details created successfully.");
                id = res.body.data.id;
                done();
            });
    })

    it("GET /api/v1/order_details", function (done) {
        agent
            .get("/api/v1/order_details")
            .set("Content-Type", "application/json")
            .set("token", userToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Order Details successfully fetched.");
                done();
            });
    })

    it("PUT /api/v1/order_details", function (done) {
        agent
            .put(`/api/v1/order_details/${id}`)
            .send({
                quantity: 3
            })
            .set("Content-Type", "application/json")
            .set("token", userToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Order Details updated successfully");
                done();
            });
    })

    it("DELETE /api/v1/order_details", function (done) {
        agent
            .delete(`/api/v1/order_details/${id}`)
            .set("Content-Type", "application/json")
            .set("token", userToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Order Details deleted successfully");
                done();
            });
    })

})
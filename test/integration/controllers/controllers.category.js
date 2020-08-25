import request from "supertest";
import { expect } from "chai";
import { app } from '../../../src/config';
import { object } from "@hapi/joi";

const agent = request(app);

describe("Category endpoints", () => {
    const category = {
        product_type: "clothes",
        description: "This category would hold clothes"
    }
    let adminToken;
    let categoryId;
    let fetchedCategory
    before((done) => {
        agent
            .post("/api/v1/auth/login")
            .send({
                email: "femi.gabs@gmail.com",
                password: "Aaaaaa7",
            })
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                adminToken = res.body.data.token;
                done();
            });
    });

    it("POST /api/v1/category", function (done) {
        agent
            .post("/api/v1/category")
            .send(category)
            .set("Content-Type", "application/json")
            .set("token", adminToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(201);
                expect(res.body.message).to.equal("Category created successfully.");
                categoryId = res.body.data.id;
                done();
            });
    })

    it("GET /api/v1/category", function (done) {
        agent
            .get("/api/v1/category")
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("All Category fetched successfully.");
                done();
            });
    })

    it("PUT /api/v1/category", function (done) {
        agent
            .put(`/api/v1/category/${categoryId}`)
            .send({
                product_type: "cloth",
                description: "This category would hold cloth"
            })
            .set("Content-Type", "application/json")
            .set("token", adminToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Category updated successfully");
                done();
            });
    })

    it("DELETE /api/v1/category", function (done) {
        agent
            .delete(`/api/v1/category/${categoryId}`)
            .set("Content-Type", "application/json")
            .set("token", adminToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Category deleted successfully");
                done();
            });
    })

})
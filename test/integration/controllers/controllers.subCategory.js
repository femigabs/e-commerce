import request from "supertest";
import { expect } from "chai";
import { app } from '../../../src/config';

const agent = request(app);

describe("Category endpoints", () => {
    const subCategory = {
        product_sub_category: "men",
        description: "This sub category would hold men clothes"
    }
    let adminToken;
    let id;
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
                expect(res.body.data).to.be.a("string");
                expect(res.body.status).to.equal(200);
                adminToken = res.body.data;
                done();
            });
    });

    it("POST /api/v1/category/sub", function (done) {
        agent
            .post("/api/v1/category/sub/f251128e-abca-4832-9452-8023318492d4")
            .send(subCategory)
            .set("Content-Type", "application/json")
            .set("token", adminToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(201);
                expect(res.body.message).to.equal("Sub Category created successfully.");
                id = res.body.data.id;
                done();
            });
    })

    it("GET ALL /api/v1/category/sub", function (done) {
        agent
            .get("/api/v1/category/sub")
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("All Sub Category fetched successfully.");
                done();
            });
    })

    it("GET /api/v1/category/sub", function (done) {
        agent
            .get("/api/v1/category/sub/f251128e-abca-4832-9452-8023318492d4")
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Sub Category fetched successfully.");
                done();
            });
    })

    it("PUT /api/v1/category/sub", function (done) {
        agent
            .put(`/api/v1/category/sub/${id}`)
            .send({
                product_sub_category: "men cloth",
                description: "This sub category would hold men cloth"
            })
            .set("Content-Type", "application/json")
            .set("token", adminToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Sub Category updated successfully");
                done();
            });
    })

    it("DELETE /api/v1/category/sub", function (done) {
        agent
            .delete(`/api/v1/category/sub/${id}`)
            .set("Content-Type", "application/json")
            .set("token", adminToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Sub Category deleted successfully");
                done();
            });
    })
})
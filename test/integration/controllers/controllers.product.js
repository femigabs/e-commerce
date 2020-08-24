import request from "supertest";
import { expect } from "chai";
import { app } from '../../../src/config';

const agent = request(app);

describe("Product endpoints", () => {
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

    it("POST /api/v1/subcategory/product", function (done) {
        agent
            .post("/api/v1/subcategory/product/6cb1ab80-929f-425b-a634-033aa5912b04")
            .set("token", adminToken)
            .field("product_name", "gucci belt")
            .field("description", "black leather")
            .field("quantity", 55)
            .field("price", 5500)
            .attach('product_image', "public/a.jpg")
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(201);
                expect(res.body.message).to.equal("Product created successfully.");
                id = res.body.data.id;
                done();
            });
    })

    it("GET ALL /api/v1/subcategory/product", function (done) {
        agent
            .get("/api/v1/subcategory/product")
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("All Product fetched successfully.");
                done();
            });
    })

    it("GET /api/v1/subcategory/product", function (done) {
        agent
            .get("/api/v1/subcategory/product/6cb1ab80-929f-425b-a634-033aa5912b04")
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Product fetched successfully.");
                done();
            });
    })

    it("GET /api/v1/subcategory/product/search", function (done) {
        agent
            .get("/api/v1/subcategory/product/search")
            .send({"product_name": "guc"})
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Product fetched successfully.");
                done();
            });
    })

    it("PUT /api/v1/subcategory/product", function (done) {
        agent
            .put(`/api/v1/subcategory/product/${id}`)
            .set("token", adminToken)
            .set("token", adminToken)
            .field("product_name", "gucci-belt")
            .field("description", "black leather")
            .field("quantity", 51)
            .field("price", 5000)
            .attach('product_image', "public/a.jpg")
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Product updated successfully");
                done();
            });
    })

    it("DELETE /api/v1/subcategory/product", function (done) {
        agent
            .delete(`/api/v1/subcategory/product/${id}`)
            .set("Content-Type", "application/json")
            .set("token", adminToken)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Product deleted successfully");
                done();
            });
    })
})
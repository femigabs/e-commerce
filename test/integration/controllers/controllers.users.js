import request from "supertest";
import { expect } from "chai";
import { app } from '../../../src/config';

const agent = request(app);

describe("User endpoints", () => {
    const user = {
        email: "femi.gabs@icloud.com",
        password: "Aaaaaa7",
        first_name: "femi",
        last_name: "babayemi",
        phone_number: "08139151116"
    }

    let verificationCode;
    let userId;
    let newCode;

    it("POST /api/v1/auth/register", function (done) {
        agent
            .post("/api/v1/auth/register")
            .send(user)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                //expect(res.body.status).to.equal(201);
                //expect(res.body.message).to.equal("User created successfully.");
                verificationCode = res.body.data.verification_code;
                userId = res.body.data.id;
                done();
            });
    })

    it("POST /api/v1/auth/register", function (done) {
        agent
            .post("/api/v1/auth/register/sghg")
            .send({
                email: "femi.gabs@icloud.com",
                password: "Aaaaaa7",
                first_name: "femi"
            })
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.message).to.equal("Route not found!");
                done();
            });
    })

    it("POST CONFLICT /api/v1/auth/register", function (done) {
        agent
            .post("/api/v1/auth/register")
            .send(user)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.message).to.equal("User already exist");
                done();
            });
    })

    it("POST /api/v1/auth/confirmation", function (done) {
        agent
            .post(`/api/v1/auth/confirmation?id=${userId}`)
            .send({ verification_code: verificationCode })
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Verification successful");
                done();
            });
    })

    it("PUT /api/v1/auth/confirmation", function (done) {
        agent
            .put(`/api/v1/auth/confirmation?id=${userId}`)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Verification code update successfully");
                done();
            });
    })

    it("POST /api/v1/auth/forgot-password", function (done) {
        agent
            .post("/api/v1/auth/forgot-password")
            .send({ email: user.email })
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Reset link sent successfully.");
                newCode = res.body.data[0].verification_code;
                done();
            });
    })

    it("PUT /api/v1/auth/reset-password", function (done) {
        agent
            .put(`/api/v1/auth/reset-password?id=${userId}`)
            .send({
                verification_code: newCode,
                password: "Ademiju7"
            })
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Password reset successful");
                done();
            });
    })

    it("POST /api/v1/auth/login", function (done) {
        agent
            .post("/api/v1/auth/login")
            .send({
                email: user.email,
                password: "Ademiju7"
            })
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("User login successfully.");
                done();
            });
    })


})
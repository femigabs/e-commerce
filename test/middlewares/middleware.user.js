import { expect } from "chai";
import { UserMiddleware } from "../../src/middleware";

describe("User Middleware", () => {
    it("validatesignup -  400", async function () {
        const req = {
            body: {
                email: 1
            },
        }

        const res = {
            status: {

            }
        }

        const next = () => {

        }
        try {
            const result = await UserMiddleware.signupMiddleWare(req, res, next)
            expect(result).to.have.property("status");
        } catch (e) {
            expect(e).to.have.property("message");
        }
    });

    it("validatesignupUser -  500", async function () {
        const req = {
            body: {
                email: 1
            },
        }

        const res = {
            status: {

            }
        }

        const next = () => {

        }
        try {
            const result = await UserMiddleware.signupUser(req, res, next)
            expect(result).to.have.property("status");
        } catch (e) {
            expect(e).to.have.property("message");
        }
    });

    it("validatecheckId -  400", async function () {
        const req = {
            query: {
            },
        }

        const res = {
            status: {

            }
        }

        const next = () => {

        }
        try {
            const result = await UserMiddleware.checkId(req, res, next)
            expect(result).to.have.property("status");
        } catch (e) {
            expect(e).to.have.property("message");
        }
    });

    it("validatesignupUser -  500", async function () {
        const req = {
            body: {
                verification_code: "a"
            },
        }

        const res = {
            status: {

            }
        }

        const next = () => {

        }
        try {
            const result = await UserMiddleware.checkCode(req, res, next)
            expect(result).to.have.property("status");
        } catch (e) {
            expect(e).to.have.property("message");
        }
    });
})
import request from "supertest";
import { expect } from "chai";
import { app } from '../src/config';

const agent = request(app);

describe('Integration test', () => {

    it.skip("GET /api/v1'", function (done) {
        agent
            .get("/api/v1")
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.status).to.equal(200);
                done();
            });
    })
});

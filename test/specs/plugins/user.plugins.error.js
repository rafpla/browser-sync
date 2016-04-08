"use strict";

var browserSync = require("../../../");
var utils       = require("../../../lib/utils");
var path        = require("path");
var pkg         = require(path.resolve("package.json"));
var cli         = require(path.resolve(pkg.bin));
var assert      = require("chai").assert;

describe("Plugins: Exit when plugin not found", function () {
    it("returns an error if a plugin cannot be located", function (done) {
        var stub = require("sinon").stub(utils, "fail");
        browserSync.reset();

        cli({
            cli: {
                input: ["start"],
                flags: {
                    logLevel: "silent",
                    plugins: ["bs-oops-typos"],
                    open: false
                }
            },
            cb: function (err, bs) {
                var err = stub.getCall(0).args[1];
                assert.equal(err.message, "Plugin: bs-oops-typos not found");
                utils.fail.restore();
                bs.cleanup();
                done();
            }
        });
    });
});

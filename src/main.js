#!/usr/bin/env node

const { runPipeline } = require("./core/pipeline");

const target = process.argv[2];

if (!target) {
    console.log("Usage: reconx <target>");
    process.exit(1);
}

runPipeline(target);

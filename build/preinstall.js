/**
 * Copyright (C) 2024 Gorciu
*/

let err = false;

if (parseInt(/^(\d+)\.(\d+)\.(\d+)/.exec(process.versions.node)[1]) < 21) {
    console.log("Error detected: unsupported version of Node.JS. Use latest version of Node.JS from https://nodejs.org/ website. (error code: 0x0001)");
    err = true;
}

if (err) {
    console.log("");
    console.error("INSTALLATION STOPPED: A problem / problems has been detected and the required packages has been prevented from installing.");
    process.exit(1);
} else {
    console.log("INSTALLATION STARTED: Any fatal errors has been detected");
    process.exit(0);
}
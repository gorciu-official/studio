/**
 * ==================================================================
 *                        Gorciu Studio
 *                       (C) 2024 Gorciu
 * ==================================================================
**/

let err = false;

if (parseInt(/^(\d+)\.(\d+)\.(\d+)/.exec(process.versions.node)[1]) < 21) {
    err = true;
}

if (err) {
    console.error("Don't play with the code! Remove errors, it isn't very hard!");
    process.exit(1);
}
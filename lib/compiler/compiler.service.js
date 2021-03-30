"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const map_service_1 = require("./map.service");
function compile(source) {
    return new Promise((resolve, reject) => {
        try {
            Object.entries(map_service_1.dataMap)
                .map(map => source = source.replace(new RegExp(map[1], 'g'), map[0]));
            resolve(source);
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.compile = compile;

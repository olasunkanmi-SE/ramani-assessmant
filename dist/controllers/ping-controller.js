"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingController = void 0;
const index_1 = require("./../constants/index");
class PingController {
    static ping(req, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let error;
                const { statusCode } = response;
                const apiResponse = { success: true };
                let res;
                if (statusCode !== 200) {
                    error = new Error(index_1.applicationError.unsuccessfulRequest(statusCode));
                    return error;
                }
                else {
                    res = response.status(200).json(apiResponse);
                }
                return res;
            }
            catch (error) { }
        });
    }
}
exports.PingController = PingController;
//# sourceMappingURL=ping-controller.js.map
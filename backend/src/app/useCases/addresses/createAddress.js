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
exports.createAddress = void 0;
const Address_1 = require("../../models/Address");
function createAddress(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { zipCode, city, state, neighborhood, streets, numberHouse, userId } = req.body;
            if (!zipCode) {
                return res.status(400).json({
                    error: 'zipCode is required',
                });
            }
            if (!city) {
                return res.status(400).json({
                    error: 'City is required',
                });
            }
            if (!state) {
                return res.status(400).json({
                    error: 'State is required',
                });
            }
            if (!neighborhood) {
                return res.status(400).json({
                    error: 'Neighborhood is required',
                });
            }
            if (!streets) {
                return res.status(400).json({
                    error: 'streets is required',
                });
            }
            if (!numberHouse) {
                return res.status(400).json({
                    error: 'numberHouse is required',
                });
            }
            if (!userId) {
                return res.status(400).json({
                    error: 'userId is required',
                });
            }
            const address = yield Address_1.Address.create({ zipCode, city, state, neighborhood, streets, numberHouse, userId });
            res.status(201).json(address);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.createAddress = createAddress;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleFeature = exports.DriverStatus = void 0;
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["OnOrder"] = "on-order";
    DriverStatus["Online"] = "online";
    DriverStatus["Offline"] = "offline";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
;
var VehicleFeature;
(function (VehicleFeature) {
    VehicleFeature["WiFi"] = "wi-fi";
    VehicleFeature["ChildSeat"] = "child-seat";
    VehicleFeature["PetFriendly"] = "pet-friendly";
})(VehicleFeature || (exports.VehicleFeature = VehicleFeature = {}));
;

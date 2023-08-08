"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.Order = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const product_model_1 = require("./product.model");
const user_model_1 = require("./user.model");
const payment_model_1 = require("./payment.model");
// interface PaymentInfo {
//   order: string
//   email: string
//   amount: number
//   reference: string
//   status: string
// }
let DeliveryAddress = class DeliveryAddress {
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "fullname", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "postalCode", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "country", void 0);
DeliveryAddress = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { timestamps: true } })
], DeliveryAddress);
class Item {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Item.prototype, "quantity", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: product_model_1.Product }),
    __metadata("design:type", Object)
], Item.prototype, "product", void 0);
let Order = exports.Order = class Order {
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], Order.prototype, "orderItems", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", DeliveryAddress)
], Order.prototype, "deliveryAddress", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: user_model_1.User, required: true }),
    __metadata("design:type", Object)
], Order.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: payment_model_1.Payment }),
    __metadata("design:type", Object)
], Order.prototype, "paymentInfo", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "itemPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "deliveryPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "isPaid", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Order.prototype, "paidAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "isDelivered", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Order.prototype, "deliveredAt", void 0);
exports.Order = Order = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { timestamps: true } })
], Order);
exports.OrderModel = (0, typegoose_1.getModelForClass)(Order);

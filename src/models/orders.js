const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  diaChi: {
    type: String,
    required: true,
  },
  tienHang: {
    type: Number,
    required: true,
  },
  tenKhachHang: {
    type: String,
    required: true,
  },
  soLuong: {
    type: Number,
    default: 1,
  },
  tongTienHang: {
    type: Number,
    required: true,
  },
  soDienThoai: {
    type: String,
    required: true,
  },
  phuongThucThanhToan: {
    type: String,
    enum: ["COD", "Sandbox"],
    default: "COD",
  },
  thoiGianDatHang: {
    type: Date,
    default: Date.now,
  },
  thoiGianNhanHang: {
    type: Date,
  },
  thoiGianHuy: {
    type: Date,
  },
  thoiGianDangGiao: {
    type: Date,
  },
  trangThai: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("orders", orderSchema);
module.exports = OrderModel;

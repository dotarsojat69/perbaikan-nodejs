'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Products", [
    {
      name: "Adidas Yeezy Boost 350V1 Pirate Black 2023",
      price: 7500000,
      desc: "New Arrival, Adidas Yeezy Boost 350V1 Pirate Black 2023, Size 3.5-14US, START from 5890K",
      stock: 10,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Sandal YEEZY SLIDE model Adidas Slide w/Logo - BEIGE, 36-37",
      price: 225000,
      desc: "Sandal Karet Pria Yeezy Slide Mirip dengan Sandal ADIDAS Yezzy Slide",
      stock: 10,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Mini PC Gaming GEEKOM Mini Fun 11 i9-11900kb 32GB/1TBssd Win11 Pro",
      price: 11990000,
      desc: "Mini PC Geekom 11th Gen Intel® Core™ i9-11900KB",
      stock: 10,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "MINI PC GAMING AMD RYZEN 5 5600G WIFI 6E WINDOWS 11 PRO - 8GB, 256GB",
      price: 5559000,
      desc: "VARIAN MEMORY 8GB/16GB/32GB DDR4 PC 3200 MHZ",
      stock: 10,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Sempak Pria Dewasa Model Kekinian Celana Dalam Cowok Boxer Sport CD",
      price: 49500,
      desc: "terbuat dari material Ion Negatif dapat memperlancar peredaran darah dan mampu membunuh bakteri",
      stock: 10,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  }
};

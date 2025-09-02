import mongoose from 'mongoose'
import { Category } from '../models/categories.js';
import { Inventory } from '../models/inventory.js';

export const seed=async()=>{
      const categories =await Category.insertMany([
            { name: "Groceries" },
            { name: "Vegetables" },
            { name: "Dairy" },
            { name: "Snacks" },
            { name: "Beverages" }
        ]);
        console.log("✅ Categories Seeded!");

        // ===== 4. INVENTORY =====
        const inventory = await Inventory.insertMany([
            { itemName: "Rice", cost: 70, category: categories[0]._id },
    { itemName: "Wheat Flour", cost: 50, category: categories[0]._id },
    { itemName: "Sugar", cost: 40, category: categories[0]._id },
    { itemName: "Salt", cost: 20, category: categories[0]._id },
    { itemName: "Toor Dal", cost: 120, category: categories[0]._id },
    { itemName: "Moong Dal", cost: 140, category: categories[0]._id },
    { itemName: "Masoor Dal", cost: 130, category: categories[0]._id },
    { itemName: "Chana Dal", cost: 110, category: categories[0]._id },
    { itemName: "Maida", cost: 60, category: categories[0]._id },
    { itemName: "Rava", cost: 55, category: categories[0]._id },
    { itemName: "Besan", cost: 75, category: categories[0]._id },
    { itemName: "Poha", cost: 45, category: categories[0]._id },
    { itemName: "Sabudana", cost: 90, category: categories[0]._id },
    { itemName: "Soya Chunks", cost: 85, category: categories[0]._id },
    { itemName: "Peanuts", cost: 95, category: categories[0]._id },
    { itemName: "Jaggery", cost: 80, category: categories[0]._id },
    { itemName: "Tea Powder", cost: 150, category: categories[0]._id },
    { itemName: "Coffee Powder", cost: 220, category: categories[0]._id },
    { itemName: "Pickle", cost: 120, category: categories[0]._id },
    { itemName: "Papad", cost: 60, category: categories[0]._id },

    // ----------------- VEGETABLES (20 ITEMS) -----------------
    { itemName: "Potatoes", cost: 30, category: categories[1]._id },
    { itemName: "Onions", cost: 40, category: categories[1]._id },
    { itemName: "Tomatoes", cost: 35, category: categories[1]._id },
    { itemName: "Carrots", cost: 60, category: categories[1]._id },
    { itemName: "Beetroot", cost: 50, category: categories[1]._id },
    { itemName: "Spinach", cost: 30, category: categories[1]._id },
    { itemName: "Cabbage", cost: 40, category: categories[1]._id },
    { itemName: "Cauliflower", cost: 55, category: categories[1]._id },
    { itemName: "Capsicum", cost: 70, category: categories[1]._id },
    { itemName: "Cucumber", cost: 25, category: categories[1]._id },
    { itemName: "Ginger", cost: 120, category: categories[1]._id },
    { itemName: "Garlic", cost: 140, category: categories[1]._id },
    { itemName: "Green Chilies", cost: 80, category: categories[1]._id },
    { itemName: "Beans", cost: 75, category: categories[1]._id },
    { itemName: "Brinjal", cost: 45, category: categories[1]._id },
    { itemName: "Bitter Gourd", cost: 65, category: categories[1]._id },
    { itemName: "Drumsticks", cost: 90, category: categories[1]._id },
    { itemName: "Ladies Finger", cost: 50, category: categories[1]._id },
    { itemName: "Radish", cost: 40, category: categories[1]._id },
    { itemName: "Coriander Leaves", cost: 30, category: categories[1]._id },

    // ----------------- DAIRY (20 ITEMS) -----------------
    { itemName: "Milk", cost: 40, category: categories[2]._id },
    { itemName: "Cheese", cost: 120, category: categories[2]._id },
    { itemName: "Butter", cost: 110, category: categories[2]._id },
    { itemName: "Ghee", cost: 450, category: categories[2]._id },
    { itemName: "Curd", cost: 60, category: categories[2]._id },
    { itemName: "Paneer", cost: 150, category: categories[2]._id },
    { itemName: "Flavored Milk", cost: 70, category: categories[2]._id },
    { itemName: "Cream", cost: 200, category: categories[2]._id },
    { itemName: "Lassi", cost: 50, category: categories[2]._id },
    { itemName: "Kefir", cost: 180, category: categories[2]._id },
    { itemName: "Skimmed Milk", cost: 55, category: categories[2]._id },
    { itemName: "Full Cream Milk", cost: 65, category: categories[2]._id },
    { itemName: "Condensed Milk", cost: 160, category: categories[2]._id },
    { itemName: "Milk Powder", cost: 210, category: categories[2]._id },
    { itemName: "Khoa", cost: 250, category: categories[2]._id },
    { itemName: "Probiotic Yogurt", cost: 120, category: categories[2]._id },
    { itemName: "Buttermilk", cost: 30, category: categories[2]._id },
    { itemName: "Chocolate Milk", cost: 80, category: categories[2]._id },
    { itemName: "Evaporated Milk", cost: 170, category: categories[2]._id },
    { itemName: "Whipped Cream", cost: 220, category: categories[2]._id },

    // ----------------- SNACKS (20 ITEMS) -----------------
    { itemName: "Chips", cost: 25, category: categories[3]._id },
    { itemName: "Popcorn", cost: 50, category: categories[3]._id },
    { itemName: "Biscuits", cost: 40, category: categories[3]._id },
    { itemName: "Cookies", cost: 80, category: categories[3]._id },
    { itemName: "Chocolates", cost: 120, category: categories[3]._id },
    { itemName: "Namkeen", cost: 70, category: categories[3]._id },
    { itemName: "Mixture", cost: 65, category: categories[3]._id },
    { itemName: "Makhana", cost: 150, category: categories[3]._id },
    { itemName: "Banana Chips", cost: 90, category: categories[3]._id },
    { itemName: "Peanut Chikki", cost: 60, category: categories[3]._id },
    { itemName: "Farsan", cost: 80, category: categories[3]._id },
    { itemName: "Energy Bars", cost: 140, category: categories[3]._id },
    { itemName: "Nachos", cost: 100, category: categories[3]._id },
    { itemName: "Trail Mix", cost: 180, category: categories[3]._id },
    { itemName: "Cornflakes Chivda", cost: 110, category: categories[3]._id },
    { itemName: "Ragi Chips", cost: 130, category: categories[3]._id },
    { itemName: "Sesame Sticks", cost: 95, category: categories[3]._id },
    { itemName: "Cheese Balls", cost: 75, category: categories[3]._id },
    { itemName: "Puffed Rice", cost: 40, category: categories[3]._id },
    { itemName: "Khakhra", cost: 55, category: categories[3]._id },

    // ----------------- BEVERAGES (20 ITEMS) -----------------
    { itemName: "Cola", cost: 50, category: categories[4]._id },
    { itemName: "Lemonade", cost: 40, category: categories[4]._id },
    { itemName: "Orange Juice", cost: 70, category: categories[4]._id },
    { itemName: "Apple Juice", cost: 80, category: categories[4]._id },
    { itemName: "Mango Juice", cost: 75, category: categories[4]._id },
    { itemName: "Grape Juice", cost: 85, category: categories[4]._id },
    { itemName: "Pineapple Juice", cost: 90, category: categories[4]._id },
    { itemName: "Tender Coconut Water", cost: 60, category: categories[4]._id },
    { itemName: "Iced Tea", cost: 100, category: categories[4]._id },
    { itemName: "Green Tea", cost: 150, category: categories[4]._id },
    { itemName: "Black Tea", cost: 120, category: categories[4]._id },
    { itemName: "Cold Coffee", cost: 130, category: categories[4]._id },
    { itemName: "Hot Chocolate", cost: 160, category: categories[4]._id },
    { itemName: "Protein Shake", cost: 200, category: categories[4]._id },
    { itemName: "Energy Drink", cost: 180, category: categories[4]._id },
    { itemName: "Sparkling Water", cost: 110, category: categories[4]._id },
    { itemName: "Buttermilk Drink", cost: 55, category: categories[4]._id },
    { itemName: "Smoothie", cost: 140, category: categories[4]._id },
    { itemName: "Mocktail", cost: 170, category: categories[4]._id },
    { itemName: "Tonic Water", cost: 120, category: categories[4]._id }
]);
        console.log("✅ Inventory Seeded!");

}
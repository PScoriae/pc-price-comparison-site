import mongoose from "mongoose"

export async function dbConnect() {
  try {
    console.log('connecting to db')
    mongoose.connect('mongodb://localhost:27017/pc-comparison', {maxPoolSize: 10}).then(() => {
      console.log('connected to db')
    });
    
  } catch (e) {
    console.error(e)
  }
}
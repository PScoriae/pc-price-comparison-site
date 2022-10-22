import mongoose from "mongoose"

const LearningArticleSchema = new mongoose.Schema({
  name: String,
  shortDesc: String,
  desc: String,
  imgUrl: String
})

export const LearningArticleModel = mongoose.model("LearningArticle", LearningArticleSchema)
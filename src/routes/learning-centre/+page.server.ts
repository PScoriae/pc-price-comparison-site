import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { LearningArticleModel } from '$lib/models/LearningArticle'
 
export const load: PageServerLoad = async ({ params }) => {
  const data = await LearningArticleModel.find().lean()
  if (data) return {
    learningArticle: JSON.parse(JSON.stringify(data))
  }

  throw error(500, 'server issue')
}
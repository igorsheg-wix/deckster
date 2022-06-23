import { marked } from 'marked'
import { Temaplte } from 'types'
import { indices } from './calcs'
import dt from './decision-tree.js'

const trainingData = [
  { headings: 1, paragraphs: 0, images: 0, template: Temaplte.cover },
  { headings: 1, paragraphs: 1, images: 0, template: Temaplte.titleWithP },
]

var config = {
  trainingSet: trainingData,
  categoryAttr: 'template',
}

const decisionTree = new dt.DecisionTree(config)

export const templateEngine = (tokens: marked.Token[]): Temaplte => {
  const tokensToPredict = {
    headings: indices(
      tokens.map((t) => t.type),
      'heading'
    ).length,
    paragraphs: indices(
      tokens.map((t) => t.type),
      'paragraph'
    ).length,
    images: indices(
      tokens.map((t) => t.type),
      'image'
    ).length,
  }
  return decisionTree.predict(tokensToPredict)
  // var answer = "";
  // switch (tokens.findIndex(t => t.type === "paragraph") >= 0) {
  // case true:
  //     answer = "titleWithP";
  //     break;
  // default:
  //     answer = "cover";
  // }
  // return answer;
}

import { Value } from '@udecode/plate'
import { marked } from 'marked'
import { Temaplte } from 'types'
import { indices } from './calcs'
import dt from './decision-tree.js'

const trainingData = [
  { h1: 1, p: 0, img: 0, template: Temaplte.cover },
  { h1: 1, p: 1, img: 0, template: Temaplte.titleWithP },
]

var config = {
  trainingSet: trainingData,
  categoryAttr: 'template',
}

const decisionTree = new dt.DecisionTree(config)

export const templateEngine = (tokens: Value): Temaplte => {
  const tokensToPredict = {
    h1: indices(
      tokens.map((t) => t.type),
      'h1'
    ).length,
    p: indices(
      tokens.map((t) => t.type),
      'p'
    ).length,
    img: indices(
      tokens.map((t) => t.type),
      'img'
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

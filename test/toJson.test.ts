import { test, expect, describe } from 'vitest'
import { htmlToJSON } from '../src/utils'

import data from './data.json'

describe('Convert single html element string to json', () => {
  test('Has array of html element content in object a single element no attributes', () => {
    const result = htmlToJSON(data.title.html)
    console.log(result)
    expect(result).toStrictEqual(data.title.json)
  })
})

describe('Convert single html element string to json and attributs struct of element', () => {
  test('Has array of html element and struct attributes', () => {
    const result = htmlToJSON(data.titleAttributes.html)
    expect(result).toStrictEqual(data.titleAttributes.json)
  })
})

describe('Convert two elements top of tree of DOM elements', () => {
  test('Has two elements in main array base', () => {
    const result = htmlToJSON(data.twoChildToptree.html)
    expect(result).toStrictEqual(data.twoChildToptree.json)
  })
})

describe('Convert two element top tree and child elements', () => {
  test('Has two parent elements in main array and child elements of top elements', () => {
    const result = htmlToJSON(data.twoChildToptreeAndElementsChild.html)
    expect(result).toStrictEqual(data.twoChildToptreeAndElementsChild.json)
  })
})

import { test, expect, describe } from 'vitest'
import { jsonToHTML } from '../src/utils'

import data from './data.json'

describe('Convert array a single elements to html string', () => {
  test('Has a string title only, no attributes', () => {
    const result = jsonToHTML(data.title.json)
    expect(result).toStrictEqual(data.title.html)
  })
})

describe('Convert array a single elements to html and add attributes', () => {
  test('Has a string title only and attributes', () => {
    const result = jsonToHTML(data.titleAttributes.json)
    expect(result).toStrictEqual(data.titleAttributes.html)
  })
})

describe('Convert array multiple elements to tree html string', () => {
  test('Has a two elements of main array converted of elements html string', () => {
    const result = jsonToHTML(data.twoChildToptree.json)
    expect(result).toStrictEqual(data.twoChildToptree.html)
  })
})

describe('Convert array multiple elements top tree and sub elements to tree html string', () => {
  test('Has a two elements of main array converted and child elements to html string', () => {
    const result = jsonToHTML(data.twoChildToptreeAndElementsChild.json)
    expect(result).toStrictEqual(data.twoChildToptreeAndElementsChild.html)
  })
})


import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import {
  byCategory,
  search,
  total,
  top,
  categories,
  withDiscount
} from './src/catalog.js'

const items = JSON.parse(
  await readFile('./public/items.json', 'utf8')
)

assert.ok(Array.isArray(items))

assert.deepEqual(
  byCategory(items, items[0].category).every(
    item => item.category === items[0].category
  ),
  true
)

assert.ok(Array.isArray(search(items, 'clean')))
assert.equal(total(items), items.reduce((sum, item) => sum + item.price, 0))
assert.ok(Array.isArray(top(items, 1)))
assert.ok(Array.isArray(categories(items)))
assert.equal(withDiscount(items, 30).length, items.length)
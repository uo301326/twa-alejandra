import assert from 'node:assert/strict';
import { items } from './data.js';
import { byCategory, search, total, top, categories, withDiscount } from './catalog.js';

assert.equal(byCategory(items, 'book').length, 2);
assert.equal(search(items, 'clean').length, 1);
assert.equal(total(items), 237.5);
assert.equal(top(items, 1)[0].name, "Boombastic");
assert.equal(categories(items).length, 4);
assert.equal(withDiscount(items, 30)[0].price, items[0].price*0.7);
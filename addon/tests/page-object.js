import Ember from 'ember';
import indexOf from 'lodash/array/findIndex'


export default class AsyncTreePageObject {
  constructor(env) {
    this.env = env;
  }

  component() {
    return this.env.$('.async-tree');
  }

  itemText(index) {
    let items = sortItemsByPosition(this.env, true);
    return Ember.$(items[index]).text().trim();
  }

  itemsText(selector) {
    let results = this.find(selector).toArray();
    return results.map(function(item){
      return Ember.$(item).text().trim();
    });
  }

  itemContains(text) {
    let items = sortItemsByPosition(this.env, true);
    return items.find(`.node-list-item:contains('${text}')`);
  }

  find(selector) {
    return sortItemsByPosition(this.env, true, selector);
  }

  findIndex(selector, predicate) {
    let results = this.find(selector).toArray();
    return indexOf(results, predicate);
  }
}

function findItems(context, selector) {
  return context.$(`.ember-collection > div:first > div:first > div ${selector}`);  // scrollable's content's children (cells)
}

function findVisibleItems(context, selector) {
  return context.$(`.ember-collection > div:first > div:first > div:visible ${selector}`);
}

function extractPosition(element) {
  return element.getBoundingClientRect();
}

function sortItemsByPosition(view, visibleOnly, selector) {
  var find = visibleOnly ? findVisibleItems : findItems;
  var items = find(view, selector);
  return sortElementsByPosition(items);
}

function sortElementsByPosition (elements) {
  return elements.sort(function(a, b){
    return sortByPosition(extractPosition(a), extractPosition(b));
  });
}

function sortByPosition(a, b) {
  if (b.top === a.top){
    return (a.left - b.left);
  }
  return (a.top - b.top);
}
import Ember from 'ember';
import DynamicHeightGrid from 'ember-async-tree/layouts/dynamic-height';

export default Ember.Helper.helper(function (params, hash) {
  return new DynamicHeightGrid(params[0], hash);
});

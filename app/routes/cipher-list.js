import Ember from 'ember';
var ciphers = [
  {
    name: 'Caesar Shift'
  },
  {
    name: 'Monoalphabetic Substitution with Keyword'
  }
  ];
export default Ember.Route.extend({
  model() {
    return ciphers;
  }
});

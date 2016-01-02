import Ember from 'ember';

export default Ember.Controller.extend({
    keyword: 'zebras',
    mode: 'encrypt',
    prettyMode: Ember.computed('mode', function(){
      var prettyMode = this.get('mode').toProperCase() + 'ing';
      return prettyMode;
    }),
    alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    messageText: 'flee at once. we are discovered!',
    resultText: Ember.computed('mode', 'keyword','messageText', function(){
      if(this.get('mode') == 'decrypt'){
        return this.decrypt();
      } else {
        return this.encrypt();
      }
    }),
    encrypt : function(){
      //Keyword Prep: Strip non alphanumeric characters, split it into an array, and remove any repeating characters.
      let keyword = this.get('keyword').replace(/\W/g, '').split('').filter(function(value, index, self) {
          return self.indexOf(value) === index;
          }),
          plainText = this.get('messageText').split(''),
          alphabet = this.get('alphabet');

      //Set the cipherALphabet = to the keyword. Then go through the alphabet, letter by letter, adding whatever letters
      //aren't in the keyword.
      var cipherAlphabet = keyword;
        alphabet.forEach(function(letter){
          if(cipherAlphabet.indexOf(letter) === -1){
            cipherAlphabet.push(letter);
          }
        });


      //Go through each letter of the plaintext message. For each letter, get the corresponding letter in the cipherAlphabet.
      //If in the cipher Alphabet, the 1st letter is z, all a's will become z. If it isn't a letter, just add it to the end.
        var cipherText = [];
        plainText.forEach(function(letter){
          if(alphabet.indexOf(letter) > -1){
            cipherText.push(cipherAlphabet[alphabet.indexOf(letter)]);
          } else {
            cipherText.push(letter);
          }

        });

        //take the array of letters and combine it into a string.
        return cipherText.join('');
    },
    decrypt : function(){
      let keyword = this.get('keyword').replace(/\W/g, '').split('').filter(function(value, index, self) {
          return self.indexOf(value) === index;
        }),
        cipherText = this.get('messageText').split(''),
        alphabet = this.get('alphabet');


      var cipherAlphabet = keyword;
      alphabet.forEach(function(letter){
        if(cipherAlphabet.indexOf(letter) === -1){
          cipherAlphabet.push(letter);
        }
      });

      var plainText = [];
      cipherText.forEach(function(letter){
        if(cipherAlphabet.indexOf(letter) > -1){
          plainText.push(alphabet[cipherAlphabet.indexOf(letter)]);
        } else {
          plainText.push(letter);
        }

      });

      return plainText.join('');
    },
  actions: {
    toggleMode(){
      if(this.get('mode') == 'encrypt'){
        return this.set('mode','decrypt');
      } else {
        return this.set('mode','encrypt');
      }
    }
  }

});

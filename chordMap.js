;(function() {
  var basicChords = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']
  var variations = ['', 'm', 'M', 'm7', 2, 4, 5, 6, 7, 9, 'sus', 'add2', 'sus4', 'add9'];
  var chordMap = {};
  
  variations.forEach(function(variation){
    basicChords.forEach(function(chord, index){
      var prev = index === 0 ? basicChords.length - 1 : index - 1;
      var next = basicChords.length === (index + 1) ? 0 : index + 1;
      chordMap[chord + variation] = {
        chord: chord + variation,
        prev: basicChords[prev] + variation,
        next: basicChords[next] + variation
      }
    });   
  });
  
  function isValidNote(note){
    return chordMap[note];
  }
  
  function goUp(key) {
    if (chordMap[key]) {
      return chordMap[key].next;
    }
    return key;
  }
  
  function goDown(key) {
    if (chordMap[key]) {
      return chordMap[key].prev;
    }
    return key;
  }

  function goFlat(key) {
    if (key && key.length > 1 && key[1] === '#'){
      var prefix = goUp(key[0]);
      if (prefix && isValidNote(prefix)) {
        return prefix + key.substr(2);
      }
    }
    return key;
  }
  
  function flatHelper(note){
    return {
      'Fb': 'E',
      'Cb': 'B'
    }[note];
  }
  
  function goSharp(note) {
    if (note && note.length > 1 && note[1] === 'b'){
      var prefix = goDown(note.substr(0, 2));
      if (prefix && isValidNote(prefix)) {
        return prefix + '#' + note.substr(2);
      }
      prefix = flatHelper(note.substr(0, 2));
      if (prefix){
        return prefix + note.substr(2);
      }
    }
    return note;
  }
  
})();

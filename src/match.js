const isGlob = require('is-glob');
const micromatch = require('micromatch');

module.exports = function(context, path) {
  // single path
  if (!isGlob(context)) {
    return path.indexOf(context) === 0;;
  } else {
    // single glob path
    const matches = micromatch([path], context);
    return matches && matches.length > 0;
  }
}

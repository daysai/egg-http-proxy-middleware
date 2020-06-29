import * as micromatch from 'micromatch';
import * as isGlob from 'is-glob';

export function match(context: string, path: string): boolean {
  // single path
  if (!isGlob(context)) {
    return path.indexOf(context) === 0;
  } else {
    // single glob path
    const matches = micromatch([path], context);
    return matches && matches.length > 0;
  }
}

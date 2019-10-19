/*
The MIT License (MIT)

Copyright (c) 2017-present, Jon Schlinkert.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

'use strict';

window.picomatch = (function() {

/* constants.js */

var path = {sep:'/'};
function _merge(to, from) {
    var tn = Object.getOwnPropertyNames(to);
    var fn = from ? Object.getOwnPropertyNames(from) : [];
    
    fn.forEach(function(n) {
        if(tn.indexOf(n) == -1) {
            to[n] = from[n];
        }
    });
}

var constants = (function() {
    
var WIN_SLASH = '\\\\/';
var WIN_NO_SLASH = "[^".concat(WIN_SLASH, "]");
/**
 * Posix glob regex
 */

var DOT_LITERAL = '\\.';
var PLUS_LITERAL = '\\+';
var QMARK_LITERAL = '\\?';
var SLASH_LITERAL = '\\/';
var ONE_CHAR = '(?=.)';
var QMARK = '[^/]';
var END_ANCHOR = "(?:".concat(SLASH_LITERAL, "|$)");
var START_ANCHOR = "(?:^|".concat(SLASH_LITERAL, ")");
var DOTS_SLASH = "".concat(DOT_LITERAL, "{1,2}").concat(END_ANCHOR);
var NO_DOT = "(?!".concat(DOT_LITERAL, ")");
var NO_DOTS = "(?!".concat(START_ANCHOR).concat(DOTS_SLASH, ")");
var NO_DOT_SLASH = "(?!".concat(DOT_LITERAL, "{0,1}").concat(END_ANCHOR, ")");
var NO_DOTS_SLASH = "(?!".concat(DOTS_SLASH, ")");
var QMARK_NO_DOT = "[^.".concat(SLASH_LITERAL, "]");
var STAR = "".concat(QMARK, "*?");
var POSIX_CHARS = {
  DOT_LITERAL: DOT_LITERAL,
  PLUS_LITERAL: PLUS_LITERAL,
  QMARK_LITERAL: QMARK_LITERAL,
  SLASH_LITERAL: SLASH_LITERAL,
  ONE_CHAR: ONE_CHAR,
  QMARK: QMARK,
  END_ANCHOR: END_ANCHOR,
  DOTS_SLASH: DOTS_SLASH,
  NO_DOT: NO_DOT,
  NO_DOTS: NO_DOTS,
  NO_DOT_SLASH: NO_DOT_SLASH,
  NO_DOTS_SLASH: NO_DOTS_SLASH,
  QMARK_NO_DOT: QMARK_NO_DOT,
  STAR: STAR,
  START_ANCHOR: START_ANCHOR
};
/**
 * Windows glob regex
 */

var WINDOWS_CHARS = { 
  DOT_LITERAL: DOT_LITERAL,
  PLUS_LITERAL: PLUS_LITERAL,
  QMARK_LITERAL: QMARK_LITERAL,
  ONE_CHAR: ONE_CHAR,
  SLASH_LITERAL: "[".concat(WIN_SLASH, "]"),
  QMARK: WIN_NO_SLASH,
  STAR: "".concat(WIN_NO_SLASH, "*?"),
  DOTS_SLASH: "".concat(DOT_LITERAL, "{1,2}(?:[").concat(WIN_SLASH, "]|$)"),
  NO_DOT: "(?!".concat(DOT_LITERAL, ")"),
  NO_DOTS: "(?!(?:^|[".concat(WIN_SLASH, "])").concat(DOT_LITERAL, "{1,2}(?:[").concat(WIN_SLASH, "]|$))"),
  NO_DOT_SLASH: "(?!".concat(DOT_LITERAL, "{0,1}(?:[").concat(WIN_SLASH, "]|$))"),
  NO_DOTS_SLASH: "(?!".concat(DOT_LITERAL, "{1,2}(?:[").concat(WIN_SLASH, "]|$))"),
  QMARK_NO_DOT: "[^.".concat(WIN_SLASH, "]"),
  START_ANCHOR: "(?:^|[".concat(WIN_SLASH, "])"),
  END_ANCHOR: "(?:[".concat(WIN_SLASH, "]|$)")
};
/**
 * POSIX Bracket Regex
 */

var POSIX_REGEX_SOURCE = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  ascii: '\\x00-\\x7F',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E ',
  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word: 'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9'
};

var constants = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE,
  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHAR: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    '***': '*',
    '**/**': '**',
    '**/**/**': '**'
  },
  // Digits
  CHAR_0: 48,

  /* 0 */
  CHAR_9: 57,

  /* 9 */
  // Alphabet chars.
  CHAR_UPPERCASE_A: 65,

  /* A */
  CHAR_LOWERCASE_A: 97,

  /* a */
  CHAR_UPPERCASE_Z: 90,

  /* Z */
  CHAR_LOWERCASE_Z: 122,

  /* z */
  CHAR_LEFT_PARENTHESES: 40,

  /* ( */
  CHAR_RIGHT_PARENTHESES: 41,

  /* ) */
  CHAR_ASTERISK: 42,

  /* * */
  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38,

  /* & */
  CHAR_AT: 64,

  /* @ */
  CHAR_BACKWARD_SLASH: 92,

  /* \ */
  CHAR_CARRIAGE_RETURN: 13,

  /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94,

  /* ^ */
  CHAR_COLON: 58,

  /* : */
  CHAR_COMMA: 44,

  /* , */
  CHAR_DOT: 46,

  /* . */
  CHAR_DOUBLE_QUOTE: 34,

  /* " */
  CHAR_EQUAL: 61,

  /* = */
  CHAR_EXCLAMATION_MARK: 33,

  /* ! */
  CHAR_FORM_FEED: 12,

  /* \f */
  CHAR_FORWARD_SLASH: 47,

  /* / */
  CHAR_GRAVE_ACCENT: 96,

  /* ` */
  CHAR_HASH: 35,

  /* # */
  CHAR_HYPHEN_MINUS: 45,

  /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60,

  /* < */
  CHAR_LEFT_CURLY_BRACE: 123,

  /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91,

  /* [ */
  CHAR_LINE_FEED: 10,

  /* \n */
  CHAR_NO_BREAK_SPACE: 160,

  /* \u00A0 */
  CHAR_PERCENT: 37,

  /* % */
  CHAR_PLUS: 43,

  /* + */
  CHAR_QUESTION_MARK: 63,

  /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62,

  /* > */
  CHAR_RIGHT_CURLY_BRACE: 125,

  /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93,

  /* ] */
  CHAR_SEMICOLON: 59,

  /* ; */
  CHAR_SINGLE_QUOTE: 39,

  /* ' */
  CHAR_SPACE: 32,

  /*   */
  CHAR_TAB: 9,

  /* \t */
  CHAR_UNDERSCORE: 95,

  /* _ */
  CHAR_VERTICAL_LINE: 124,

  /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,

  /* \uFEFF */
  SEP: path.sep,

  /**
   * Create EXTGLOB_CHARS
   */
  extglobChars: function extglobChars(chars) {
    return {
      '!': {
        type: 'negate',
        open: '(?:(?!(?:',
        close: "))".concat(chars.STAR, ")")
      },
      '?': {
        type: 'qmark',
        open: '(?:',
        close: ')?'
      },
      '+': {
        type: 'plus',
        open: '(?:',
        close: ')+'
      },
      '*': {
        type: 'star',
        open: '(?:',
        close: ')*'
      },
      '@': {
        type: 'at',
        open: '(?:',
        close: ')'
      }
    };
  },

  /**
   * Create GLOB_CHARS
   */
  globChars: function globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};

    return constants;
})();

/* utils.js */

var utils = (function() {
    
var win32 = false;

var _typeof = function(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); };

var utils = {
    
};

utils.isObject = function (val) {
  return val !== null && _typeof(val) === 'object' && !Array.isArray(val);
};

utils.hasRegexChars = function (str) {
  return constants.REGEX_SPECIAL_CHARS.test(str);
};

utils.isRegexChar = function (str) {
  return str.length === 1 && utils.hasRegexChars(str);
};

utils.escapeRegex = function (str) {
  return str.replace(constants.REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
};

utils.toPosixSlashes = function (str) {
  return str.replace(/\\/g, '/');
};

utils.isWindows = function (options) {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }

  return win32 === true || path.sep === '\\';
};

utils.escapeLast = function (input, char, lastIdx) {
  var idx = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return utils.escapeLast(input, char, idx - 1);
  return input.slice(0, idx) + '\\' + input.slice(idx);
};
return utils;
})();

/* scan.js */

var CHAR_ASTERISK = constants.CHAR_ASTERISK,
    CHAR_AT = constants.CHAR_AT,
    CHAR_BACKWARD_SLASH = constants.CHAR_BACKWARD_SLASH,
    CHAR_COMMA = constants.CHAR_COMMA,
    CHAR_DOT = constants.CHAR_DOT,
    CHAR_EXCLAMATION_MARK = constants.CHAR_EXCLAMATION_MARK,
    CHAR_FORWARD_SLASH = constants.CHAR_FORWARD_SLASH,
    CHAR_LEFT_CURLY_BRACE = constants.CHAR_LEFT_CURLY_BRACE,
    CHAR_LEFT_PARENTHESES = constants.CHAR_LEFT_PARENTHESES,
    CHAR_LEFT_SQUARE_BRACKET = constants.CHAR_LEFT_SQUARE_BRACKET,
    CHAR_PLUS = constants.CHAR_PLUS,
    CHAR_QUESTION_MARK = constants.CHAR_QUESTION_MARK,
    CHAR_RIGHT_CURLY_BRACE = constants.CHAR_RIGHT_CURLY_BRACE,
    CHAR_RIGHT_PARENTHESES = constants.CHAR_RIGHT_PARENTHESES,
    CHAR_RIGHT_SQUARE_BRACKET = constants.CHAR_RIGHT_SQUARE_BRACKET;

var isPathSeparator = function isPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};
/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), and `negated` (true if the path starts with `!`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */


var scan = function (input, options) {
  var opts = options || {};
  var length = input.length - 1;
  var index = -1;
  var start = 0;
  var lastIndex = 0;
  var isGlob = false;
  var backslashes = false;
  var negated = false;
  var braces = 0;
  var prev;
  var code;
  var braceEscaped = false;

  var eos = function eos() {
    return index >= length;
  };

  var advance = function advance() {
    prev = code;
    return input.charCodeAt(++index);
  };

  while (index < length) {
    code = advance();
    var next = void 0;

    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = true;
      next = advance();

      if (next === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }

      continue;
    }

    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces++;

      while (!eos() && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = true;
          next = advance();
          continue;
        }

        if (next === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          continue;
        }

        if (!braceEscaped && next === CHAR_DOT && (next = advance()) === CHAR_DOT) {
          isGlob = true;
          break;
        }

        if (!braceEscaped && next === CHAR_COMMA) {
          isGlob = true;
          break;
        }

        if (next === CHAR_RIGHT_CURLY_BRACE) {
          braces--;

          if (braces === 0) {
            braceEscaped = false;
            break;
          }
        }
      }
    }

    if (code === CHAR_FORWARD_SLASH) {
      if (prev === CHAR_DOT && index === start + 1) {
        start += 2;
        continue;
      }

      lastIndex = index + 1;
      continue;
    }

    if (code === CHAR_ASTERISK) {
      isGlob = true;
      break;
    }

    if (code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK) {
      isGlob = true;
      break;
    }

    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (!eos() && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = true;
          next = advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isGlob = true;
          break;
        }
      }
    }

    var isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_EXCLAMATION_MARK;

    if (isExtglobChar && input.charCodeAt(index + 1) === CHAR_LEFT_PARENTHESES) {
      isGlob = true;
      break;
    }

    if (code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = true;
      start++;
      continue;
    }

    if (code === CHAR_LEFT_PARENTHESES) {
      while (!eos() && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = true;
          next = advance();
          continue;
        }

        if (next === CHAR_RIGHT_PARENTHESES) {
          isGlob = true;
          break;
        }
      }
    }

    if (isGlob) {
      break;
    }
  }

  var prefix = '';
  var orig = input;
  var base = input;
  var glob = '';

  if (start > 0) {
    prefix = input.slice(0, start);
    input = input.slice(start);
    lastIndex -= start;
  }

  if (base && isGlob === true && lastIndex > 0) {
    base = input.slice(0, lastIndex);
    glob = input.slice(lastIndex);
  } else if (isGlob === true) {
    base = '';
    glob = input;
  } else {
    base = input;
  }

  if (base && base !== '' && base !== '/' && base !== input) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }

  if (opts.unescape === true) {
    if (glob) glob = removeBackslashes(glob);

    if (base && backslashes === true) {
      base = removeBackslashes(base);
    }
  }

  return {
    prefix: prefix,
    input: orig,
    base: base,
    glob: glob,
    negated: negated,
    isGlob: isGlob
  };
};

function removeBackslashes(str) {
  return str.replace(/(?:\[.*?[^\\]\]|\\(?=.))/g, function (match) {
    return match === '\\' ? '' : match;
  });
}

/* parse.js */

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Constants
 */


var MAX_LENGTH = constants.MAX_LENGTH,
    POSIX_REGEX_SOURCE = constants.POSIX_REGEX_SOURCE,
    REGEX_NON_SPECIAL_CHAR = constants.REGEX_NON_SPECIAL_CHAR,
    REGEX_SPECIAL_CHARS_BACKREF = constants.REGEX_SPECIAL_CHARS_BACKREF,
    REPLACEMENTS = constants.REPLACEMENTS;
/**
 * Helpers
 */

var expandRange = function expandRange(args, options) {
  if (typeof options.expandRange === 'function') {
    return options.expandRange.apply(options, _toConsumableArray(args).concat([options]));
  }

  args.sort();
  var value = "[".concat(args.join('-'), "]");

  try {
    /* eslint-disable no-new */
    new RegExp(value);
  } catch (ex) {
    return args.map(function (v) {
      return utils.escapeRegex(v);
    }).join('..');
  }

  return value;
};

var negate = function negate(state) {
  var count = 1;

  while (state.peek() === '!' && (state.peek(2) !== '(' || state.peek(3) === '?')) {
    state.advance();
    state.start++;
    count++;
  }

  if (count % 2 === 0) {
    return false;
  }

  state.negated = true;
  state.start++;
  return true;
};
/**
 * Create the message for a syntax error
 */


var syntaxError = function syntaxError(type, char) {
  return "Missing ".concat(type, ": \"").concat(char, "\" - use \"\\\\").concat(char, "\" to match literal characters");
};
/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */


var parse = function parse(input, options) {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  input = REPLACEMENTS[input] || input;
  var opts = {};
  _merge(opts, options);
  
  var max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  var len = input.length;

  if (len > max) {
    throw new SyntaxError("Input length: ".concat(len, ", exceeds maximum allowed length: ").concat(max));
  }

  var bos = {
    type: 'bos',
    value: '',
    output: opts.prepend || ''
  };
  var tokens = [bos];
  var capture = opts.capture ? '' : '?:';
  var win32 = utils.isWindows(options); // create constants based on platform, for windows or posix

  var PLATFORM_CHARS = constants.globChars(win32);
  var EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
  var DOT_LITERAL = PLATFORM_CHARS.DOT_LITERAL,
      PLUS_LITERAL = PLATFORM_CHARS.PLUS_LITERAL,
      SLASH_LITERAL = PLATFORM_CHARS.SLASH_LITERAL,
      ONE_CHAR = PLATFORM_CHARS.ONE_CHAR,
      DOTS_SLASH = PLATFORM_CHARS.DOTS_SLASH,
      NO_DOT = PLATFORM_CHARS.NO_DOT,
      NO_DOT_SLASH = PLATFORM_CHARS.NO_DOT_SLASH,
      NO_DOTS_SLASH = PLATFORM_CHARS.NO_DOTS_SLASH,
      QMARK = PLATFORM_CHARS.QMARK,
      QMARK_NO_DOT = PLATFORM_CHARS.QMARK_NO_DOT,
      STAR = PLATFORM_CHARS.STAR,
      START_ANCHOR = PLATFORM_CHARS.START_ANCHOR;

  var globstar = function globstar(opts) {
    return "(".concat(capture, "(?:(?!").concat(START_ANCHOR).concat(opts.dot ? DOTS_SLASH : DOT_LITERAL, ").)*?)");
  };

  var nodot = opts.dot ? '' : NO_DOT;
  var star = opts.bash === true ? globstar(opts) : STAR;
  var qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;

  if (opts.capture) {
    star = "(".concat(star, ")");
  } // minimatch options support


  if (typeof opts.noext === 'boolean') {
    opts.noextglob = opts.noext;
  }

  var state = {
    index: -1,
    start: 0,
    consumed: '',
    output: '',
    backtrack: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    tokens: tokens
  };
  var extglobs = [];
  var stack = [];
  var prev = bos;
  var value;
  /**
   * Tokenizing helpers
   */

  var eos = function eos() {
    return state.index === len - 1;
  };

  var peek = state.peek = function () {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return input[state.index + n];
  };

  var advance = state.advance = function () {
    return input[++state.index];
  };

  var append = function append(token) {
    state.output += token.output != null ? token.output : token.value;  // != : null or undefined!
    state.consumed += token.value || '';
  };

  var increment = function increment(type) {
    state[type]++;
    stack.push(type);
  };

  var decrement = function decrement(type) {
    state[type]--;
    stack.pop();
  };
  /**
   * Push tokens onto the tokens array. This helper speeds up
   * tokenizing by 1) helping us avoid backtracking as much as possible,
   * and 2) helping us avoid creating extra tokens when consecutive
   * characters are plain text. This improves performance and simplifies
   * lookbehinds.
   */


  var push = function push(tok) {
    if (prev.type === 'globstar') {
      var isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
      var isExtglob = extglobs.length && (tok.type === 'pipe' || tok.type === 'paren');

      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = 'star';
        prev.value = '*';
        prev.output = star;
        state.output += prev.output;
      }
    }

    if (extglobs.length && tok.type !== 'paren' && !EXTGLOB_CHARS[tok.value]) {
      extglobs[extglobs.length - 1].inner += tok.value;
    }

    if (tok.value || tok.output) append(tok);

    if (prev && prev.type === 'text' && tok.type === 'text') {
      prev.value += tok.value;
      return;
    }

    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };

  var extglobOpen = function extglobOpen(type, value) {
    var token = { 
      conditions: 1,
      inner: ''
    };
    
  _merge(token, EXTGLOB_CHARS[value]);
    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    var output = (opts.capture ? '(' : '') + token.open;
    push({
      type: type,
      value: value,
      output: state.output ? '' : ONE_CHAR
    });
    push({
      type: 'paren',
      extglob: true,
      value: advance(),
      output: output
    });
    increment('parens');
    extglobs.push(token);
  };

  var extglobClose = function extglobClose(token) {
    var output = token.close + (opts.capture ? ')' : '');

    if (token.type === 'negate') {
      var extglobStar = star;

      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
        extglobStar = globstar(opts);
      }

      if (extglobStar !== star || eos() || /^\)+$/.test(input.slice(state.index + 1))) {
        output = token.close = ')$))' + extglobStar;
      }

      if (token.prev.type === 'bos' && eos()) {
        state.negatedExtglob = true;
      }
    }

    push({
      type: 'paren',
      extglob: true,
      value: value,
      output: output
    });
    decrement('parens');
  };

  if (opts.fastpaths !== false && !/(^[*!]|[/{[()\]}"])/.test(input)) {
    var backslashes = false;
    var output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, function (m, esc, chars, first, rest, index) {
      if (first === '\\') {
        backslashes = true;
        return m;
      }

      if (first === '?') {
        if (esc) {
          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
        }

        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
        }

        return QMARK.repeat(chars.length);
      }

      if (first === '.') {
        return DOT_LITERAL.repeat(chars.length);
      }

      if (first === '*') {
        if (esc) {
          return esc + first + (rest ? star : '');
        }

        return star;
      }

      return esc ? m : '\\' + m;
    });

    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, '');
      } else {
        output = output.replace(/\\+/g, function (m) {
          return m.length % 2 === 0 ? '\\\\' : m ? '\\' : '';
        });
      }
    }

    state.output = output;
    return state;
  }
  /**
   * Tokenize input until we reach end-of-string
   */


  while (!eos()) {
    value = advance();

    if (value === "\0") {
      continue;
    }
    /**
     * Escaped characters
     */


    if (value === '\\') {
      var next = peek();

      if (next === '/' && opts.bash !== true) {
        continue;
      }

      if (next === '.' || next === ';') {
        continue;
      }

      if (!next) {
        value += '\\';
        push({
          type: 'text',
          value: value
        });
        continue;
      } // collapse slashes to reduce potential for exploits


      var match = /^\\+/.exec(input.slice(state.index + 1));
      var slashes = 0;

      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;

        if (slashes % 2 !== 0) {
          value += '\\';
        }
      }

      if (opts.unescape === true) {
        value = advance() || '';
      } else {
        value += advance() || '';
      }

      if (state.brackets === 0) {
        push({
          type: 'text',
          value: value
        });
        continue;
      }
    }
    /**
     * If we're inside a regex character class, continue
     * until we reach the closing bracket.
     */


    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
      if (opts.posix !== false && value === ':') {
        var inner = prev.value.slice(1);

        if (inner.includes('[')) {
          prev.posix = true;

          if (inner.includes(':')) {
            var idx = prev.value.lastIndexOf('[');
            var pre = prev.value.slice(0, idx);
            var rest = prev.value.slice(idx + 2);
            var posix = POSIX_REGEX_SOURCE[rest];

            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();

              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR;
              }

              continue;
            }
          }
        }
      }

      if (value === '[' && peek() !== ':' || value === '-' && peek() === ']') {
        value = '\\' + value;
      }

      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
        value = '\\' + value;
      }

      if (opts.posix === true && value === '!' && prev.value === '[') {
        value = '^';
      }

      prev.value += value;
      append({
        value: value
      });
      continue;
    }
    /**
     * If we're inside a quoted string, continue
     * until we reach the closing double quote.
     */


    if (state.quotes === 1 && value !== '"') {
      value = utils.escapeRegex(value);
      prev.value += value;
      append({
        value: value
      });
      continue;
    }
    /**
     * Double quotes
     */


    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;

      if (opts.keepQuotes === true) {
        push({
          type: 'text',
          value: value
        });
      }

      continue;
    }
    /**
     * Parentheses
     */


    if (value === '(') {
      push({
        type: 'paren',
        value: value
      });
      increment('parens');
      continue;
    }

    if (value === ')') {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError('opening', '('));
      }

      var extglob = extglobs[extglobs.length - 1];

      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }

      push({
        type: 'paren',
        value: value,
        output: state.parens ? ')' : '\\)'
      });
      decrement('parens');
      continue;
    }
    /**
     * Brackets
     */


    if (value === '[') {
      if (opts.nobracket === true || !input.slice(state.index + 1).includes(']')) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('closing', ']'));
        }

        value = '\\' + value;
      } else {
        increment('brackets');
      }

      push({
        type: 'bracket',
        value: value
      });
      continue;
    }

    if (value === ']') {
      if (opts.nobracket === true || prev && prev.type === 'bracket' && prev.value.length === 1) {
        push({
          type: 'text',
          value: value,
          output: '\\' + value
        });
        continue;
      }

      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('opening', '['));
        }

        push({
          type: 'text',
          value: value,
          output: '\\' + value
        });
        continue;
      }

      decrement('brackets');
      var prevValue = prev.value.slice(1);

      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
        value = '/' + value;
      }

      prev.value += value;
      append({
        value: value
      }); // when literal brackets are explicitly disabled
      // assume we should match with a regex character class

      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
        continue;
      }

      var escaped = utils.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length); // when literal brackets are explicitly enabled
      // assume we should escape the brackets to match literal characters

      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      } // when the user specifies nothing, try to match both


      prev.value = "(".concat(capture).concat(escaped, "|").concat(prev.value, ")");
      state.output += prev.value;
      continue;
    }
    /**
     * Braces
     */


    if (value === '{' && opts.nobrace !== true) {
      push({
        type: 'brace',
        value: value,
        output: '('
      });
      increment('braces');
      continue;
    }

    if (value === '}') {
      if (opts.nobrace === true || state.braces === 0) {
        push({
          type: 'text',
          value: value,
          output: '\\' + value
        });
        continue;
      }

      var _output = ')';

      if (state.dots === true) {
        var arr = tokens.slice();
        var range = [];

        for (var i = arr.length - 1; i >= 0; i--) {
          tokens.pop();

          if (arr[i].type === 'brace') {
            break;
          }

          if (arr[i].type !== 'dots') {
            range.unshift(arr[i].value);
          }
        }

        _output = expandRange(range, opts);
        state.backtrack = true;
      }

      push({
        type: 'brace',
        value: value,
        output: _output
      });
      decrement('braces');
      continue;
    }
    /**
     * Pipes
     */


    if (value === '|') {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }

      push({
        type: 'text',
        value: value
      });
      continue;
    }
    /**
     * Commas
     */


    if (value === ',') {
      var _output2 = value;

      if (state.braces > 0 && stack[stack.length - 1] === 'braces') {
        _output2 = '|';
      }

      push({
        type: 'comma',
        value: value,
        output: _output2
      });
      continue;
    }
    /**
     * Slashes
     */


    if (value === '/') {
      // if the beginning of the glob is "./", advance the start
      // to the current index, and don't add the "./" characters
      // to the state. This greatly simplifies lookbehinds when
      // checking for BOS characters like "!" and "." (not "./")
      if (prev.type === 'dot' && state.index === 1) {
        state.start = state.index + 1;
        state.consumed = '';
        state.output = '';
        tokens.pop();
        prev = bos; // reset "prev" to the first token

        continue;
      }

      push({
        type: 'slash',
        value: value,
        output: SLASH_LITERAL
      });
      continue;
    }
    /**
     * Dots
     */


    if (value === '.') {
      if (state.braces > 0 && prev.type === 'dot') {
        if (prev.value === '.') prev.output = DOT_LITERAL;
        prev.type = 'dots';
        prev.output += value;
        prev.value += value;
        state.dots = true;
        continue;
      }

      push({
        type: 'dot',
        value: value,
        output: DOT_LITERAL
      });
      continue;
    }
    /**
     * Question marks
     */


    if (value === '?') {
      if (prev && prev.type === 'paren') {
        var _next = peek();

        var _output3 = value;

        if (_next === '<' && parseInt(process.version.slice(1), 10) < 10) {
          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
        }

        if (prev.value === '(' && !/[!=<:]/.test(_next) || _next === '<' && !/[!=]/.test(peek(2))) {
          _output3 = '\\' + value;
        }

        push({
          type: 'text',
          value: value,
          output: _output3
        });
        continue;
      }

      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('qmark', value);
        continue;
      }

      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
        push({
          type: 'qmark',
          value: value,
          output: QMARK_NO_DOT
        });
        continue;
      }

      push({
        type: 'qmark',
        value: value,
        output: QMARK
      });
      continue;
    }
    /**
     * Exclamation
     */


    if (value === '!') {
      if (opts.noextglob !== true && peek() === '(') {
        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
          extglobOpen('negate', value);
          continue;
        }
      }

      if (opts.nonegate !== true && state.index === 0) {
        negate(state);
        continue;
      }
    }
    /**
     * Plus
     */


    if (value === '+') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('plus', value);
        continue;
      }

      if (prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) {
        var _output4 = prev.extglob === true ? '\\' + value : value;

        push({
          type: 'plus',
          value: value,
          output: _output4
        });
        continue;
      } // use regex behavior inside parens


      if (state.parens > 0 && opts.regex !== false) {
        push({
          type: 'plus',
          value: value
        });
        continue;
      }

      push({
        type: 'plus',
        value: PLUS_LITERAL
      });
      continue;
    }
    /**
     * Plain text
     */


    if (value === '@') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        push({
          type: 'at',
          value: value,
          output: ''
        });
        continue;
      }

      push({
        type: 'text',
        value: value
      });
      continue;
    }
    /**
     * Plain text
     */


    if (value !== '*') {
      if (value === '$' || value === '^') {
        value = '\\' + value;
      }

      var _match = REGEX_NON_SPECIAL_CHAR.exec(input.slice(state.index + 1));

      if (_match) {
        value += _match[0];
        state.index += _match[0].length;
      }

      push({
        type: 'text',
        value: value
      });
      continue;
    }
    /**
     * Stars
     */


    if (prev && (prev.type === 'globstar' || prev.star === true)) {
      prev.type = 'star';
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.consumed += value;
      continue;
    }

    if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
      extglobOpen('star', value);
      continue;
    }

    if (prev.type === 'star') {
      if (opts.noglobstar === true) {
        state.consumed += value;
        continue;
      }

      var prior = prev.prev;
      var before = prior.prev;
      var isStart = prior.type === 'slash' || prior.type === 'bos';
      var afterStar = before && (before.type === 'star' || before.type === 'globstar');

      if (opts.bash === true && (!isStart || !eos() && peek() !== '/')) {
        push({
          type: 'star',
          value: value,
          output: ''
        });
        continue;
      }

      var isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
      var isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');

      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
        push({
          type: 'star',
          value: value,
          output: ''
        });
        continue;
      } // strip consecutive `/**/`


      while (input.slice(state.index + 1, state.index + 4) === '/**') {
        var after = input[state.index + 4];

        if (after && after !== '/') {
          break;
        }

        state.consumed += '/**';
        state.index += 3;
      }

      if (prior.type === 'bos' && eos()) {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.consumed += value;
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = '(?:' + prior.output;
        prev.type = 'globstar';
        prev.output = globstar(opts) + '|$)';
        prev.value += value;
        state.output += prior.output + prev.output;
        state.consumed += value;
        continue;
      }

      var _next2 = peek();

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && _next2 === '/') {
        var end = peek(2) !== void 0 ? '|$' : '';
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = '(?:' + prior.output;
        prev.type = 'globstar';
        prev.output = "".concat(globstar(opts)).concat(SLASH_LITERAL, "|").concat(SLASH_LITERAL).concat(end, ")");
        prev.value += value;
        state.output += prior.output + prev.output;
        state.consumed += value + advance();
        push({
          type: 'slash',
          value: value,
          output: ''
        });
        continue;
      }

      if (prior.type === 'bos' && _next2 === '/') {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = "(?:^|".concat(SLASH_LITERAL, "|").concat(globstar(opts)).concat(SLASH_LITERAL, ")");
        state.output = prev.output;
        state.consumed += value + advance();
        push({
          type: 'slash',
          value: value,
          output: ''
        });
        continue;
      } // remove single star from output


      state.output = state.output.slice(0, -prev.output.length); // reset previous token to globstar

      prev.type = 'globstar';
      prev.output = globstar(opts);
      prev.value += value; // reset output with globstar

      state.output += prev.output;
      state.consumed += value;
      continue;
    }

    var token = {
      type: 'star',
      value: value,
      output: star
    };

    if (opts.bash === true) {
      token.output = '.*?';

      if (prev.type === 'bos' || prev.type === 'slash') {
        token.output = nodot + token.output;
      }

      push(token);
      continue;
    }

    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }

    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
      if (prev.type === 'dot') {
        state.output += NO_DOT_SLASH;
        prev.output += NO_DOT_SLASH;
      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH;
        prev.output += NO_DOTS_SLASH;
      } else {
        state.output += nodot;
        prev.output += nodot;
      }

      if (peek() !== '*') {
        state.output += ONE_CHAR;
        prev.output += ONE_CHAR;
      }
    }

    push(token);
  }

  while (state.brackets > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
    state.output = utils.escapeLast(state.output, '[');
    decrement('brackets');
  }

  while (state.parens > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
    state.output = utils.escapeLast(state.output, '(');
    decrement('parens');
  }

  while (state.braces > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
    state.output = utils.escapeLast(state.output, '{');
    decrement('braces');
  }

  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
    push({
      type: 'maybe_slash',
      value: '',
      output: "".concat(SLASH_LITERAL, "?")
    });
  } // rebuild the output if we had to backtrack at any point


  if (state.backtrack === true) {
    state.output = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
    var _iterator, _step;

    try {
      for (_iterator = state.tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _token = _step.value;
        state.output += _token.output != null ? _token.output : _token.value;   // != : null or undefined!

        if (_token.suffix) {
          state.output += _token.suffix;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return !== null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return state;
};
/**
 * Fast paths for creating regular expressions for common glob patterns.
 * This can significantly speed up processing and has very little downside
 * impact when none of the fast paths match.
 */


parse.fastpaths = function (input, options) {
  var opts = {
  };
  _merge(opts, options);
  var max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  var len = input.length;

  if (len > max) {
    throw new SyntaxError("Input length: ".concat(len, ", exceeds maximum allowed length: ").concat(max));
  }

  input = REPLACEMENTS[input] || input;
  var win32 = utils.isWindows(options); // create constants based on platform, for windows or posix

  var _constants$globChars = constants.globChars(win32),
      DOT_LITERAL = _constants$globChars.DOT_LITERAL,
      SLASH_LITERAL = _constants$globChars.SLASH_LITERAL,
      ONE_CHAR = _constants$globChars.ONE_CHAR,
      DOTS_SLASH = _constants$globChars.DOTS_SLASH,
      NO_DOT = _constants$globChars.NO_DOT,
      NO_DOTS = _constants$globChars.NO_DOTS,
      NO_DOTS_SLASH = _constants$globChars.NO_DOTS_SLASH,
      STAR = _constants$globChars.STAR,
      START_ANCHOR = _constants$globChars.START_ANCHOR;

  var capture = opts.capture ? '' : '?:';
  var star = opts.bash === true ? '.*?' : STAR;
  var nodot = opts.dot ? NO_DOTS : NO_DOT;
  var slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;

  if (opts.capture) {
    star = "(".concat(star, ")");
  }

  var globstar = function globstar(opts) {
    return "(".concat(capture, "(?:(?!").concat(START_ANCHOR).concat(opts.dot ? DOTS_SLASH : DOT_LITERAL, ").)*?)");
  };

  var create = function create(str) {
    switch (str) {
      case '*':
        return "".concat(nodot).concat(ONE_CHAR).concat(star);

      case '.*':
        return "".concat(DOT_LITERAL).concat(ONE_CHAR).concat(star);

      case '*.*':
        return "".concat(nodot).concat(star).concat(DOT_LITERAL).concat(ONE_CHAR).concat(star);

      case '*/*':
        return "".concat(nodot).concat(star).concat(SLASH_LITERAL).concat(ONE_CHAR).concat(slashDot).concat(star);

      case '**':
        return nodot + globstar(opts);

      case '**/*':
        return "(?:".concat(nodot).concat(globstar(opts)).concat(SLASH_LITERAL, ")?").concat(slashDot).concat(ONE_CHAR).concat(star);

      case '**/*.*':
        return "(?:".concat(nodot).concat(globstar(opts)).concat(SLASH_LITERAL, ")?").concat(slashDot).concat(star).concat(DOT_LITERAL).concat(ONE_CHAR).concat(star);

      case '**/.*':
        return "(?:".concat(nodot).concat(globstar(opts)).concat(SLASH_LITERAL, ")?").concat(DOT_LITERAL).concat(ONE_CHAR).concat(star);

      default:
        {
          var match = /^(.*?)\.(\w+)$/.exec(str);
          if (!match) return;
          var source = create(match[1], options);
          if (!source) return;
          return source + DOT_LITERAL + match[2];
        }
    }
  };

  var output = create(input);

  if (output && opts.strictSlashes !== true) {
    output += "".concat(SLASH_LITERAL, "?");
  }

  return output;
};

/* picomath.js */

function _instanceof(left, right) { if (right !== null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */


var picomatch = function picomatch(glob, options) {
  var returnState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (Array.isArray(glob)) {
    var fns = glob.map(function (input) {
      return picomatch(input, options, returnState);
    });
    return function (str) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      var _iterator, _step;

      try {
        for (_iterator = fns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var isMatch = _step.value;

          var _state = isMatch(str);

          if (_state) return _state;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return !== null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    };
  }

  if (typeof glob !== 'string' || glob === '') {
    throw new TypeError('Expected pattern to be a non-empty string');
  }

  var opts = options || {};
  var posix = utils.isWindows(options);
  var regex = picomatch.makeRe(glob, options, false, true);
  var state = regex.state;
  delete regex.state;

  var isIgnored = function isIgnored() {
    return false;
  };

  if (opts.ignore) {
    var ignoreOpts = {
      ignore: null,
      onMatch: null,
      onResult: null
    };
    
    _merge(ignoreOpts, options);
    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
  }

  var matcher = function matcher(input) {
    var returnObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _picomatch$test = picomatch.test(input, regex, options, {
      glob: glob,
      posix: posix
    }),
        isMatch = _picomatch$test.isMatch,
        match = _picomatch$test.match,
        output = _picomatch$test.output;

    var result = {
      glob: glob,
      state: state,
      regex: regex,
      posix: posix,
      input: input,
      output: output,
      match: match,
      isMatch: isMatch
    };

    if (typeof opts.onResult === 'function') {
      opts.onResult(result);
    }

    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (isIgnored(input)) {
      if (typeof opts.onIgnore === 'function') {
        opts.onIgnore(result);
      }

      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (typeof opts.onMatch === 'function') {
      opts.onMatch(result);
    }

    return returnObject ? result : true;
  };

  if (returnState) {
    matcher.state = state;
  }

  return matcher;
};
/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */


picomatch.test = function (input, regex, options) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      glob = _ref.glob,
      posix = _ref.posix;

  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (input === '') {
    return {
      isMatch: false,
      output: ''
    };
  }

  var opts = options || {};
  var format = opts.format || (posix ? utils.toPosixSlashes : null);
  var match = input === glob;
  var output = match && format ? format(input) : input;

  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }

  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }

  return {
    isMatch: !!match,
    match: match,
    output: output
  };
};
/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */


picomatch.matchBase = function (input, glob, options) {
  var posix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : utils.isWindows(options);
  var regex = _instanceof(glob, RegExp) ? glob : picomatch.makeRe(glob, options);
  return regex.test(path.basename(input));
};
/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */


picomatch.isMatch = function (str, patterns, options) {
  return picomatch(patterns, options)(str);
};
/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(glob[, options]);
 * ```
 * @param {String} `glob`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */


picomatch.parse = function (glob, options) {
  return parse(glob, options);
};
/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * // { prefix: '!./',
 * //   input: '!./foo/*.js',
 * //   base: 'foo',
 * //   glob: '*.js',
 * //   negated: true,
 * //   isGlob: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */


picomatch.scan = function (input, options) {
  return scan(input, options);
};
/**
 * Create a regular expression from a glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.makeRe(input[, options]);
 *
 * console.log(picomatch.makeRe('*.js'));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `input` A glob pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */


picomatch.makeRe = function (input, options) {
  var returnOutput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var returnState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!input || typeof input !== 'string') {
    throw new TypeError('Expected a non-empty string');
  }

  var opts = options || {};
  var prepend = opts.contains ? '' : '^';
  var append = opts.contains ? '' : '$';
  var state = {
    negated: false,
    fastpaths: true
  };
  var prefix = '';
  var output;

  var startsWith = String.prototype.startsWith;
  if(!String.prototype.startsWith) {
     startsWith = function(search, pos) {
                    pos = !pos || pos < 0 ? 0 : +pos;
                    return this.substring(pos, pos + search.length) === search;
                };
  }

  if (startsWith.call(input, './')) {
    input = input.slice(2);
    prefix = state.prefix = './';
  }

  if (opts.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
    output = parse.fastpaths(input, options);
  }

  if (output === void 0) {
    state = picomatch.parse(input, options);
    state.prefix = prefix + (state.prefix || '');
    output = state.output;
  }

  if (returnOutput === true) {
    return output;
  }

  var source = "".concat(prepend, "(?:").concat(output, ")").concat(append);

  if (state && state.negated === true) {
    source = "^(?!".concat(source, ").*$");
  }

  var regex = picomatch.toRegex(source, options);

  if (returnState === true) {
    regex.state = state;
  }

  return regex;
};
/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */


picomatch.toRegex = function (source, options) {
  try {
    var opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
  } catch (err) {
    if (options && options.debug === true) throw err;
    return /$^/;
  }
};
/**
 * Picomatch constants.
 * @return {Object}
 */


picomatch.constants = constants;
/**
 * Expose "picomatch"
 */

return picomatch;
})();
const options = {
  preserve: true,
  replaceWith: '.focus-visible'
};

/** @type {(rule: CSSRule) => void} */

const onRule = rule => {
  var _rule$prev;

  const selector = rule.selector.replace(selectorRegExp, ($0, $1) => `${options.replaceWith}${$1}`); // check if it was processed yet

  if (options.preserve && ((_rule$prev = rule.prev()) === null || _rule$prev === void 0 ? void 0 : _rule$prev.selector) === selector) return;
  const clone = rule.clone({
    selector
  });
  if (options.preserve) rule.before(clone);else rule.replaceWith(clone);
};

const selectorRegExp = /(?<!\\):focus-visible([^\w-]|$)/gi;
/** @typedef {import('postcss').Rule} CSSRule */

/** @type {CSSPlugin} */

const plugin = opts => {
  opts = Object(opts);
  options.replaceWith = String(opts.replaceWith || '.focus-visible');
  options.preserve = Boolean('preserve' in opts ? opts.preserve : true);
  return {
    postcssPlugin: 'postcss-focus-visible',

    Rule(rule) {
      if (selectorRegExp.test(rule.selector)) {
        onRule(rule);
      }
    }

  };
};

plugin.postcss = true;
/** @typedef {import('postcss').Plugin<options>} CSSPlugin */

export default plugin;

'use strict';

export class Common {
    constructor(){
        this.LETTERS = { LOWER: 2, CAMEL: 3, NATURAL: 4, PROPER: 5, UPPER: 6 };
        this.VISIBILITIES = { HIDDEN: 1, VISIBLE: 2, ALL: 3 };
    }
    defaults(value, defaultValue) {
        return (this.isEffective(value)) ? value : defaultValue;
    }
    fetch(input) {
        input = input || {};
        input.items = input.items || {};

        return $.Deferred(function(defer) {
            if (!input.items[input.key]) {
                $.ajax({
                    dataType: input.type,
                    error: function(xhr, status, error) {
                        if ($.isFunction(input.error)) {
                            input.error.call(this, defer, input.key, xhr, status, error);
                        }
                    },
                    success: function(data, status, xhr) {
                        if ($.isFunction(input.success)) {
                            input.success.call(this, defer, input.key, data, status, xhr);
                        }
                    },
                    url: input.url
                });
            }
            else {
                defer.resolve(input.items[input.key]);
            }
        }).promise();
    }

        getDefaultValue(configKey, defaultValue) {
            var env = (typeof(process) !== 'undefined' && process.env) ? process.env : null;
            var prefix = 'npm_package_config_';
            return (env && env[prefix + configKey]) ?
                this.defaults(env[prefix + configKey], defaultValue) : defaultValue;
        }
        isEffective(input) {
            return (typeof(input) !== 'undefined' && input !== null);
        }
        setDefaultValues(input) {
            input = input || {};
            // attributes
            input.attributes = input.attributes || {};
            input.attributes.letter = input.attributes.letter ||
                this.getDefaultValue('attributes_letter', this.LETTERS.CAMEL);
            input.attributes.indent = !!input.attributes.indent;
            if (!input.attributes.indent) {
                input.attributes.indent = !!this.getDefaultValue('attributes_indent', false);
            }
            input.attributes.separator = this.defaults(input.attributes.separator,
                this.getDefaultValue('attributes_separator', '\n'));

            // copyright
            input.copyright = input.copyright || {};
            input.copyright.claimant = input.copyright.claimant ||
                this.getDefaultValue('copyright_claimant', '');
            input.copyright.year = input.copyright.year ||
                this.getDefaultValue('copyright_year', new Date().getFullYear());

            // fill
            input.fill = input.fill || {};
            input.fill.separator = input.fill.separator ||
                this.getDefaultValue('fill_separator', '');

            // model
            input.model = input.model || {};
            input.model.include = !!input.model.include;
            if (!input.model.include) {
                input.model.include = !!this.getDefaultValue('model_include', false);
            }
            input.model.name = input.model.name || this.getDefaultValue('model_name', '');
            input.model.namespace = input.model.namespace ||
                this.getDefaultValue('model_namespace', '');
            input.model.target = input.model.target || this.getDefaultValue('model_target', '');

            // nodes
            input.nodes = input.nodes || {};
            // using test framework with AngularJS locators support
            input.nodes.angular = !!input.nodes.angular;
            if (!input.nodes.angular) {
                input.nodes.angular = !!this.getDefaultValue('nodes_angular', false);
            }
            input.nodes.root = input.nodes.root || this.getDefaultValue('nodes_root', 'body');
            input.nodes.selector = input.nodes.selector ||
                this.getDefaultValue('nodes_selector', 'a,button,input,select,textarea');
            input.nodes.visibility = input.nodes.visiblity ||
                this.getDefaultValue('nodes_visibility', this.VISIBILITIES.ALL);

            // operations
            input.operations = input.operations || {};
            input.operations.extras = input.operations.extras || {};

            // operations.extras
            input.operations.extras.fill = this.defaults(input.operations.extras.fill,
                this.getDefaultValue('extras_fill', 1));
            input.operations.extras['fill.submit'] =
                this.defaults(input.operations.extras['fill.submit'],
                this.getDefaultValue('extras_fill_submit', 1));
            input.operations.extras.submit =
                this.defaults(input.operations.extras.submit,
                this.getDefaultValue('extras_submit', 1));
            input.operations.extras['verify.loaded'] =
                this.defaults(input.operations.extras['verify.loaded'],
                this.getDefaultValue('extras_verify_loaded', 1));
            input.operations.extras['verify.url'] =
                this.defaults(input.operations.extras['verify.url'],
                this.getDefaultValue('extras_verify_url', 1));

            input.operations.letter = input.operations.letter ||
                this.getDefaultValue('operations_letter', this.LETTERS.CAMEL);
            input.operations.separator = this.defaults(input.operations.separator,
                this.getDefaultValue('operations_separator', '\n'));

            input.timeout = input.timeout || this.getDefaultValue('timeout', 15);

            return input;
        }
    }


//     if (typeof(exports) !== 'undefined') {
//         if (typeof(module) !== 'undefined' && module.exports) {
//             exports = module.exports = root;
//         }
//         exports.common = root.common;
//         exports.LETTERS = root.LETTERS;
//         exports.VISIBILITIES = root.VISIBILITIES;
//     }
// }).call(this);
/**
 * Faster array filtration based on predicate function.
 * @function external:Array#filter
 * @param {Array} source The source array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @return {Array} Returns the new filtered array.
 * @example
 * var filtered = Array.filter([1,2,3,4,5], function(item, index) { return item === 5 });
 */
Array.filter = function(source, predicate) {
    source = source || [];
    var index = -1;
    var length = source.length;
    var target = [];
    var targetIndex = -1;

    while (++index < length) {
        var item = source[index];
        if (predicate(item, index, source)) {
            target[++targetIndex] = item;
        }
    }

    return target;
};

/**
 * Extends an object with zero or more source objects.
 * @function external:Object#extend
 * @param {...*} [arguments=null] Zero or more source objects.
 * @return {Object} Returns the extended object.
 * @example
 * var extended = Object.extend({ key: 'value' }, anotherObject, { hi: 'dood' });
 */
Object.extend = function() {
    var key, source;
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
        source = arguments[i];

        for (key in source) {
            target[key] = source[key];
        }
    }

    return target;
};

if (typeof(String.prototype.trim) !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

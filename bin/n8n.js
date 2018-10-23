#!/usr/bin/env node
require('babel-register');
var ArgumentParser = require('argparse').ArgumentParser;
var path = require('path');
var rootDir = path.join(__dirname, '..');
var packagejson = require(path.join(rootDir, 'package.json'));
var parser = new ArgumentParser({
    description: packagejson.description,
    version: packagejson.version
});
const JSDON = require("jsdom");

parser.addArgument(['-t', '--target'], {
    choices: ['cs', 'java', 'robot','js'],
    help: 'Shiba target',
    required: true
});
parser.addArgument(['-n', '--name'], {
    help: 'Page name (no spaces)',
    required: true
});
parser.addArgument(['-d', '--destination'], {
    help: 'Destination page name (no spaces)',
    required: false
});
parser.addArgument(['-u', '--url'], {
    help: 'Source url',
    required: true
});

var args = parser.parseArgs();
var execDir = process.cwd();
var fs = require('fs');
var mkdirp = require('mkdirp');
var commonDir = path.join(rootDir, 'src', 'common');
var common = require("../src/common/common").Common;
var generator = require("../src/common/generator").Generator;


global.Handlebars = require('handlebars');
require(path.join(commonDir, 'helpers.js'));

var overrides = {
    model: {
        name: args.name.replace(/\s+/g, ''),
        target: args.destination
    }
};

var paths = {
    config: path.join(rootDir, 'configs', args.target + '.json'),
    target: path.join(execDir,args.destination || 'pages', args.name + '.' + args.target),
    template: path.join(rootDir, 'templates', args.target + '.handlebars')
};

var targets = {
    cs: {label: 'C#'},
    java: {label: 'Java'},
    robot: {label: 'Robot Framework'},
    js:{label:'JS'}
};

function getFileContent(path) {
    var response = '';
    try {
        response = fs.readFileSync(path, 'utf-8');
    }
    catch (ex) {
        if (ex.code === 'ENOENT') {
            console.error(path + ' does not exist.');
        }
        throw ex;
    }
    return response;
}
const virtualConsole = new JSDON.VirtualConsole();
let options={ 
        runScripts: "dangerously", 
        virtualConsole:virtualConsole,
 //   pretendToBeVisual: true,
        FetchExternalResources: ['../libs/treewalker-polyfill-0.2.0.js'],
        ProcessExternalResources: ['../libs/treewalker-polyfill-0.2.0.js'],
        resources: "usable", // need this to execute scripts
        includeNodeLocations: true
    };

console.log("Start generating page ......");
JSDON.JSDOM.fromURL(args.url,options).then(dom => {
    try {
        let _generator = new generator();
        let _common = new common();
        var config = require(paths.config);
        config = _common.setDefaultValues(config);
        overrides.model.include = config.model.include;
        overrides.model.namespace = config.model.namespace;
        var input = Object.extend({}, config, overrides);
        var output = _generator.generate(dom.window.document, input);
        var template = getFileContent(paths.template);
        var generated = (Handlebars.compile(template))(output);
        mkdirp.sync(path.dirname(paths.target));
        fs.writeFileSync(paths.target, generated);
        console.log('The file is saved: ' + paths.target);
    }catch (e) {
        console.log("There is an error when generating, please retry  ");
        console.log(e)
    }finally{
        dom.window.close();
    }
});

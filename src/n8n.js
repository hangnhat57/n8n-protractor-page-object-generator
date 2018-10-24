#!/usr/bin/env node
require('babel-register');
var ArgumentParser = require('argparse').ArgumentParser;
var path = require('path');
var rootDir = path.join(__dirname, '..');
var libsDir = path.join(__dirname,'libs');
var packagejson = require(path.join(rootDir, 'package.json'));
var parser = new ArgumentParser({
    description: packagejson.description,
    version: packagejson.version
});
const JSDOM = require("jsdom");

parser.addArgument(['-l', '--language'], {
    choices: ['cs', 'java', 'robot','js'],
    help: 'Language target',
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
    required: false
});
parser.addArgument(['-f', '--file'], {
    help: 'Path to source file',
    required: false
});

var args = parser.parseArgs();
var execDir = process.cwd();
var fs = require('fs');
var mkdirp = require('mkdirp');
var common = require(path.join(libsDir,'common.js')).Common;
var generator = require(path.join(libsDir,'generator.js')).Generator;


global.Handlebars = require('handlebars');
require(path.join(libsDir, 'helpers.js'));

var overrides = {
    model: {
        name: args.name.replace(/\s+/g, ''),
        target: args.destination
    }
};

var paths = {
    config: path.join(rootDir, 'configs', args.language + '.json'),
    target: path.join(execDir,args.destination || 'pages', args.name + '.' + args.language),
    template: path.join(rootDir, 'templates', args.language + '.handlebars')
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
function generatePage(dom){
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
}
const virtualConsole = new JSDOM.VirtualConsole();
let scripts = [
    path.join(libsDir,'jquery-3.3.1.js'),
    path.join(libsDir,'treewalker-polyfill-0.2.0.js')
    ];
let options={ 
        runScripts: "dangerously", 
        virtualConsole:virtualConsole,
        pretendToBeVisual: true,
        FetchExternalResources: scripts,
        ProcessExternalResources: scripts,
        resources: "usable", // need this to execute scripts
    };

console.log("Start generating page ......");



if(args.url && args.file){
    throw new Error(`Please choose only one parameter : file or url
    This stupid tool can't generate more than a page at once`);
}
else if(args.url){
    JSDOM.JSDOM.fromURL(args.url,options).then(dom => {
        generatePage(dom);
    });
}
else if(args.file){
    JSDOM.JSDOM.fromFile(args.url,options).then(dom => {
        generatePage(dom);
    });
}
else{
    throw new Error(`How can I know what page you're gonna generate? 
    Please input your source by url with -u || --url or from file with -f || --file`);
}

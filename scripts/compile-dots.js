//compile doT templates to js functions

var glob = require('glob')
  , fs = require('fs')
  , path = require('path')
  , doT = require('dot')
  , beautify = require('js-beautify').js_beautify;

doT.templateSettings.strip = false;

var defs = {};
['definitions', 'keys'].forEach(function (name) {
  defs[name] = fs.readFileSync(path.join(__dirname, '../lib/dot/' + name + '.def'), 'utf-8');
});

var files = glob.sync('../lib/dot/*.jst', { cwd: __dirname });

var dotjsPath = path.join(__dirname, '../lib/dotjs');
try { fs.mkdirSync(dotjsPath); } catch(e) {}

console.log('\n\nCompiling:');


var groups = files.map(function(f) {
  return path.basename(f, '.jst');
});


files.forEach(function (f, i) {
  var group = groups[i];
  var template = fs.readFileSync(path.join(__dirname, f), 'utf-8');
  var groupTemplate = doT.compile(template, defs);
  ['functions', 'methods'].forEach(function (mode) {
    var code = groupTemplate({ mode: mode, groups: groups });
    code = beautify(code, { preserve_newlines: false, end_with_newline: true });
    var targetPath = path.join(dotjsPath, mode);
    try { fs.mkdirSync(targetPath); } catch(e) {}
    fs.writeFileSync(path.join(targetPath, group + '.js'), code);
  });
  console.log('compiled', group);
});

module.exports["report.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, minimum-scale=1, initial-scale=1\">\n    <title>Baseline Report</title>\n    <script src=\"https://kit.fontawesome.com/7d3ec3600d.js\" crossorigin=\"anonymous\"></script>\n    <link rel=\"stylesheet\" href=\"http://localhost:8080/css/style.css\">\n</head>\n\n<body class=\"bg-gray-200 mt-20\">\n<div class=\"bg-white shadow overflow-hidden w-full fixed top-0 p-3 h-20 grid grid-cols-2\">\n    <div></div>\n    <div class=\"text-right\"></div>\n</div>\n<div class=\"max-w-7xl mx-auto sm:px-6 lg:px-8 sm:pt-4\">\n    ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "users");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0];
frame.set("[object Object]", t_3[t_1][0]);
var t_5 = t_3[t_1][1];
frame.set("[object Object]", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n    ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("user-item.html", false, "report.html", false, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
callback(null,t_6);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
callback(null,t_8);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    ";
});
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_10 in t_3) {
t_1++;
var t_11 = t_3[t_10];
frame.set("email", t_10);
frame.set("user", t_11);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n    ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("user-item.html", false, "report.html", false, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
callback(null,t_12);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_15,t_14) {
if(t_15) { cb(t_15); return; }
callback(null,t_14);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    ";
});
}
}
}
frame = frame.pop();
output += "\n</div>\n</body>\n</html>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
module.exports["service-container.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div>\n    <div class=\"flex items-center px-4 py-5 sm:px-6 bg-gray-100\">\n        <div class=\"rounded-full bg-gray-200 w-7 h-7 flex items-center justify-center text-gray-600\">\n            <i class=\"fab ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "service")),"icon"), env.opts.autoescape);
output += " fa-1x\"></i>\n        </div>\n        <h2 class=\"ml-1 text-lg leading-5 font-medium text-gray-700\">\n            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "service")),"name"), env.opts.autoescape);
output += "\n        </h2>\n    </div>\n    ";
if(runtime.contextOrFrameLookup(context, frame, "serviceKey") == "github") {
output += "\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("service-details-github.html", false, "service-container.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
callback(null,t_1);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
callback(null,t_3);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    ";
});
}
output += "\n    ";
if(runtime.contextOrFrameLookup(context, frame, "serviceKey") == "slack") {
output += "\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("service-details-slack.html", false, "service-container.html", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
callback(null,t_5);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
callback(null,t_7);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    ";
});
}
output += "\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
module.exports["service-details-github.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"sm:mx-2 my-2\">\n    <table class=\"text-left w-full rounded-md\">\n        <thead>\n            <tr>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Organization\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Organization enforces 2FA\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Permissions\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Id\n                </th>\n            </tr>\n        </thead>\n        ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "service")),"items");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("service", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <tr>\n            <td class=\"py-2 px-4\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"organization")),"login"), env.opts.autoescape);
output += "</td>\n            <td class=\"py-2 px-4\"><i class=\"fas ";
output += runtime.suppressValue((runtime.memberLookup((runtime.memberLookup((t_4),"organization")),"enforces2fa")?"fa-check":"fa-times"), env.opts.autoescape);
output += " fa-1x\"/></td>\n            <td class=\"py-2 px-4\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"permissions"), env.opts.autoescape);
output += "</td>\n            <td class=\"py-2 px-4\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "</td>\n        </tr>\n        ";
;
}
}
frame = frame.pop();
output += "\n    </table>\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
module.exports["service-details-slack.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"sm:mx-2 my-2\">\n    <table class=\"text-left w-full rounded-md\">\n        <thead>\n            <tr>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Team Name\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Team Domain\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Permissions\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Is Active\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Is Bot\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Has MFA\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    User Id\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Team Id\n                </th>\n            </tr>\n        </thead>\n        ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "service")),"items");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("service", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <tr>\n            <td class=\"py-2 px-4\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"teamName"), env.opts.autoescape);
output += "</td>\n            <td class=\"py-2 px-4\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"teamDomain"), env.opts.autoescape);
output += "</td>\n            <td class=\"py-2 px-4\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"permissions"), env.opts.autoescape);
output += "</td>\n            <td class=\"py-2 px-4\"><i class=\"fas ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"isActive")?"fa-check":"fa-times"), env.opts.autoescape);
output += " fa-1x\"/></td>\n            <td class=\"py-2 px-4\"><i class=\"fas ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"isBot")?"fa-check":"fa-times"), env.opts.autoescape);
output += " fa-1x\"/></td>\n            <td class=\"py-2 px-4\"><i class=\"fas ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"has2fa")?"fa-check":"fa-times"), env.opts.autoescape);
output += " fa-1x\"/></td>\n            <td class=\"py-2 px-4\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "</td>\n            <td class=\"py-2 px-4\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"teamId"), env.opts.autoescape);
output += "</td>\n        </tr>\n        ";
;
}
}
frame = frame.pop();
output += "\n    </table>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
module.exports["user-item.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"bg-white overflow-hidden sm:rounded-lg sm:shadow sm:mb-4 sm:border-b sm:border-gray-200\">\n    <div class=\"px-4 py-5 border-b border-gray-200 sm:px-6\">\n        <div class=\"-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap\">\n            <div class=\"ml-4 mt-4\">\n                <div class=\"flex items-center\">\n                    <div class=\"flex-shrink-0\">\n                        <img class=\"h-12 w-12 rounded-full bg-gray-200\" src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"avatar"), env.opts.autoescape);
output += "\" alt=\"\" />\n                    </div>\n                    <div class=\"ml-4\">\n                        <h3 class=\"text-lg leading-6 font-medium text-gray-900\">\n                            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"displayName"), env.opts.autoescape);
output += "\n                        </h3>\n                        <p class=\"text-sm leading-5 text-gray-500\">\n                            <a href=\"#\">\n                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"email"), env.opts.autoescape);
output += "\n                            </a>\n                        </p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"ml-4 mt-4 flex-shrink-0 flex\">\n            </div>\n        </div>\n    </div>\n    <div>\n        ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"services");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0];
frame.set("[object Object]", t_3[t_1][0]);
var t_5 = t_3[t_1][1];
frame.set("[object Object]", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("service-container.html", false, "user-item.html", false, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
callback(null,t_6);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
callback(null,t_8);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n        ";
});
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_10 in t_3) {
t_1++;
var t_11 = t_3[t_10];
frame.set("serviceKey", t_10);
frame.set("service", t_11);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("service-container.html", false, "user-item.html", false, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
callback(null,t_12);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_15,t_14) {
if(t_15) { cb(t_15); return; }
callback(null,t_14);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n        ";
});
}
}
}
frame = frame.pop();
output += "\n    </div>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();

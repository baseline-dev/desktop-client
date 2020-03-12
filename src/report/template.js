module.exports["header.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"py-3 fixed bg-white w-full z-10 top-0\" id=\"header\">\n    <nav class=\"relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-24\">\n        <div class=\"flex items-center flex-1\">\n            <div class=\"flex items-center justify-between w-full md:w-auto\">\n                <a href=\"/\">\n                    <img class=\"h-8 w-auto sm:h-10\" src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/logo/logo.png\" alt=\"\"/>\n                </a>\n            </div>\n            <div class=\"hidden md:block md:ml-10\"></div>\n        </div>\n        <div class=\"hidden md:block text-right\">\n            <span class=\"inline-flex rounded-md shadow-md\"></span>\n        </div>\n    </nav>\n</div>\n<script>\n  const header = document.getElementById('header');\n  function handleHeader() {\n    if (window.pageYOffset > 10) {\n      header.classList.add('border-b', 'border-gray-200');\n    } else {\n      header.classList.remove('border-b', 'border-gray-200');\n    }\n  }\n  window.onscroll = handleHeader;\n  handleHeader();\n</script>";
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
module.exports["report.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, minimum-scale=1, initial-scale=1\">\n    <link rel=\"shortcut icon\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/favicon.ico\">\n    <link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/apple-icon-57x57.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/apple-icon-60x60.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/apple-icon-72x72.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/apple-icon-76x76.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/apple-icon-114x114.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/apple-icon-120x120.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/apple-icon-144x144.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/apple-icon-152x152.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/apple-icon-180x180.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"192x192\"  href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/android-icon-192x192.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/favicon-32x32.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/favicon-96x96.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/img/favicon/favicon-16x16.png\">\n    <meta name=\"msapplication-TileColor\" content=\"#ffffff\">\n    <meta name=\"msapplication-TileImage\" content=\"/ms-icon-144x144.png\">\n    <meta name=\"theme-color\" content=\"#ffffff\">\n    <meta name=\"msapplication-config\" content=\"https://static.Baseline.dev/web/favicon/browserconfig.xml\">\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\">\n    \n    <title>Baseline Report</title>\n    <script src=\"https://kit.fontawesome.com/7d3ec3600d.js\" crossorigin=\"anonymous\"></script>\n    <link rel=\"stylesheet\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baselineStaticAssetsUrl"), env.opts.autoescape);
output += "/css/style.css\">\n</head>\n\n<body class=\"bg-gray-200 mt-20\">\n";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("./header.html", false, "report.html", false, function(t_2,t_1) {
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
output += "\n<div class=\"mt-8 mx-auto max-w-screen-xl sm:mt-12 sm:px-24 md:mt-20 xl:mt-24\">\n    ";
frame = frame.push();
var t_7 = runtime.contextOrFrameLookup(context, frame, "users");
if(t_7) {t_7 = runtime.fromIterator(t_7);
var t_5;
if(runtime.isArray(t_7)) {
var t_6 = t_7.length;
for(t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5][0];
frame.set("[object Object]", t_7[t_5][0]);
var t_9 = t_7[t_5][1];
frame.set("[object Object]", t_7[t_5][1]);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n    ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("user-item.html", false, "report.html", false, function(t_11,t_10) {
if(t_11) { cb(t_11); return; }
callback(null,t_10);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
callback(null,t_12);});
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
t_5 = -1;
var t_6 = runtime.keys(t_7).length;
for(var t_14 in t_7) {
t_5++;
var t_15 = t_7[t_14];
frame.set("email", t_14);
frame.set("user", t_15);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n    ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("user-item.html", false, "report.html", false, function(t_17,t_16) {
if(t_17) { cb(t_17); return; }
callback(null,t_16);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_19,t_18) {
if(t_19) { cb(t_19); return; }
callback(null,t_18);});
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
});
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
output += "<div>\n    <div class=\"flex items-center px-4 py-5 sm:px-6 bg-gray-100\">\n        <div class=\"rounded-full flex items-center justify-center text-gray-600\">\n            <i class=\"fab ";
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
output += "<div class=\"sm:mx-2 my-2\">\n    <table class=\"text-left w-full rounded-md\">\n        <thead>\n            <tr>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Organization\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Organization enforces 2FA\n                </th>\n            </tr>\n        </thead>\n        ";
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
output += "\n        <tr class=\"text-gray-800\">\n            <td class=\"py-2 px-4\">\n                <a href=\"https://github.com/orgs/";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"organization")),"login"), env.opts.autoescape);
output += "/people\" target=\"_blank\" class=\"underline\">\n                    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"organization")),"login"), env.opts.autoescape);
output += "\n                </a>\n            </td>\n            <td class=\"py-2 px-4\"><i class=\"fas ";
output += runtime.suppressValue((runtime.memberLookup((runtime.memberLookup((t_4),"organization")),"enforces2fa")?"fa-check":"fa-times"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue((runtime.memberLookup((runtime.memberLookup((t_4),"organization")),"enforces2fa")?"text-teal-800":"text-pink-800"), env.opts.autoescape);
output += " fa-1x\"/></td>\n        </tr>\n        ";
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
output += "<div class=\"sm:mx-2 my-2\">\n    <table class=\"text-left w-full rounded-md\">\n        <thead>\n            <tr>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Team Name\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Permissions\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Has MFA\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Is Active\n                </th>\n                <th class=\"py-2 px-4 font-bold uppercase text-sm text-gray-600\">\n                    Is Bot\n                </th>\n            </tr>\n        </thead>\n        ";
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
output += "\n        <tr class=\"text-gray-800\">\n            <td class=\"py-2 px-4\">\n                <a href=\"https://";
output += runtime.suppressValue(runtime.memberLookup((t_4),"teamDomain"), env.opts.autoescape);
output += ".slack.com/admin\" target=\"_blank\" class=\"underline\">\n                    ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"teamName"), env.opts.autoescape);
output += "\n                </a>\n            </td>\n            <td class=\"py-2 px-4\">";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((t_4),"permissions"),", "), env.opts.autoescape);
output += "</td>\n            <td class=\"py-2 px-4\"><i class=\"fas ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"has2fa")?"fa-check":"fa-times"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"has2fa")?"text-teal-800":"text-pink-800"), env.opts.autoescape);
output += " fa-1x\"/></td>\n            <td class=\"py-2 px-4\"><i class=\"fas ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"isActive")?"fa-check":"fa-times"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"isActive")?"text-teal-800":"text-pink-800"), env.opts.autoescape);
output += " fa-1x\"/></td>\n            <td class=\"py-2 px-4\"><i class=\"fas ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"isBot")?"fa-check":"fa-times"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"isBot")?"text-teal-800":"text-pink-800"), env.opts.autoescape);
output += " fa-1x\"/></td>\n        </tr>\n        ";
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

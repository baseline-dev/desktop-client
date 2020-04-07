const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 Object.keys(data.resources).forEach(function(service){ ;
__p += '\n    ';
 if (service == 'aws') { ;
__p += '\n        ' +
((__t = ( data.templates.RESOURCES_AWS({resources: data.resources[service], templates: data.templates, baselineStaticAssetsUrl: data.baselineStaticAssetsUrl}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n    ';
 if (service == 'google-cloud') { ;
__p += '\n        ' +
((__t = ( data.templates.RESOURCES_GCLOUD({resources: data.resources[service], templates: data.templates, baselineStaticAssetsUrl: data.baselineStaticAssetsUrl}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n';
 }) ;

return __p
};
export {template as default}
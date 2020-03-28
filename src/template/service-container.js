const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div>\n    <div class="flex items-center px-4 py-5 sm:px-6 bg-gray-100">\n        <div class="rounded-full flex items-center justify-center text-gray-600">\n            <i class="fab ' +
((__t = ( data.service.icon )) == null ? '' : __t) +
' fa-1x"></i>\n        </div>\n        <h2 class="ml-1 text-lg leading-5 font-medium text-gray-700">\n            ' +
((__t = ( data.service.name )) == null ? '' : __t) +
'\n        </h2>\n    </div>\n    ';
 if (data.serviceKey == 'github') { ;
__p += '\n        ' +
((__t = ( data.templates.DETAILS_GITHUB({service: data.service, templates: data.templates}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n    ';
 if (data.serviceKey == 'slack') { ;
__p += '\n        ' +
((__t = ( data.templates.DETAILS_SLACK({service: data.service, templates: data.templates}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n    ';
 if (data.serviceKey == 'aws') { ;
__p += '\n        ' +
((__t = ( data.templates.DETAILS_AWS({service: data.service, templates: data.templates}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n</div>';
return __p
};
export {template as default}
const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '\n<div>\n    <div>\n        <div class="flex items-center px-4 py-5 sm:px-6 bg-gray-100">\n            <div class="rounded-full flex items-center justify-center text-gray-600">\n                <img src="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/services/' +
((__t = ( data.service.icon )) == null ? '' : __t) +
'" width="20" alt="' +
((__t = ( data.service.label )) == null ? '' : __t) +
'"/>\n            </div>\n            <h2 class="ml-1 text-lg leading-5 font-medium text-gray-700">\n                ' +
((__t = ( data.service.label )) == null ? '' : __t) +
'\n            </h2>\n        </div>\n    </div>\n    ';
 if (data.service.name == 'github') { ;
__p += '\n    ';
 data.serviceItems ;
__p += '\n        ' +
((__t = ( data.templates.DETAILS_GITHUB({serviceItems: data.serviceItems, templates: data.templates, baselineStaticAssetsUrl: data.baselineStaticAssetsUrl}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n    ';
 if (data.service.name == 'slack') { ;
__p += '\n        ' +
((__t = ( data.templates.DETAILS_SLACK({serviceItems: data.serviceItems, templates: data.templates, baselineStaticAssetsUrl: data.baselineStaticAssetsUrl}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n    ';
 if (data.service.name == 'aws') { ;
__p += '\n        ' +
((__t = ( data.templates.DETAILS_AWS({serviceItems: data.serviceItems, templates: data.templates, baselineStaticAssetsUrl: data.baselineStaticAssetsUrl}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n    ';
 if (data.service.name == 'cloudflare') { ;
__p += '\n        ' +
((__t = ( data.templates.DETAILS_CLOUDFLARE({serviceItems: data.serviceItems, templates: data.templates, baselineStaticAssetsUrl: data.baselineStaticAssetsUrl}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n    ';
 if (data.service.name == 'google') { ;
__p += '\n        ' +
((__t = ( data.templates.DETAILS_GOOGLE({serviceItems: data.serviceItems, templates: data.templates, baselineStaticAssetsUrl: data.baselineStaticAssetsUrl}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n    ';
 if (data.service.name == 'wordpress-selfhosted') { ;
__p += '\n        ' +
((__t = ( data.templates.DETAILS_WORDPRESS_SELFHOSTED({serviceItems: data.serviceItems, templates: data.templates, baselineStaticAssetsUrl: data.baselineStaticAssetsUrl}) )) == null ? '' : __t) +
'\n    ';
 } ;
__p += '\n</div>';
return __p
};
export {template as default}
const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="bg-white overflow-hidden sm:rounded-lg sm:shadow sm:mb-4 sm:border-b sm:border-gray-200">\n    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">\n        <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">\n            <div class="ml-4 mt-4">\n                <div class="flex items-center">\n                    <div class="flex-shrink-0">\n                        <img class="h-12 w-12 rounded-full bg-gray-200" src="' +
((__t = ( data.user.avatar )) == null ? '' : __t) +
'" alt="" />\n                    </div>\n                    <div class="ml-4">\n                        <h3 class="text-lg leading-6 font-medium text-gray-900">\n                            ' +
((__t = ( data.user.displayName )) == null ? '' : __t) +
'\n                        </h3>\n                        <p class="text-sm leading-5 text-gray-500">\n                            <a href="#">\n                                ' +
((__t = ( data.user.email )) == null ? '' : __t) +
'\n                            </a>\n                        </p>\n                    </div>\n                </div>\n            </div>\n            <div class="ml-4 mt-4 flex-shrink-0 flex">\n            </div>\n        </div>\n    </div>\n    <div>\n        ';
 Object.keys(data.user.services).forEach(function(serviceKey){ ;
__p += '\n            ' +
((__t = ( data.templates.SERVICE_CONTAINER({
                service: data.services[serviceKey],
                serviceItems: data.user.services[serviceKey],
                templates: data.templates,
                baselineStaticAssetsUrl: data.baselineStaticAssetsUrl
            }) )) == null ? '' : __t) +
'\n        ';
 }); ;
__p += '\n    </div>\n</div>';
return __p
};
export {template as default}
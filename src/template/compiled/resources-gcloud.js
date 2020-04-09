const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="bg-white overflow-hidden sm:rounded-lg sm:shadow sm:mb-4 sm:border-b sm:border-gray-200">\n    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">\n        <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">\n            <div class="ml-4 mt-4">\n                <div class="flex items-center">\n                    <div >\n                        <h3 class="text-lg leading-6 font-medium text-gray-900">\n                            Google Cloud Resources\n                        </h3>\n                    </div>\n                </div>\n            </div>\n            <div class="ml-4 mt-4 flex-shrink-0 flex">\n            </div>\n        </div>\n    </div>\n\n    ';
 data.resources.forEach((resource) => { ;
__p += '\n    <div>\n        <div class="flex items-center px-4 py-5 sm:px-6 bg-gray-100">\n            <h2 class="text-lg leading-5 font-medium text-gray-700">\n                ' +
((__t = ( resource.projectName )) == null ? '' : __t) +
'\n            </h2>\n        </div>\n    </div>\n    <div class="sm:mx-2 my-2">\n        <table class="text-left w-full rounded-md">\n            <thead>\n            <tr>\n                <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                    Role\n                </th>\n                <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                    Members\n                </th>\n            </tr>\n            </thead>\n                ';
 resource.projectIamPolicy.forEach((policy) => { ;
__p += '\n                    <tr class="text-gray-800">\n                        <td class="py-2 px-4" valign="top">\n                            ' +
((__t = ( policy.role )) == null ? '' : __t) +
'\n                        </td>\n                        <td class="py-2 px-4" valign="top">\n                            ' +
((__t = ( policy.members.join('<br />') )) == null ? '' : __t) +
'\n                        </td>\n                    </tr>\n                ';
 }) ;
__p += '\n        </table>\n    </div>\n    ';
 }); ;
__p += '\n</div>';
return __p
};
export {template as default}
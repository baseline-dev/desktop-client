const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="sm:mx-2 my-2">\n    <table class="text-left w-full rounded-md">\n        <thead>\n        <tr>\n            <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                Email\n            </th>\n            <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                Roles\n            </th>\n            <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                User Name\n            </th>\n        </tr>\n        </thead>\n        ';
 data.serviceItems.forEach((item) => { ;
__p += '\n            <tr class="text-gray-800">\n                <td class="py-2 px-4">\n                    ' +
((__t = ( item.user.email )) == null ? '' : __t) +
'<br />\n                </td>\n                <td class="py-2 px-4">\n                    ' +
((__t = (  item.user.permissions.join(", ")  )) == null ? '' : __t) +
'\n                </td>\n                <td class="py-2 px-4">\n                    <a href="' +
((__t = ( item.user.link )) == null ? '' : __t) +
'">' +
((__t = ( item.user.userName )) == null ? '' : __t) +
'</a>\n                </td>\n            </tr>\n        ';
 }); ;
__p += '\n    </table>\n</div>\n';
return __p
};
export {template as default}
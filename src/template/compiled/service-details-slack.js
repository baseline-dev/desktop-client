const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="sm:mx-2 my-2">\n    <table class="text-left w-full rounded-md">\n        <thead>\n            <tr>\n                <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                    Team Name\n                </th>\n                <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                    Permissions\n                </th>\n                <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                    Has MFA\n                </th>\n                <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                    Is Active\n                </th>\n                <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                    Is Bot\n                </th>\n            </tr>\n        </thead>\n        ';
  data.serviceItems.forEach((item) => { ;
__p += '\n        <tr class="text-gray-800">\n            <td class="py-2 px-4">\n                <a href="https://' +
((__t = ( item.service.teamDomain )) == null ? '' : __t) +
'.slack.com/admin" target="_blank" class="underline">\n                    ' +
((__t = ( item.service.teamName )) == null ? '' : __t) +
'\n                </a>\n            </td>\n            <td class="py-2 px-4">' +
((__t = (  item.user.permissions.join(", ")  )) == null ? '' : __t) +
'</td>\n            <td class="py-2 px-4"><i class="fas ';
 if (item.user.has2fa) { ;
__p += 'fa-check text-teal-800';
 } else { ;
__p += 'fa-times text-pink-800';
 } ;
__p += ' fa-1x"/></td>\n            <td class="py-2 px-4"><i class="fas ';
 if (item.user.isActive) { ;
__p += 'fa-check text-teal-800';
 } else { ;
__p += 'fa-times text-pink-800';
 } ;
__p += ' fa-1x"/></td>\n            <td class="py-2 px-4"><i class="fas ';
 if (item.user.isBot) { ;
__p += 'fa-check text-teal-800';
 } else { ;
__p += 'fa-times text-pink-800';
 } ;
__p += ' fa-1x"/></td>\n        </tr>\n        ';
 }); ;
__p += '\n    </table>\n</div>';
return __p
};
export {template as default}
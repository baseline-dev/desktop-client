const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="sm:mx-2 my-2">\n    <table class="text-left w-full rounded-md">\n        <thead>\n        <tr>\n            <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                Email\n            </th>\n            <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                Has MFA\n            </th>\n            <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                Is Admin\n            </th>\n        </tr>\n        </thead>\n        ';
 data.serviceItems.forEach((item) => { ;
__p += '\n            <tr class="text-gray-800">\n                <td class="py-2 px-4">\n                    ' +
((__t = ( item.user.email )) == null ? '' : __t) +
'<br />\n                </td>\n                <td class="py-2 px-4"><i class="fas ';
 if (item.user.has2Fa) { ;
__p += 'fa-check text-teal-800';
 } else { ;
__p += 'fa-times text-pink-800';
 } ;
__p += ' fa-1x"/></td>\n                <td class="py-2 px-4">\n                    <i class="fas ';
 if (item.user.isAdmin) { ;
__p += 'fa-check text-teal-800';
 } else { ;
__p += 'fa-times text-pink-800';
 } ;
__p += ' fa-1x"/>\n                </td>\n            </tr>\n        ';
 }); ;
__p += '\n    </table>\n</div>\n';
return __p
};
export {template as default}
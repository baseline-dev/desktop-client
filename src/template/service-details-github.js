const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="sm:mx-2 my-2">\n    <table class="text-left w-full rounded-md">\n        <thead>\n            <tr>\n                <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                    Organization\n                </th>\n                <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                    Organization enforces MFA\n                </th>\n            </tr>\n        </thead>\n        ';
 data.service.items.forEach((service) => { ;
__p += '\n        <tr class="text-gray-800">\n            <td class="py-2 px-4">\n                <a href="https://github.com/orgs/' +
((__t = ( service.organization.login )) == null ? '' : __t) +
'/people" target="_blank" class="underline">\n                    ' +
((__t = ( service.organization.login )) == null ? '' : __t) +
'\n                </a>\n            </td>\n            <td class="py-2 px-4"><i class="fas ';
 if (service.organization.enforces2fa) { ;
__p += 'fa-check text-teal-800';
 } else { ;
__p += 'fa-times text-pink-800';
 } ;
__p += ' fa-1x"/></td>\n        </tr>\n        ';
 }); ;
__p += '\n    </table>\n</div>\n';
return __p
};
export {template as default}
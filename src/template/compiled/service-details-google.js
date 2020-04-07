const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="sm:mx-2 my-2">\n    <table class="text-left w-full rounded-md">\n        <thead>\n        <tr>\n            <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                Email\n            </th>\n            <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                Has MFA\n            </th>\n            <th class="py-2 px-4 font-bold uppercase text-sm text-gray-600">\n                Is Admin\n            </th>\n        </tr>\n        </thead>\n        ';
 data.serviceItems.forEach((item) => { ;
__p += '\n            <tr class="text-gray-800">\n                <td class="py-2 px-4">\n                    ' +
((__t = ( item.userEmail )) == null ? '' : __t) +
'<br />\n                </td>\n                <td class="py-2 px-4">\n                    ';
 if (item.userHasMfa) { ;
__p += '\n                        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" fill="currentColor"\n                             viewBox="0 0 20 20">\n                            <path fill-rule="evenodd"\n                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"\n                                  clip-rule="evenodd"/>\n                        </svg>\n                    ';
 } else { ;
__p += '\n                        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-pink-400"  aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>\n                    ';
 } ;
__p += '\n                </td>\n                <td class="py-2 px-4">\n                    ';
 if (item.userIsAdmin) { ;
__p += '\n                        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" fill="currentColor"\n                             viewBox="0 0 20 20">\n                            <path fill-rule="evenodd"\n                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"\n                                  clip-rule="evenodd"/>\n                        </svg>\n                    ';
 } else { ;
__p += '\n                        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-pink-400"  aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>\n                    ';
 } ;
__p += '\n                </td>\n            </tr>\n        ';
 }); ;
__p += '\n    </table>\n</div>\n';
return __p
};
export {template as default}
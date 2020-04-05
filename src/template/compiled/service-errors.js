const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="bg-white overflow-hidden sm:rounded-lg sm:shadow sm:mb-4 sm:border-b sm:border-gray-200">\n    <div class="px-4 py-5 sm:px-6 grid gap-4">\n        ';
 Object.keys(data.errors).forEach(function(serviceKey){ ;
__p += '\n        <div class="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative" role="alert">\n            ' +
((__t = ( data.errors[serviceKey].message )) == null ? '' : __t) +
'\n            <a href="' +
((__t = ( data.errors[serviceKey].docs )) == null ? '' : __t) +
'" class="red text-sm cursor-pointer" target="_blank">\n                <span class="underline">Read the Docs</span>\n                <svg class="inline-block" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="14px" height="14px">\n                    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M15,22.5 c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S15.828,22.5,15,22.5z M17.068,15.5C16.406,16.111,16,16.512,16,17 h-2c0-1.389,0.949-2.265,1.711-2.97C16.51,13.292,17,12.799,17,12c0-1.103-0.897-2-2-2s-2,0.897-2,2h-2c0-2.206,1.794-4,4-4 s4,1.794,4,4C19,13.715,17.929,14.704,17.068,15.5z"/>\n                </svg>\n            </a>\n        </div>\n        ';
 }); ;
__p += '\n    </div>\n</div>';
return __p
};
export {template as default}
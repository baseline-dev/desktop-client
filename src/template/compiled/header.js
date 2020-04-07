const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="py-3 fixed bg-white w-full z-10 top-0" id="header">\n    <nav class="relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-24">\n        <div class="flex items-center flex-1">\n            <div class="flex items-center justify-between w-full md:w-auto">\n                <a href="/">\n                    <img class="h-8 w-auto sm:h-10" src="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/logo/logo.png" alt=""/>\n                </a>\n            </div>\n            <div class="hidden sm:-my-px sm:ml-6 sm:flex">\n                ';
 if (data.users && data.users.length) { ;
__p += '\n                <a href="#" :class="{ \'border-pink-500 font-medium\': tab === \'users\' }" @click="tab = \'users\'" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm leading-5 text-gray-900 focus:outline-none transition duration-150 ease-in-out">\n                    Users\n                </a>\n                ';
 } ;
__p += '\n                ';
 if (data.resources && Object.keys(data.resources).length) { ;
__p += '\n                <a href="#" :class="{ \'border-pink-500 font-medium\': tab === \'resources\' }" @click="tab = \'resources\'" class="ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm leading-5 text-gray-900 focus:outline-none transition duration-150 ease-in-out">\n                    Resources\n                </a>\n                ';
 } ;
__p += '\n            </div>\n        </div>\n        <div class="hidden md:block text-right">\n            <span class="inline-flex rounded-md shadow-md"></span>\n        </div>\n    </nav>\n</div>\n<script>\n  const header = document.getElementById(\'header\');\n  function handleHeader() {\n    if (window.pageYOffset > 10) {\n      header.classList.add(\'border-b\', \'border-gray-200\');\n    } else {\n      header.classList.remove(\'border-b\', \'border-gray-200\');\n    }\n  }\n  window.onscroll = handleHeader;\n  handleHeader();\n</script>';
return __p
};
export {template as default}
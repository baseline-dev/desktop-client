const template = function(data) {
var __t, __p = '';
__p += '<div class="py-3 fixed bg-white w-full z-10 top-0" id="header">\n    <nav class="relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-24">\n        <div class="flex items-center flex-1">\n            <div class="flex items-center justify-between w-full md:w-auto">\n                <a href="/">\n                    <img class="h-8 w-auto sm:h-10" src="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/logo/logo.png" alt=""/>\n                </a>\n            </div>\n            <div class="hidden md:block md:ml-10"></div>\n        </div>\n        <div class="hidden md:block text-right">\n            <span class="inline-flex rounded-md shadow-md"></span>\n        </div>\n    </nav>\n</div>\n<script>\n  const header = document.getElementById(\'header\');\n  function handleHeader() {\n    if (window.pageYOffset > 10) {\n      header.classList.add(\'border-b\', \'border-gray-200\');\n    } else {\n      header.classList.remove(\'border-b\', \'border-gray-200\');\n    }\n  }\n  window.onscroll = handleHeader;\n  handleHeader();\n</script>';
return __p
};
export {template as default}
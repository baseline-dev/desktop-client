const template = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">\n    <link rel="shortcut icon" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/favicon.ico">\n    <link rel="apple-touch-icon" sizes="57x57" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/apple-icon-57x57.png">\n    <link rel="apple-touch-icon" sizes="60x60" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/apple-icon-60x60.png">\n    <link rel="apple-touch-icon" sizes="72x72" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/apple-icon-72x72.png">\n    <link rel="apple-touch-icon" sizes="76x76" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/apple-icon-76x76.png">\n    <link rel="apple-touch-icon" sizes="114x114" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/apple-icon-114x114.png">\n    <link rel="apple-touch-icon" sizes="120x120" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/apple-icon-120x120.png">\n    <link rel="apple-touch-icon" sizes="144x144" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/apple-icon-144x144.png">\n    <link rel="apple-touch-icon" sizes="152x152" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/apple-icon-152x152.png">\n    <link rel="apple-touch-icon" sizes="180x180" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/apple-icon-180x180.png">\n    <link rel="icon" type="image/png" sizes="192x192"  href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/android-icon-192x192.png">\n    <link rel="icon" type="image/png" sizes="32x32" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/favicon-32x32.png">\n    <link rel="icon" type="image/png" sizes="96x96" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/favicon-96x96.png">\n    <link rel="icon" type="image/png" sizes="16x16" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/img/favicon/favicon-16x16.png">\n    <meta name="msapplication-TileColor" content="#ffffff">\n    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">\n    <meta name="theme-color" content="#ffffff">\n    <meta name="msapplication-config" content="https://static.Baseline.dev/web/favicon/browserconfig.xml">\n    <meta name="apple-mobile-web-app-capable" content="yes">\n    <meta name="mobile-web-app-capable" content="yes">\n    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n    \n    <title>Baseline Report</title>\n    <script src="https://kit.fontawesome.com/7d3ec3600d.js" crossorigin="anonymous"></script>\n    <link rel="stylesheet" href="' +
((__t = ( data.baselineStaticAssetsUrl )) == null ? '' : __t) +
'/css/style.css">\n</head>\n\n<body class="bg-gray-200 mt-20">\n' +
((__t = ( data.templates.HEADER({baselineStaticAssetsUrl: data.baselineStaticAssetsUrl}) )) == null ? '' : __t) +
'\n<div class="mt-8 mx-auto max-w-screen-xl sm:mt-12 sm:px-24 md:mt-20 xl:mt-24">\n    ';
 Object.keys(data.users).forEach(function(email){ ;
__p += '\n        ' +
((__t = ( data.templates.USER_ITEM({user: data.users[email], templates: data.templates}) )) == null ? '' : __t) +
'\n    ';
 }); ;
__p += '\n</div>\n</body>\n</html>\n';
return __p
};
export {template as default}
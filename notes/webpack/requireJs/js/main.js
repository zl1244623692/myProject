require.config({
	path: {
		'jquery': './tool/jquery' //默认的有.js
	}
})

require(['jquery'], function() {
	console.log($());
})
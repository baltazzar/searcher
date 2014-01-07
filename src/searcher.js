define(function(require, exports, module){

	var $ = require('jquery'),
		SearcherView = require('./views/search');

	require(['./templates']);

	$.fn.Searcher = function(options) {
		options.el = this;
		return new SearcherView(options);
	};
});
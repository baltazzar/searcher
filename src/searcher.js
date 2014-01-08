define(function(require, exports, module){

	var $ = require('jquery'),
		SearcherView = require('./views/searcher');

	$.fn.Searcher = function(options) {
		options.el = this;
		return new SearcherView(options);
	};
});
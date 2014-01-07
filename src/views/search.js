define(function(require, exports, module){

	var Marionette = require('marionette');

	module.exports = Marionette.ItemView.extend({
		template: 'grid/search.tpl',

		events: {
			'submit .form-search'  : 'doSearch',
			'keyup .search-param'  : 'resetCollection',
			'change .search-attrs' : function() { this.$('.search-param').focus(); }
		},

		initialize: function(options) {
			this.options = options;
			this.model = new Backbone.Model({});

			this.setSearchAttrs();
			this.render();

			if(this.options.logTemplate) {
				this.logTemplate();
			}
		},

		logTemplate: function() {
			var code = this.el.innerHTML;
			code = code.replace(/\n\n/g, '\n');
			console.log('#################### TEMPLATE DO SEARCHER ####################\n');
			console.log(code);
		},

		setSearchingText: function(reset) {
			var searchingText = this.options.searchingText ? this.options.searchingText : 'Buscando...';

			if(reset) {
				this.$('.btn-search').html(this.prevState);
			} else {
				this.prevState = this.$('.btn-search').html();
				this.$('.btn-search').html(searchingText);
			}
		},

		resetCollection: function(ev) {
			ev.preventDefault();

			var	queryObj = _.pick(this.collection.queryObj, 'itens_per_page'),
				that = this;

			if(ev.currentTarget.value == '') {
				this.setSearchingText();
				setTimeout(function() {
					that.collection.callFetch(queryObj).success(function() {
						that.setSearchingText('reset');
					});
				}, 100);
			}
		},

		doSearch: function(ev) {
			ev.preventDefault();

			var searchAttr = this.$('.search-attrs'),
				searchParam = this.$('.search-param'),
				query = {filter_fields: searchAttr.val() + '%' + searchParam.val()},
				that = this;

			this.setSearchingText();

			setTimeout(function() {
				if(searchParam != '') {
					that.collection.callFetch(query).success(function() {
						that.setSearchingText('reset');
					});
				}
			}, 100);
		},

		setSearchAttrs: function() {
			var searchAttrs = [];

			_.each(this.options.searchAttrs, function(v, k) {
				searchAttrs.push({attr: k, title: v});
			});

			this.model.set('searchAttrs', searchAttrs);
		}
	});
});
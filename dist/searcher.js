/**
 * Baltazzar Searcher
 * Versão: 0.1.1
 * Módulo front-end de busca de dados.
 * Autor: Victor Bastos
 */
this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["searcher/searcher.tpl"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n			<option value=\"";
  if (stack1 = helpers.attr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.attr); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Buscar por ";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\r\n		";
  return buffer;
  }

  buffer += "<div class=\"row\">\r\n	<div class=\"col-md-2\">\r\n		<select class=\"form-control input-sm search-attrs\">\r\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.searchAttrs), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</select>\r\n	</div>\r\n	<div class=\"col-md-4\">\r\n		<form class=\"form-search\" action=\"\">\r\n			<div class=\"input-group\">\r\n				<input type=\"text\" class=\"form-control input-sm search-param\" placeholder=\"Digite sua busca\">\r\n				<span class=\"input-group-btn\">\r\n					<button class=\"btn btn-sm btn-primary btn-search\"><i class=\"glyphicon glyphicon-search\"></i></button>\r\n				</span>\r\n			</div>\r\n		</form>\r\n	</div>\r\n</div>";
  return buffer;
  });
define("templates", function(){});

define('views/searcher',['require','exports','module','marionette'],function(require, exports, module){

	var Marionette = require('marionette');

	require(['../templates']);

	module.exports = Marionette.ItemView.extend({
		template: 'searcher/searcher.tpl',

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

			var	queryObj = _.omit(this.collection.queryObj, 'filter_fields'),
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
define('searcher',['require','exports','module','jquery','./views/searcher'],function(require, exports, module){

	var $ = require('jquery'),
		SearcherView = require('./views/searcher');

	$.fn.Searcher = function(options) {
		options.el = this;
		return new SearcherView(options);
	};
});
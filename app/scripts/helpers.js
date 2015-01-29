Handlebars.registerHelper('tamanioCol', function(numColumnas) {
	var _cols = Math.floor(12/parseFloat(numColumnas));
	return 'col-md-' + _cols + ' col-sm-' + _cols ;
});
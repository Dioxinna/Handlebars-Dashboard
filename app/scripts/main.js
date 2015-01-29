//Iniciamos Shadowbox
Shadowbox.init();


// cargamos los datos desde un json externo
//cuidado la estructura del json debe ser valida. Validar en jsonlint.com
$(function  () {
	//cargamos la cabecera
	$("cabecera").append (Handlebars.getTemplate("header.hbs"));
  $('cabecera .loader').removeClass('hidden');


  $('a#shadowB').trigger('click');
	

  //cargamos el contenido
  setTimeout (function(){
  	$.ajax({
  		dataType: "json",
  		url:'datos/datos.json',
  		success : function(data) {
  			var template = Handlebars.getTemplate("perfil.hbs");
  			var html	= template(data);
  			$('#content').fadeIn(1000).append (html);
        $('cabecera .loader').hide('slow');
        //trigger contenidos iniciales abiertos
        $( "a.open" ).trigger('click');
        $( "a.open" ).find('i.glyphicon-chevron-right').toggleClass( "glyphicon-chevron-down" );
  		},
  		async : false
  	});
  }, 2000);
});


//Dragable & Sortable
$(function() {
    $( ".column" ).sortable({
      connectWith: ".column",
      handle: ".panel-heading",
      cancel: ".portlet-toggle",
      items: '>:not(.disabled)',
      stop: function( event, ui ) {
        makeJson();
      },
      placeholder: "portlet-placeholder ui-corner-all"
    });
 
    $( ".portlet" )
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
      .find( ".panel-heading" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
 
    $( ".portlet-toggle" ).click(function() {
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".portlet" ).find( ".panel-body" ).toggle();
    });
  });

//LLamadas contenido modulos

$( ".container" ).on( "click", "div.panel a.collapsed" , function() {
  //cargamos el contenido
  var _dest = $(this).closest('div.panel').find('div.panel-body');
  var _url = $(this).closest('div').find('a').attr('data-url');
  var _this = $(this);
  _this.closest('div.panel').find('.loader').removeClass('hidden');
  _this.closest('div.panel').find('.green').addClass('sd0');
  _this.closest('div.panel').find('.red').addClass('sd05');
  _this.closest('div.panel').find('.blue').addClass('sd1');
  _this.closest('div.panel').find('.yellow').addClass('sd15');
  
  setTimeout (function(){

    $.ajax({
      dataType: "json",
      url: "datos/" + _url,
      success : function(data) {
        var html  = Handlebars.partials["contenido"](data);
        _dest.fadeIn(1000).html(html);
        _this.closest('div.panel').find('div.loader').hide('slow');
      },
      async : false
    });
  }, 2000);
   $(this).closest('i.glyphicon-chevron-right').removeClass('glyphicon-chevron-right');
   $(this).closest('i').addClass('glyphicon-chevron-bottom');


});

//envio Json con posiciones, estado de abierto y disabled

function makeJson (){
  $('div.column').each(function(columna,valor) {  
    var _this = $(this);   
    _this.find('div.panel').each(function(modulo,valor) {     
    }); 
  }); 
  createJSON();
}; 

function createJSON() {
  jsonObjMulti = [];
  $('div.column').each(function() {
    jsonObjMulti.push(columnUsers(this));
  });
  var _userSorter = JSON.stringify(jsonObjMulti,null,4);
  console.log(_userSorter);
  // $.ajax({
  // type: "POST",
  // url: "",
  // dataType: 'json',
  // data: _userSorter,
  // success: function(msg) 
  // {
  // alert(msg);
  // }
  // });
};

function columnUsers(column) {
  jsonObj = [];
  $(column).find('div.panel').each(function() {
  var _this = $(this);
  var numEmpleado = _this.attr('id');
  var nombre = _this.find('h4').text();
  var datosUrl = _this.find('div.panel a').attr('data-url');
  var openState = _this.find('a').attr('class').substring(0,5);
  var fixed = _this.attr('class').substring(0,8);

  if (openState != 'open') {
    openState = '';
  };
  if (fixed != 'disabled') {
    fixed = '';
  };

  var item = {}
  item ['numEmpleado'] = numEmpleado;
  item ['name'] = nombre;
  item ['datos'] = datosUrl;
  item ['open'] = openState;
  item ['disabled'] = fixed;
  jsonObj.push(item);
  });
  return jsonObj;
};

//Tuning Shadowbox

$( document ).on( "click", "#shadowB" , function() {
  $('.popup').empty();
  $(".popup").append (Handlebars.getTemplate("popup.hbs"));  
  Shadowbox.open({
      content:    $(".popup").html(),
      player:     "html",
      title:      "",
      height:     600,
      width:      800
  });
});

//Cambio colores fondo 

$(document).on('change', '#colorWidget,#colorFondo,#colorCabecera' , function () {
    var _thisAttr = $(this).attr('id');
    if (_thisAttr == 'colorWidget') {
      $('.panel-body').css('background-color', this.value);
      customColors();
    } else if (_thisAttr == 'colorCabecera') {
      $('.jumbotron').css('background-color', this.value);
      $('div.row.cabecera').css('background-color', this.value);
      customColors();
    } else {
      $('body').css('background-color', this.value);
      customColors();
    };
});

//Cambio tipografia cabecera

$(document).on('change','#tipoTitulo', function () {
    $('cabecera, #testTipo').removeClass();
    $('cabecera, #testTipo').addClass(this.value);
    $('body #tipoLetra').html( this.value ); 
    customColors();
});

//envio Json con colores y tipografias

function customColors() {
  jsonObj = [];

  var colorCabecera = $('.jumbotron').css('background-color');
  var colorFondo = $('body').css('background-color');
  var colorWidget = $('.panel-body').css('background-color');
  var tipoCabecera = $('cabecera').attr('class');
  var item = {}

  item ['color Cabecera'] = colorCabecera;
  item ['color Fondo'] = colorFondo;
  item ['color Widget'] = colorWidget;
  item ['tipografia Cabecera'] = tipoCabecera;

  jsonObj.push(item);

  console.log(JSON.stringify(jsonObj));
  // $.ajax({
  // type: "POST",
  // url: "",
  // dataType: 'json',
  // data: _userSorter,
  // success: function(msg) 
  // {
  // alert(msg);
  // }
  // });
};

// display flecha contenidos

$( document ).on( "click", "i.glyphicon-chevron-right" , function() {
  $( this ).toggleClass( "glyphicon-chevron-down" );
});

//hacer editable Titulo

$( document ).on( "click" , ".editableButton" , function(){
    var $div = $(this).closest('.row').find('.col-md-8'), 
    isEditable = $div.is('.editable');
    $( this ).closest('.row').find('.col-md-8').prop('contenteditable',!isEditable).toggleClass('editable').focus();  
    $( this ).toggleClass( "glyphicon-ok" );
});

//Actualizar datos de bloque

$( document ).on( "click" , ".refreshButton" , function(){
  var _dest = $(this).closest('div.panel').find('div.panel-body');
  var _url = $(this).closest('.row').find('.col-md-1 a').attr('data-url');
  var _this = $(this);
  _this.closest('div.panel').find('.loader').show('slow');
  _this.closest('div.panel').find('.green').addClass('sd0');
  _this.closest('div.panel').find('.red').addClass('sd05');
  _this.closest('div.panel').find('.blue').addClass('sd1');
  _this.closest('div.panel').find('.yellow').addClass('sd15');

  setTimeout (function(){

    $.ajax({
      dataType: "json",
      url: "datos/" + _url,
      success : function(data) {
        var html  = Handlebars.partials["contenido"](data);
        _dest.fadeIn(1000).html(html);
        _this.closest( ".panel-title").find('a.collapsed').trigger('click');
        _this.closest('div.panel').find('div.loader').hide('slow');
      },
      async : false
    });
  }, 2000);
});

//Spiner , Preloader

$(document).ready(function() {
  $('.green').addClass('sd0');
  $('.red').addClass('sd05');
  $('.blue').addClass('sd1');
  $('.yellow').addClass('sd15');
});



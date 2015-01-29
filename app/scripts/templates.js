Handlebars.getTemplate = function(name) {
    console.log("templates function working");
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
            url : 'templates/' + name,
            success : function(data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }

            Handlebars.templates[name] = Handlebars.compile(data);
            },
        async : false
        });
    }
    return Handlebars.templates[name];
};

Handlebars.registerPartial('contenido', Handlebars.getTemplate('contenido.hbs') );
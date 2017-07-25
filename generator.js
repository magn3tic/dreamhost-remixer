var fs = require('fs'),
		http = require('http'),
		path = require('path'),
		Handlebars = require('handlebars'),
		helpers = require('./helpers'),

//loads partials
loadPartials = function(dir) {
	var partials = fs.readdirSync(dir);
	for (var i in partials) {
    var	file = fs.readFileSync(dir+'/'+partials[i], {encoding:'utf8'}),
    		name = path.basename(partials[i],'.html');
    Handlebars.registerPartial(name, file+'\n');
	}
},

//render out page portion
loadPages = function(dir) {
	var pages = fs.readdirSync(dir),
			siteLayout = fs.readFileSync('src/layout.html', {encoding:'utf8'}),
			siteData = fs.readFileSync('src/site.json', {encoding:'utf8'}),
			siteData = JSON.parse(siteData);

	for (var i in pages) {
		var file = fs.readFileSync(dir+'/'+pages[i], {encoding:'utf8'}),
				name = path.basename(pages[i],'.html'),
				template = Handlebars.compile(siteLayout.replace('<page>', file));
		
		siteData.current_page_file = pages[i];
		siteData.current_page_name = name;
		siteData.debug = name === 'debug' ? true : false;

		console.log(name);

		console.log(siteData.seo[name]);

		siteData.seo = siteData.seo[name] ? siteData.seo[name] : '';
		
		var html = template(siteData);
		fs.writeFile('dist/'+name+'.html', html, function(err) {
			if (err) {return console.log(err);} 
		});
	}
},

buildSite = function() {
	helpers(Handlebars);
	loadPartials('src/partials');
	loadPages('src/pages');
};

//export generator()
module.exports.build = buildSite;
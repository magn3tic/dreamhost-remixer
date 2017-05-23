module.exports = function(Handlebars) {

	//comparison operator helper
	//example: {{#compare val1 val2 operator=">="}}
	Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
    if (arguments.length < 3) {throw new Error("Helper 'compare' needs 2 parameters");}
    var operator = options.hash.operator || "==",
    operators = {
      '==': function(l,r) { return l == r; },
      '===': function(l,r) { return l === r; },
      '!=': function(l,r) { return l != r; },
      '<': function(l,r) { return l < r; },
      '>': function(l,r) { return l > r; },
      '<=': function(l,r) { return l <= r; },
      '>=': function(l,r) { return l >= r; },
      'typeof': function(l,r) { return typeof l == r; }
    };
    if (!operators[operator]) {
    	throw new Error("Helper 'compare' doesn't know the operator "+operator);
    }
    var result = operators[operator](lvalue,rvalue);
    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
	});

  //repeat, like in foundation's panini
  Handlebars.registerHelper('repeat', function(count, options) {
    var str = '';
    for (var i = 0; i < count; i++) {
      str += options.fn(this);
    }
    return str;
  });
	
  //Output the current year
	Handlebars.registerHelper('year', function() {
		return new Date().getFullYear();
	});

  //Capitalize words in string
  Handlebars.registerHelper('capitalize', function(str) {
    return str.replace(/\w\S*/g, function(str) { 
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase(); 
    });
  });

  //Generate up to 100 chars loremipsum
  Handlebars.registerHelper('lorem', function(count) {
    var copy = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, voluptates similique vel placeat quibusdam nihil blanditiis eos omnis natus possimus reiciendis minima quisquam quaerat repellat, at. Rem ratione, eum, repellendus sit repudiandae dolorem, praesentium eligendi omnis quaerat reiciendis illo debitis distinctio facere aspernatur cum neque adipisci eveniet minus est quasi maxime recusandae qui. Ex soluta impedit placeat voluptas nisi voluptate, omnis, provident odio sint aut. Distinctio atque minus assumenda eveniet possimus, laudantium laboriosam voluptatum quasi, quis tenetur temporibus soluta culpa similique, nesciunt commodi accusamus laborum ab ipsa. Voluptas ullam, veritatis molestiae consequuntur, laboriosam corporis, porro ex animi laudantium beatae temporibus!",
    words = copy.split(' ');
  });

}
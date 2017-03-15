/*Hubiera sido bueno agregar documentación para poder identificar el uso de las
de estas funciones en la aplicación*/

var ejs = require('ejs');
var fs = require('fs')

var test_models = [
  {
    "name": "Casa",
    "fields":
      [
        {"name": "nombre", "type": "CharField", "options":{"max_length":20}},
        {"name": "direccion", "type": "PositiveSmallIntegerField", "options":{"max_length":20}},
      ],
  },
  {
    "name": "Casa2",
    "fields":
      [
        {"name": "nombre2", "type": "CharField", "options":{"max_length":20}},
        {"name": "direccion2", "type": "PositiveSmallIntegerField", "options":{"max_length":20}},
      ],
  },
];

function generateCode (models) {
  console.log(__dirname + '/templates/model_module.ejs')
  console.log(models);
  return ejs.renderFile(__dirname + '/templates/model_module.ejs', {models}, function(err, result) {
      if (!err) {
        fs.writeFile('models.py', result);
        console.log("RESULT");
        console.log(result);
        return result;
      }
      else {
        console.log(err);
        return err;
      }
  });
};

function get_field_data(fld) {
  var field = {"name": fld["name"], "options":{}}
  if(fld.isUnique){
    field["options"]["unique"] = "True"
  };
  if(fld.isReadOnly){
    field["options"]["editable"] = "False"
  };
  if(fld.defaultValue){
    field["options"]["default"] = "\"" + fld.defaultValue + "\""
  }
  if(fld.documentation){
    field["options"]["help_text"] = "\"" + fld.documentation + "\""
  }
  //console.log(fld);
  if (fld.type.startsWith("varchar")) {
    field["type"] = "CharField";
    field["options"]["max_length"] = fld.type.match(/\(([^)]+)\)/)[1];
    console.log(field);
  }
  else if (fld.type == "Text") {
    field["type"] = "TextField";
  }
  else if (fld.type == "decimal") {
    field["type"] = "DecimalField";
  }
  else if (fld.type == "Date") {
    field["type"] = "DateField";
  }
  else if (fld.type == "File") {
    field["type"] = "FileField";
  }
  else if (fld.type == "Email") {
    field["type"] = "EmailField";
  }
  else {
    field["type"] = "UNDEFINED";
  };
  console.log(field)
  return field;
}

function convert_mdj (uml) {
  var answer = [];
  uml.ownedElements[0].ownedElements.forEach(function callback(currentValue, index, array){
    console.log(currentValue["_type"]);
    console.log(currentValue["_type"]=="UMLClass")
    if(currentValue["_type"]=="UMLClass") {
      var model = {"name": currentValue["name"], "fields":[]}
      var attrs = currentValue["attributes"];
      for (var i=0; i<attrs.length; i++) {
        //console.log(attrs[i]);
        model["fields"].push(get_field_data(attrs[i]));
      }
      answer.push(model);
    };
  });
  cod = generateCode(answer);
  console.log("RETURN:")
  console.log(cod);
  return cod;
};

module.exports.convert_mdj = convert_mdj;
//generateCode(test_models)

//var code = ejs.render(template, {"models":models});

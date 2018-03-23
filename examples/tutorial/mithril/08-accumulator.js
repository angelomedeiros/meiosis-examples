/*global m*/

// -- Application code

var convert = function(value, to) {
  if (to === "C") {
    return Math.round( (value - 32) / 9 * 5 );
  }
  else {
    return Math.round( value * 9 / 5 + 32 );
  }
};

var createView = function(update) {
  var increase = function(model, amount) {
    return function(_event) {
      update({ value: model.value + amount });
    };
  };
  var changeUnits = function(model) {
    return function(_event) {
      var newUnits = model.units === "C" ? "F" : "C";
      var newValue = convert(model.value, newUnits);
      update({ value: newValue, units: newUnits });
    };
  };

  var view = function(model) {
    return [
      m("span", "Temperature: ", model.value),
      m.trust("&deg;"),
      m("span", model.units),
      m("div",
        m("button", { onclick: increase(model, 1) }, "Increase"),
        m("button", { onclick: increase(model,-1) }, "Decrease")
      ),
      m("div",
        m("button", { onclick: changeUnits(model) }, "Change Units")
      )
    ];
  };
  return view;
};

// -- Setup code

var update = m.stream();
var view = createView(update);

var initialModel = {
  value: 20,
  units: "C"
};

var models = m.stream.scan(function(model, value) {
  return Object.assign(model, value);
}, initialModel, update);

var element = document.getElementById("app");

models.map(function(model) {
  m.render(element, view(model));
});

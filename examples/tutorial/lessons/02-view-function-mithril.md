# Meiosis Tutorial

## 02 - View Function

In the previous lesson, [01 - Hello World](01-hello-world-mithril.html), we rendered a simple
message onto the page. Now, let's write a **function** that produces what to render. We'll call
this the **view**:

@flems mithril/02-view-function.js,app.html mithril

### View = function(model)

In the code above, `view` is a function that produces what to render. Since it is a function,
it can receive parameters - namely, the **model**. This is a plain JavaScript object that
represents the state of the application.

In our example, the model is a counter. We've created an **initial** model with a value of `0`.
When rendering with `m.render`, we pass the DOM element as before, but instead of directly
passing what to render, we pass the **result** of calling the `view` function with the value
`0`.

Within the `view` function, we can create a view as we see fit, using the `model`. In this
case, we are simply creating a `div` element with the text `Counter:` and the value that was
passed in.

This concept of having the view as a **function of the model** is important. The resulting
view depends only on what is passed in to the function. This makes it simple to write view
functions and understand how they work and what they are doing. The view is produced without
reaching out to external code, without pulling in state that is stored elsewhere, and so on.
It is just a simple function of the model.

### Exercises

1. Try changing what you pass in to the `view` function, and seeing the results.
1. Change the `view` function so that it produces something different.
1. Instead of passing a plain number to the `view` function, try passing in an object such as
`{ label: "The Counter", value: 0 }` as the model. Change the `view` function so that it uses the
model to produce the view.

When you are ready, continue on to [03 - Update Model](03-update-model-mithril.html).
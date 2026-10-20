# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
= Imperative UI means we manually tell the browser how to create and change elements. Declarative UI means we describe how the UI should look, and React handles updating it.

2. Why must a component name start with a capital letter?
= A component name must start with a capital letter so React can recognize it as a custom component instead of a normal HTML element.

3. What does a fragment <>...</> do, and why not just use a <div>?
= A fragment lets us group multiple elements without adding an extra HTML element to the page. It helps keep the HTML structure cleaner than using an unnecessary <div>.

4. Name one benefit of splitting the UI into small components.
= Splitting the UI into small components makes the code easier to read, maintain, and reuse. For example, we can use the Header component in different parts of an application without writing the same code again.

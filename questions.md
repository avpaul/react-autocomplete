1. **What is the difference between Component and PureComponent? give an example where it might break my app.**
   The main difference between a Component and a PureComponent in React is that the latter implements a shallow comparison of props and state to determine if a re-render is necessary. This means that if the props and state of a PureComponent have not changed, the component will not re-render. This can improve performance in some cases, but it can also lead to issues when dealing with complex data structures or nested objects. For example, if a PureComponent receives an object as a prop and one of its nested properties changes, the PureComponent might not re-render even though its output should be updated.

2. **Context + ShouldComponentUpdate might be dangerous. Can you think of why is that?**
   When using `Context` and `memo` or `shouldComponentUpdate` there is a risk of causing unintended re-renders. This is because React automatically re-renders all the children consuming that context. To avoid this, it is recommended to minimize global context values and ensure that components under a specific context provider tree should be affected by it.

3. **Describe 3 ways to pass information from a component to its PARENT.**
   Pass a callback function from the parent component to the child component as a prop. The child component can then call this function and pass the required data as an argument. Use the Context API to share data between components that are not directly connected in the component tree. The parent component can provide a value to the context, and the child component can consume it using the useContext hook. Use an event system, such as React's SyntheticEvent system, observables or any other pub-sub pattern to emit events from the child component that the parent component can listen to and respond to.

4. **Give 2 ways to prevent components from re-rendering.**
   For functional components use `React.memo` to wrap teh component, it accepts as parameter a function which decides if the component should re-render. In a class component, implement the `shouldComponentUpdate` to achieve the same as above.

5. **What is a fragment and why do we need it? Give an example where it might break my app.**
   A fragment is a way to group multiple elements together without creating a new node in the DOM. In most situations React only allows to render single elements, and in other situations you want to return multiple elements from a component, but you don't want to add unnecessary markup to the DOM. Most of the times Fragments are safe to use. Used improperly, such as when returning multiple elements from a component that are not wrapped in a parent element, they might break the UI or break the app.

6. **Give 3 examples of the HOC pattern.**
   High Order Components similar to high order functions creates a new function with additional functionality. In React it is used to share/reuse component functionality or inject props into other components. Examples from widely used React libraries includes: `react-redux connect(), react-router withRouter(), material-ui withStyles()` An example for a custom HOC component would be an HOC that checks if the user is authenticated and either renders the wrapped component or redirects to a login page.

7. **What's the difference in handling exceptions in promises, callbacks and async...await.**
   Promises use the catch method to handle errors that occur during the asynchronous operation. To create am exception when using in a promise you can reject it with the error. The most common pattern when using Callbacks is to pass an error as the first argument, and the result as the second argument. Async/await uses try/catch blocks to handle exceptions that occur within the async function.

8. **How many arguments does setState take and why is it async.**
   `setState` takes two arguments. The first argument is a value that represents the new state or a function which accept the previous value and returns the new value. The second argument is an optional callback function that is called after the state has been updated. `setState` is asynchronous because React may batch multiple updates together for performance reasons. For example, if you call setState multiple times within the same event loop, React may only perform the last update.

9. **List the steps needed to migrate a Class to Function Component.**
   Copy the existing code from the Class component into a new Function component.
   Identify the state variables and lifecycle methods and replace them with corresponding hooks, i.e: useState, useEffect, UseLayoutEffect, etc...
   Remove the constructor and any instance properties.
   Replace any instance methods with regular or arrow functions.
   If needed, use useRef or useMemo hooks to manage references or memoized values.
   Replace this.props with the props argument of the function component.

10. **List a few ways styles can be used with components.**
    There are multiple ways to style React components. Inline styles: styles can an be added directly to JSX elements using the style prop. This is useful for small, one-off styles. Any overuse especially heavy and frequent dom manipulations can slow down the application. CSS/SASS files: style files can be imported into the component using the import statement. This is useful for larger, reusable styles. CSS modules: CSS modules are used to scope styles to a specific component. This is useful for avoiding naming conflicts and making styles more modular, ie: passing props directly into style definitions. Styled components: using styled component (js) tools you can write CSS directly in your JavaScript code. This is useful for creating highly reusable and composable components.

11. **How to render an HTML string coming from the server.**
    Start by fetching the HTML string. It's highly advisable to sanitize the HTML string to reduce the risk of XSS attacks before rendering them into the app. Finally, use the `dangerouslySetInnerHTML` prop on JSXElements. This prop accepts an object with a `__html` key that contains the HTML string.

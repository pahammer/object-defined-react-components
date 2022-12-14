# object-defined-react-components

Building component instances from a JavaScript Object using the React.createElement API. <br>

In version 1, state is managed at the parent level and pushed down with props. When a component's count is incremented, all sibling components are rerendered. 

With version 2, a custom hook is used to manage the parent's state, which only changes when a component gets created or deleted. A child manages its own state locally. A child is responsible for forwarding changes up to the custom hook, where they can be stored within a React reference. The idea is to prevent rerenders of sibling components, while keeping the parent enformed of downstream updates.

TODO: Introduce TypeScript, Add additional component options.

![react.js]

## Main Idea

Initializing state with an array of React Element Objects.

<table><tr>
<td>From Object</td>
<td>To DOM</td>
</tr><tr>
<td> <img src="images/initial-state.png" alt="state" style="width: 450px;"/> </td>
<td> <img src="images/desktop-capture.png" alt="desktop" style="width: 450px;"/> </td>
</tr>

</table>

<table><tr>
<td>v1 - managing state at parent</td>
<td>v2 - managing state at child <br> and storing data with useRef</td>
</tr><tr>
<td> <img src="images/v1.gif" alt="state" style="width: 450px;"/> </td>
<td> <img src="images/v2.gif" alt="desktop" style="width: 450px;"/> </td>
</tr>

</table>

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[project-gif]: images/demo.gif

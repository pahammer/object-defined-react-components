import React, { useState } from "react";


function ButtonComponent({data, handleIncrement}){

    return (
        <button onClick={() => handleIncrement(data)} className="height:50px">{data.val} ++</button>
    )
}

function Counter({components, handleIncrement}) {
    return components.map((x => React.createElement(x.type, {data: x.props.data, handleIncrement, key:x.props.data.id}, x.children)));
}


export default function App() {

    const [components, setComponents] = useState([{type: ButtonComponent, props: {data: {val: 0, id:0}}, children: null}, 
    {type: ButtonComponent, props: {data: {val: 20, id:1}}, children: null}])


    // callback function
    const updateComponentData = (componentData) => {
        const updatedArray = [...components]
        updatedArray[componentData.id].props.data = {
            val: components[componentData.id].props.data.val + 1,
            id: components[componentData.id].props.data.id
        }
        setComponents(updatedArray)
    }

    const handleAdd = () => {
        setComponents([...components, {type: ButtonComponent, props: {data: {val: 0, id:components.length}}, children: null}]);
    }

    return (
        <div>
            <Counter components={components} handleIncrement={updateComponentData} />

            <div>
                <h1>values:</h1>
                <br />

                <ul>
                    {components.map((component, componentIdx) => (
                        <li key={componentIdx}>{component.props.data.val}</li>
                    ))}
                </ul>
            </div>

            <div>
                <button onClick={handleAdd}>Add Component</button>
            </div>
        </div>
    )
}
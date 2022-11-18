import React, { useRef, useState } from "react";

var counter = 1;

const componentMap = {
	button: { component: Counter, defaultData: { count: 0 } },
};

function Counter(props) {
	const [count, setCount] = useState(props.data.count);
	return (
		<div className="flex flex-col bg-purple-100 w-36 h-fit rounded-lg p-1 m-1">
			<button
				className="hover:bg-purple-200"
				onClick={() =>
					props
						.callback({
							argument: {
								data: { ...props.data, count: count + 1 },
							},
							action: "update",
						})
						.then(setCount(count + 1))
				}
			>
				Increment button # {props.data.id}
			</button>
			<button
				className="bg-purple-300 hover:bg-purple-400"
				onClick={() =>
					props.callback({
						argument: { id: props.data.id },
						action: "delete",
					})
				}
			>
				DELETE
			</button>
			<div
				onClick={() =>
					console.log(
						props.callback({
							argument: { id: props.data.id },
							action: "get",
						})
					)
				}
			>
				{count}
			</div>
		</div>
	);
}

function Wrapper({ components, callback = { callback } }) {
	return components.map((x) =>
		React.createElement(
			x.type,
			{
				data: x.props.data,
				callback,
				key: x.props.data.id,
			},
			x.children
		)
	);
}
function generateComponentObj(componentData) {
	const id = counter++;
	const data =
		typeof componentData.data !== "undefined"
			? componentData.data
			: componentMap[componentData.type].defaultData;
	return {
		componentData: {
			type: componentMap[componentData.type].component,
			props: { data: { ...data, id: id } },
			children: null,
		},
		id: id,
	};
}

function useCustomHook(initialDataArray) {
	const componentDataRef = useRef({});

	const initializeComponents = () => {
		return initialDataArray.map((initialData) => {
			const { componentData, id } = generateComponentObj(initialData);
			componentDataRef[id] = componentData.props;
			return componentData;
		});
	};

	const [components, setComponents] = useState(initializeComponents);

	const callback = async ({ argument, action }) => {
		switch (action) {
			case "add": {
				const { componentData, id } = generateComponentObj(argument);
				setComponents([...components, componentData]);
				componentDataRef[id] = componentData.props;
				return null;
			}
			case "delete": {
				setComponents(
					components.filter(
						(component) => component.props.data.id !== argument.id
					)
				);
				delete componentDataRef[argument.id];
				return null;
			}
			case "update": {
				componentDataRef[argument.data.id] = argument;
				return null;
			}
			case "get": {
				return componentDataRef[argument.id];
			}
		}
		throw Error("Unknown action: " + action);
	};
	return {
		components,
		callback,
	};
}

export default function App() {
	const { components, callback } = useCustomHook([
		{
			type: "button",
			data: { count: 27 },
		},
	]);

	return (
		<div className="flex flex-col space-y-2 items-center pt-8 px-4">
			<div className="flex flex-row w-full flex-wrap justify-center">
				<Wrapper components={components} callback={callback} />
			</div>

			<div>
				<button
					className="bg-gray-200 hover:bg-gray-300 w-fit h-12 rounded-lg py-1 px-3 m-1"
					onClick={() =>
						callback({
							argument: {
								type: "button",
							},
							action: "add",
						})
					}
				>
					Create New Button
				</button>
			</div>
		</div>
	);
}

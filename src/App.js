import React, { useState } from "react";

function ButtonComponent({ data, handleIncrement }) {
	return (
		<button
			className="bg-purple-100 w-24 h-fit rounded-lg p-1 m-1 hover:bg-purple-200"
			onClick={() => handleIncrement(data)}
		>
			Increment button {data.id + 1}
		</button>
	);
}

function Counter({ components, handleIncrement }) {
	return components.map((x) =>
		React.createElement(
			x.type,
			{ data: x.props.data, handleIncrement, key: x.props.data.id },
			x.children
		)
	);
}

export default function App() {
	const [components, setComponents] = useState([
		{
			type: ButtonComponent,
			props: { data: { val: 0, id: 0 } },
			children: null,
		},
		{
			type: ButtonComponent,
			props: { data: { val: 0, id: 1 } },
			children: null,
		},
	]);

	// callback function
	const updateComponentData = (componentData) => {
		const updatedArray = [...components];
		updatedArray[componentData.id].props.data = {
			val: components[componentData.id].props.data.val + 1,
			id: components[componentData.id].props.data.id,
		};
		setComponents(updatedArray);
	};

	const handleAdd = () => {
		setComponents([
			...components,
			{
				type: ButtonComponent,
				props: { data: { val: 0, id: components.length } },
				children: null,
			},
		]);
	};

	return (
		<div className="flex flex-col space-y-2 items-center pt-8 px-4">
			<div className="flex flex-row w-full flex-wrap justify-center">
				<Counter
					components={components}
					handleIncrement={updateComponentData}
				/>
			</div>

			<div>
				<ul>
					{components.map((component, componentIdx) => (
						<li key={componentIdx}>
							<div className="flex space-x-1">
								<p>
									Button {component.props.data.id + 1} count:
								</p>
								<p>{component.props.data.val}</p>
							</div>
						</li>
					))}
				</ul>
			</div>

			<div>
				<button
					className="bg-gray-200 hover:bg-gray-300 w-fit h-12 rounded-lg py-1 px-3 m-1"
					onClick={handleAdd}
				>
					Create New Button
				</button>
			</div>
		</div>
	);
}

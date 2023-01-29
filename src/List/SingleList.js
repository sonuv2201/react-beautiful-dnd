
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const SingleList = () => {
	const itemData = [
		{
			id: 'list-1',
			title: "Apple",
		},
    {
			id: 'list-2',
			title: "Samsung",
		},
    {
			id: 'list-3',
			title: "Pixel",
		},
    {
			id: 'list-4',
			title: "One Plus",
		},
	];

  const itemData2 = [
		{
			id: 'list-5',
			title: "Realme",
		},
    {
			id: 'list-6',
			title: "Xiami",
		},
    {
			id: 'list-7',
			title: "Intex",
		},
    {
			id: 'list-8',
			title: "Oppo",
		},
    {
			id: 'list-9',
			title: "Poco",
		},
	];

	const [data, setData] = useState(itemData);
	const [dataSecond, setDataSecond] = useState(itemData2);

	const handleDragEnd = (result) => {
		if (!result.destination) return;
    console.log(result);
		const items = Array.from(data);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		console.log(items);
		setData(items);
	};
	return (
		<div className="App-header">
			<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="list-a">
						{(provided) => (
							<ul className="listItem"
								{...provided.droppableProps}
								ref={provided.innerRef}
								sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
							>
								{data &&
									data.map((item, index) => {
										return (
											<Draggable key={item.id} draggableId={item.id.toString()} index={index}>
												{(provided) => (
													<li
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														elevation={2}
														sx={{ marginBottom: "10px" }}
													>
														{item.title}
													</li>
												)}
											</Draggable>
										);
									})}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>

          <Droppable droppableId="list-b">
						{(provided) => (
							<ul className="listItem"
								{...provided.droppableProps}
								ref={provided.innerRef}
								sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
							>
								{dataSecond &&
									dataSecond.map((item, index) => {
										return (
											<Draggable key={item.id} draggableId={item.id.toString()} index={index}>
												{(provided) => (
													<li
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														elevation={2}
														sx={{ marginBottom: "10px" }}
													>
														{item.title}
													</li>
												)}
											</Draggable>
										);
									})}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
		</div>
	);
};

export default SingleList;

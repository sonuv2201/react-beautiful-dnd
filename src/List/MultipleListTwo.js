import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const MultipleListTwo = () => {
	const itemData = [
		{
			id: 'list-1',
			title: "Apple",
      category:"type-a"
		},
    {
			id: 'list-2',
			title: "Samsung",
      category:"type-a"
		},
    {
			id: 'list-3',
			title: "Pixel",
      category:"type-a"
		},
    {
			id: 'list-4',
			title: "One Plus",
      category:"type-a"
		},
		{
			id: 'list-5',
			title: "Realme",
      category:"type-b"
		},
    {
			id: 'list-6',
			title: "Xiami",
      category:"type-b"
		},
    {
			id: 'list-7',
			title: "Intex",
      category:"type-b"
		},
    {
			id: 'list-8',
			title: "Oppo",
      category:"type-b"
		},
    {
			id: 'list-9',
			title: "Poco",
      category:"type-b"
		}
	];

  

	const [data, setData] = useState(itemData);
/* 	const [dataSecond, setDataSecond] = useState(itemData2);
 */
	const handleDragEnd = (result) => {
		if (!result.destination) return;

    console.log(result)

		if(result.destination.droppableId === result.source.droppableId){

			const items = Array.from(data);
			const [reorderedItem] = items.splice(result.source.index, 1);
			items.splice(result.destination.index, 0, reorderedItem);
			setData(items);

		}else{

			const items = Array.from(data);
			const [reorderedItem] = items.splice(result.source.index, 1);

			reorderedItem.category = result.destination.droppableId;

			if(result.source.index > result.destination.index){
				items.splice(result.destination.index, 0, reorderedItem);
			}else{
				items.splice(result.destination.index-1, 0, reorderedItem);
			}
			
			setData(items);
		}

	};


	let [category,setCategory] = useState(["type-a","type-b"])

	return (
		<div className="App-header">
			<DragDropContext onDragEnd={handleDragEnd}>
					
					{
						category.map((categoryItem,categoryIndex)=>
						<div key={`{category-index-${categoryIndex}}`}>
							<Droppable droppableId={categoryItem} >
						{(provided) => (
							<ul className="listItem"
								{...provided.droppableProps}
								ref={provided.innerRef}
								sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
							>
								{data &&
									data.map((item, index) => {
										if(item.category === categoryItem){
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
										}
										
									})}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
						</div>
						)
					}

          {/* <Droppable droppableId="list-b">
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
					</Droppable> */}
				</DragDropContext>
		</div>
	);
};

export default MultipleListTwo;

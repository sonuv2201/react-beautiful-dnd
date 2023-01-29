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
	];

  const itemData2 = [
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
	const [dataSecond, setDataSecond] = useState(itemData2);

	const handleDragEnd = (result) => {
		if (!result.destination) return;

    console.log(result)

    if(result.destination.droppableId === result.source.droppableId){
      if(result.destination.droppableId === 'list-a'){

        let tempData = sameParent({listItem:data,result:result})
		    setData(tempData);

      }
      if(result.destination.droppableId === 'list-b'){

        let tempData = sameParent({listItem:dataSecond,result:result})
		    setDataSecond(tempData);

      }
    }else if(result.destination.droppableId === 'list-a'){

      let listData = differentParent({source:dataSecond,destination:data,result:result});
      console.log(listData);
      setData(listData.destinationItem);
      setDataSecond(listData.sourceItem);

    } else if(result.destination.droppableId === 'list-b'){

      let listData = differentParent({source:data,destination:dataSecond,result:result});
      console.log(listData);
      setData(listData.sourceItem);
      setDataSecond(listData.destinationItem);
    }
		
	};


  const sameParent = ({listItem,result}) =>{
    
    const items = Array.from(listItem);
       
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);


      return items;
  }

  const differentParent = ({source,destination,result}) =>{
    let destinationItem = Array.from(destination);
      let sourceItem = Array.from(source);

      const [reorderedItem] = sourceItem.splice(result.source.index, 1);
      destinationItem.splice(result.destination.index, 0, reorderedItem);

      const data = {sourceItem, destinationItem}
      return data;
  }

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

export default MultipleListTwo;

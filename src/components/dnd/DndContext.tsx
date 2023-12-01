"use client"

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  DragOverEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
} from '@dnd-kit/sortable';
import {  startTransition, useId, useState } from 'react';
import { Item } from './Item';
import Container from './Container';
import AddItem from './AddItem';
import { updateKanbanInDb } from '@/server-actions/updateKanbanInDb';
import { toast } from 'sonner';
import {  useOptimistic } from 'react'


type propsTypes = {
  kanbanData:ContainerType[],
}


export default function DndContextWrapper({kanbanData}:propsTypes) {
  const id = useId()

  const [containers, setContainers] = useOptimistic( kanbanData,(_ , newContainers: ContainerType[]) => newContainers )

  const [activeContainer,setActiveContainer] = useState<ContainerStateType|null>(null)
  const [activeItem,setActiveItem] = useState<ItemDataType|null>(null)
  const sensors = useSensors(
    useSensor(MouseSensor,{activationConstraint: {distance:5,delay:10}}),
    useSensor(TouchSensor,{activationConstraint: {distance:5,delay:10}}),
    useSensor(PointerSensor,{activationConstraint: {distance:5}}),
  )

  const handleDragStart = (event:DragStartEvent)=> {
    const {active} = event
    const type : dndType = active.data.current?.type

    if(type === 'container') {
      const container = containers[containers.findIndex(container=> container.id === active.id)]

        setActiveContainer({
          id:active.id as number, 
          title:active.data.current?.title,
          itemsCount:container.items.length
        })
    }

    if(type === 'item') {
        setActiveItem({
          id:active.id,
          content:active.data.current?.content,
          parentId:active.data.current?.parentId
        })


    }

  }

  const handleDragEnd = async (event:DragEndEvent)=> {
    const {active,over} = event
    const activeType : dndType = active.data.current?.type
    const overType : dndType = over?.data.current?.type
    const activeParentId : number = active.data.current?.parentId
    const overParentId : number = over?.data.current?.parentId
    const activeId = active.id 
    const overId = over?.id 

    if(activeType === 'container' && overType === 'container' && activeId !== overId) {
      const activeIndex = containers.findIndex(col=> col.id === activeId)
      const overIndex = containers.findIndex(col=> col.id === overId)
      const newContainers = arrayMove(containers,activeIndex , overIndex)

      startTransition(()=> {
        setContainers(newContainers)
      })
      // optimistic update the kanban

      // Updating the kanban in db
      const result = await updateKanbanInDb(newContainers)
      result.error && toast.error('An error occured while swapping in database!')
    }

    else if (activeType === 'item' && overType === 'item') {

      if(activeId !== overId && activeParentId === overParentId) {
        const containersCopy : ContainersType = JSON.parse(JSON.stringify(containers))

        // Get the container index
        const containerIndex = containersCopy.findIndex(con=> con.id === activeParentId)

        // Define the index of the active and over items
        const activeIndex = containersCopy[containerIndex].items.findIndex(item=> item.id === activeId)
        const overIndex = containersCopy[containerIndex].items.findIndex(item=> item.id === overId)

        // Swap the activeIndex with the overIndex
        const items  = containersCopy[containerIndex].items
        const temp = items[activeIndex]
        items[activeIndex] = items[overIndex]
        items[overIndex] = temp
        
        // Resetting new containers
        startTransition(()=> {
          setContainers(containersCopy)
        })

        // Updating the kanban in db
        const result = await updateKanbanInDb(containersCopy)
        result.error && toast.error('An error occured while swapping in database!')

      }

      else if(activeId !== overId && activeParentId !== overParentId) {
        const containersCopy : ContainersType = JSON.parse(JSON.stringify(containers))

        // Defgine the containers indexes
        const activeContainerIndex = containersCopy.findIndex(con=> con.id === activeParentId)
        const overContainerIndex = containersCopy.findIndex(con=> con.id === overParentId)

        // Define activeIndex and overIndex within their containers
        const activeIndex = containersCopy[activeContainerIndex].items.findIndex(item=> item.id === activeId)
        const overIndex = containersCopy[overContainerIndex].items.findIndex(item=> item.id === overId)

        // Get references to the containers and their items
        const activeContainer = containersCopy[activeContainerIndex]
        const overContainer = containersCopy[overContainerIndex]

        // Extract the items to be swapped
        const activeItem = activeContainer.items.splice(activeIndex, 1)[0]
        const overItem = overContainer.items.splice(overIndex, 1)[0]
        
        // Insert the extracted items into their new locations
        activeContainer.items.splice(activeIndex, 0, overItem)
        overContainer.items.splice(overIndex, 0, activeItem)

        // Resetting new containers
        startTransition(()=> {
          setContainers(containersCopy)
        })

        // Updating the kanban in db
        const result = await updateKanbanInDb(containersCopy)
        result.error && toast.error('An error occured while swapping in database!')

      }

    }

    setActiveContainer(null)
    setActiveItem(null)
  }

  const handleDragOver = async (event:DragOverEvent)=> {
    const {active,over} = event
    const activeType : dndType = active.data.current?.type
    const overType : dndType = over?.data.current?.type
    const currentContainerId : number = active.data.current?.parentId
    const overContainerId : number = over?.id as number


    if (activeType === 'item' && overType === 'container' && currentContainerId !== overContainerId) {

      const containersCopy : ContainersType = JSON.parse(JSON.stringify(containers))

      const currentContainerIndex = containersCopy.findIndex(con=> con.id === currentContainerId)
      const overContainerIndex = containersCopy.findIndex(con=> con.id === overContainerId)
      const currentContainer = containersCopy[currentContainerIndex]
      const overContainer = containersCopy[overContainerIndex]
      const itemIndex = currentContainer.items.findIndex(item=> item.id === activeItem?.id)
      const item = currentContainer.items[itemIndex]

      // remove the item from the current container
      currentContainer.items.splice(itemIndex, 1)

      // add the item to the over container
      overContainer.items.push(item)

      // optimstic update the kanban
      startTransition(()=> {
        setContainers(containersCopy)
      })

      // Updating the kanban in db
      const result = await updateKanbanInDb(containersCopy)
      result.error && toast.error('An error occured while swapping in database!')
    }

  }


  return (
    <>

      <div className="mb-5">
        <AddItem containers={containers} setContainers={setContainers} />
      </div>

      <DndContext 
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
      
        <div className='grid grid-cols-1 auto-rows-fr md:flex gap-3 h-full md:flex-row'>
          <SortableContext items={containers.map(container=> container.id)}>

            {containers.map((container,i)=>
              <Container key={i} containerData={{id:container.id , title:container.title , itemsCount:container.items.length}} >
                <SortableContext items={containers.flatMap((container) => container.items.map((item) => item.id ))}>
                    <div className='flex flex-col gap-3 w-full'>
                      {
                        container.items.map(({id,content})=> <Item containers={containers} setContainers={setContainers}  key={id} itemData={{id,content,parentId:container.id}}/>)
                      }
                    </div>
                </SortableContext>
              </Container>
            )}

          </SortableContext>
        </div>

          <DragOverlay>

            { 
              activeContainer !== null && 
              <Container containerData={activeContainer} grabbing={true}>
                {                      
                  <div className='flex flex-col gap-3 w-full'>
                    {
                      containers[containers.findIndex(con=> con.id === activeContainer.id)].items.map(({content,id})=> <Item containers={containers} setContainers={setContainers}  key={id} itemData={{id,content,parentId:activeContainer.id}}/>)
                    }
                  </div>
                }
              </Container> 
            }


            {activeItem !== null && <Item containers={containers} setContainers={setContainers}  itemData={activeItem} grabbing={true}/>}

          </DragOverlay>

      </DndContext>


    </>
  )
}

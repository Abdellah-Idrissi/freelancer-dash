"use client"

import React, { Dispatch, SetStateAction } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import DeleteItem from './DeleteItem';

type propsTypes = {
  itemData:ItemDataType
  grabbing?:boolean
  containers:ContainerType[]
  setContainers: (action: ContainerType[]) => void
}

export function Item({itemData:{content,id,parentId},grabbing,containers,setContainers}:propsTypes) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging

  } = useSortable({
    id,
    data:{type:'item' , parentId , content}
  })

  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div  ref={setNodeRef} style={style} {...attributes} aria-describedby="" className={cn('breakword cursor-default bg-bgColor text-textColor flex items-center justify-between gap-x-3 p-2 border dark:border-neutral-700 rounded-md',`${isDragging && 'opacity-50'}`)}>

      <div {...listeners} className={cn('leading-none cursor-grab flex items-center self-center bg-slate-50 dark:bg-neutral-800 p-[2px] rounded-sm border dark:border-neutral-700 transition-colors duration-200',`${grabbing && 'cursor-grabbing'}`)}>        
        <PiDotsSixVerticalBold size={16}/>
      </div>

      <div className='flex-1 select-none'>{content}</div>

      <DeleteItem parentId={parentId} id={id} containers={containers} setContainers={setContainers} />

    </div>
  );
}
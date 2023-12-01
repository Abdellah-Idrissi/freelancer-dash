"use client"

import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { PiDotsSixVerticalBold } from 'react-icons/pi';


type propsTypes = {
  children:React.ReactNode
  containerData:ContainerStateType
  grabbing?:boolean
}

export default function Container({containerData : {id,title,itemsCount},children,grabbing}:propsTypes) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data:{type:'container' ,  title}
  })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const colorCondition = 
    title === 'todo' ? 'bg-orange-500' : 
    title === 'doing' ? 'bg-lime-500' : 
    title === 'done' ? 'bg-purple-500' : ''



  return (
    <div
      {...attributes}
      aria-describedby=""
      className={cn('flex-1 min-h-[400px] cursor-default bg-slate-50 dark:bg-neutral-800 border dark:border-neutral-700/60 p-4 rounded-md w-full',`${isDragging && 'opacity-50'} `)}
      ref={setNodeRef}
      style={style}
    >
      <div className='text-2xl mb-4 uppercase flex justify-between'> 

        <div className='flex gap-x-2 items-center select-none'>
          <p className={`w-[15px] h-[15px]  rounded-full ${colorCondition}`}></p>
          <div className='flex items-center gap-2'> 
            <p>{title}</p>

            <p className='text-xl'>
              (<span className='px-[2px]'>{itemsCount}</span>)
            </p>

          </div>
        </div>

        <div {...listeners} className={cn('leading-none cursor-grab flex items-center self-center bg-bgColor p-[2px] rounded-sm border dark:border-neutral-700 transition-colors duration-200',`${grabbing && 'cursor-grabbing'}`)}>        
          <PiDotsSixVerticalBold size={16}/>
        </div>

      </div>


      <div>{children}</div>
    </div>
  )
}

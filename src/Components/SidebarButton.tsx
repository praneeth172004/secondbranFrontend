import React from 'react'



interface SidebarButtonProps{
    variant:"primary" | 'secondary' | "danger" | "selected"
    size:"small" | "medium" | "large";
    text:string;
    StartIcon:React.ReactNode;
    onClick:()=>void
    
}

export const Variantclass:Record<SidebarButtonProps['variant'],string>={
    primary: ' flex w-full bg-white text-black',
    secondary: 'bg-grey-500 text-white',
    danger: 'bg-red-500 text-white',
    selected : 'flex w-full bg-gray-200  text-yellow'
}
 export const Sizeclass:Record<SidebarButtonProps['size'],string>={
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-[20px]',
 }
 
function SidebarButton(props:SidebarButtonProps) {
    const {variant,size,text,StartIcon,onClick}=props;
  return (
    <div>
    <button className={`${Variantclass[variant]} ${Sizeclass[size]}  rounded  flex items-center justify-between gap-10`} onClick={onClick}>
            {StartIcon}
            <span>{text}</span>
            
        </button>
       
        </div>
        
  )
}

export default SidebarButton
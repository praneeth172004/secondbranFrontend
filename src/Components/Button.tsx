import React from 'react';


interface ButtonProps {
    variant: 'primary' | 'secondary' | 'danger';
    size: 'small' | 'medium' | 'large';
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick?: () => void;
}
 export const Variantclass:Record<ButtonProps['variant'],string>={
    primary: 'bg-forbutton text-white',
    secondary: 'bg-gray-500 text-white',
    danger: 'bg-red-500 text-white',
 }

 export const Sizeclass:Record<ButtonProps['size'],string>={
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
 }

export default function Button(props: ButtonProps) {
    const {variant,size,text,startIcon,endIcon,onClick}=props;
  return (
    <button className={`${Variantclass[variant]} ${Sizeclass[size]} rounded shadow hover:opacity-80 transition-all duration-200 flex items-center justify-center gap-2`} onClick={onClick}>
        {startIcon}
        <span>{text}</span>
        {endIcon}
    </button>
  );
}

import { ButtonProps, Button as ShadcnButton } from '@/components/ui/button'
import { faCircleNotch, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<'button'> {
    isLoading?: boolean
    text?: string
    className?: string
    variant?: 'fill' | 'outline'
    disabled?: boolean
}

function Button({variant = 'outline', text, disabled = false, isLoading, className, ...props}: Props) {
    return ( 
        <ShadcnButton
            disabled={disabled}
            {...props}
            className={
                twMerge('flex gap-2 h-10 rounded-full',
                !text && 'w-10', 
                variant == 'fill' ? 'bg-[#0084FF]' : 'bg-white',
                disabled && 'opacity-50',
                className)}>
            {text && !isLoading && 
                <span className={variant == 'fill' ? 'text-white' : 'text-black'}>
                    {text}
                </span>}
            {!isLoading && 
                <FontAwesomeIcon 
                    icon={faPlay} 
                    className={variant == 'fill' ? 'text-white' : 'text-[#0084FF]'} />}
            {isLoading && 
                <FontAwesomeIcon 
                    icon={faCircleNotch}
                    className={twMerge('animate-spin', variant == 'fill' ? 'text-white' : 'text-[#0084FF]')} />}
        </ShadcnButton>
    );
}

export default Button;
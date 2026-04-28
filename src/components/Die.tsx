import '../styles/Die.css'
import clsx from 'clsx'

type DieProps = {
    value: number,
    isHeld: boolean,
    hold: () => void
}



export default function Die({value, isHeld, hold}:DieProps) {
    const className = clsx('key-button', isHeld && 'held')
    
    return (
        <button className={className} onClick={hold}>{value}</button>
    )
}
import {useState,useEffect} from 'react'

function Card({id,selected,isRemoved,name,emoji,handleChoice}) {
    const handleClick = ()=>{
        handleChoice(id)
    }
    return (
        <div 
        onClick={handleClick} 
        className={(selected===true?"card flipped":"card")+(isRemoved?" hidden":"")}
        >
            <div className='card_face card_face--front'>?</div>
            <div className='card_face card_face--back'>
                {emoji}              
            </div>
        </div>
    )
}

export default Card;
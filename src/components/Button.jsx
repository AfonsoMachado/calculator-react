import React from 'react'
import './Button.css'

export default props => 
    // Definindo as propiredades dos botões a serem exibidos na calculadora
    <button 
        onClick={e => props.click && props.click(props.label)}
        
        className={`
            button
            ${props.operation ? 'operation' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}>

        {props.label}
    </button>
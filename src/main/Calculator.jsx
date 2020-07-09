import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'


const initialState = {
    // Valor inicial da calculadora
    displayValue: '0',
    // Estado atual do display
    clearDisplay: false,
    // Operação sendo usada atualmente
    operation: null,
    // Valores sendo manipulados
    values: [0, 0],
    // Indice atual do array
    current : 0
}


export default class Calculator extends Component {
 
    state = { ...initialState }

    constructor(props) {
        
        super(props)
        // Funções para garantir o uso do this correto
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            // Ajustando parametros do estados
            // Adicionando a operação atual, manejando o array de valores para o segundo valor, e limpa o display
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            // Verificando se foi clicado no =
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            
            
            try {
                //Realizando a operação, o resultado fica no indice zero, e o segundo indice do array fica zerado para novos valores
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            
            values[1] = 0

            // definindo o novo estado da calculadora
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }
    
    addDigit(n) {
        // Evitar a existencia de dois pontos na calculadora
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        
        // se tem o numero zero, o display é limpo, previnindo que existam zeros antes do primeiro digito inserido
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        // Se precisar limpar o display, o valor corrente será vazio, senão será o valor que está atualmente no display
        const currentValue = clearDisplay ? '' : this.state.displayValue

        // Novo valor a ser colocado no display
        const displayValue = currentValue + n

        this.setState({displayValue, clearDisplay: false})

        if (n !== '.') {
            // Qual indice atual do array está sendo usado
            const i = this.state.current
            // Convertendo o valor atual do display para um float
            const newValue = parseFloat(displayValue)
            //Clonando o array
            const values = [...this.state.values]
            // adiciona o valor atual ao array de valores
            values[i] = newValue
            // Attribui um novo estado à calculadora
            this.setState({values})

            console.log(values)
        }
        
    }
    
    render() {

        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                {/* Botão AC ocupando três espaços */}
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation/>
                {/* Atribuindo tamanho double pro botao */}
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}
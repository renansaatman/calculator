const numberButtons = document.querySelectorAll('[number-btn]')
const operationButtons = document.querySelectorAll('[operation-btn]')
const allClearButton = document.querySelector('[all-clear-btn')
const deleteButton = document.querySelector('[delete-btn')
const equalsButton = document.querySelector('[equals-btn')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')

var currentOperand = ''
var previousOperand = ''
var operationSymbol
var resetCalculator = false

function clear() {
    currentOperand = ''
    previousOperand = ''
    operationSymbol = undefined
}

function del() {
    currentOperand = currentOperand.toString().slice(0, -1)
}

function appendNumber(number) { 
    if(number === '.' && currentOperand.includes('.')) return
    if(resetCalculator === true) {
        currentOperand = ''
        resetCalculator = false
    }
    currentOperand = currentOperand.toString() + number.toString()
}

function chooseOperation(operation) {
    if(currentOperand === '') return
    if(previousOperand !== '') {
        compute()
    }

    operationSymbol = operation
    previousOperand = currentOperand
    currentOperand = ''
}

function compute() {
    let computation
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)

    if(isNaN(prev) || isNaN(current)) return

    switch(operationSymbol) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default:
            return
    }

    currentOperand = computation
    operationSymbol = undefined
    previousOperand = ''
}

function getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]

    let integerDisplay
    if(isNaN(integerDigits)) {
        integerDisplay = ''
    }
    else {
        integerDisplay = integerDigits.toLocaleString('pt-br', {maximumFractionDigits: 0})
    }
    if(decimalDigits != null) {
        return `${integerDisplay},${decimalDigits}`
    }
    else {
        return integerDisplay
    }
}

function updateDisplay() {
    currentOperandTextElement.innerText = getDisplayNumber(currentOperand)
    if(operationSymbol != null){
        previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operationSymbol}`
    }
    else {
        previousOperandTextElement.innerText = ''
    }
}

allClearButton.addEventListener('click', button => {
    clear()
    updateDisplay()
})

deleteButton.addEventListener('click', button => {
    del()
    updateDisplay()
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText)
        updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText)
        updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    resetCalculator = true
    compute()
    updateDisplay()
})


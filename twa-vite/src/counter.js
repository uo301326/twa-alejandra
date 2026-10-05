export function setupCounter(element, initialValue = 10) {
  let counter = initialValue
  
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
    // Actualiza el título de la pestaña del navegador
    document.title = `Contador: ${counter}`
  }

  // Al hacer clic, resta 1 
  element.addEventListener('click', () => setCounter(counter - 1))
  
  // Establece el valor inicial
  setCounter(counter)
}
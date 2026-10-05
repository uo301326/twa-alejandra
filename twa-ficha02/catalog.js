//elementos de la categoria que se pasa por parametro
export const byCategory = (list, cat) => {
    return list.filter(item => item.category === cat);
}

//elementos cuyos nombres o tags contengan la palabra "text"(mayúscula o minúscula)
export const search = (list, text) => {
    return list.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase()))
    );
};

//suma de los precios de todos los elementos de la lista
export const total = (list) => {
    return list.reduce((sum, item) => sum += item.price, 0);
}

//los n más caros, devuelve un nuevo array por órden descendente de precios
export const top = (list, n) => {
    return list.toSorted((a,b) => b.price - a.price).slice(0,n);
}

//muestra las categorias que hay ordenadas (sin repetir nombres)
export const categories = (list) => {
    const todasCategorias = list.map(item => item.category);
    const unicas = new Set(todasCategorias);
    const resultado = [...unicas];
    return resultado.toSorted();
}

//muestra los nuevos items con un porcentaje(pct) de descuento, originales sin tocar
export const withDiscount = (list, pct) => {
    return list.map(item => ({
        ...item, //dejamos todos los campos igual sin modificar
        price: item.price * (1 - pct/100)
    }));
}
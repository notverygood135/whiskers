function filterByPrice(products, min, max) {
    const filtered = products?.filter(product => 
        (min ? product.props.children.props.discountedPrice >= min : true)
        && (max ? product.props.children.props.discountedPrice <= max : true)
    );
    return filtered;
}

export default filterByPrice;
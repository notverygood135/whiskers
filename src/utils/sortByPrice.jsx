function sortByPrice(products) {
    products?.sort((a, b) => {
        return b.props.price - a.props.price
    });
    return products;
}

export default sortByPrice;
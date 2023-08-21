function sortByPrice(products) {
    products?.sort((a, b) => {
        return a.props.children.props.discountedPrice - b.props.children.props.discountedPrice
    });
    return products;
}

export default sortByPrice;
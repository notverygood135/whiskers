function sortByDiscount(products) {
    products?.sort((a, b) => {
        return b.props.discount - a.props.discount
    });
    return products;
}

export default sortByDiscount;
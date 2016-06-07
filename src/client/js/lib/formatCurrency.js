
export function calculatePrice(defaultPrice, discountPrice) {
    var p1 = parseFloat(defaultPrice, 10) * 100;
    var p2 = parseFloat(discountPrice, 10) * 100;
    var price = p1 - p2;
    return price / 100;
}

export function displayPrice(defaultPrice, discountPrice) {
    return display(calculatePrice(defaultPrice, discountPrice));
}

function display(number) {
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

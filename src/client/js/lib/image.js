import {baseMediaURL} from '../constants';


function getImageUrl(image, dimensions, direction) {
    var x1, x2, y1, y2, top, left, width, height, resizeWidth, resizeHeight, cut;

    if (dimensions) {
        cut = dimensions.split(',');            //(x1, y1), (x2, y2)

        x1 = parseInt(cut[0], 10);
        y1 = parseInt(cut[1], 10);
        x2 = parseInt(cut[2], 10);
        y2 = parseInt(cut[3], 10);

        left = x1;
        top = y1;
        width = x2 - x1;
        height = y2 - y1;

        if (direction === 'horizontal') {
            resizeWidth = 820;
            resizeHeight = 230;
        } else {
            resizeWidth = 222;
            resizeHeight = 400;
        }

        return `${baseMediaURL}resize/${top}/${left}/${width}/${height}/${resizeWidth}/${resizeHeight}/${image}`;

    }

    return baseMediaURL + image;
}

function getVerticalImage(voucher) {
    return getImageUrl(voucher.image, voucher.vertical_image, 'vertical');
}

function getHorizontalImage(voucher) {
    return getImageUrl(voucher.image, voucher.horizontal_image, 'horizontal');
}


module.exports = {
    getImageUrl: getImageUrl,
    getVerticalImage: getVerticalImage,
    getHorizontalImage: getHorizontalImage
};

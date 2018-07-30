const browser = require('../../../lib/browser');
const Coordinate = require('../components/fieldCoordinate.jsx');
const Gallery = require('../components/gallery.jsx');

browser.renderComponentToDom({ AppComponent: Coordinate, domSelector: '#coordinate' });
browser.renderComponentToDom({ AppComponent: Gallery, domSelector: '#galleryDropdown' });

const Enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
// const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });
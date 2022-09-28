import { mount } from "enzyme";
import Pokedex from '../components/Pokedex';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch'
import App from "../App";


describe("Test App component", () => {
    test('renders APP component', () => {
      const wrapper =mount(<App />);
      expect(wrapper.find('Pokedex')).toHaveLength(1);
      
    });

})
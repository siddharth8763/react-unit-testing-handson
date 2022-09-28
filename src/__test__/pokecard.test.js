// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom'
import { mount } from "enzyme";
import PokeCard from '../components/pokecard';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch'
const samplePokmon = {
    "id": 1,
    "num": "001",
    "name": "Bulbasaur",
    "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
    "type": [
      "Grass",
      "Poison"
    ],
    "height": "0.71 m",
    "weight": "6.9 kg",
    "candy": "Bulbasaur Candy",
    "candy_count": 25,
    "egg": "2 km",
    "spawn_chance": 0.69,
    "avg_spawns": 69,
    "spawn_time": "20:00",
    "multipliers": [1.58],
    "weaknesses": [
      "Fire",
      "Ice",
      "Flying",
      "Psychic"
    ],
    "next_evolution": [{
      "num": "002",
      "name": "Ivysaur"
    }, {
      "num": "003",
      "name": "Venusaur"
    }]
  }

describe("Test PokeCard component", () => {
  test('Test snapshot', () => {
    
    const wrapper =mount(<MemoryRouter><PokeCard {...samplePokmon } /></MemoryRouter>);
    const PokeCardComp = wrapper.find('Pokecard');
    expect(PokeCardComp).toMatchSnapshot();

  });
  test('renders PokeCard component', () => {
    const wrapper =mount(<MemoryRouter><PokeCard {...samplePokmon } /></MemoryRouter>);
    const PokeCardComp = wrapper.find('Pokecard');
    expect(PokeCardComp.find(`[data-testid=\"pokecard-${samplePokmon.id}\"]`)).toHaveLength(1) ;
    
    /** Using react testing library */
    // let component = render(<BrowserRouter><PokeCard {...samplePokmon } /></BrowserRouter>);
    // const linkElement = component.getByTestId(`pokecard-${samplePokmon.id}`); 
    // expect(linkElement).toBeInTheDocument();
    
  })

  test('renders Pok image in the rendered component', () => {

    const wrapper =mount(<MemoryRouter><PokeCard {...samplePokmon } /></MemoryRouter>);
    const PokeCardComp = wrapper.find('Pokecard');
    expect(PokeCardComp.childAt(0).childAt(0).childAt(0).find('img').prop('src')).toEqual (samplePokmon.img) ;

    /** Using react testing library */
    // let component = render(<BrowserRouter><PokeCard {...samplePokmon } /></BrowserRouter>);
    // const linkElement = component.getByAltText(`pok-image`); 
    // expect(linkElement).toBeInTheDocument();
    // expect(linkElement).toHaveAttribute('src', samplePokmon.img);
  })

  test('renders passed pok name', () => {

    const wrapper =mount(<MemoryRouter><PokeCard {...samplePokmon } /></MemoryRouter>);
    const PokeCardComp = wrapper.find('Pokecard');
    expect(PokeCardComp.childAt(0).find('.pok-info').find('.pok-name').text()). toEqual(`${samplePokmon.name}`);

    /** Using react testing library */
    // let component = render(<BrowserRouter><PokeCard {...samplePokmon } /></BrowserRouter>);
    // const linkElement = component.getByTestId(`pokname`); 
    // expect(linkElement.textContent).toEqual(samplePokmon.name);
    
  })

  test('renders passed pok number', () => {

    const wrapper =mount(<MemoryRouter><PokeCard {...samplePokmon } /></MemoryRouter>);
    const PokeCardComp = wrapper.find('Pokecard');
    expect(PokeCardComp.childAt(0).find('.pok-info').find('.pok-id').text()). toEqual(`#${samplePokmon.num}`);;

    /** Using react testing library */
    // let component = render(<BrowserRouter><PokeCard {...samplePokmon } /></BrowserRouter>);
    // const linkElement = component.getByTestId(`pokid`); 
    // expect(linkElement.textContent).toEqual(`#${samplePokmon.num}`);
  })

  test('renders pok types for current pokemon', () => {
    const wrapper =mount(<MemoryRouter><PokeCard {...samplePokmon } /></MemoryRouter>);
    const PokeCardComp = wrapper.find('Pokecard');
    const abilitiesComp = PokeCardComp.childAt(0).find('.pok-info').find('.abilities');
    expect(abilitiesComp.find(`#ability${samplePokmon.type[0]}`)).toHaveLength(1);
    expect(abilitiesComp.find(`#ability${samplePokmon.type[1]}`)).toHaveLength(1);

    /** Using react testing library */
    // let component = render(<BrowserRouter><PokeCard {...samplePokmon } /></BrowserRouter>);
    // const linkElement1 = component.getByText(samplePokmon.type[0]); 
    // expect(linkElement1).toBeInTheDocument();

    // const linkElement2 = component.getByText(samplePokmon.type[1]); 
    // expect(linkElement2).toBeInTheDocument();
  })
  
})
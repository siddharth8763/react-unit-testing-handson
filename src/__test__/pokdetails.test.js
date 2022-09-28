// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom'
import { mount } from "enzyme";
import PokDetails from '../components/pokdetails';
import Pokedex from '../components/Pokedex';
import { act } from "react-dom/test-utils";
import { MemoryRouter, Router, Switch, Route, Routes } from 'react-router-dom';
import 'whatwg-fetch'
// const renderComponent = ({ pokId }) =>
//   render(
//     <MemoryRouter initialEntries={[`/details/${pokId}`]}>
//         <Routes>
//             <Route path="/details/:pokId" element={<PokDetails />}>
                
//             </Route>
//         </Routes>
//     </MemoryRouter>
//   );

global.scrollTo = jest.fn();

const samplePokmon = {
    "id": 2,
    "num": "002",
    "name": "Ivysaur",
    "img": "http://www.serebii.net/pokemongo/pokemon/002.png",
    "type": [
      "Grass",
      "Poison"
    ],
    "height": "0.99 m",
    "weight": "13.0 kg",
    "candy": "Bulbasaur Candy",
    "candy_count": 100,
    "egg": "Not in Eggs",
    "spawn_chance": 0.042,
    "avg_spawns": 4.2,
    "spawn_time": "07:00",
    "multipliers": [
      1.2,
      1.6
    ],
    "weaknesses": [
      "Fire",
      "Ice",
      "Flying",
      "Psychic"
    ],
    "prev_evolution": [{
      "num": "001",
      "name": "Bulbasaur"
    }],
    "next_evolution": [{
      "num": "003",
      "name": "Venusaur"
    }]
  }

  const waitForComponentToRender = async (wrapper) => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      wrapper.update();
    });
 };

describe("Test PokDetails component", () => {
  let wrapperComp;

  beforeEach(() => {
    wrapperComp = mount(
          <MemoryRouter initialEntries={[`/details/2`]}>
                         <Routes>
                          <Route path={"/details/:pokId"} element={<PokDetails />}>
                            
                          </Route>    
                          </Routes>
                    </MemoryRouter>
      );
  });

  test('Test snapshot', () => {
    
    const PokeDetailsComp = wrapperComp.find('PokDetails');
    expect(PokeDetailsComp).toMatchSnapshot();

  });
  

  test('renders PokDetails component', async() => {

      
      const PokeDetailsComp = wrapperComp.find('PokDetails');
      expect(PokeDetailsComp.find(`[data-testid="pok-details-container"]`)).toHaveLength(1) ;


      /** Using react testing library */
      // const { getByTestId } = renderComponent({ pokId: 2 });
      // const comp = getByTestId('pok-details-container');
      
      // expect(comp).toBeInTheDocument();
    })

    test("renders Pokemon's number, name, height and weight component", async() => {
        
      
      
      const PokeDetailsComp = wrapperComp.find(PokDetails);
      await waitForComponentToRender(PokeDetailsComp);
      await PokeDetailsComp.update();
      
      expect(PokeDetailsComp.find(`[data-testid="pok-details-pok-num"]`).text()).toEqual(`#${samplePokmon.num}`) ;
      expect(PokeDetailsComp.find('.pokedex-pokemon-details').find('.abilities').find('.pok-details-pok-height').text()).toEqual(samplePokmon.height);
      expect(PokeDetailsComp.find('.pokedex-pokemon-details').find('.abilities').find('.pok-details-pok-weight').text()).toEqual(samplePokmon.weight);
      
      const pokemonTypesLength = PokeDetailsComp.find('.pokedex-pokemon-details').find('.abilities').find('.abilities-pokdetails-type-container').render().children().length;
      const pokemonWeaknessesLength = PokeDetailsComp.find('.pokedex-pokemon-details').find('.abilities').find('.abilities-pokdetails-weakness-container').render().children().length;
      expect(pokemonTypesLength).toEqual(samplePokmon.type.length);
      expect(pokemonWeaknessesLength).toEqual(samplePokmon.weaknesses.length);

      /** Using react testing library */
        // const { getByTestId, getAllByTestId } = renderComponent({ pokId: 2 });
        
        // await waitFor(() => {
        //     const comp = getByTestId('pok-details-pok-num');
        //     expect(comp.textContent).toEqual(`#${samplePokmon.num}`);
        //     expect(getByTestId('pok-details-pok-height').textContent).toEqual(samplePokmon.height);
        //     expect(getByTestId('pok-details-pok-weight').textContent).toEqual(samplePokmon.weight);
        //     expect(getAllByTestId(/pok-details-pok-types-/)).toHaveLength(samplePokmon.type.length);
        //     expect(getAllByTestId(/pok-details-pok-weaknesses-/)).toHaveLength(samplePokmon.weaknesses.length);
        // })
    })

    test("renders Pokemon's pre-evolution, current and next evolution", async() => { 
      const PokeDetailsComp = wrapperComp.find(PokDetails);
      await waitForComponentToRender(PokeDetailsComp);
      await PokeDetailsComp.update();

      const evolutionPokCards = PokeDetailsComp.find('.pokedex-pokemon-details').find('.evolution-container').find('.evolution-cards ul').render().find('.li');
      const countToMatch = (samplePokmon.prev_evolution.length || 0) + 1 + (samplePokmon.next_evolution.length || 0);
      expect(evolutionPokCards).toHaveLength(countToMatch);

      /** Using react testing library */
        // const { getByTestId, getAllByTestId } = renderComponent({ pokId: 2 });
        // await waitFor(() => {
        //     const comp = getAllByTestId(/pokecard-/);
        //     const countToMatch = (samplePokmon.prev_evolution.length || 0) + 1 + (samplePokmon.next_evolution.length || 0);
        //     expect(comp).toHaveLength(countToMatch);
        // })
    })


})
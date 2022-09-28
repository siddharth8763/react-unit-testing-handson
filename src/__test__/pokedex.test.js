// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mount, shallow } from "enzyme";
// import '@testing-library/jest-dom'
import Pokedex from '../components/Pokedex';
import { MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch'


describe("Test Pokedex component", () => {

  test('Test snapshot', () => {
    
    const wrapper =mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    const PokedexComp = wrapper.find('Pokedex');
    expect(PokedexComp).toMatchSnapshot();
  });

  test('renders Pokedex component', () => {
    const wrapper =mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    expect(wrapper.find('Pokedex').childAt(0).find(".pokedex-title").text()).toEqual("Pokédex");
    
    /** Using react testing library */
    // render(<Pokedex />);
    // const linkElement = screen.getByText(/Pokédex/i);
    // expect(linkElement).toBeInTheDocument();
  });


  test('renders Pokedex animation component', () => {
    const wrapper =mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    expect(wrapper.render().find(".pok-icon-pokedex")).toHaveLength(1)

    /** Using react testing library */
    // render(<Pokedex />);
    // const pokAnimationComp = screen.getByTestId("pok-animation");
    // expect(pokAnimationComp).toBeInTheDocument();
  });
  

  test('render SearchBox child component', () => {


    const wrapper =mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    expect(wrapper.find('SearchBox')).toHaveLength(1);


    /** Using react testing library */
    // const component = render(<Pokedex />);
    // const searchboxComp = component.getByLabelText('Name or Number');
    // expect(searchboxComp).toBeInTheDocument();
  })

  test('render AdvancedSearch child component', () => {
    
    const wrapper =mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    expect(wrapper.find("AdvancedSearch")).toHaveLength(1);

    /** Using react testing library */
    // const component = render(<Pokedex />);
    // const AdvSearchComp = component.getByText('Show Advanced Search');
    // expect(AdvSearchComp).toBeInTheDocument();
  })

  test('render Pok list container and pokecards', async() => {
    
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();
    const pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    expect(pokListContainer).toBeTruthy()
    const pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(151);

    /** Using react testing library */
    // const component = render(<BrowserRouter><Pokedex /></BrowserRouter>);
    // await waitFor(() =>{ 
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(151);
    // })
    

  })

  test('Test searchbox filtering', async() => {

    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();
    const inputCtrl = wrapper.find("Pokedex").childAt(0).children().find("[data-testid=\"searchbox-input\"]");
    inputCtrl.simulate('change',  {target: {value: 'char'}});

    const searchbtnCtrl = wrapper.find("Pokedex").childAt(0).children().find("[data-testid=\"searchboxSearchbtn\"]");
    searchbtnCtrl.simulate("click");

    const pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    const pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(3);


    /** Using react testing library */
    // const component = render(<MemoryRouter><Pokedex /></MemoryRouter>);
    
    // await waitFor(() =>{
    //   const inputCtrl = component.getByTestId('searchbox-input');
    //   fireEvent.change(inputCtrl, {target: {value: 'char'}});
    //   const searchboxSearchbtn = component.getByTestId('searchboxSearchbtn');
    //   fireEvent.click(searchboxSearchbtn);
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(3);

    // });
  })

  test('Test advanced search and reset functionality', async() => {
    
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();

    const pokDexContainer = wrapper.find("Pokedex").childAt(0).children();
    const advSearchAccordion = pokDexContainer.find("#advancedSearch").at(1);
    

    advSearchAccordion.simulate('click');

    const typeFlyingbtn = pokDexContainer.find("[data-testid=\"type-Flying\"]");
    const typeFirebtn = pokDexContainer.find("[data-testid=\"type-Fire\"]");
    const advSearchBtn = pokDexContainer.find("[data-testid=\"advSearchBtn\"]");
    const resetBtn = pokDexContainer.find("[data-testid=\"resetBtn\"]");

    typeFlyingbtn.simulate("click");
    typeFirebtn.simulate("click");
    advSearchBtn.simulate("click");


    const pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    const pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(2);


    resetBtn.simulate("click");
    const pokListContainer2 = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    const pokCards2 = pokListContainer2.childAt(0).children();
    expect(pokCards2).toHaveLength(151);
    

    const weakGrassbtn = pokDexContainer.at(2).find("Accordion").find(".pokedex-filter-tw-list").find("li > span.weakness-selector-Grass");
    const weakWaterbtn = pokDexContainer.at(2).find("Accordion").find(".pokedex-filter-tw-list").find("li > span.weakness-selector-Water");
    const weakGroundbtn = pokDexContainer.at(2).find("Accordion").find(".pokedex-filter-tw-list").find("li > span.weakness-selector-Ground");
    const weakIcebtn = pokDexContainer.at(2).find("Accordion").find(".pokedex-filter-tw-list").find("li > span.weakness-selector-Ice");

  


    weakGrassbtn.simulate("click");
    weakWaterbtn.simulate("click");
    weakGroundbtn.simulate("click");
    weakIcebtn.simulate("click");
    advSearchBtn.simulate("click");

    expect(wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container").childAt(0).children()).toHaveLength(6);

    resetBtn.simulate("click");
    expect(wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container").childAt(0).children()).toHaveLength(151);


    /** Using react testing library */
    // const component = render(<BrowserRouter><Pokedex /></BrowserRouter>);
  
    // await waitFor(() =>{
    //   const advSearchAccordion = component.getByTestId('advancedSearch');
    //   fireEvent.click(advSearchAccordion);
    //   fireEvent.click(component.getByTestId('type-Flying'));
    //   fireEvent.click(component.getByTestId('type-Fire'));
    //   fireEvent.click(component.getByTestId('advSearchBtn'));
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(2);

    //   fireEvent.click(component.getByTestId('resetBtn'));
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(151);
    // });
  })

  test('Test combination of adv. search , reset and searchbox filter', async() => {
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();
    const inputCtrl = wrapper.find("Pokedex").childAt(0).children().find("[data-testid=\"searchbox-input\"]");
    inputCtrl.simulate('change',  {target: {value: 'char'}});

    const searchbtnCtrl = wrapper.find("Pokedex").childAt(0).children().find("[data-testid=\"searchboxSearchbtn\"]");
    searchbtnCtrl.simulate("click");

    let pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    let pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(3);

    const pokDexContainer = wrapper.find("Pokedex").childAt(0).children();
    const advSearchAccordion = pokDexContainer.find("#advancedSearch").at(1);
    

    advSearchAccordion.simulate('click');

    const typeFlyingbtn = pokDexContainer.find("[data-testid=\"type-Flying\"]");
    const typeFirebtn = pokDexContainer.find("[data-testid=\"type-Fire\"]");
    const advSearchBtn = pokDexContainer.find("[data-testid=\"advSearchBtn\"]");
    const resetBtn = pokDexContainer.find("[data-testid=\"resetBtn\"]");

    typeFlyingbtn.simulate("click");
    typeFirebtn.simulate("click");
    advSearchBtn.simulate("click");


    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(1);


    inputCtrl.simulate('change',  {target: {value: ''}});
    searchbtnCtrl.simulate("click");

    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(2);

    inputCtrl.simulate('change',  {target: {value: 'char'}});
    searchbtnCtrl.simulate("click");
    resetBtn.simulate("click");

    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(3);

    inputCtrl.simulate('change',  {target: {value: ''}});
    searchbtnCtrl.simulate("click");

    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(151);


    /** Using react testing library */
    // const component = render(<BrowserRouter><Pokedex /></BrowserRouter>);
  
    // await waitFor(() =>{

    //   const inputCtrl = component.getByTestId('searchbox-input');
    //   fireEvent.change(inputCtrl, {target: {value: 'char'}});
    //   const searchboxSearchbtn = component.getByTestId('searchboxSearchbtn');
    //   fireEvent.click(searchboxSearchbtn);
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(3);

    //   const advSearchAccordion = component.getByTestId('advancedSearch');
    //   fireEvent.click(advSearchAccordion);
    //   fireEvent.click(component.getByTestId('type-Flying'));
    //   fireEvent.click(component.getByTestId('type-Fire'));
    //   fireEvent.click(component.getByTestId('advSearchBtn'));
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(1);

    //   fireEvent.change(inputCtrl, {target: {value: ''}});
    //   fireEvent.click(searchboxSearchbtn);
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(2);

    //   fireEvent.change(inputCtrl, {target: {value: 'char'}});
    //   fireEvent.click(searchboxSearchbtn);
    //   fireEvent.click(component.getByTestId('resetBtn'));
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(3);

    //   fireEvent.change(inputCtrl, {target: {value: ''}});
    //   fireEvent.click(searchboxSearchbtn);
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(151);
    // });
  })

})





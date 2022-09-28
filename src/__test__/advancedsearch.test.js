// import { fireEvent, render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom'
import { mount } from "enzyme";
import AdvancedSearch from '../components/advancedsearch';
import 'whatwg-fetch'

const sampleProps = {
    typeWeaknessList:['Grass', 'Poison', 'Fire', 'Flying', 'Water', 'Bug', 'Normal', 'Electric', 'Ground', 'Fighting', 'Psychic', 'Rock', 'Ice', 'Ghost', 'Dragon', 'Fairy', 'Dark', 'Steel'],
    handleMSearch: jest.fn()
}

const backgroundColor = (element) => window.getComputedStyle(element).backgroundColor;

describe('Test Advanced search component', ()=>{

    test('Test snapshot', () => {
    
        const wrapper =mount(<AdvancedSearch {...sampleProps} />);
        const AdvancedSearchComp = wrapper.find('AdvancedSearch');
        expect(AdvancedSearchComp).toMatchSnapshot();
    
    });

    test('renders PokeCard component', () => {

        const wrapper =mount(<AdvancedSearch {...sampleProps} />);
        const AdvancedSearchComp = wrapper.find('AdvancedSearch');
        expect(AdvancedSearchComp.find(`[data-testid=\"advancedSearch\"]`)).toBeTruthy() ;
        expect(AdvancedSearchComp.find('Accordion')).toHaveLength(1)


        /** Using react testing library */
        // let component = render(<AdvancedSearch {...sampleProps} />);
        // const advSearchComp = component.getByTestId(`advancedSearch`); 
        // expect(advSearchComp).toBeInTheDocument();
    })

    test('test all abilities rendered', () => {

        const wrapper =mount(<AdvancedSearch {...sampleProps} />);
        const AdvancedSearchComp = wrapper.find('AdvancedSearch');
        AdvancedSearchComp.find('Accordion').simulate('click');
        let abilitiesComps = AdvancedSearchComp.childAt(0).find('.content-block-full').find('li');
        expect(abilitiesComps.length).toEqual(sampleProps.typeWeaknessList.length);

        /** Using react testing library */
        // let component = render(<AdvancedSearch {...sampleProps} />);
        // const advSearchComp = component.getByTestId(`advancedSearch`); 
        // fireEvent.click(advSearchComp);
        // let abilitiesComps = component.getAllByTestId('ability');
        // expect(abilitiesComps.length).toEqual(sampleProps.typeWeaknessList.length);
    })

    test('render search and reset buttons', () => {

        const wrapper =mount(<AdvancedSearch {...sampleProps} />);
        const AdvancedSearchComp = wrapper.find('AdvancedSearch');
        AdvancedSearchComp.find('Accordion').simulate('click');
        expect(AdvancedSearchComp.childAt(0).find('AccordionItemPanel').find('.mresetbtnadv')).toHaveLength(1);
        expect(AdvancedSearchComp.childAt(0).find('AccordionItemPanel').find('.msearchbtnadv')).toHaveLength(1);
        

        /** Using react testing library */
        // const component = render(<AdvancedSearch {...sampleProps} />);
        // const advSearchComp = component.getByTestId(`advancedSearch`); 
        // fireEvent.click(advSearchComp);
        // const  advSearchBtn = component.getByTestId('advSearchBtn');
        // const resetBtn = component.getByTestId('resetBtn');
        // expect(advSearchBtn).toBeInTheDocument();
        // expect(resetBtn).toBeInTheDocument();
    })

    test('Test type and filter selectors length and are clickable', () => {

        const wrapper =mount(<AdvancedSearch {...sampleProps} />);
        const AdvancedSearchComp = wrapper.find('AdvancedSearch');
        AdvancedSearchComp.find('Accordion').simulate('click');

        let typeSelectorBtn = AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.type-filter');
        let weaknessSelectorBtn = AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.weakness-filter');        
        expect(typeSelectorBtn.length).toEqual(sampleProps.typeWeaknessList.length);
        expect(weaknessSelectorBtn.length).toEqual(sampleProps.typeWeaknessList.length);

        
        AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.type-filter').at(0).simulate('click');
        expect(AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.type-filter').at(0).props().style.backgroundColor).toBe("#f2f2f2");

        AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.type-filter').at(0).simulate('click');
        expect(AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.type-filter').at(0).props().style.backgroundColor).toBe("#f2f2f2");

        AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.weakness-filter').at(0).simulate('click');
        // console.log(typeSelectorBtn.at(0).prop('style'), typeSelectorBtn.at(0).html())
        expect(AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.weakness-filter').at(0).props().style.backgroundColor).toBe("#f2f2f2");

        AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.weakness-filter').at(0).simulate('click');
        // console.log(AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.weakness-filter').at(0).prop('style'), AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.type-filter').at(0).html())
        expect(AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.weakness-filter').at(0).props().style.backgroundColor).toBe("#f2f2f2");

        /** Using react testing library */
        // const component = render(<AdvancedSearch {...sampleProps} />);
        // const advSearchComp = component.getByTestId(`advancedSearch`); 
        // fireEvent.click(advSearchComp);
        // const  typeSelectorBtn = component.getAllByTestId(/type-/);
        // const  weaknessSelectorBtn = component.getAllByTestId(/weakness-/);
        // expect(typeSelectorBtn.length).toEqual(sampleProps.typeWeaknessList.length);
        // expect(weaknessSelectorBtn.length).toEqual(sampleProps.typeWeaknessList.length);

        // fireEvent.click(typeSelectorBtn[0]);
        // expect(backgroundColor(typeSelectorBtn[0])).toBe("rgb(48, 167, 215)");

        // fireEvent.click(typeSelectorBtn[0]);
        // expect(backgroundColor(typeSelectorBtn[0])).toBe("rgb(242, 242, 242)");
        
    });


    test('Passed handleMSearch gets called on search click', () => {
        
        const wrapper =mount(<AdvancedSearch {...sampleProps} />);
        const AdvancedSearchComp = wrapper.find('AdvancedSearch');
        AdvancedSearchComp.find('Accordion').simulate('click');
        const advSearchBtn = AdvancedSearchComp.childAt(0).find('AccordionItemPanel').find('.msearchbtnadv');
        let typeSelectorBtn = AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.type-filter');
        let weaknessSelectorBtn = AdvancedSearchComp.childAt(0).find('.content-block-full').find('span.weakness-filter');   
        
        advSearchBtn.simulate('click');
        expect(sampleProps.handleMSearch).toHaveBeenCalledWith("", [], []);
        typeSelectorBtn.at(0).simulate('click');
        weaknessSelectorBtn.at(4).simulate('click');
        advSearchBtn.simulate('click');
        expect(sampleProps.handleMSearch).toHaveBeenCalledWith( "", [sampleProps.typeWeaknessList[0]], [sampleProps.typeWeaknessList[4]]);

        /** Using react testing library */
        // const component = render(<AdvancedSearch {...sampleProps} />);
        // const  advSearchBtn = component.getByTestId('advSearchBtn');
        // const  typeSelectorBtn = component.getAllByTestId(/type-/);
        // const  weaknessSelectorBtn = component.getAllByTestId(/weakness-/);
        // fireEvent.click(advSearchBtn); 
        // expect(sampleProps.handleMSearch).toHaveBeenCalledWith("", [], []);


        // fireEvent.click( typeSelectorBtn[0]);
        // fireEvent.click( weaknessSelectorBtn[4]);
        // fireEvent.click(advSearchBtn); 
        // expect(sampleProps.handleMSearch).toHaveBeenCalledWith( "", [sampleProps.typeWeaknessList[0]], [sampleProps.typeWeaknessList[4]]);

    })

    
    test('Passed handleMSearch gets called on reset click', () => {
        
        const wrapper =mount(<AdvancedSearch {...sampleProps} />);
        const AdvancedSearchComp = wrapper.find('AdvancedSearch');
        AdvancedSearchComp.find('Accordion').simulate('click');
        const  resetBtn = AdvancedSearchComp.childAt(0).find('AccordionItemPanel').find('.msearchbtnadv');
        resetBtn.simulate('click');
        expect(sampleProps.handleMSearch).toHaveBeenCalledWith("", [], []);

        /** Using react testing library */
        // const component = render(<AdvancedSearch {...sampleProps} />);
        // const  resetBtn = component.getByTestId('resetBtn');
        // fireEvent.click(resetBtn); 
        // expect(sampleProps.handleMSearch).toHaveBeenCalledWith("", "", "");
    })

})



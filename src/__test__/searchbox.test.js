// import { fireEvent, render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom'
import SearchBox from '../components/searchbox';
import 'whatwg-fetch'
import { mount } from "enzyme";



describe("Test SearchBox component", () => {


  test('Test snapshot', () => {
    
    const wrapper =mount(<SearchBox />);
    expect(wrapper.find('SearchBox')).toMatchSnapshot();

  });

  test('renders SearchBox component', () => {
    
    const wrapper =mount(<SearchBox />);
    expect(wrapper.find('SearchBox')).toBeTruthy();
    expect(wrapper.find("SearchBox").childAt(0).find('#mfilterLabel').text()).toEqual('Name or Number');

    /** Using react testing library */
    // render(<SearchBox />);
    // const linkElement = screen.getByText(/Name or Number/i);
    // expect(linkElement).toBeInTheDocument();
  });

  test('render child input control', () => {
    
    const wrapper =mount(<SearchBox />);
    const inputCtrl = wrapper.find("SearchBox").find("#mfilter");
    expect(inputCtrl).toHaveLength(1)
    
    /** Using react testing library */
    // const component = render(<SearchBox />);
    // const inputCtrl = component.getByTestId('searchbox-input');
    // expect(inputCtrl).toHaveAttribute('type','text');
    // expect(inputCtrl).toBeInTheDocument();
  })

  test('render search button control', () => {
    
    const wrapper =mount(<SearchBox />);
    const searchbtnCtrl = wrapper.find("SearchBox").find("#msearchbtn");
    expect(searchbtnCtrl).toHaveLength(1)
    
    /** Using react testing library */
    // const component = render(<SearchBox />);
    // const searchbtnCtrl = component.getByText('Search');
    // expect(searchbtnCtrl).toBeInTheDocument();
  })

  test('Passed handleMSearch gets called on search click', () => {
    const handleMSearch = jest.fn();
    const wrapper =mount(<SearchBox handleMSearch = {handleMSearch} />);
    const searchbtnCtrl = wrapper.find("SearchBox").find("#msearchbtn");
    searchbtnCtrl.simulate('click');
    expect(handleMSearch).toHaveBeenCalled();

    /** Using react testing library */
    // const handleMSearch = jest.fn();
    // const component = render(<SearchBox handleMSearch = {handleMSearch} />);
    // const searchbtnCtrl = component.getByText('Search');
    // fireEvent.click(searchbtnCtrl); 
    // expect(handleMSearch).toHaveBeenCalled();
  })

  test('Passed handleMSearch gets called on enter key press on input', () => {
    const handleMSearchkeypress = jest.fn();
    const wrapper =mount(<SearchBox handleMSearch = {handleMSearchkeypress} />);
    const inputCtrl = wrapper.find("SearchBox").find("#mfilter");

    inputCtrl.simulate('keyPress', {key: "O", code: "O", charCode: 79})
    expect(handleMSearchkeypress).toHaveBeenCalledTimes(0);
    
    inputCtrl.simulate('keyPress', {key: "Enter", code: "Enter", charCode: 13});
    expect(handleMSearchkeypress).toHaveBeenCalledTimes(1);

    

    
    /** Using react testing library */
    // const handleMSearchkeypress = jest.fn();
    // const component = render(<SearchBox handleMSearch = {handleMSearchkeypress} />);
    // const inputCtrl = component.getByTestId('searchbox-input');
    // fireEvent.keyPress(inputCtrl, {key: "Enter", code: "Enter", charCode: 13}); 
    // expect(handleMSearchkeypress).toHaveBeenCalled();
  })

})





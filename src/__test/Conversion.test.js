import React from 'react';

import Conversion from '../component/Conversion.js'
import {shallow} from "enzyme/build/index";

describe('Conversion', function() {
    const component = shallow(<Conversion/>);
    const input = component.find('#amount');
    it('Carousel renders correctly', () => {

        expect(<Conversion/>).toMatchSnapshot();
    });

    it('should render Conversion correctly with shallow', function () {

        expect(component).toMatchSnapshot();
    });

    it('should render Navigation correctly a elements', function () {

        const text = component.find('span.skills').text();
        expect(text).toEqual('Please select source and output currencies for conversion');
    });

    it('fills the input with a default value', function () {

        expect(input.prop("name")).toBe("Amount");
        expect(input.prop("value")).toBe(1);
    });

    it("updates input value when changed", () => {
        const event = { target: { value: 1} };
        input.simulate("change", event);
        expect(input.prop("value")).toBe(1);
    });

    it('should simulate React Select correctly', function () {

        const select = component.find('#currency-select-1');
        select.simulate('keyDown', { keyCode: 40 });
        select.simulate('keyDown', { keyCode: 13 });

    });
});
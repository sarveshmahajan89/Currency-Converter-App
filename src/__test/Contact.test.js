import React from 'react';

import Contact from '../component/Contact.js'
import {shallow} from "enzyme/build/index";

describe('Contact', function() {
    const component = shallow(<Contact/>);
    it('Contact renders correctly', () => {

        expect(<Contact/>).toMatchSnapshot();
    });

    it('should render Contact correctly with shallow', function () {

        expect(component).toMatchSnapshot();
    });

    it('Contact should render h1 elements correctly', function () {

        const text = component.find('h1').text();
        expect(text).toEqual('Contact us');
    });

    it('Contact should render p elements correctly', function () {

        const text = component.find('p').text();
        expect(text).toEqual('Our team looks forward to answering your questions. Simply fill out the form and we will get back to you as soon as possible.');
    });
});
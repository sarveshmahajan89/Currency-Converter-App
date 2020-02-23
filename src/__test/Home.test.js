import React from 'react';

import Home from '../component/Home.js'
import {shallow} from "enzyme/build/index";

describe('Home', function() {
    it('Home renders correctly', () => {

        expect(<Home/>).toMatchSnapshot();
    });

    it('should render Home correctly with shallow', function () {

        const component = shallow(<Home/>);
        expect(component).toMatchSnapshot();
    });

    it('should render Home correctly Conversion', function () {

        const component = shallow(<Home/>);
        expect(component.exists('Conversion')).toBe(true);
    });
});
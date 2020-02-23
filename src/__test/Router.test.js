import React from 'react';

import Router from '../component/Router.js'
import {shallow} from "enzyme/build/index";

describe('Router', function() {
    it('Router renders correctly', () => {

        expect(<Router/>).toMatchSnapshot();
    });
    it('should render Router correctly with shallow', function () {

        const component = shallow(<Router/>);
        expect(component).toMatchSnapshot();
    });

});
import 'normalize.css';
import './main.css';

import React from 'react';
import cerebral from './cerebral.js';

import App from './components/App.js';

import setInputValue from './actions/setInputValue.js';
import addItem from './actions/addItem.js';
import setShowOnlyAwesome from './actions/setShowOnlyAwesome.js';
import debugItem from './actions/debugItem.js';
import saveProject from './actions/saveProject.js';
import clearItems from './actions/clearItems.js';
import editItem from './actions/editItem.js';

cerebral.signal('inputValueChanged', setInputValue);
cerebral.signal('inputValueSubmitted', addItem,saveProject,debugItem);
cerebral.signal('showOnlyAwesomeToggled',setShowOnlyAwesome,debugItem);
cerebral.signal('onClearClick',clearItems);
cerebral.signal('itemSelect',editItem);

let Wrapper = cerebral.injectInto(App);

React.render(<Wrapper/>, document.querySelector('#app'));
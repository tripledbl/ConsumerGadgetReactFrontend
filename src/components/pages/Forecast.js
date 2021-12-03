import React from 'react';
import '../../App.css';
//import Calendar from '../'
//import CalendarButton from '../CalendarButton.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default() => (
    <Tabs>
        <TabList>
            <Tab> Calendar </Tab>
            <Tab> Trends </Tab>
            <Tab> Forecast Information </Tab>
        </TabList>

        
        <TabPanel>
            <h2> Content Calendar </h2>
        </TabPanel>
        
        
        <TabPanel>
            <h2> Content Trends  </h2>
        </TabPanel>

        
        <TabPanel>
            <h2> Content Forecast Info</h2>
        </TabPanel>

    </Tabs>
);

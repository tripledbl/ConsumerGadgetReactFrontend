import React from 'react';
import '../../App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Forecast.css'
import Calendar from '../Calendar';

export default() => (
    <Tabs className='react-tabs'>
        <TabList className='react-tabs__tab-list'>
            <Tab className='react-tabs__tab'> 
                <h2 className='tab-name'>Calendar</h2>
            </Tab>
            <Tab className='react-tabs__tab'>
                <h2 className='tab-name'>Trends</h2>
            </Tab>
            <Tab className='react-tabs__tab'>
                <h2 className='tab-name'>Info</h2>
            </Tab>
        </TabList>

        
        <TabPanel className='react-tabs__tab-panel'>
            <div className='calendar-container'>
                <Calendar className='calendar'>
                </Calendar>
            </div>
        </TabPanel>
        
        
        <TabPanel className='react-tabs__tab-panel'>
            <div className='trends-container'>
                <h2>Under Construction</h2>
            </div>
        </TabPanel>

        
        <TabPanel className='react-tabs__tab-panel'>
            <div className='info-container'>
                <h2>Under Construction</h2>
            </div>
        </TabPanel>

    </Tabs>
);

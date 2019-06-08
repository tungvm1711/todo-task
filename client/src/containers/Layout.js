import React from 'react';

import App from './App';
import Footer from './Footer';
import Header from './Header';


export default class Layout extends React.Component {
    render(): React.Element<any> {
        return (
            <div id="page-content" className="fixed-header">
                <Header/>
                <App />
                <Footer/>
            </div>
        );
    }
}

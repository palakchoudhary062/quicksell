import React from 'react';
import './style.css';
import Dropdown from '../dropdown';

const Header = ({ grouping, setGrouping, ordering, setOrdering }) => {
    return (
        <header>
            <Dropdown grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} />
        </header>
    );
};

export default Header;

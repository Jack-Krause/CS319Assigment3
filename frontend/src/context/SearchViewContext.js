import React, { createContext, useState, useContext } from 'react';

const SearchViewContext = createContext();

export const SearchViewProvider = ({ children }) => {
    const [searchId, setSearchId] = useState(0);

    return (
        <SearchViewContext.Provider value ={{ searchId, setSearchId }}>
            {children}
        </SearchViewContext.Provider>
    );
};

export const useSearchView = () => {
    return useContext(SearchViewContext);
};


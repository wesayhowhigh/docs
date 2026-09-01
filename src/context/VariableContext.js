import React, { createContext, useContext, useState, useCallback } from 'react';

const VariableContext = createContext({
    vars: {},
    updateVar: () => {},
    setDefaultVar: () => {},
});

export const VariableProvider = ({ children }) => {
    const [vars, setVars] = useState({});

    const updateVar = useCallback((key, value) => {
        setVars((prev) => ({ ...prev, [key]: value }));
    }, []);

    const setDefaultVar = useCallback((key, defaultValue) => {
        setVars((prev) => {
            if (prev[key] !== undefined) return prev;
            return { ...prev, [key]: defaultValue };
        });
    }, []);

    return (
        <VariableContext.Provider value={{ vars, updateVar, setDefaultVar }}>
            {children}
        </VariableContext.Provider>
    );
};

export const useVariables = () => useContext(VariableContext);
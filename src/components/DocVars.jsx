import React, { useEffect } from 'react';
import { useVariables } from '@site/src/context/VariableContext';

export const VarInput = ({ name, label, defaultValue = '' }) => {
    const { vars, updateVar, setDefaultVar } = useVariables();

    // Register the default value on initial render
    useEffect(() => {
        if (defaultValue) {
            setDefaultVar(name, defaultValue);
        }
    }, [name, defaultValue, setDefaultVar]);

    const currentValue = vars[name] !== undefined ? vars[name] : defaultValue;

    return (
        <div style={{
            // padding: '0.75rem 1rem',
            margin: '1rem 0',
            // background: 'var(--ifm-color-emphasis-100)',
            // borderRadius: '6px',
            // border: '1px solid var(--ifm-color-emphasis-300)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            <label style={{ fontWeight: 600 }}>{label || name}:</label>
            <input
                type="text"
                value={currentValue}
                onChange={(e) => updateVar(name, e.target.value)}
                placeholder={defaultValue}
                style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    border: '1px solid var(--ifm-color-emphasis-400)',
                    background: 'var(--ifm-background-color)',
                    color: 'var(--ifm-font-color-base)'
                }}
            />
        </div>
    );
};

export const Var = ({ name, default: fallback = '' }) => {
    const { vars } = useVariables();
    return <span>{vars[name] ?? fallback}</span>;
};
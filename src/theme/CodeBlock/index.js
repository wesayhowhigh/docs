import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import { useVariables } from '@site/src/context/VariableContext';

export default function CodeBlockWrapper(props) {
    const { vars } = useVariables();
    let children = props.children;

    const replaceVars = (text) => {
        if (typeof text !== 'string') return text;
        let output = text;

        Object.entries(vars).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
                output = output.replace(regex, value);
            }
        });

        return output;
    };

    if (typeof children === 'string') {
        children = replaceVars(children);
    } else if (Array.isArray(children)) {
        children = children.map((child) =>
            typeof child === 'string' ? replaceVars(child) : child
        );
    }

    return <CodeBlock {...props}>{children}</CodeBlock>;
}
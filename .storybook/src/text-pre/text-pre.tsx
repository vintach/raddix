import React, { useState } from 'react';
import Highlight, { defaultProps, PrismTheme } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/oceanicNext';
import './text-pre.css';

interface TextPreProps {
  children: JSX.Element;
}

export const TextPre = (props: TextPreProps) => {
  const className = props.children.props.className || '';
  const code = props.children.props.children.trim();
  const language = className.replace(/language-/, '');

  return (
    <div className='text-pre'>
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={theme as PrismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              backgroundColor: 'transparent'
            }}
            translate='no'
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} translate='no'>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} translate='no' />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

import React, { useState } from 'react';
import classnames from 'classnames';
import './Demo.css';
const Demo = (props) => {
    const { title } = props;
    const [bg, setbg] = useState(false);
    return React.createElement(React.Fragment, null,
        React.createElement("p", null, title),
        React.createElement("p", { className: classnames({ bg }) }, "\u6B22\u8FCE\u6765\u5230React!"),
        React.createElement("input", { type: "button", onClick: () => {
                setbg(!bg);
            }, value: "click me!" }));
};
export { Demo };

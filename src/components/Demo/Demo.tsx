import React, { useState } from 'react';
import classnames from 'classnames'
import './Demo.less'

interface Props {
  title: string;
}

const Demo: React.FC<Props> = (props) => {
  const {title} = props
  const [bg, setbg] = useState<boolean>(false);
  return <>
  <p>{title}</p>
  <p className={classnames({bg})}>欢迎来到React!</p>
  <input type="button" onClick={()=>{
    setbg(!bg)
  }} value="click me!"/>
  </>;
};

export { Demo };

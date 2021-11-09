import React, {useState, useEffect} from 'react';
export default function Click() {

 const [count, setCount] = useState(0);

 const handleClick = function() {
  setCount(count+1);
 }
 const showCount = function(){
    console.log(count);
  }
 useEffect(showCount);
 return (
  <button onClick={handleClick}>{count}</button>    
 );
}
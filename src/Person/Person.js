import React from 'react';
import './Person.css';

// function component
const person = (data) => {
    return (
        <div className="Person">
            <p>hello I'm {data.name}, and am {data.age}</p>
            <p>{data.children}</p>
            {/* onChange the attribut of HTML */}
            <input type="text" onChange={ data.changehaha} value={ data.name}/> 
        </div>
    );
}

// function person(){
//     return <p>hello Im a person</p>;
// }

export default person;
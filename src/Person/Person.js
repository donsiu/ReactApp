import React from 'react';
// function component
const person = (data) => {
return (
    <div>
        <p>hello I'm {data.name}, and am {data.age}</p>
        <p>{data.children}</p>
    </div>
);
}

// function person(){
//     return <p>hello Im a person</p>;
// }

export default person;
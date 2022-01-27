import React from "react";
import {useDrag} from "react-dnd";



export default function Card(props) {

    const { id , name , country , image } = props

    

//     const [{isDragging} , drag ] = useDrag(() => ({
//         type: "image",
//     item: { id: id },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));
    

    return (
        <div className="container w-25 h-25 ">
        <div className="row">
            <div className="col-sm-6">
            <div className="card" id={id} >
                <img src={image} className="card-img-top" />
                
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{country}</p>

                    </div>
            </div>
            </div>
        </div>
        </div>
    )
}
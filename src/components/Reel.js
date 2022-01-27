import React from "react";

export default function Reel(props) {
    return (
        <div className="container w-75 h-75 ">
            <div className="row">
            <div className="col-2">
            <div className="card" >
                <img src={props.image} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.country}</p>

                </div>
                </div>
                </div>
            </div>
        </div>
    )
}
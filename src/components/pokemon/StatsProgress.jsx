import React from 'react';

function StatsProgress(props) {
    return (
        <div className="row align-items-center">
            <div className="col-12 col-md-3">{props.name}</div>
            <div className="col-12 col-md 9">
                <div className="progress">
                    <div className="progress-bar" style={{ width: `${props.value}%`, backgroundColor: `${props.color}%` }} aria-valuemin='0' aria-valuemax='100'>
                        <small>{props.value}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsProgress;
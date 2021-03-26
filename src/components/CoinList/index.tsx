import React from 'react';

function CoinList(props) {
    return (
        <div className="coin-container item">
            <img src={props.icon} alt={props.icon} />
            <div>
                <div>{props.coinName1}</div>
                <div>{props.coinName2}</div>
            </div>
            <img
                src={props.graphic}
                alt={props.graphic}
                className={props.colorTheme === "dark" ? "graphic-dark" : "graphic-right"}
            />
            <div>
                <div>{props.value1}</div>
                <div style={{ color: '#57CA79' }}>{props.value2}</div>
            </div>
        </div>
    )
}

export default CoinList;

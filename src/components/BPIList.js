import React from 'react'

const BPIList = props => {
    let inputData = props.data.bpi
    let renderData = []
    
    for (var property in inputData) {
        
        let item = <tr key={property}><td>{property}</td><td>{inputData[property]} {props.currency}</td></tr>
        renderData.unshift(item)
    }

    return (
        <div className="listColumn">
            <table>
                <tbody>
                    {renderData}
                </tbody>
            </table>
        </div>
    )
}

export default BPIList

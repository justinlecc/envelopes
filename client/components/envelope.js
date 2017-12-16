import React, { Component } from 'react';
import { formatDollars } from '../utils';

class Envelope extends Component {

  render() {

    const name = this.props.name;
    const amount = this.props.amount;
    const editAmount = this.props.editAmount || amount;
    const isEditable = this.props.isEditable;
    const envelopeClick = this.props.envelopeClick;
    const amountEdit = this.props.amountEdit;
    const saveEditAmount = this.props.saveEditAmount;

    const amountEditWrapper = (e) => {
        amountEdit(e.target.value);
    };

    const inputClick = (e) => e.stopPropagation();

    const saveEditAmountWrapper = (e) => {
        saveEditAmount();
        e.stopPropagation();
    }

    return <div onClick={envelopeClick}>
            <span>{name}</span>
            <span>: </span>
            {isEditable ?
                <span>
                    <input 
                        type="number" 
                        value={editAmount}
                        onChange={amountEditWrapper}
                        onClick={inputClick}
                    />
                    <button onClick={saveEditAmountWrapper}>save</button>
                </span>
                :
                <span>
                    {formatDollars(amount)}
                </span>
            }
          </div>;
  }

}

export default Envelope;
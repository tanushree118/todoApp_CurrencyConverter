import React from "react";
import revertIcon from "../revert_icon.png";
import crossIcon from "../filled_cross_icon.png";
import arrowIcon from "../arrow_icon.png";
import { CardsProps } from "../interfaces";

export default function Cards({
  details,
  onSourceChange,
  onTargetChange,
  onRevertClick,
  onRemoveClick,
}: CardsProps) {
  return (
        <div className="card-container">
            <div className="currency-text-box">
                <div className="currency-label" data-testid="source-currency">{details?.sourceCurrency}</div>
                <div>
                <img src={arrowIcon} className="arrow-icon" />
                </div>
                <div className="currency-label" data-testid="target-currency">{details?.targetCurrency}</div>
            </div>
        <div className="value-box">{details?.currentRate}</div>
        <div>
            <div className="actions-box">
                <div
                    onClick={() => onRevertClick(details?.id)}
                    className="alignCenter"
                >
                    <img src={revertIcon} data-testid="revert-button" className="revert-icon" />
                </div>
                <div
                    onClick={() => onRemoveClick(details?.id)}
                    className="alignCenter"
                >
                    <img src={crossIcon} data-testid="remove-button" className="cross-icon" />
                </div>
            </div>
            <div className="currency-input-box">
                <input
                    data-testid="source-text-box"
                    type="text"
                    onChange={(event) => onSourceChange(event, details?.id)}
                    value={details?.sourceVal}
                    className="marginBottom"
                />
                <input
                    data-testid="target-text-box"
                    type="text"
                    onChange={(event) => onTargetChange(event, details?.id)}
                    value={details?.targetVal}
                    className="marginBottom"
                />
            </div>
            <div className="date-box">
                <span className={"date-label-box"}>{"Last Updated Time"}</span>
                <span>{details?.lastUpdTime}</span>
            </div>
        </div>
        </div>
  );
}

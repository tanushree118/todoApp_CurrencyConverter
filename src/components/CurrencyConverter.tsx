import React, { useState, useEffect } from "react";
import "./CurrencyConverter.css";
import plusIcon from "../plus_icon.png";
import ModalDialog from "./ModalDialog";
import Cards from "./Cards";
import { CardType, CurrencyConverterProps } from "../interfaces";

export default function CurrencyConverter({initialCardsList}: CurrencyConverterProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardsList, setCardsList] = useState<CardType[]>(initialCardsList);
    const [currencyList, setCurrencyList] = useState<string[]>([]);
    const [lastUpdatedTime, setLastUpdatedTime] = useState("");

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cardsList));
    }, [cardsList]);

    const openModal = () => {
        setIsModalOpen(true);
        callApi();
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const callApi = async () => {
        try {
            let response = await fetch("https://open.er-api.com/v6/latest");
            let data = await response.json();
            let rates = data?.rates;
            let listOfAllCurrencies = Object.keys(rates);
            let last_updated_time = data?.time_last_update_utc;
            setCurrencyList(listOfAllCurrencies);
            setLastUpdatedTime(last_updated_time);
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    }

    const getCurrentRate = async (sourceCurrency: string, targetCurrency: string) => {
        let currentRate = 0;
        try {
            let response = await fetch(`https://open.er-api.com/v6/latest/${sourceCurrency}`);
            let data1 = await response.json();
            let rates1 = data1?.rates;
            currentRate = rates1[targetCurrency];
        } catch (err) {
            console.log("Error fetching data:", err);
        }
        return currentRate;
    }
    const createNewCard = async (sourceCurrency: string, targetCurrency: string) => {
        closeModal();
        let currentRate = await getCurrentRate(sourceCurrency, targetCurrency);
        let maxId = Math.max(...(cardsList.map((item: CardType) => item.id)), 0);
        let newCard = {
            id: maxId + 1,
            sourceCurrency: sourceCurrency,
            targetCurrency: targetCurrency,
            currentRate: currentRate,
            sourceVal: 0,
            targetVal: 0,
            lastUpdTime: lastUpdatedTime || ""
        };
        let updatedCardList = [...cardsList, newCard];
        setCardsList(updatedCardList);
    }

    const handleSourceChange = (event: any, cardId: number) => {
        let value = event.target.value;
        let updatedCard = [...cardsList];
        updatedCard = updatedCard.map((item) => {
            if (item.id === cardId) {
                item.sourceVal = value;
                item.targetVal = value * item.currentRate;
            }
            return item;
        })
        setCardsList([...updatedCard]);
    }
    const handleTargetChange = (event: any, cardId: number) => {
        let value = event.target.value;
        let updatedCardList = [...cardsList];
        updatedCardList = updatedCardList.map((item) => {
            if (item.id === cardId) {
                item.targetVal = value;
                item.sourceVal = (1 / item.currentRate) * value;
            }
            return item;
        })
        setCardsList([...updatedCardList]);
    }

    const handleRevertClick = async (cardId: number) => {
        const filteredCards = cardsList.filter(item => item.id === cardId);
        if (filteredCards.length > 0) {
            const { sourceCurrency, targetCurrency } = filteredCards[0];
            const currentRate = await getCurrentRate(targetCurrency, sourceCurrency);

            const updatedCardList = cardsList.map(item => {
                if (item.id === cardId) {
                    return {
                        ...item,
                        currentRate: currentRate,
                        sourceCurrency: targetCurrency,
                        targetCurrency: sourceCurrency,
                        sourceVal: 0,
                        targetVal: 0,
                        lastUpdTime: lastUpdatedTime
                    };
                }
                return item;
            });
            setCardsList(updatedCardList);
        }

    }

    const handleRemoveClick = (cardId: number) => {
        let updatedCardList = cardsList.filter(item => item.id !== cardId);
        setCardsList(updatedCardList);
    }

    return (
        <div className="cc-tab-container">
            <div className="all-cards-container">
                {cardsList.map((item, index) => {
                    return (
                        <Cards
                            details={item}
                            key={`data_${index}`}
                            onSourceChange={handleSourceChange}
                            onTargetChange={handleTargetChange}
                            onRevertClick={handleRevertClick}
                            onRemoveClick={handleRemoveClick}
                        />
                    )
                })}
            </div>
            <div><img src={plusIcon} alt="add button" className="add-btn" onClick={openModal} /></div>
            <ModalDialog
                isOpen={isModalOpen}
                closeModal={closeModal}
                currencyList={currencyList}
                createNewCard={createNewCard}
            />
        </div>
    )
}
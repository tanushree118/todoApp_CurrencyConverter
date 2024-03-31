interface Task {
    id: number;
    label: string;
    status: boolean;
}

interface TodoAppProps {
    initialTasksList: Task[];
    theme: string;
}

interface CurrencyConverterProps {
    initialCardsList: CardType[];
    theme: string;
}

interface ModalDialogProps {
    isOpen: boolean,
    closeModal: any,
    currencyList: string[],
    createNewCard: any
}

interface CardType {
    id: number,
    sourceCurrency: string;
    targetCurrency: string;
    currentRate: any;
    sourceVal: number;
    targetVal: number;
    lastUpdTime: string;
}

interface CardsProps {
    details: CardType;
    onSourceChange: any;
    onTargetChange: any;
    onRevertClick: any;
    onRemoveClick: any;
}

export type {
    Task,
    TodoAppProps,
    CurrencyConverterProps,
    ModalDialogProps,
    CardType,
    CardsProps
}


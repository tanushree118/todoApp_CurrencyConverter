import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CurrencyConverter from './CurrencyConverter';

describe('CurrencyConverter component', () => {
    const initialCardsList = [
        {
            id: 1,
            sourceCurrency: 'USD',
            targetCurrency: 'EUR',
            currentRate: 0.88,
            sourceVal: 100,
            targetVal: 88,
            lastUpdTime: '2023-01-01',
        }
    ];


    it('renders without crashing', () => {
        render(<CurrencyConverter initialCardsList={initialCardsList} theme={"lightTheme"}/>);
    });

    it('opens modal when add button is clicked', () => {
        render(<CurrencyConverter initialCardsList={initialCardsList} theme={"lightTheme"}/>);
        fireEvent.click(screen.getByAltText('add button'));
        expect(screen.getByText('Add currencies')).toBeInTheDocument();
    });

    it('updates source value and recalculates target value', async () => {
        render(<CurrencyConverter initialCardsList={initialCardsList} theme={"lightTheme"}/>);
        fireEvent.change(screen.getByTestId('source-text-box'), { target: { value: '200' } });
        await waitFor(() => {
            const targetTextBox = screen.getByTestId('target-text-box') as HTMLInputElement;
            expect(targetTextBox.value).toBe('176');
        })
    });

    it('updates target value and recalculates source value', async () => {
        render(<CurrencyConverter initialCardsList={initialCardsList} theme={"lightTheme"}/>);
        fireEvent.change(screen.getByTestId('target-text-box'), { target: { value: '200' } });
        await waitFor(() => {
            const sourceTextBox = screen.getByTestId('source-text-box') as HTMLInputElement;
            expect(sourceTextBox.value).toBe('227.27272727272728');
        });
    });

    it('reverts currencies on revert click', async () => {
        render(<CurrencyConverter initialCardsList={initialCardsList} theme={"lightTheme"}/>);
        fireEvent.click(screen.getByTestId('revert-button'));
        await waitFor(() => {
        expect(screen.getByTestId('source-currency')).toHaveTextContent('EUR');
        expect(screen.getByTestId('target-currency')).toHaveTextContent('USD');
        });
    });

    it('removes card on remove click', async () => {
        render(<CurrencyConverter initialCardsList={initialCardsList} theme={"lightTheme"}/>);
        fireEvent.click(screen.getByTestId('remove-button'));
        await waitFor(() => {
            expect(screen.queryByText('USD')).not.toBeInTheDocument();
        });
    });
});

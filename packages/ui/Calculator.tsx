import { Dispatch } from "react";
import styled from "styled-components";

const Input = styled.input`
  font-size: 32px;
  color: #333;
  text-align: right;
  padding: 5px 13px;
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  box-sizing: border-box;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 22px;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  border-radius: 2px;
  border: 0;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
  &:active {
    background: #999;
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  }

  &.two-span {
    grid-column: span 2;
    background-color: #3572db;
  }
`;

const ExtraData = styled.div`
  margin-top: 8px;
  padding: 20px 16px;
  p,
  pre,
  code {
    text-align: left;
    margin: 0;
    padding: 0;
    margin-top: 12px;
  }
`;

export const OP_ADD = '+';
export const OP_CLEAR = 'C';
export const OP_CLEAR_ENTRY = 'CE';
export const OP_DECIMAL_POINT = '.';
export const OP_DIVIDE = '/';
export const OP_EQUALS = '=';
export const OP_MULTIPLY = 'x';
export const OP_PERCENTAGE = '%';
export const OP_SUBSTRACT = '-';

const KEYS = [
    OP_CLEAR,
    OP_CLEAR_ENTRY,
    OP_DIVIDE,
    '7',
    '8',
    '9',
    OP_MULTIPLY,
    '4',
    '5',
    '6',
    OP_SUBSTRACT,
    '1',
    '2',
    '3',
    OP_ADD,
    '0',
    OP_DECIMAL_POINT,
    OP_EQUALS,
    OP_PERCENTAGE
] as const;
type Key = typeof KEYS[number];

function isOperator(text: string) {
    return '+-x/'.indexOf(text) > -1;
}

export interface CalculatorState {
    context: {
        display: string;
    }
    value: string;
}

export const CLEAR_ENTRY = 'CLEAR_ENTRY';
export const CLEAR_EVERYTHING = 'CLEAR_EVERYTHING';
export const DECIMAL_POINT = 'DECIMAL_POINT';
export const EQUALS = 'EQUALS';
export const NUMBER = 'NUMBER';
export const OPERATOR = 'OPERATOR';
export const PERCENTAGE = 'PERCENTAGE';
export const EVENTS = [
    CLEAR_ENTRY,
    CLEAR_EVERYTHING,
    DECIMAL_POINT,
    EQUALS,
    NUMBER,
    OPERATOR,
    PERCENTAGE
] as const;
export type Event = typeof EVENTS[number];

export type CalculatorAction = {
    type: typeof CLEAR_ENTRY,
    payload: {
    }
} | {
    type: typeof CLEAR_EVERYTHING,
    payload: {
    }
} | {
    type: typeof DECIMAL_POINT,
    payload: {
    }
} | {
    type: typeof EQUALS,
    payload: {
    }
} | {
    type: typeof NUMBER,
    payload: {
        key: number;
    }
} | {
    type: typeof OPERATOR,
    payload: {
        operator: string;
    }
} | {
    type: typeof PERCENTAGE,
    payload: {
    }
};

export const reducer = (prevState: CalculatorState, action: CalculatorAction): CalculatorState => {
    console.log('Event - Payload', { event: action.type, payload: action.payload });

    return prevState;
}

export interface CalculatorProps {
    state: CalculatorState;
    dispatch: Dispatch<CalculatorAction>;
}

const Calculator = ({ state, dispatch }: CalculatorProps) => {

    const handleButtonClick = (item: string) => () => {
        if (Number.isInteger(+item)) {
            dispatch({ type: NUMBER, payload: { key: +item } });
        } else if (isOperator(item)) {
            dispatch({ type: OPERATOR, payload: { operator: item } });
        } else if (item === OP_CLEAR) {
            dispatch({ type: CLEAR_EVERYTHING, payload: {} });
        } else if (item === OP_DECIMAL_POINT) {
            dispatch({ type: DECIMAL_POINT, payload: {} });
        } else if (item === OP_PERCENTAGE) {
            dispatch({ type: PERCENTAGE, payload: {} });
        } else if (item === OP_CLEAR_ENTRY) {
            dispatch({ type: CLEAR_ENTRY, payload: {} });
        } else {
            dispatch({ type: EQUALS, payload: {} });
        }
    };

    return (
        <div
            style={{
                width: 300,
                height: 'auto',
                border: '1px solid rgba(0,0,0,0.05)',
                margin: '0 auto',
                marginTop: 16,
            }}
        >
            <div>
                <Input
                    type="text"
                    value={state.context.display}
                    disabled
                    style={{
                        width: '100%',
                        textAlign: 'right',
                        padding: '8px 20px',
                        border: 'none',
                        outline: 'none',
                    }}
                />
            </div>
            <ButtonGrid
                style={{
                    padding: '8px 20px',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >
                {KEYS.map((btn, index) => (
                    <Button
                        className={btn === 'C' ? 'two-span' : ''}
                        type="button"
                        key={index}
                        onClick={handleButtonClick(btn)}
                    >
                        {btn}
                    </Button>
                ))}
            </ButtonGrid>

            <ExtraData>
                <p className="mt-1">State</p>
                <pre>
                    <code>{JSON.stringify(state.value, null, 2)}</code>
                </pre>
                <p className="mt-1">Context:</p>
                <pre>
                    <code>{JSON.stringify(state.context, null, 2)}</code>
                </pre>
            </ExtraData>
        </div>
    );
};

export default Calculator;
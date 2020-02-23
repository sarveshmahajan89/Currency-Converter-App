import React from "react";
import Select from 'react-select';
import $ from 'jquery';
import openSocket from 'socket.io-client';
import Toast from 'light-toast';

const socket = openSocket('http://localhost:8080');

class Conversion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 1,
            sourceCurrency: '',
            outputCurrency: '',
            conversionResult: '',
            showHistory: false,
            currencyHistory: [],
            currencyList: [{ value: 'USD', label: 'US Dollar', imageUrl: '/images/currency/usd.svg'  },
                { value: 'EUR', label: 'Euro', imageUrl: '/images/currency/eur.svg' },
                { value: 'JPY', label: 'Japanese Yen', imageUrl: '/images/currency/jpy.svg' },
                { value: 'INR', label: 'Indian Rupee', imageUrl: '/images/currency/inr.svg' },
                { value: 'GBP', label: 'British Pound', imageUrl: '/images/currency/gbp.svg' },
                { value: 'CNY', label: 'Chinese Yuan', imageUrl: '/images/currency/cny.svg' },
                { value: 'AUD', label: 'Australian Dollar', imageUrl: '/images/currency/aud.svg' },
                { value: 'CAD', label: 'Canadian Dollar', imageUrl: '/images/currency/cad.svg' },
                { value: 'CHF', label: 'Swiss Franc', imageUrl: '/images/currency/chf.svg' },
                { value: 'AED', label: 'Emirati Dirham', imageUrl: '/images/currency/aed.svg' },
                ]
        };
        this.customRenderer = this.customRenderer.bind(this);
        this.handleSourceCurrency = this.handleSourceCurrency.bind(this);
        this.handleOutputCurrency = this.handleOutputCurrency.bind(this);
        this.getConversionResult = this.getConversionResult.bind(this);
        this.handleAmoutChange = this.handleAmoutChange.bind(this);
        this.getHistoryDetails = this.getHistoryDetails.bind(this);
        this.swapCurrencies = this.swapCurrencies.bind(this);
    };

    listen() {
        let self = this;
        socket.on('currencyHistory', (data)=>{
            let updateData = data;
            updateData.length>10 && updateData.splice(0,1);
            self.setState({ currencyHistory: data });
        });
    }

    componentDidMount() {
        this.listen();
    }

    handleAmoutChange = e => {
        this.setState({ amount: e.target.value });
    };

    swapCurrencies() {
        if (this.state.sourceCurrency && this.state.outputCurrency) {
            const swapSourceVal = this.state.sourceCurrency;
            const swapOutputVal = this.state.outputCurrency;
            this.setState({
                sourceCurrency: swapOutputVal,
                outputCurrency: swapSourceVal
            });
        } else {
            Toast.fail('Please select both the currencies', 1500);
        }
    }

    componentWillUnmount() {
        socket.close();
    }

    updateCurrencyList(selectedCurrency) {
        return this.state.currencyList.filter(item => item.value !== selectedCurrency);
    }
    handleSourceCurrency = sourceCurrency => {
        this.setState({
            sourceCurrency: sourceCurrency.value
        });
    };

    handleOutputCurrency = outputCurrency => {
        this.setState({
            outputCurrency: outputCurrency.value
        });
    };

    getHistoryDetails() {
        this.setState(prevState => ({
            showHistory: !prevState.showHistory
        }))
    }
    getConversionResult() {
        if (!this.state.sourceCurrency || !this.state.outputCurrency) {
            Toast.fail('Please select both the currencies', 1500);
            return;
        }

        let url = 'https://free.currconv.com/api/v7/convert?q={0}&compact=ultra&apiKey=ae990718a7cddc316c71';
        const conversionString = this.state.sourceCurrency +'_'+this.state.outputCurrency;

        url = url.replace(/\{0\}/, conversionString);

        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',

            success: data => {
                const result = this.state.amount * data[conversionString];
                socket.emit('currencyHistory', {amount: this.state.amount, conversion: conversionString.replace('_', ' to '), value: data[conversionString]});
                this.setState({
                    conversionResult: result
                });
            },
            error: (xhr, status, err) => {
                Toast.fail(err.toString(), 1500);
                console.error(this.props.url, status, err.toString()); // eslint-disable-line
            }
        });
    }

    customRenderer(option, index) {
        let labelString = option.label;

        return (
            <div className='select-currency-wrapper'>
                <img className="" size="30" src={option.imageUrl} alt="" />
                <div className='select-name'>
                    <span className='select-currency-code' dangerouslySetInnerHTML={{ __html: labelString }} ></span>
                    <span className='select-currency-name'>{option.value}</span>
                </div>
            </div>
        );
    }

    renderHistory() {
        return this.state.currencyHistory.map((item, index) => {
            return (
                <React.Fragment key={'history-'+index}>
                    <li key={'history-li-'+index} className="history-list">
                        <span>Currency: {item.conversion}</span>
                        <span> , Amount: {item.amount}</span>
                        <span> , Unit Value: {item.value}</span>
                    </li>
                </React.Fragment>
            );
        });
    }
    render() {
        const { amount, currencyList, currencyHistory, conversionResult, sourceCurrency, outputCurrency, showHistory } = this.state;
        return (
            <div>
                <div className="row">
                    <div className='heading'><span className="skills">Please select source and output currencies for conversion</span></div>
                </div>
                <div className="row conversion-container">
                    <div className='container-fields'>
                        <label htmlFor="amount" className="label-input">Amount</label>
                        <input className="input-field" id="amount" aria-label="Amount"
                               name="Amount" type="number" value={amount} onChange={this.handleAmoutChange}/>
                    </div>
                    <div className='container-fields'>
                        <label htmlFor="currency-select-1" className="label-input">Source Currency</label>
                        <Select className="select-field" id="currency-select-1"
                                        value={sourceCurrency} onChange={this.handleSourceCurrency}
                                        options={currencyList}
                                        optionRenderer={this.customRenderer} />
                    </div>
                    <div className='container-fields'>
                        <div>
                            <button aria-label="Swap currencies" title='Swap currencies' className="swap-button-field" type="button">
                                <i className="fa fa-exchange fa-2x" aria-hidden="true" onClick={this.swapCurrencies}></i>
                            </button>
                        </div>
                    </div>
                    <div className='container-fields'>
                        <label htmlFor="currency-select-2" className="label-input">Output Currency</label>
                        <Select className="select-field" id="currency-select-2"
                                        value={outputCurrency} onChange={this.handleOutputCurrency}
                                        options={currencyList}
                                        optionRenderer={this.customRenderer} />
                    </div>
                    <div className='container-fields'>
                        <div>
                            <button aria-label="convert currency" title='convert currency' className={currencyHistory.length === 0 ? 'submit-button-field hidden-history' : 'submit-button-field'}
                                    type="button" onClick={this.getConversionResult}>
                                <i className="fa fa-arrow-circle-right fa-3x" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    {currencyHistory.length>0 && <div className='container-fields'>
                        <div>
                            <button aria-label="currency history" title='currency history' className="submit-button-field" type="button" onClick={this.getHistoryDetails}>
                                <i className="fa fa-history fa-3x" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>}
                    {conversionResult && <div className='result-container'>
                        <div className=''>
                            <span>{amount}</span> <span>{sourceCurrency}</span> = <span>{conversionResult}</span>
                            <span> {outputCurrency}</span>
                        </div>
                    </div>}
                    {showHistory && <div className='result-container'>
                        <div>
                            <h3>History</h3>
                            <ul>{
                                this.renderHistory()
                                }
                            </ul>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}
export default Conversion ;
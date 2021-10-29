import React, {useState} from 'react';
import DropDown from "../drop/DropDown";
import classes from "../UI/Button.module.css";
import './Customers.css';
import Card from "../UI/Card";

class Customers extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            enteredName: '',
            initialCustomers: [],
            optionItems: []
        }
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        this.changeHandler();
    }

    changeHandler() {
        var search = '';
        var searchText = document.getElementById("searchName").value.toString();
        var companyName = document.getElementById("Company_id").value.toString();
        var order = document.getElementById("Order").value.toString();
        console.log(order);
        if (order === 'First Name, Descending') {
            order = 'firstName DESC';
        }
        if (order === 'First Name, Ascending') {
            order = 'firstName ASC';
        }
        if (order === 'Last Name, Descending') {
            order = 'lastName DESC';
        }
        if (order === 'Last Name, Ascending') {
            order = 'lastName ASC';
        }
        if (order === 'Company Name, Descending') {
            order = 'companyName DESC';
        }
        if (order === 'Company Name, Ascending') {
            order = 'companyName ASC';
        }
        if (searchText.length > 0) search = search + 'search=' + searchText;
        if (companyName.length > 0) {
            if (searchText.trim().length > 0) search = search + '&';
            search = search + 'company=' + companyName;
        }
        if (search.trim().length > 0) search = search + '&';
        search = search + 'order=' + order;

        let initialPlanets = [];
        fetch('http://localhost:8080/appUsers?' + search)
            .then(response => {
                return response.json();
            }).then(data => {
            initialPlanets = data.map((planet) => {
                return planet
            });

            let optionItemsIner = initialPlanets.map((customer) =>
                <tr>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.company_name}</td>
                </tr>
            );
            console.log("inner " + optionItemsIner);
            this.setState({
                initialCustomers: initialPlanets,
                optionItems: optionItemsIner
            });
            console.log(initialPlanets);

        });
    };

    render() {
        let customer = this.state.initialCustomers;
        let optionCust = customer.map((customer) =>
            <tr>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.company_name}</td>
            </tr>
        );

        return (
            <div>
                <Card className="addClass">
                    <label htmlFor="username">Search</label>
                    <input
                        id="searchName"
                        type="text"
                    />
                    <label htmlFor="company">Company</label>
                    <DropDown/>
                    <select id="Order">
                        <option key='1'>First Name, Descending</option>
                        <option key='2'>First Name, Ascending</option>
                        <option key='3'>Last Name, Descending</option>
                        <option key='4'>Last Name, Ascending</option>
                        <option key='5'>Company Name, Descending</option>
                        <option key='6'>Company Name, Ascending</option>
                    </select>
                    <button
                        className={classes.button}
                        type={'button'}
                        onClick={this.changeHandler}
                    >Filter
                    </button>
                </Card>
                <div>
                    <table className='MyTable'>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Company</th>
                        </tr>
                        </thead>
                        <tbody>
                        {optionCust}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}

export default Customers;
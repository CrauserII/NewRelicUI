import React from 'react';

var values;

class DropDown extends React.Component {
    state = {
        values: []
    };
    constructor(){
        let never = super();
        this.state = {
            options: [],
            companies: [],
        }
    }

    componentDidMount(){
        this.fetchOptions();
        let initialcompanies = [];
        fetch('http://localhost:8080/appCompanies')
            .then(response => {
                return response.json();
            }).then(data => {
            initialcompanies = data.map((planet) => {
                return planet
            });
            console.log(initialcompanies);
            this.setState({
                companies: initialcompanies,
            });
        });
    }

    fetchOptions(){
        fetch('http://localhost:8080/appCompanies')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json();
            }).then((json) => {

            values = json;
            this.setState({options: values.values})

        });
    }
    render(){
        let companies = this.state.companies;
        let optionItems = companies.map((planet) =>
            <option key={planet.company_id}>{planet.companyName}</option>
        );
 
        return <div>
            <label htmlFor="company">Company</label>
            <select id="Company_id">
                <option key='0'>All</option>
                {optionItems}
            </select>
        </div>;
    }
}

export default DropDown;
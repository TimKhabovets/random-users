import React from "react";
import './style/style.css';
import Store from "./stores/Store";
import { faker } from '@faker-js/faker';

class List extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            country: '',
            mistakes: 0,
            seed: 0,
        };
        Store.users = [];
        Store.lengths = 20;
        this.selectCountry = this.selectCountry.bind(this);
    }
    componentDidMount() {
        window.addEventListener("scroll", this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false);
    }

    onScroll = () => {
        if (this.hasReachedBottom()) {
            Store.lengths = Store.lengths + 10;
            this.getTenUsers();
        }
    };

    hasReachedBottom() {
        return (
            (window.scrollY + 1 >= document.documentElement.scrollHeight - document.documentElement.clientHeight)
        );
    }

    getSelect = (e: any) => {
        this.setState({
            country: e.target.value
        });
        Store.country = e.target.value;
        Store.lengths = 20;
        this.lookCountryAndSeed();
    }

    getRange = (e: any) => {
        this.setState({
            mistakes: e.target.value
        });
        Store.mistakes = e.target.value;
        Store.lengths = 20;
        this.lookCountryAndSeed();
    }

    getSeed = (e: any) => {
        this.setState({
            seed: e.target.value
        });
        Store.seed = e.target.value;
        Store.lengths = 20;
        this.lookCountryAndSeed();
    }

    getRandom = (e: any) => {
        let seed = Math.floor(Math.random() * 1000) + 1;;
        this.setState({
            seed: seed
        });
        Store.seed = seed;
        Store.lengths = 20;
        this.lookCountryAndSeed();
    }

    createUserAddMistakes() {
        let user = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            address: faker.address.cityName() + ', ' + faker.address.streetAddress(true) + ' ' + faker.address.buildingNumber(),
            number: faker.phone.number('+33-##-##-##-##-##')
        };
        for (let index = 0; index < Store.mistakes; index++) {
            user = this.selectMethod(user)
        }

        return user;
    }

    selectPosition(field: any) {
        let randomPosition = Math.floor(Math.random() * field.length);
        return randomPosition;
    }

    selectMethod(user: any) {
        let event = Math.random();
        if (event < 0.33) {
            return this.addLetter(user);
        }
        if (event < 0.66) {
            return this.deleteLetter(user);
        }
        if (event <= 1) {
            return this.changeLetter(user);
        }
    }

    changeLetter(user: any) {
        let fields = Math.floor(Math.random() * 4);
        if (fields == 0) {
            let position = this.selectPosition(user.id);
            user.id = (user.id.substr(0, position) ? user.id.substr(0, position) : '') + (user.id[position + 1] ? user.id[position + 1] : '') + user.id[position] + (user.id.substr(position + 2, user.id.length) ? user.id.substr(position + 2, user.id.length) : '');
        }
        if (fields == 1) {
            let position = this.selectPosition(user.name);
            user.name = (user.name.substr(0, position) ? user.name.substr(0, position) : '') + (user.name[position + 1] ? user.name[position + 1] : '') + user.name[position] + (user.name.substr(position + 2, user.name.length) ? user.name.substr(position + 2, user.name.length) : '');
        }
        if (fields == 2) {
            let position = this.selectPosition(user.address);
            user.address = (user.address.substr(0, position) ? user.address.substr(0, position) : '') + (user.address[position + 1] ? user.address[position + 1] : '') + user.address[position] + (user.address.substr(position + 2, user.address.length) ? user.address.substr(position + 2, user.address.length) : '');
        }
        if (fields == 3) {
            let position = this.selectPosition(user.number);
            user.number = (user.number.substr(0, position) ? user.number.substr(0, position) : '') + (user.number[position + 1] ? user.number[position + 1] : '') + user.number[position] + (user.number.substr(position + 2, user.number.length) ? user.number.substr(position + 2, user.number.length) : '');
        }

        return user;
    }

    deleteLetter(user: any) {
        let fields = Math.floor(Math.random() * 4);
        if (fields == 0) {
            let position = this.selectPosition(user.id);
            user.id = user.id.substr(0, position) + (user.id.substr(position + 1, user.id.length) ? user.id.substr(position + 1, user.id.length) : '');
        }
        if (fields == 1) {
            let position = this.selectPosition(user.name);
            user.name = user.name.substr(0, position) + (user.name.substr(position + 1, user.name.length) ? user.name.substr(position + 1, user.name.length) : '');
        }
        if (fields == 2) {
            let position = this.selectPosition(user.address);
            user.address = user.address.substr(0, position) + (user.address.substr(position + 1, user.address.length) ? user.address.substr(position + 1, user.address.length) : '');
        }
        if (fields == 3) {
            let position = this.selectPosition(user.number);
            user.number = user.number.substr(0, position) + (user.number.substr(position + 1, user.number.length) ? user.number.substr(position + 1, user.number.length) : '');
        }

        return user;
    }

    addLetter(user: any) {
        let randomIndex = Math.floor(Math.random() * Store.alphabet.length);
        let randomLetter = Store.alphabet[randomIndex];
        let fields = Math.floor(Math.random() * 4);
        if (fields == 0) {
            let position = this.selectPosition(user.id);
            user.id = user.id.substr(0, position) + randomLetter + user.id.substr(position, user.id.length);
        }
        if (fields == 1) {
            let position = this.selectPosition(user.name);
            user.name = user.name.substr(0, position) + randomLetter + user.name.substr(position, user.name.length);
        }
        if (fields == 2) {
            let position = this.selectPosition(user.address);
            user.address = user.address.substr(0, position) + randomLetter + user.address.substr(position, user.address.length);
        }
        if (fields == 3) {
            let position = this.selectPosition(user.number);
            user.number = user.number.substr(0, position) + randomLetter + user.number.substr(position, user.number.length);
        }
        return user;
    }

    lookCountryAndSeed() {
        if (this.state.country) {
            this.getTenUsers();
        }
    }

    selectCountry() {
        if (Store.country == 'French') { return this.createRandomFrenchUser() }
        if (Store.country == 'Italy') { return this.createRandomItalyUser() }
        if (Store.country == 'Great Britain') { return this.createRandomGreatBritainUser() }
    }

    getTenUsers() {
        Store.users = [];
        var div = document.getElementById('users');
        while (div?.firstChild) {
            div.removeChild(div.firstChild);
        }
        this.selectCountry();
        this.addUsers();
    }

    createRandomFrenchUser() {
        faker.seed(Number(Store.seed));
        faker.setLocale('fr');
        for (let index = 1; index <= Store.lengths; index++) {
            let user = this.createUserAddMistakes();
            Store.users.push({
                id: user.id,
                name: user.name,
                address: user.address,
                number: user.number,
            });
        }
    }

    createRandomItalyUser() {
        faker.seed(Number(Store.seed));
        faker.setLocale('it');
        for (let index = 1; index <= Store.lengths; index++) {
            let user = this.createUserAddMistakes()
            Store.users.push({
                id: user.id,
                name: user.name,
                address: user.address,
                number: user.number,
            });
        }
    }


    createRandomGreatBritainUser() {
        faker.seed(Number(Store.seed));
        faker.setLocale('en_GB');
        for (let index = 1; index <= Store.lengths; index++) {
            let user = this.createUserAddMistakes()
            Store.users.push({
                id: user.id,
                name: user.name,
                address: user.address,
                number: user.number,
            });
        }
    }

    addUsers() {
        const users = document.getElementById('users');
        for (let i = 0; i < Store.users.length; i++) {
            let user = Store.users[i];
            users?.insertAdjacentHTML('beforeend',
                `<hr />
                    <div className="user">
                        <h4>${i+1}</h4>
                        <h5>${user.id}</h5>
                        <h5>${user.name}</h5>
                        <h5>${user.address}</h5>
                        <h5>${user.number}</h5>
                    </div>`
            );
        }
    };

    render() {

        const navBar = () => (
            <div className="container-navbar bg-secondary">

                <select className="form-select" onChange={this.getSelect}>
                    <option value="French">French</option>
                    <option value="Italy">Italy</option>
                    <option value="Great Britain">Great Britain</option>
                </select>

                <hr />

                <div className="range">
                    <label htmlFor="customRange3" className="form-label">mistakes</label>
                    <input onChange={this.getRange} type="range" className="form-range" min="0" max="10" step="0.25" id="customRange3" value={this.state.mistakes}></input>

                    <input onChange={this.getRange} type="number" className="form-control" placeholder="from 1 to 1000" min="0" max="1000" id="floatingTextarea" value={this.state.mistakes} />
                </div>

                <hr />

                <div className="seed">
                    <input onChange={this.getSeed} type="number" className="form-control" placeholder="seed" id="seed" value={this.state.seed} />

                    <button onClick={this.getRandom} type="button" className="btn btn-outline-dark">random</button>
                </div>
            </div>
        );

        return (
            <div className="container-me bg-secondary-subtle">
                {navBar()}
                <div id="users"></div>
            </div>
        );
    }
}

export default List;
import { faker } from '@faker-js/faker';
import Store from '../stores/Store'

faker.seed(Store.seed);

class User {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    address: string | undefined;
    number: string | undefined;
}

export default User;
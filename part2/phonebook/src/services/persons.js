import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson);
    return request.then((response) => response.data);
};

const personsService = { getAllPersons, createPerson };
export default personsService;

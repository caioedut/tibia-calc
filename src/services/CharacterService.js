import API from './API';

class CharacterService {
    static async get(nick) {
        return API.get(`characters/${nick.replace(/\s/, '+')}.json`);
    }
}

export default CharacterService;
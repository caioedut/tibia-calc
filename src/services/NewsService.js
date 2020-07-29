import API from './API';

class NewsService {

    static async list() {
        return API.get('newstickers.json');
    }

    static async get(id) {
        return API.get(`news/${id}.json`);
    }

}

export default NewsService;
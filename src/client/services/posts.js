import axios from 'axios';

export function getTitle(id) {
    return axios({
        method: 'get',
        url: 'http://localhost:8080/boards/title/'+id
    });
}

export function getContent(id) {
    return axios.get('http://localhost:8080/boards/content/'+id);
}

import { ajax } from 'rxjs/ajax'

const fetchUsers = (seed: number, page: number) => {
  return ajax.getJSON(`https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`)
}

export { fetchUsers }

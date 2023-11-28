import { USER_ROLE } from '../../script/user'
import { List } from '../../script/list'

class UserItem extends List {
  constructor() {
    super()

    this.element = document.querySelector('#user-item')
    if (!this.element) throw new Error('Element is null')

    this.id = new URLSearchParams(location.href).get('id')
    if (!this.id) location.assign('/user-list')
    this.loadData()
  }

  loadData = async () => {
    this.updateStatus(this.STATE.LOADING)

    try {
      const res = await fetch(
        `/user-item-data?id=${this.id}`,
        {
          method: 'GET',
        },
      )
      const data = await res.json()

      if (res.ok) {
        this.updateStatus(
          this.STATE.SUCCESS,
          this.convertData(data),
        )
      } else {
        this.updateStatus(this.STATE.ERROR, data)
      }
    } catch (error) {
      console.log(error)
      this.updateStatus(this.STATE.ERROR, {
        message: error.message,
      })
    }
  }
  convertData = (data) => {
    return {
      ...data,
      user: {
        ...data.user,
        role: USER_ROLE[data.user.role],
        confirm: data.user.isConfirm ? 'Так' : 'Ні',
      },
    }
  }

  updateView = () => {
    this.element.innerHTML = ''

    switch (this.status) {
      case this.STATE.LOADING:
        this.element.innerHTML = `
        <div  class="data">
        <span class="data__title">ID</span>
        <span class="data__value skeleton"></span>
        </div>
        <div  class="data">
        <span class="data__title skeleton">Email</span>
        <span class="data__value skeleton"></span>
        </div>
        <div  class="data">
        <span class="data__title skeleton">Роль</span>
        <span class="data__value skeleton"></span>
        </div>
        <div  class="data">
        <span class="data__title skeleton">Пошта підтверджена</span>
        <span class="data__value skeleton"></span>
        </div>
        `
        break

      case this.STATE.SUCCESS:
        this.data.list.forEach((item) => {
          this.element.innerHTML += `
          <a href "/user-item?id=${item.id}" class="user user--click>
          <span class="user__title">${item.email}</span>
          <span class="user__sub">${item.role}</span>
          </a>
          `
        })
        break

      case this.STATE.SUCCESS:
        const { id, email, role, confirm } = this.data.user
        this.element.innerHTML = `
        <div class="data">
          <span class="data__title">ID</span>
          <span class="data__value">${id}</span>
        </div>
        <div class="data">
          <span class="data__title">Email</span>
          <span class="data__value">${email}</span>
        </div>
        <div class="data">
          <span class="data__title">Роль</span>
          <span class="data__value">${role}</span>
        </div>
        <div class="data">
          <span class="data__title">Пошта підтверджена</span>
          <span class="data__value">${confirm}</span>
        </div>
        `
        break

      case this.STATE.ERROR:
        this.element.innerHTML = `
          <span class="alert alert--error">${this.data.message}</span>
          `
        break
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.session || !window.session.user.isConfirm) {
    location.assign('/')
  }

  new UserItem()
})
// static value = {}

// static validate = (name, value) => {
//   return true
// }

// static submit = () => {
//   console.log(this.value)
// }

// static change = (name, value) => {
//   console.log(name, value)
//   if (this.validate(name, value)) this.value[name] = value

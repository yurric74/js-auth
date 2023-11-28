// 1.загрузка данных ->отображение статуса загрузки
// 2.отображение данных кот. мы загрузили(ковертация данных)
export class List {
  STATE = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
  }

  status = null //свойство с одним из 3 значений:LOADING, SUCCESS, ERROR
  data = null //данные кот. мы загрузили
  element = null //в нем отображаем наши данные

  updateStatus = (status, data) => {
    this.status = status
    if (data) this.data = data

    this.updateView()
  }

  updateView = () => {}

  loadData = async () => {}

  convertData = () => {}
}

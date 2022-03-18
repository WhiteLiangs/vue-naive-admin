import dayjs from 'dayjs'

/**
 * @desc  格式化时间
 * @param {(Object|string|number)} time
 * @param {string} format
 * @returns {string | null}
 */
export function formatDateTime(time = undefined, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function formatDate(date = undefined, format = 'YYYY-MM-DD') {
  return formatDateTime(date, format)
}

/**
 * @desc  函数节流
 * @param {Function} fn
 * @param {Number} wait
 * @returns {Function}
 */
export function throttle(fn, wait) {
  var context, args
  var previous = 0

  return function () {
    var now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}

/**
 * @desc  函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(method, wait, immediate) {
  let timeout
  return function (...args) {
    let context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      /**
       * 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
       * 这样确保立即执行后wait毫秒内不会被再次触发
       */
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        method.apply(context, args)
      }
    } else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        /**
         * args是一个类数组对象，所以使用fn.apply
         * 也可写作method.call(context, ...args)
         */
        method.apply(context, args)
      }, wait)
    }
  }
}

export function FlatToTree(arr) {
  const a = []
  arr.forEach((el) => {
    const route = {
      id: 0,
      pid: 0,
      name: '',
      path: '',
      component: '',
      meta: {
        title: '',
      },
    }
    route.name = el.auth_mark
    route.path = el.router_url
    route.meta.title = el.auth_name
    route.id = el.id
    route.pid = el.pid
    if (el.pid !== '0') {
      route.component = el.router_url
    } else {
      route.component = 'Layout'
    }
    a.push(route)
  })

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map = {}
  a.forEach(function (item) {
    map[item.id] = item
  })
  //        console.log(map);
  const val = []
  a.forEach(function (item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    if (item.path) {
      const parent = map[item.pid]
      // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        ;(parent.children || (parent.children = [])).push(item)
      } else {
        // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item)
      }
    }
  })
  console.log(val)
  return val
}

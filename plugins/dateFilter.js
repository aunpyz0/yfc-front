import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('formatDate', (value) => {
    const date = new Date(value)
    return format(date, 'yy/MM/dd')
})

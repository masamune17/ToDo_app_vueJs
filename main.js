var STORAGE_KEY = 'todo_app_vue'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

new Vue({
  el: '#todo',
  data: {
    todos: []
  },
  created() {
    this.todos = todoStorage.fetch()
  },
  methods: {    
    doAdd: function() {
      var comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        edit: false
      })
      comment.value = ''
    },
    doUpdate: function(item) {
      var comment = this.$refs[item.id][0]
      if (!comment.value.length) {
        return
      }
      item.comment = comment.value
      item.edit = false
      comment.value = ''
    },
    doRemove: function(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    },
    doEdit: function(item) {
      item.edit = true
    }
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  }
})

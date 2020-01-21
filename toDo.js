Vue.component('todo-header',{
    template: '<h1 class="my-3">todo-in-vue</h1>'
});

Vue.component('todo-list-item',{
    props: ['todo'],
    template: 
    `<li class="my-1 list-group-item list-group-item-action list-group-item-secondary d-flex justify-content-between align-items-center rounded"
        v-bind:class="{'list-group-item-success': todo.complete}"
        >
        {{todo.text}}
        <span class="icon-action">
            <span v-if="!todo.complete" class="pl-2 text-left done-todo">
                <i class="fas fa-check" @click="$emit('todo-done')"></i>
            </span>
            <span v-else class="pl-2 text-left todo-again-done">
                <i class="fas fa-undo-alt" @click="$emit('todo-again-done')"></i>
            </span>
            <span class="pl-2 text-left remove-todo">
                <i class="far fa-trash-alt" @click="$emit('todo-remove')"></i>
            </span>
        </span>
    </li>`
});

Vue.component('todo-undo-button', {
    template: 
    `<button class="btn btn-secondary btn-sm mb-2" title="Undo todo item" @click="$emit('todo-undo')" >
        <i class="fas fa-history"></i>
    </button>`
});

Vue.component('todo-bin-button', {
    template: 
    `<button class="btn btn-danger btn-sm mb-2" title="Remove bin" @click="$emit('todo-bin')" >
        <i class="fas fa-ban"></i>
    </button>`
})

let idNumber = Date.now();
var app = new Vue({ 
    el: '#app',
    data: {
        todos:[
            {id: idNumber++, text: "Learn Vue!", complete: true},
            {id: idNumber++, text: "Learn Vue harder.", complete: false},
            {id: idNumber++, text: "Do something good for the world.", complete: false}
        ],
        removeTodos:[],
        todoInputValue: "",
        allIsDone: false
    },
    methods:{
        addNewToDo(text){
            if(text){
                this.todos.push({id: idNumber++, text: text, complete: false});
                this.todoInputValue = "";
            }
        },  
        doneToDo(index){
            this.$set(this.todos[index], 'complete', true);
        },
        againToDo(index){
            this.$set(this.todos[index], 'complete', false);
        },
        removeToDo(index){
            this.removeTodos.push(this.todos[index]);
            this.$delete(this.todos, index);
        },
        checkAllIsDone(){
            if(this.todos.length){
                const notDoneCount = this.todos.filter(t=> t.complete === false).length;
                this.allIsDone = notDoneCount === 0 ? true : false;
            }
            else
                this.allIsDone = false;
        },
        undoToDo(){
            const removeItemIndex = this.removeTodos.length - 1;
            this.todos.push(this.removeTodos[removeItemIndex]);
            this.$delete(this.removeTodos, removeItemIndex);
        },
        binToDo(){
            this.removeTodos = [];
        }
    },
    watch:{
        todos: {
            deep: true,
            handler(){
                this.checkAllIsDone();
            }
        }
    },
    mounted(){
        this.checkAllIsDone();
    }
});

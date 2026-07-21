import { Component } from "react";
import Todo from "./Todo";

class List extends Component {
  id;
  name;
  todos: Todo[] = [];
  constructor(props: any) {
    super(props);
    this.name = props.name;
    this.id = props.id;
  }

  listID() {
    return this.id;
  }
  getTodo(id: number) {
    return this.todos[id];
  }
  addTodo(todo: Todo) {
    this.todos.push(todo);
  }
  deleteTodo(id: number) {
    this.todos.splice(id, 1);
    console.log("Todos nach löschen! " + this.todos);
  }
}
export default List;

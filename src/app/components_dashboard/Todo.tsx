import {Component} from "react";

class Todo extends Component{
    id;
    name;



    constructor(props:any) {
        super(props);
        this.id=props.id;
        this.name=props.name;



    }

}
export default Todo;
import {Component} from "react";
import {types} from "sass";
import List = types.List;

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
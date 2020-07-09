import React, { Component } from 'react';
import Snake from './../presentation/Snake';
import Food from './../presentation/Food';

export default class SnakeApp extends Component {

    constructor(){
        super();
        this.initialState = {
            snakeCoords: [
                [0,0],
                [2,0],
                [4,0]
            ],
            foodPosition: this.generateFoodPosition(),
            direction: 'RIGHT',
            snakeSpeed: 200
        };

        this.state = this.initialState;
    }

    componentDidMount(){
        setInterval(this.moveSnake, this.state.snakeSpeed);
        document.onkeydown = this.onKeydown;
    }

    componentDidUpdate(){
        this.checkIfSnakeIsOutOfBounds();
        this.checkIfSnakeEatsItself();
        this.checkIfSnakeEatsFood();
    }

    onKeydown = (event) =>{
        event = event || window.event;
        let dir = '';
        switch(event.keyCode){
            case 37:
                if(this.state.direction != 'RIGHT')
                    dir = 'LEFT';
                break;
            case 38:
                if(this.state.direction != 'DOWN')
                    dir = 'UP';
                break;
            case 39:
                if(this.state.direction != 'LEFT')
                    dir = 'RIGHT';
                break;
            case 40:
                if(this.state.direction != 'UP')
                    dir = 'DOWN';
                break;
        }

        if(dir){
            this.setState({
                direction: dir
            });
        }
    }

    generateFoodPosition = () => {
        let min = 1;
        let max = 98;
        let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
        let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
        return [x,y];
    }

    moveSnake = () =>{
        let coords = [...this.state.snakeCoords];
        let head = coords[coords.length-1]

        switch(this.state.direction){
            case 'UP':
                head = [head[0], head[1] - 2]
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2]
                break;
            case 'LEFT':
                head = [head[0] - 2, head[1]]
                break;
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;
        }
        
        coords.push(head);
        coords.shift();

        this.setState({
            snakeCoords: coords
        });
    }

    checkIfSnakeIsOutOfBounds = () =>{
        let head = this.state.snakeCoords[this.state.snakeCoords.length - 1];
        let x = head[0];
        let y = head[1];
        if (x <0 || x>=100 || y>=100 || y < 0){
            this.onGameOver();
        }
    }

    checkIfSnakeEatsItself = () => {
        let coords = [...this.state.snakeCoords];
        let head = coords[coords.length - 1];
        coords.pop();
        coords.forEach(val => {
            if(val[0] == head[0] && val[1] == head[1]){
                this.onGameOver();
            }
        });
    }

    checkIfSnakeEatsFood = () => {
        
        let head = this.state.snakeCoords[this.state.snakeCoords.length - 1];
        let food = this.state.foodPosition;

        if(head[0] == food[0] && head[1] == food[1]){
            this.setState({
                foodPosition: this.generateFoodPosition()
            })
            this.enlargeSnake();
            this.increaseSpeed();
        }
    }

    increaseSpeed = () => {
        if(this.state.snakeSpeed > 10){
            this.setState({
                snakeSpeed: this.state.snakeSpeed - 10
            })
        }
    }

    enlargeSnake = () => {

        let coords = [...this.state.snakeCoords];
        coords.unshift([])
        this.setState({
            snakeCoords: coords
        })
    }

    onGameOver = () =>{
        alert("Game Over - Score: "+ (this.state.snakeCoords.length - 3) );
        this.setState(this.initialState);
    }

    render(){

        return (
            <div className="game-area">
                <Snake dots={this.state.snakeCoords}></Snake>
                <Food position={this.state.foodPosition}></Food>
            </div>
        );
    }
}
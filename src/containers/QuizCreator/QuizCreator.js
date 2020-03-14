import React, {Component} from 'react';
import './QuizCreator.scss';
import Button from "../../components/Button/Button";
import {createControl} from '../../form/form';
import Input from "../../components/Input/Input";

function createOptionControl(number) {
  return createControl({label: `Вариант ${number}`, errorMessage: 'Значение не может быть пустым', id: number}, {required: true})
}

function createFormControls() {
  return {
    question: createControl({label: 'Введите вопрос', errorMessage: 'Вопрос не может быть пустым'}, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls()
  }

  submitHandler = event => {
    event.preventDefault();
  }

  addQuestion = () => {

  }

  createQuiz = () => {

  }

  changeHandler = (value, controlName) => {

  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((item, index) => {
      const control = this.state.formControls[item];
      return (
        <React.Fragment key={item + index}>
          <Input label={control.label} value={control.value} valid={control.valid} shouldValidate={!!control.validation} touched={control.touched} errorMessage={control.errorMessage} onChange={event => this.changeHandler(event.target.value, item)}/>
          {index === 0 ? <hr/> : null}
        </React.Fragment>
      )
    })
  }

  render() {
    return (
      <div className="quiz-creator">
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>
            { this.renderInputs() }

            <select></select>
            <Button type="primary" onClick={this.addQuestion}>Добавить вопрос</Button>
            <Button type="success" onClick={this.createQuiz}>Создать тест</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
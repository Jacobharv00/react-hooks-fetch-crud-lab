import { useState, useEffect } from "react";
import QuestionItem from './QuestionItem'

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(resp => resp.json())
    .then(data => {
      // console.log('json data', data)
      setQuestions(data)
    })
  }, [])

  const questionList = questions.map((question) => 
    <QuestionItem 
      question={question}
      key={question.id}
      handleDelete={handleDelete}
      correctAnswerChange={handleCorrectAnswerChange}
    />
  )

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => {
      const updatedQuestions = questions.filter((question) => question.id !== id)
      setQuestions(updatedQuestions)
    })
  }
    
  function handleCorrectAnswerChange(id, correctIndex) {
    fetch(`http://localhose:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(correctIndex)
    })
    .then(resp => resp.json())
    .then(updatedQuestion => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id) 
          return updatedQuestion
          return question
      })
      setQuestions(updatedQuestions)
    })
  }
  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;

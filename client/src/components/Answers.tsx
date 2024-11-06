import { Answer, Question } from '@/routes/create-quiz'
import { DeleteIcon, Edit2Icon } from 'lucide-react'


function Answers({answer, question, getQuiz}:{answer:Answer, question:Question, getQuiz:()=>Promise<void>}) {

  return (
    <div key={answer.id} className="border-2 flex items-center justify-between gap-2 border-black p-2">
    <li>{answer.text}</li>
    <div className="flex items-center gap-1">
      <Edit2Icon className="cursor-pointer" />
      {question.answers[0].id != answer.id && (
        <DeleteIcon className="cursor-pointer" />
      )}
    </div>
    
  </div>
  )
}

export default Answers
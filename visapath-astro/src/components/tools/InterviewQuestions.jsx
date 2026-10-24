import { useState } from 'react';

const QUESTIONS = {
  'US B1/B2 (Tourist/Business)': [
    'What is the purpose of your trip to the United States?',
    'How long will you stay?',
    'Where will you stay in the US?',
    'Who is paying for this trip?',
    'What do you do for work?',
    'How long have you worked there? What is your salary?',
    'Are you married? Do you have children?',
    'Where does your family live?',
    'Have you traveled abroad before? Which countries?',
    'Do you have relatives in the United States?',
    'What property do you own in Pakistan?',
    'Will you return to Pakistan? Why?',
    'Have you ever been refused a visa before?',
    'What places will you visit in the US?',
    'How much money are you taking?',
  ],
  'UK Student Visa': [
    'Why have you chosen the United Kingdom to study?',
    'Why this specific university and not others?',
    'What course are you taking? Describe its modules.',
    'How did you fund your studies?',
    'Who is sponsoring you?',
    'What are your plans after graduation?',
    'Why not study the same course in Pakistan?',
    'How much are your tuition fees? Living costs?',
    'Have you been to the UK before?',
    'Do you have family in the UK?',
    'What was your academic background?',
    'Did you take IELTS? What score?',
    'Where will you live in the UK?',
    'How did you hear about this university?',
  ],
  'UK Visitor Visa': [
    'Why do you want to visit the UK?',
    'Who are you visiting?',
    'Where will you stay?',
    'How long will you stay?',
    'Who is paying for the trip?',
    'What do you do for work in Pakistan?',
    'What are your family circumstances?',
    'Why will you return to Pakistan?',
    'Have you been to the UK before?',
    'Have you been to other countries?',
    'Can you show your bank statements?',
    'What is your travel itinerary?',
  ],
  'Canada Visitor Visa': [
    'Why Canada and not another country?',
    'Who do you plan to visit?',
    'Where will you stay?',
    'How long is your trip?',
    'Who pays for the trip?',
    'What ties you to Pakistan — family, job, property?',
    'Have you traveled abroad before?',
    'What is your employment status?',
    'Have you been refused a visa anywhere?',
  ],
  'Schengen Visa': [
    'Which countries will you visit in the Schengen Area?',
    'What is the purpose of your trip?',
    'How long will you stay?',
    'Where will you stay in each city?',
    'Who is paying for this trip?',
    'Do you have travel insurance for €30,000?',
    'What ties do you have to Pakistan?',
    'Have you been to Europe before?',
    'What is your job and salary?',
    'Can you show return flight ticket?',
  ],
  'Australia Student Visa': [
    'Why have you chosen Australia?',
    'Why this university and course?',
    'What are your academic qualifications?',
    'Who is funding your studies?',
    'What are your post-study plans?',
    'Why not study the same course in Pakistan?',
    'How much are the total costs?',
    'Do you have family in Australia?',
    'What is your English proficiency score?',
  ],
};

export default function InterviewQuestions() {
  const [visa, setVisa] = useState('US B1/B2 (Tourist/Business)');
  const [revealed, setRevealed] = useState({});

  const questions = QUESTIONS[visa];

  const toggle = (i) => setRevealed({ ...revealed, [i]: !revealed[i] });
  const reset = () => setRevealed({});

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type</label>
          <select value={visa} onChange={(e) => { setVisa(e.target.value); setRevealed({}); }}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(QUESTIONS).map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <button onClick={reset} className="text-sm text-gray-500 hover:text-brand-600">Reset</button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Click each question to practice. Try to answer out loud before revealing.
      </p>

      <ol className="space-y-2">
        {questions.map((q, i) => (
          <li key={i} onClick={() => toggle(i)}
              className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-brand-500">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-brand-600">{i + 1}.</span>
              <span className="text-gray-800">{q}</span>
            </div>
            {revealed[i] && (
              <div className="mt-2 pl-6 text-sm text-gray-600 italic">
                Keep your answer short (1–2 sentences), honest, and specific. Have dates, costs, and names ready.
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

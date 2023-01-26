/** @jest-environment jsdom */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SampleData from "../../../../ExampleData/index.js";

import { rest } from 'msw';
import { setupServer } from 'msw/node';

//COMPONENTS
import QuestionsList from "./QuestionsList/QuestionsList.jsx";
import Question from "./QuestionsList/Question.jsx";
import AnswersList from "./Answers/AnswersList.jsx";
import Answer from "./Answers/Answer.jsx";
import SearchBar from "./QuestionsList/SearchBar.jsx";


const server = setupServer(
  rest.get('/*', (req, res, ctx) => {
    return res(ctx.status(200, 'Complete'));
  }),
)


test('Sample Test Suite', () => {
  expect(true).toBe(true);
});


describe("Questions View Component", () => {
  it("should only render two questions by default", async () => {
    let { container } = render(<QuestionsList questionsList={[0, 1, 2, 3, 4]} />);
    expect(await container.getElementsByClassName('Question').length).toBe(2);
  });

  it("should render two more questions when button is clicked", async () => {
    let { getByText, container } = render(<QuestionsList questionsList={[0, 1, 2, 3, 4]} />);
    fireEvent.click(getByText('MORE ANSWERED QUESTIONS'));
    expect(await container.getElementsByClassName('Question').length).toBe(4);
  })
})

describe("Answers View Component", () => {
  it("should only render two answers by default", async () => {
    let { container } = render(<AnswersList answersList={[0, 1, 2, 3]} />);
    expect(await container.getElementsByClassName('Answer').length).toBe(2);
  });

  it("should render two more answers when button is clicked", async () => {
    let { getByText, container } = render(<AnswersList answersList={[0, 1, 2, 3, 4]} />);
    fireEvent.click(getByText('See More Answers'));
    expect(await container.getElementsByClassName('Answer').length).toBe(4);
  })
})

describe("Search Bar Component", () => {
  it("should have placeholder text", async () => {
    let { getByRole } = render(<SearchBar />);
    expect(await getByRole('textbox').placeholder).toBe('Have a question? Search for more answers...')
  })
  it("should update search input filter when typed", async () => {
    let { getByRole } = render(<SearchBar />);
    fireEvent.input(getByRole('textbox'), { target: { value: 'yes' } });
    expect(await getByRole('textbox').value).toBe('yes');
  })
})

describe("Answer Component", () => {
  it("should precede every answer with A:", async () => {
    let { getByTestId } = render(<Answer ans={{ body: 'Yes, this was helpful' }} />);
    expect(await getByTestId('test-answer').textContent).toBe('A: Yes, this was helpful');
  })
})

describe("Qusetion Component", () => {
  it("should precede every answer with Q:", async () => {
    let { getByTestId } = render(<Question q={{ question_body: 'Was this helpful?' }} />);
    expect(await getByTestId('test-question').textContent).toBe('Q: Was this helpful?');
  })
})
const { Result } = require("../../models");

describe("When calling getScore function", () => {
  describe("When getting the score is successful", () => {
    let score;
    beforeAll(() => {
      const results = [
        {
          id: 10,
          user_id: 1,
          word_id: 9,
          lesson_id: 2,
          answer: "Water please",
          is_correct: true,
          createdAt: "2022-11-03T09:21:11.000Z",
          updatedAt: "2022-11-03T09:21:11.000Z",
          deleted_at: null,
          Word: {
            id: 9,
            question: "お水ください",
            correct_answer: "Water please",
            choice1: "Refill, please",
            choice2: "How much is this?",
            choice3: "This one please",
            choice4: "Water please",
            createdAt: "2022-11-03T06:18:26.000Z",
            updatedAt: "2022-11-03T06:18:26.000Z",
            deleted_at: null,
          },
        },
        {
          id: 9,
          user_id: 1,
          word_id: 7,
          lesson_id: 2,
          answer: "How much is this?",
          is_correct: false,
          createdAt: "2022-11-03T09:21:11.000Z",
          updatedAt: "2022-11-03T09:21:11.000Z",
          deleted_at: null,
          Word: {
            id: 7,
            question: "これください",
            correct_answer: "This one please",
            choice1: "Water please",
            choice2: "Refill, please",
            choice3: "This one please",
            choice4: "How much is this?",
            createdAt: "2022-11-03T06:18:26.000Z",
            updatedAt: "2022-11-03T06:18:26.000Z",
            deleted_at: null,
          },
        },
        {
          id: 8,
          user_id: 1,
          word_id: 10,
          lesson_id: 2,
          answer: "I'd like a large portion",
          is_correct: true,
          createdAt: "2022-11-03T09:21:11.000Z",
          updatedAt: "2022-11-03T09:21:11.000Z",
          deleted_at: null,
          Word: {
            id: 10,
            question: "大盛りお願いします",
            correct_answer: "I'd like a large portion",
            choice1: "Refill, please",
            choice2: "I'd like a large portion",
            choice3: "This one please",
            choice4: "How much is this?",
            createdAt: "2022-11-03T06:18:26.000Z",
            updatedAt: "2022-11-03T06:18:26.000Z",
            deleted_at: null,
          },
        },
        {
          id: 7,
          user_id: 1,
          word_id: 8,
          lesson_id: 2,
          answer: "Refill, please",
          is_correct: false,
          createdAt: "2022-11-03T09:21:11.000Z",
          updatedAt: "2022-11-03T09:21:11.000Z",
          deleted_at: null,
          Word: {
            id: 8,
            question: "いくらですか",
            correct_answer: "How much is this?",
            choice1: "Water please",
            choice2: "How much is this?",
            choice3: "This one please",
            choice4: "Refill, please",
            createdAt: "2022-11-03T06:18:26.000Z",
            updatedAt: "2022-11-03T06:18:26.000Z",
            deleted_at: null,
          },
        },
        {
          id: 6,
          user_id: 1,
          word_id: 6,
          lesson_id: 2,
          answer: "How much is this?",
          is_correct: false,
          createdAt: "2022-11-03T09:21:11.000Z",
          updatedAt: "2022-11-03T09:21:11.000Z",
          deleted_at: null,
          Word: {
            id: 6,
            question: "すみません",
            correct_answer: "Excuse me",
            choice1: "Excuse me",
            choice2: "Refill, please",
            choice3: "How much is this?",
            choice4: "Water please",
            createdAt: "2022-11-03T06:18:26.000Z",
            updatedAt: "2022-11-03T06:18:26.000Z",
            deleted_at: null,
          },
        },
      ];

      score = Result.getScore(results);
    });

    it("should not be null", () => {
      expect(score).toBeDefined();
    });

    it("should not be equal to 2", () => {
      expect(score).toEqual(2);
    });
  });
});

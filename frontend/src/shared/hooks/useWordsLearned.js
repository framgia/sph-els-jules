import { useState, useEffect } from "react";

import { message } from "antd";

import api from "../../helpers/api";

export const useWordsLearned = (userId) => {
  const [wordsLearned, setWordsLearned] = useState([]);

  useEffect(() => {
    const getWordsLearned = async () => {
      const { data } = await api.get("/words/user", {
        params: {
          user_id: userId,
        },
      });

      const { meta, data: newData } = data;
      if (meta.code === 200) return setWordsLearned(newData.words_learned);

      message.error(meta.message);
    };
    getWordsLearned();
  }, [userId]);

  return { wordsLearned };
};

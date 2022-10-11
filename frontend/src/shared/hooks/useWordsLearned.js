import { useState, useEffect } from "react";
import { message } from "antd";

import wordApi from "../../api/wordApi";

export const useWordsLearned = (user_id) => {
  const [wordsLearned, setWordsLearned] = useState([]);

  useEffect(() => {
    const fetchWordsLearned = async () => {
      const { data } = await wordApi.getWordsLearned({ user_id });

      const { meta, data: newData } = data;
      if (meta.code === 200) return setWordsLearned(newData.words_learned);

      message.error(meta.message);
    };
    fetchWordsLearned();
  }, [user_id]);

  return { wordsLearned };
};

import axios from "axios";
import { useState } from "react";

export default function useHelpful(QAid, helpfulCategory) {
  //to save in local scope
  const category = helpfulCategory;
  const id = QAid;

  if (window.localStorage.getItem(category) === null) {
    window.localStorage.setItem(category, JSON.stringify({}));
  }

  const localStorage = JSON.parse(window.localStorage.getItem(category));
  const [isHelpful, setIsHelpful] = useState(localStorage[id]);

  const resetIsHelpful = () => {
    setIsHelpful(localStorage[id]);
  }

  var helpfulStyle = { fontWeight: 'bold', color: 'blue' };

  const helpfulQA = () => {
    if (!isHelpful) {
      axios({
        method: 'PUT',
        url: `${window.location.origin}/qa/${category}/${id}/helpful`
      })
        .then((res) => {
          window.localStorage.setItem(category, JSON.stringify({ ...localStorage, [id]: true }));
          setIsHelpful(true);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  return [isHelpful, helpfulQA, helpfulStyle, resetIsHelpful];
}
import React from "react";

import Faq, { FaqProps } from "../Faq";

interface FaqContainerProps {
  faqs: FaqProps[];
}
const FaqContainer: React.FC<FaqContainerProps> = ({ faqs }) => {
  return (
    <div className="flex items-start flex-col">
      {faqs.map(({ question, answer }, i) => (
        <Faq key={question} index={i} question={question} answer={answer} />
      ))}
    </div>
  );
};

export default FaqContainer;

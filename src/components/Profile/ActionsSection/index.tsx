import { Action } from "@prisma/client";

import { CheckSquare, Square } from "@/styles/Icons";

interface ActionsSectionProps {
  actions: (Action & { done: boolean })[];
}

const ActionsSection: React.FC<ActionsSectionProps> = ({ actions }) => {
  return (
    <section className="my-4 flex flex-wrap space-y-5 px-12">
      <div className="flex w-full flex-col">
        <h3 className="text-left text-xl font-bold text-gray-600">Ações</h3>
        <div className="mt-2 flex  w-full flex-wrap items-center gap-x-6 gap-y-3">
          {actions.length === 0 ? (
            <p className="text-center text-lg text-gray-500">
              Não há ações disponíveis...
            </p>
          ) : (
            <div className="w-full">
              <ul className="w-full space-y-4">
                {actions.map((action) => (
                  <li
                    key={action.id}
                    className={`flex w-full items-center justify-between rounded-md border p-4 shadow-sm ${
                      action.done
                        ? "border-green-300 bg-green-100"
                        : "border-gray-300 bg-gray-100"
                    }`}
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {action.altText ? action.altText : action.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {action.altText
                          ? "?".repeat(action.description.length)
                          : action.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-end text-center">
                      <p
                        className={`text-sm font-bold ${
                          action.done ? "text-green-600" : "text-gray-600"
                        }`}
                      >
                        {action.done ? (
                          <CheckSquare className="text-center text-3xl text-green-600" />
                        ) : (
                          <Square className="text-center text-3xl text-gray-600" />
                        )}
                      </p>
                      <p className="text-sm text-gray-800">
                        {action.points} pontos
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 w-full text-right">
                <p className="text-lg font-bold text-gray-800">
                  Pontos Totais:{" "}
                  {actions.reduce(
                    (total, action) =>
                      action.done ? total + action.points : total,
                    0
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActionsSection;

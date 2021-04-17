import { useReducer, useEffect } from "react";

import { Todo } from "./interfaces/todo.interface";
import { searchTodos } from "./utils/searchTodos";
import { filterTodos } from "./utils/filterTodos";

const ACTIONS = {
  filterTodos: "FILTER_TODOS",
  searchTodos: "SEARCH_TODOS",
  returnTodos: "RETURN_TODOS"
};

export interface FetchState {
  todos: Todo[];
};

const createInitialState = () => ({
  todos: []
});

const todosReducer = (state: any, action: { type: string; payload: any; }) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.searchTodos:
      return { ...state, ...payload };
    case ACTIONS.filterTodos:
      return { ...state, ...payload };
    case ACTIONS.returnTodos:
      return { ...state, ...payload };
    default:
      throw new Error("Not recognized action type in todosReducer! Typo?");
  }
};

export const useTodos = (todos: Todo[], query: any, type: string) => {
  const [state, dispatch] = useReducer(
    todosReducer,
    createInitialState()
  );

  useEffect(() => {
    switch (type) {
      case "":
        return dispatch({
          type: ACTIONS.returnTodos,
          payload: { todos: todos }
        })

      case "search":
        const searchedTodos = searchTodos(todos, query);
        return dispatch({
          type: ACTIONS.searchTodos,
          payload: { todos: searchedTodos }
        });

      case "filter":
        const cleanQuery = query === "true" ? true : false;
        const filteredTodos = filterTodos(todos, cleanQuery);
        return dispatch({
          type: ACTIONS.filterTodos,
          payload: { todos: filteredTodos }
        });

      default:
        return dispatch({
          type: ACTIONS.returnTodos,
          payload: { todos: [] }
        })
    }
  }, [todos, query, type]);
  
  return state;
};

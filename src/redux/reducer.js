import {
  ADD_TODO,
  DELETE_TODO,
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  UPDATE_TODO,
  FETCH_TODOS,
  CHANGE_PRIORITY,
  TOGGLE_DONE,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  FETCH_COLLECTION,
  RENAME_COLLECTION,
} from './types';

const initialState = {
  todos: [],
  completedTodos: [],
  collections: ['main'],
  loading: true,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const newState = {
        ...state,
        todos: [
          {
            key: action.key,
            ...action.todo,
          },
          ...state.todos,
        ],
      };
      return newState;
    }
    case DELETE_TODO: {
      const newState = {
        ...state,
        todos: state.todos.filter(todo => todo.key !== action.key),
      };
      return newState;
    }
    case UPDATE_TODO: {
      const newState = {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.key === action.key) {
            todo = {...action.payload};
            todo.key = action.key;
          }
          return todo;
        }),
      };
      return newState;
    }
    case FETCH_TODOS: {
      const newState = {
        ...state,
        todos: action.todos,
        loading: false,
      };
      return newState;
    }
    case SHOW_LOADER: {
      const newState = {
        ...state,
        loading: true,
      };
      return newState;
    }
    case HIDE_LOADER: {
      const newState = {
        ...state,
        loading: false,
      };
      return newState;
    }
    case SHOW_ERROR: {
      const newState = {
        ...state,
        error: action.error,
      };
      return newState;
    }
    case HIDE_ERROR: {
      const newState = {
        ...state,
        error: null,
      };
      return newState;
    }
    case TOGGLE_DONE: {
      const toggledState = state.todos.map(todo => {
        if (action.payload === todo.key) {
          todo.done = !todo.done;
        }
        return todo;
      });
      const newState = {
        ...state,
        todos: toggledState,
        completedTodos: toggledState.filter(todo => todo.done),
      };
      return newState;
    }
    case CHANGE_PRIORITY: {
      const newState = {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.key === action.key) {
            todo.priority = action.priority;
          }
          return todo;
        }),
      };
      return newState;
    }
    case FETCH_COLLECTION: {
      const oldCollections = [...state.collections];
      const collectionsFromTodos = [
        ...new Set(state.todos.map(item => item.collection)),
      ];
      const concated = [
        ...new Set([...oldCollections, ...collectionsFromTodos]),
      ];
      const newState = {
        ...state,
        collections: [...concated],
      };
      return newState;
    }
    case ADD_COLLECTION: {
      console.log('ADD COLLECTION state before: ', state);
      const newState = {
        ...state,
        collections: [...action.collections],
      };
      console.log('ADD COLLECTION state after: ', newState);
      return newState;
    }
    case DELETE_COLLECTION: {
      const newState = {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.collection === action.collection) {
            todo.collection = 'main'
          }
          return todo
        }),
        collections: [...state.collections].filter(item => item !== action.collection)
      }
      return newState
    }
    case RENAME_COLLECTION: {
      const newState = {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.collection === action.oldName) {
            todo.collection = action.newName
          }
          return todo
        }),
        collections: [...state.collections.map(item => {
          if (item === action.oldName) {
            item = action.newName
          };
          return item
        })]
      }
      console.log('RENAME COLLECTION:', newState.collections);
      return newState;
    }
    default:
      return state;
  }
};

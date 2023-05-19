import {
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
  forwardRef,
  useReducer,
} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const UserContext = createContext();

// useReducer ******************************************************
const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    completed: false,
  },
  {
    id: 2,
    title: "Todo 2",
    completed: false,
  },
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};
// **************************************************************

function App() {
  const [count, setCount] = useState(1);
  const [name, setName] = useState("Eak");
  const [data, setData] = useState([]);

  //  useRef ******************************************************
  const inputElement = useRef(""); // ใช้เก็บค่าไว้ แต่ไม่ทำให้ render ใหม่
  const [value, setValue] = useState("");
  const focusInput = () => {
    inputElement.current.focus();
  };

  const divRef = useRef("");
  const [value2, setValue2] = useState("");

  const ref = useRef(null);

  const alertText = () => {
    const input = ref.current;
    if (input.value) alert(input.value);
    else input.focus();
  };
  const InputText = forwardRef((props, ref) => <input ref={ref} {...props} />);
  //  **************************************************************

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${count}`)
      .then((res) => res.json())
      .then((data) => setData(data));
      // console.log("11111");
  }, [count]); // ถ้า count เปลี่ยนจะทำงานใหม่ ถ้าไม่เปลี่ยนจะไม่ทำงาน แต่ถ้าไม่ใส่จะทำงานเสมอ แม้ count ไม่เปลี่ยน

    //UseReducer ******************************************************
    const [todos, dispatch] = useReducer(todoReducer, initialTodos);
    const handleComplete = (todo) => {
      dispatch({ type: "COMPLETE", id: todo.id });
      // console.log("2222");
    };
    // **************************************************************

  return (
    <UserContext.Provider value={name}>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>

      <p>Hello {name}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={() => setName("Eak")}>Reset</button>

      <h1>Vite + React</h1>
      <div className="card">
        <p>
          <h2>Count Click: {count}</h2>
        </p>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => setCount((count) => count + 1)}
            >
              Increase
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => setCount((count) => count - 1)}
            >
              Decrese
            </button>
          </div>
        </div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <ChildComponent1 user={name} /> {/* ใช้ props ได้ */}
        <ChildComponent2 /> {/* ใช้ useContext ได้ */}
      </div>

      {/* <div className="card">
        <h2>UseRef Render Count: {count_render.current} </h2>
        <input type="text"  value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </div> */}
      <div className="card mt-2">
        <h5>การใช้ UseRef</h5>
        <div className="table">
          <div className="row">
            <div className="col">
              1.ดึงค่าจาก Element โดยใช้ useRef: {value}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="text"
                ref={inputElement}
                placeholder="Enter text ..."
              />
            </div>
            <div className="col">
              <button className="btn btn-info" onClick={focusInput}>
                Focus
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-info"
                onClick={() => setValue(inputElement.current.value)}
              >
                Show Value
              </button>
            </div>
          </div>
        </div>
        <hr />

        <div className="row mt-2">
          <div className="col mt-1">
            2.ดึงค่าจาก Element: {value2}
            <div ref={divRef} data="some value">
              Some content
            </div>
            <button
              className="btn btn-info"
              onClick={() => {
                const el = divRef.current;

                // <div text="some value">Some value</div>
                console.log(el);

                // some vale
                console.log(el.attributes.data.value);

                // Some content
                console.log(el.innerText);

                el.innerText = "Hello World!";

                setValue2(el.innerText);
              }}
            >
              Value
            </button>
          </div>
        </div>
        <br />
        <hr />
        <div className="row">
          <div className="col">
            <InputText ref={ref} placeholder="Enter text..." />
            <button onClick={alertText}>Focus</button>
          </div>
        </div>
      </div>

<hr/>


{/* //UseReducer ****************************************************** */}
      <div className="table">
        <div className="row">
          <div className="col">
            <h5>UseReducer</h5>
          </div>
        </div>

        <div className="row">
          <div className="col">
            {todos.map((todo) => (
              <div key={todo.id}>
                <span>{todo.name}</span>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleComplete(todo)}
                />
                {todo.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

function ChildComponent1({ user }) {
  return (
    <>
      <div>
        <h3>Child Component 1</h3>
        <p>Hello {user}</p>
      </div>
    </>
  );
}

function ChildComponent2() {
  const name = useContext(UserContext);
  return (
    <>
      <div>
        <h3>Child Component 2</h3>
        <p>Hello {name}</p>
      </div>
    </>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import TreeView from "react-expandable-treeview";

const data = [
  {
    id: 0,
    intent: "",
    conditions: [
      {
        id: 5,
        label: "#HowToCreate",
        type: "or",
      },
      {
        id: 5,
        label: "@Requisition",
        type: "or",
      },
      {
        id: 5,
        label: "@AR",
        type: "or",
      },
    ],
    id: 3,
    response: "(RID1)",
  },
  {
    id: 0,
    intent: "HowToEdit",
    conditions: [
      {
        id: 5,
        label: "#HowToEdit",
        type: "or",
      },
      {
        id: 5,
        label: "@Requisition",
        type: "or",
      },
    ],
    response: "(RID2)",
  },
];
function App() {
  return (
    <div
      style={{ padding: "20px", backgroundColor: "#F4F4F4", height: "100%" }}
    >
      {/* <div>hello</div> */}

      {data.map((ob) => {
        return (
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              marginBottom: "10px",
            }}
          >
            {/* <div style={{ fontSize: "18px", fontWeight: "bold" }}>
              {ob.intent}
            </div> */}

            <input
              type="text"
              name={ob.intent}
              value={ob.intent}
              placeholder="Enter node name (optional)"
              style={{
                marginRight: "20px",
                backgroundColor: "#F4F4F4",
                height: "25px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
                fontSize: "17px",
                width: "99%",
              }}
            />

            <div
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "lightgray",
                marginTop: "35px",
                marginBottom: "35px",
              }}
            ></div>

            <div>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "17px",
                }}
              >
                If Lex recognizes:
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {ob.conditions.map((con, index) => {
                  return (
                    <>
                      <input
                        type="text"
                        name={con.label}
                        value={con.label}
                        style={{
                          marginRight: "20px",
                          backgroundColor: "#F4F4F4",
                          height: "25px",
                          padding: "5px",
                          fontSize: "17px",
                          marginBottom: "10px",
                        }}
                      />
                      {index < ob.conditions.length - 1 ? (
                        <input
                          type="text"
                          name={con.type}
                          value={con.type}
                          style={{
                            marginRight: "20px",
                            backgroundColor: "#F4F4F4",
                            height: "25px",
                            marginBottom: "10px",
                            textAlign: "center",
                            padding: "5px",
                            width: "30px",
                            fontSize: "17px",
                          }}
                        />
                      ) : null}
                    </>
                  );
                })}
              </div>
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                Lex responds:
              </div>

              <textarea
                type="text"
                name={ob.response}
                value={ob.response}
                style={{
                  marginRight: "20px",
                  backgroundColor: "#F4F4F4",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                  height: "20px",
                  width: "99%",
                  fontSize: "17px",
                }}
              />
            </div>
          </div>
        );
      })}
      {/* <TreeView data={data} renderNode={({ label }) => <div>{label}</div>} /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

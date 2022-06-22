import logo from "./logo.svg";
import "./App.css";
import TreeView from "react-expandable-treeview";

// const data = [
//   {
//     id: 0,
//     label: "A Father",
//     children: [
//       {
//         id: 1,
//         label: "A Son",
//       },
//       {
//         id: 2,
//         label: "Another Son",
//       },
//     ],
//     id: 3,
//     label: "Another Father",
//     children: [
//       {
//         id: 4,
//         children: [
//           {
//             id: 5,
//             label: "Yet Another Son",
//           },
//         ],
//       },
//     ],
//   },
// ];

const data = [
  {
    id: 0,
    intent: "HowToCreate",
    conditions: [
      {
        id: 5,
        label: "Requisition",
        type: "or",
      },
      {
        id: 5,
        label: "AR",
        type: "or",
      },
    ],
    id: 3,
  },
  {
    id: 0,
    intent: "HowToEdit",
    conditions: [
      {
        id: 5,
        label: "Requisition",
        type: "or",
      },
    ],
    conditions: [
      {
        id: 5,
        label: "PO",
        type: "or",
      },
    ],
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
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>
              {ob.intent}
            </div>
            <div style={{ marginTop: "10px" }}>
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
                          display: "flex",
                          alignItems: "center",
                          padding: "5px",
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
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "5px",
                            width: "30px",
                          }}
                        />
                      ) : null}
                    </>
                  );
                })}
              </div>
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
